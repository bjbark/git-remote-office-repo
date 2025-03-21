

Ext.define('module.sale.salework.view.SaleWorkExcel', { extend: 'Axt.popup.Search',
    alias: 'widget.module-salework-excel',

    requires: [ 'Axt.grid.Excel' ],

   // title: Msg.TITLE_EXCEL_POPUP,

    closable: true,
    width: 650,
    height: 450,
    autoShow: true,
    title   : '엑셀 붙여넣기',
    layout: 'border',

    initComponent: function(config){
        var me = this;
//        me.dockedItems = [ me.createToolbar() ],
        me.items = [ me.createGrid() ];
        me.callParent(arguments);
    },

    /**
     * 상단 툴바
     * @return {}
     */
    createToolbar: function(){
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {text: Const.INSERT.text, iconCls: 'icon-add', scope: this, handler: this.addAction ,cls: 'button-style'},
                {text: Const.FINISH.text, iconCls: 'icon-confirm', scope: this, handler: this.confirmAction ,cls: 'button-style'},
                {text: Const.CLOSER.text, iconCls: 'icon-close', scope: this, handler: this.close ,cls: 'button-style'}
            ]
        });

        return toolbar;
    },

    /**
     * 상품리스트
     * @return {Ext.grid.Panel} 상품리스트 그리드
     */
    createGrid: function(){
    	var grid = Ext.create('Axt.grid.Excel' , {   // new com.common.grid.Excel({
            region: 'center',
            store: this.gridStore || {
			    fields:['item_code', 'qty', 'pri' , '_confirm', '_sts', 'item_idcd' ],
			    data:[ {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{} ]
            },
            paging:
        	{
        		xtype: 'grid-paging', pagingButton : false,
        		items:[
        		 	'->' ,
                    {text: Const.CANCEL.text, iconCls: Const.CANCEL.icon , scope: this, handler: this.addAction ,cls: 'button-style'},
                    {text: Const.FINISH.text, iconCls: Const.FINISH.icon , scope: this, handler: this.confirmAction ,cls: 'button-style'},
                    {text: Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: this, handler: this.close ,cls: 'button-style'}
        		]
        	},
		    columns: this.gridColumns || {
		    	defaults:{ flex: 1 },
		    	items: [
		    		{header: '품목코드'	, dataIndex: 'item_code'	, editor: 'textfield'},
		    		{header: '수량'		, dataIndex: 'qty'		, editor: 'textfield'},
		    		{header: '단가'		, dataIndex: 'pri'	, editor: 'textfield'} ,
		    		{header: '결과'		, dataIndex: '_confirm'	, editor: 'textfield'}
	    		]
			}
        });
        return grid;
    },

    /**
     * 신규 - 데이터 초기화
     */
    addAction: function(){
    	this.down('grid').getStore().rejectChanges();
    },

    /**
     * 확인 버튼 이벤트
     * 분류4의 선택 값이 있을 경우에만 반환
     */
    confirmAction: function(){
    	var me = this,
            store = this.down('grid').getStore(),
            updated = store.getUpdatedRecords(),
            added = store.getNewRecords(),
            records = updated.concat(added),
            success_cnt   = 0 ,
            failure_cnt   = 0
         ;
//    	console.debug('store', store );

    	/*item_code 검증 */
    	store.each( function( item ){
//    		console.debug('item', item );
    		if ( !item.get('item_code') ){
    			item.set('_confirm', '<font color=red>품목코드 없음</font>'  );
    			item.set('_sts', '0'  );
    			failure_cnt = failure_cnt + 1 ;

    		} else {
				if (item.get('qty') == '' ){
					item.set('qty' , 1 );
				}
//    			if ( !item.get('qty') || item.get('qty') ==  0 ){
				if (item.get('qty') ==  0 ){
        			item.set('_confirm', '<font color=red>수량 오류</font>'  );
        			item.set('_sts', '0'  );
        			failure_cnt = failure_cnt + 1 ;
    			} else {
    				if (item.get('pri') == '' ){
    					item.set('pri' , 0  );
    				}
//    				if ( !item.get('pri') ){
//            			item.set('_confirm', '<font color=red>단가 오류</font>'  );
//            			item.set('_sts', '0'  );
//            			failure_cnt = failure_cnt + 1 ;
//    				} else {
    					Ext.Ajax.request({
    						url: _global.api_host_info + '/system/item/itembrcd/get/brcdexcel.do', //'/system/basic/sequence/get/default.do',
    						params: { token : _global.token_id, param : JSON.stringify({ stor_id : _global.stor_id , item_code : Ext.String.trim( item.get('item_code') ) }) } ,
    						method:'POST',
    						async: false,
    						success:function(response, request){
    							var result = Ext.decode(response.responseText);
    							var record = result.records[0] ;
    							if ( record ){ /* 품목코드 조회 성공 */
    								item.set( '_confirm', '조회 성공' );
    								item.set( '_sts', '1' );
    								item.set( 'item_idcd', record.item_idcd  );
    								success_cnt = success_cnt + 1 ;

    							} else { /* 품목코드 조회 실패 */
    								item.set( '_confirm', '<font color=red>조회 실패</font>' );
    								item.set( '_sts', '0' );
    								failure_cnt = failure_cnt + 1 ;
    							}
    						}
    					});
//    				}
    			}

    		}

    	});

		Ext.Msg.show({ title: '알림', msg: "성공: "+success_cnt+"건 / <font color=red>실패 : "+failure_cnt+"건</font><br><br>상품을 등록하시겠습니까?", icon: Ext.Msg.INFO, buttons: Ext.Msg.YESNO, defaultFocus: 'yes', scope: me,
			fn : function (button) {
				if ( button == 'yes' ){
					me.close();
					me.setResponse(records);
				}
			}
		});

    } ,

	listeners: {
		render: function(){
			var me = this;
			new Ext.util.KeyMap({
			        target  : me.getEl().dom,
			        binding : [
			     	/* Ctrl + Delete */
			     	    {
			     		    ctrl:true, key: 46,
				     		fn: function(key,e){
				     			var records = me.down('grid').getSelectionModel().getSelection();

				     			if (Ext.isEmpty( records[0] )) {
	     	 						Ext.Msg.alert("알림", "상품을 선택해주시기 바랍니다.");
	     	 						return;
				     			}
				     	 		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				     	 			fn : function (button) {
				     	 				if (button==='yes') {
				     	 					var store = me.down('grid').getStore();
				     	 					store.remove(records[0]);
				     	 				}
				     	 			}
			     	    		});
			     			}
			     	    }
			     	]
			});
		}
	}

});
