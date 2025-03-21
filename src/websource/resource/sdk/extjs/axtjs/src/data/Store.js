
Ext.define('Axt.data.Store', { extend: 'Ext.data.Store',
	requires  : ['Ext.data.writer.Json'], //Ast.data.writer.Json
	autoLoad  : false, // 객체가 생성 될 시 자동 proxy data 조회
	pageSize  : 20 , // Const.SELECT.size, // 50, // 페이징 사이즈
	maskPanel : undefined,
	remoteSort: false,
	mergedSync: true,
	commitSync: true,


	/**
	 * 생성자 - store의 경우 component class가 아니므로 initComponent()는 사용 불가
	 *
	 * @param {} config
	 */
	constructor: function(config) {
		var me = this;
		me.proxy = me.proxy || config.proxy || {};
		Ext.applyIf(me.proxy, me.defaultProxy()); // subclass에서 설정 된 proxy에 기본 설정을 적용
		me.callParent(arguments); // call superclass(Ext.data.Store)
	},

	/**
	 * 프록시 설정
	 *
	 * @param {} config
	 * @return {}
	 */
	defaultProxy: function () {
		//var me = this;
		//var store = this;
		return {
			type    : 'ajax',
			timeout : 180000,
			reader: {
				type: 'json',
				root: 'records',
				getResponseData:function(response){

					/* 서버에서 내려온 값일 읽어 들인다. */
					var result = Ext.decode(response.responseText);


					if (result.success) {
						/* 서버에서 데이터를 조회하여 응답을 받는경우 */
						if (response.request.options.action == 'read') {
							if (result.records.length > 0 ) {
								var records = this.readRecords(result.records);
								if (result.summary && result.summary.maxsize) {
									var count = 0;
									for(var key  in result.summary) {
										count++;
									}
									records.total = result.summary.maxsize;

									/* 서버에서 내려온 object를 proxy의 reader에 갖고 있는다
									 * this.summary변수명을 수정하는경우 Axt.grid.feature.Summary에도 수정을 해야 한다.
									 *
									 * 14.01.06 - dj.han
									 * maxsize는 있으나 다른 summary값이 없는 경우(count === 1) count를 제외한 컬럼값은 0으로 새로고침
									 * server에서 summary 값이 안내려오면 그리드의 summary값이 변경 안되는 문제 (미수합계 등)
									 * */
									if(this.summary === undefined || count === 1) {
										this.summary = {} ;
									}
									//Ext.merge(this.result, result); // 현재 reader에 갖고있는 데이터객체와 방금 서버에서 내려온 객체를 결합
									Ext.merge(this.summary, result.summary ); // 현재 reader에 갖고있는 데이터객체와 방금 서버에서 내려온 객체를 결합
								} else {
									records.total = -1;
								}
							}
							//console.debug('ggggg2') ;
							return records;
						} else {
							/* 변경된 데이터를 서버에 보내고 응답을 받는경우, 특별한 처리 하지 않아도 된다.*/
						}
					} else {
						/* 에러인 경우 */
						Ext.MessageBox.show({ title: Const.ERROR, msg: result.message, icon: Ext.MessageBox.ERROR, buttons: Ext.Msg.OK});
						return new Ext.data.ResultSet({ total  : 0, count  : 0, records: [], success: false, message: result.message });
					}
				}
			},
			writer: {
				type:'json',
				root:'',
				write: function(request) {
			        var me = this , data = [], item ;

			        //console.debug('dddddd me' , me );
		            Ext.each(request.operation.records, function(record) {
		            	item = me.getRecordData(record );
		            	data.push( item );
		            });

		            //console.debug('ssssss22ss', me.mergeParams );
		            var paramJson = Ext.merge({records:data}, me.mergeParams||{});
		            request.params.param = JSON.stringify(paramJson);
		            me.mergeParams = null;
		            return request;
			    }
			},
			listeners: {
				/* 서버 통신중 예외 오류가 발생한 경우 */
				exception: function(proxy, response, operation ) {
					resource.httpError(response);
	    	   }
			}
		};
	},

    /**
     * 업데이트 성공한 경우 삭제 데이터 로그를 초기화 시킨다.
     */
    onUpdateRecords: function(records, operation, success) {
    	if (this.mergedSync && this.commitSync) { // 신규,수정,삭제을 모두 취합해 update로 처리 하는데, 로컬에 removed 가 남아 있어 계속 호출 되는것을 방지 한다.
            if (success) {
            	var i;
            	Ext.each(records,  function( record ) {
            		for (i = 0; i < record.associations.length; i++) {
            			association = record.associations.get(i) ;
            			if (association.type == 'hasMany')  {
        					childStore = eval('record.'+association.name+'()');
        					childStore.commitChanges();
        					childStore.removed = [];
            			}
            		}
            	});
            	this.removed = [];
            }  // 원래는 데이터 삭제후 Sync를 걸면 onDestoryRecords 에서 처리하는데, mergeSync에서는 update만 사용하므로 onUpdateRecords 에서 처리 한다.
    	} else {
    		this.callParent(records, operation, success);
    	}
    },

    onProxyLoad: function(operation) {
    	var me = this;
    	if(!operation.exception){ // 정상일때만 처리해야 스크립트 에러가 안난다.

    		var result = operation.getResultSet();
    		if (result.total) {
    			if (result.total >= 0 ) {
    				me.maxsize = result.total ;
    			}
    		} else {
    			me.maxsize = 1 ;
    		}
    		result.total = me.maxsize ;
    	}
    	me.callParent(arguments);
    },

    /**
     *
     */
    load: function(options) {
    	var me = this,
    		values
    	//  초기 파라메터 값이 존재하는 경우, prox ExtraParam 값에 등록해 두어야 한다. 안그러면 그리고 paging 바를 이용할때 파라메타가 없다고 나옴
    	if (options && options.params) {
        	me.removeAll();
        	me.currentPage = 1;
    		values = options.params;
    		for(var key in values) {
    			var value = values[key];
    			me.proxy.setExtraParam(key, value);
    		}
    	}
    	return me.callParent(arguments);
    },

    /**
     * 로컬에서 변경된 정보를 서버로 업데이트 시킨다.
     */
    sync: function(options, param) {
        var me = this;
    	if (me.mergedSync) { // 신규,수정,삭제 항목을 모두 취합하여 update 상태로 처리 하고, 데이터 속성에 시스템 처리 상태(insert, update, delete)를 두도록 한다.
            var datas = [], operations = {}, toInsert = me.getNewRecords(), toUpdate = me.getUpdatedRecords(), toDelete = me.getRemovedRecords();
            console.debug ('sync.changedata' , [ toInsert ,toUpdate  ,toDelete , options  ]  );
            me.proxy.writer.mergeParams = param;


            if (toDelete.length > 0) { Ext.each(toDelete, function( record ) { record.data._set = 'delete'; datas.push(record); }); }
            if (toInsert.length > 0) { Ext.each(toInsert, function( record ) { record.data._set = 'insert'; datas.push(record); }); }
            if (toUpdate.length > 0) { Ext.each(toUpdate, function( record ) { record.data._set = 'update'; datas.push(record); }); }

            operations.update = datas;
            if ((datas.length > 0) && me.fireEvent('beforesync', operations) !== false) {
                options = options || {};
                me.proxy.batch(Ext.apply(options, {
                    operations: operations,
                    listeners: me.getBatchListeners()
                }));
            }
            return me;
    	} else {
    		return me.callParent(arguments);
    	}
    },
    newRecord : function( defaultValue ) {
    	var me = this;
    	return Ext.create( this.model.modelName , defaultValue );
    }
});

