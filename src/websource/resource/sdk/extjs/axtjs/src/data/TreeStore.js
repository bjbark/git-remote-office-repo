
Ext.define( 'Axt.data.TreeStore', {
	extend: 'Ext.data.TreeStore',
	requires: ['Ext.data.writer.Json'],
	/* 객체가 생성 될 시 자동 proxy data 조회 */
	autoLoad: false,
	/* 페이징 사이즈 */
	pageSize: 50,
	maskPanel: undefined,
	remoteSort: false,
	/* extjs 에서는 신규,수정,삭제 항목을 별개로 처리 중인데, 시스템은 한방에 보내고 싶어서 만듬 */
	mergedSync: true,

	/* mergedSync옵션을 true로해서 server sync한후 client(Ext) model의 dirty상태를 초기화하기위해
	 * commit을 하는데 만약 model의 수가 너무 많은경우 일일히 model commit하는것보다는
	 * 조회를 한번 더해서 grid를 refresh하는게 속도상으로 더 나으므로 이 옵션을 둔다.
	 */
	mergedSyncModelCommit: true,

	// filter를 주기위한 플러그인
	plugins: [{
        ptype: 'treefilter',
        allowParentFolders: true
    }],

	/**
	 * 생성자 - store의 경우 component class가 아니므로 initComponent()는 사용 불가
	 *
	 * @param {} config
	 */
	constructor: function(config) {
		var me = this;
		me.proxy = me.proxy || config.proxy || {};
		Ext.applyIf(me.proxy, me.defaultProxy); // subclass에서 설정 된 proxy에 기본 설정을 적용
		me.callParent(arguments); // call superclass(Ext.data.Store)
	},
	defaultProxy: {
		type: 'ajax',
		reader: {
			type: 'json', //
			root: 'records',
			_total: 0,
			getResponseData:function(response){
				var result = Ext.decode(response.responseText);
				/* 정상 조회 된경우 */
				if (result.success) {
					/* 서버에서 데이터를 조회하여 응답을 받는경우 */
					if (response.request.options.action == 'read') {
						var records = this.readRecords(result.records);
						records.total = (!isNaN(result.total)) ? result.total : this._total ;
						return records;
					} else {
						console.debug( 'write ssssss') ;
						/* TreeStore를 상속받은 클래스에서
						 * mergedSyncModelCommit설정이 false라면 그리드의 dirty상태가 clear되지 않으므로
						 * 반드시 그리드를 재조회 하여 clear해줘야 한다.(대용량 TreeGrid의 경우 이렇게 해야함. commit하는데 오래걸리므로) */
						//if ( ! this.mergedSyncModelCommit) {
						//	return new Ext.data.ResultSet({ total  : 0, count  : 0, loaded:true, records: [], success: false, message: result.message });
						//}
						/* 변경된 데이터를 서버에 보내고 응답을 받는경우, 특별한 처리 하지 않아도 된다. */
					}
				} else {
					/* 에러인 경우 */
					Ext.Msg.show({ title: Const.ERROR, msg: result.message, icon: Ext.MessageBox.ERROR, buttons: Ext.Msg.OK});
					return new Ext.data.ResultSet({ total  : 0, count  : 0, records: [], success: false, message: result.message });
				}
			}
		},
		writer: {
			type:'json',
			root:'',
			write: function(request) {

				var me = this , data = [], item , xx = { } ;
	            Ext.each(request.operation.records, function(record) {
	            	item = me.getRecordData(record );
	            	data.push( item );
	            });
	            request.params.param = JSON.stringify({records:data});

	            return request;
		    }
		},
		listeners: {
			exception: function(proxy, response, operation) {
				resource.httpError(response);
    	   }
		}
	},

    load: function(options) {
    	var me = this ;
    	//  초기 파라메터 값이 존재하는 경우, prox ExtraParam 값에 등록해 두어야 한다. 안그러면 그리고 paging 바를 이용할때 파라메타가 없다고 나옴
    	if (options.params) {
    		var values = options.params;
    		for(var key in values) {
    			var value = values[key];// options.params[key];
    			me.proxy.setExtraParam(key, value);
    		}
    	}
    	return me.callParent(arguments);
    },
    /**
     * 로컬에서 변경된 정보를 서버로 업데이트 시킨다.
     */
    sync: function(options) {
        var me = this;
    	if (me.mergedSync) { // 신규,수정,삭제 항목을 모두 취합하여 update 상태로 처리 하고, 데이터 속성에 시스템 처리 상태(insert, update, delete)를 두도록 한다.
            var datas = [], operations = {}, toInsert = me.getNewRecords(), toUpdate = me.getUpdatedRecords(), toDelete = me.getRemovedRecords();
            console.debug ('sync.changedata' , [ toInsert ,toUpdate  ,toDelete ] );

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
    getRejectRecords: function() {
        return this.getUpdatedRecords();
    },

    /**
     * {@link Ext.data.Model#reject Rejects} outstanding changes on all {@link #getModifiedRecords modified records}
     * and re-insert any records that were removed locally. Any phantom records will be removed.
     */
//    removeReject : function() {
//    	this.removed = [];
//    	this.rejectChanges();
//    },
    rejectChanges : function() {
        var me = this,
            recs = me.getRejectRecords(),
            len = recs.length,
            i = 0,
            rec;

        for (; i < len; i++) {
            rec = recs[i];
            rec.reject();
            if (rec.phantom) {
                me.remove(rec);
            }
        }
        // Restore removed records back to their original positions
        recs = me.removed;
        len = recs.length;
        for (i = 0; i < len; i++) {
            rec = recs[i];
            me.insert(rec.removedFrom || 0, rec);
            rec.reject();
        }
        // Since removals are cached in a simple array we can simply reset it here.
        // Adds and updates are managed in the data MixedCollection and should already be current.
        me.removed.length = 0;
    }
});



