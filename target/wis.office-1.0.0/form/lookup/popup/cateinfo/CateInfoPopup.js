/**
 * 상품분류코드 팝업
 */
Ext.define('lookup.popup.cateinfo.CateInfoPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.lookup-cateinfo-popup',
    title: '전시 분류',
    closable: true,
    autoShow: true,
    width: 700,
    height: 500,
    layout: {
        type: 'border'
    },
    choiceRecord : undefined,
	defaultFocus : 'initfocused',

    initComponent: function(config){
        var me = this;
        me.items = [me.createForm()];
        me.callParent(arguments);
        me.selectAction();
    },
    /**
     * 화면폼
     */
    createForm: function(){
    	var me = this,
    		form = {
    			xtype	: 'form-layout',
    			region	: 'center',
    			border	:false,
    			layout	: { type: 'hbox', align: 'stretch' },
    			dockedItems : [ me.searchForm() , me.finishTool() ],
    			items : [
    		 		{	xtype      : 'grid-panel',
    		 			itemId     : 'itemcate1' ,
    		 			flex       : 2.5 ,
    		 			style      : Const.borderLine.right,
    		 			border     : 0  ,
    		 			margin     : '0 1 0 0' ,
    		 			defaults   : {style: 'text-align:center'},
    		 			viewConfig : { loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }) },
    		 			store      : Ext.create('lookup.popup.store.CatePopup'  ),
    		 			columns    : [{ text: '1차분류' , dataIndex: 'cate_nm',  flex : 1  }],
    		 			listeners  : {
    		 				itemclick : function (dv, record, item, index, e) {
    		 					me.selectRecord( record);
    		 				},
    		 				itemdblclick: function(dataview, index, item, e) {
    		 					if (me.popup.choice && me.popup.choice == 'free') {
    		 						me.finishAction();
    		 					}
    		 				},
    		 				selectionchange : function(grid, records ) {
    		 					var record = records[0],
    		 						cate2 = me.down('#itemcate2').getStore(),
    		 						cate3 = me.down('#itemcate3').getStore(),
    		 						cate4 = me.down('#itemcate4').getStore()
    		 					;

    		 					cate2.loadData([],false);
    		 					cate3.loadData([],false);
    		 					cate4.loadData([],false);
    		 					if (record) {
    		 						me.selectRecord( record);
    		 						var param = Ext.merge(me.popup.params,{ hq_id : record.get('hq_id'), prnt_id : record.get('cate_id') , row_lvl : '2'  } );
    		 						cate2.load({
    		 							params:{param:JSON.stringify(param)},scope: me,
    		 							callback: function(records, operation, success) {
    		 								if (!success) {
    		 								}
    		 							}
    		 						});
    		 					}
    		 				}

    		 			}
    		 		},{
    		 			xtype      : 'grid-panel',
    		 			itemId     : 'itemcate2' ,
    		 			flex       : 2.5 ,
    		 			style      : Const.borderLine.left + Const.borderLine.right,
    		 			border     : 0  ,
    		 			margin     : '0 1 0 0' ,
    		 			defaults   : {style: 'text-align:center'},
    		 			viewConfig : { loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }) },
    		 			store      : Ext.create('lookup.popup.store.CatePopup'),
    		 			columns    : [{ text: '2차분류' , dataIndex: 'cate_nm',  flex : 1  }],
    		 			listeners  : {
    		 				itemclick : function (dv, record, item, index, e) {
    		 					me.selectRecord( record);
    		 				},
    		 				itemdblclick: function(dataview, index, item, e) {
    		 					if (me.popup.choice && me.popup.choice == 'free') {
    		 						me.finishAction();
    		 					}
    		 				},
    		 				selectionchange : function(grid, records ) {
    		 					var record = records[0],
    		 						cate3 = me.down('#itemcate3').getStore(),
    		 						cate4 = me.down('#itemcate4').getStore()
    		 					;
    		 					cate3.loadData([],false);
    		 					cate4.loadData([],false);
    		 					if (record) {
    		 						me.selectRecord( record);
    		 						var param = Ext.merge(me.popup.params,{ hq_id : record.get('hq_id'), prnt_id : record.get('cate_id') , row_lvl : '3' });
    		 						cate3.load({
    		 							params:{param:JSON.stringify(param)},scope: me,
    		 							callback: function(records, operation, success) {
    		 								if (!success) {
    		 								}
    		 							}
    		 						});
    		 					}
    		 				}
    		 			}
    		 		},{
    		 			xtype      : 'grid-panel',
    		 			itemId     : 'itemcate3' ,
    		 			flex       : 2.5 ,
    		 			style      : Const.borderLine.left + Const.borderLine.right,
    		 			border     : 0  ,
    		 			margin     : '0 1 0 0' ,
    		 			defaults   : {style: 'text-align:center'},
    		 			viewConfig : { loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }) },
    		 			store      : Ext.create('lookup.popup.store.CatePopup'),
    		 			columns    : [{ text: '3차분류' , dataIndex: 'cate_nm',  flex : 1  }],
    		 			listeners  : {
    		 				itemclick : function (dv, record, item, index, e) {
    		 					me.selectRecord( record);
    		 				},
    		 				itemdblclick: function(dataview, index, item, e) {
    		 					if (me.popup.choice && me.popup.choice == 'free') {
    		 						me.finishAction();
    		 					}
    		 				},
    		 				selectionchange : function(grid, records ) {
    		 					var record = records[0],
    		 						cate4 = me.down('#itemcate4').getStore()
    		 					;
    		 					cate4.loadData([],false);
    		 					if (record) {
    		 						me.selectRecord( record);
    		 						var param = Ext.merge(me.popup.params, { hq_id : record.get('hq_id'), prnt_id : record.get('cate_id') , row_lvl : '4' });
    		 						cate4.load({
    		 							params:{param:JSON.stringify(param)},scope: me,
    		 							callback: function(records, operation, success) {
    		 								if (!success) {
    		 								}
    		 							}
    		 						});
    		 					}
    		 				}
    		 			}
    		 		},{
    		 			xtype      : 'grid-panel',
    		 			itemId     : 'itemcate4' ,
    		 			hidden     : true,
    		 			flex       : 2.5 ,
    		 			border     : 0  ,
    		 			style      : Const.borderLine.left,
    		 			defaults   : {style: 'text-align:center'},
    		 			viewConfig : { loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }) },
    		 			store      : Ext.create('lookup.popup.store.CatePopup'),
    		 			columns    : [{ text: '4차분류' , dataIndex: 'cate_nm',  flex : 1  }],
    		 			listeners  : {
    		 				itemclick : function (dv, record, item, index, e) {
    		 					me.selectRecord( record);
    		 				},
    		 				itemdblclick: function(dataview, index, item, e) {
    		 					me.finishAction();
    		 				},
    		 				selectionchange : function(grid, records ) {
    		 					var record = records[0]
    		 					;
    		 					if (record) {
    		 						me.selectRecord( record);
    		 					}
    		 				},
    	        			 render: function(){
    	         				var me = this
    	         				;
    	         				new Ext.util.KeyMap({
    	         					 target: me.getEl(),
    	         					 eventName : 'keyup',
    	         					 binding:[
    	         			     		  {
    	         			     			 key: Ext.EventObject.ENTER,
    	         			     			 fn: function(key,e){
    	         			     				me.fireEvent('itemdblclick', me.getView() );
    	         			     			 }
    	         			     		  }
    	         			     	]
    	         				});
    	         			}
    		 			}
    		 		}
    		 	]
    		}
    	;
    	return form;
    },
    /**
     * 검색폼
     */
    searchForm: function(){
    	var me = this,
    		form = {
    			xtype: 'form-search',
    			bodyStyle: { padding: '0', background: 'transparent' },
    			dockedItems : [
    		 		{	xtype	: 'toolbar',
    		 			dock	: 'top',
    		 			items	: [
    		 		 		{	xtype : 'button'     , text: Const.SELECT.text , iconCls: Const.SELECT.icon, scope: me, handler: me.selectAction, cls: 'button-style'
    		 		 		},{	xtype : 'tbfill'
    		 		 		}
    		 		 	]
    		 		},{	xtype : 'container'  , layout: 'border', border : 0 , height: 3
    		 		}
    		 	],
    		 	layout: { type: 'vbox' },
    		 	fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
    		 	items :	[]
        	}
    	;
        return form;
    },

    /**
     *
     */
    finishTool : function() {
    	var me = this,
    		tool = {
    			xtype	: 'toolbar',
    			dock	: 'bottom',
    			itemId	: 'finishtool' ,
    			items	: [
    			 	{	xtype: 'textfield' , name : 'cate_ds',  height : 22,  flex  : 1 , readOnly : true , fieldCls   : 'readonlyfield'
			 		}	,'-',
    			 	{	xtype: 'textfield' , name : 'cate_id', hidden : true , readOnly : true
		 			},{	xtype: 'button'    , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'
	 				}	,'-',
    			 	{	xtype: 'button'    , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style'
			 		}
	 		 	]
	 		}
    	;
    	return tool;
    },

    /**
     * 리스트
     * @return {Ext.grid.Panel} 리스트 그리드
     */
    createGrid: function(){
        var me = this,
        	grid = {
	        	xtype	: 'grid-panel',
	        	header	: false,
	        	region	: 'center',
	        	viewConfig: {
	        		loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
	        	},
	        	selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
	            store: Ext.create('lookup.popup.store.CatePopup'),
	            columns: [
	             	{ text: '은행' , dataIndex: 'cate_nm',  width: 150 }
	            ],
	            listeners: {
	                itemdblclick: function(dataview, index, item, e) {
	                	me.finishAction();
	                }
	            }
	        };
        return grid;
    },

    /**
     * 조회
     */
    selectAction: function(){
        var me = this,
        	store = me.down('#itemcate1').getStore(),
    		param = Ext.merge( me.down('form').getValues(), {
            }, me.popup.params , {prnt_id : '0', row_lvl :  1});
        ;
		store.load({
			params:{param:JSON.stringify(param)}, scope:me,
			callback:function(records, operation, success) {
				me.down('#itemcate1').getSelectionModel().select(0);
			}
		});
    },

    selectRecord : function( record ) {
    	var me = this;
		if (record) {
			me.choiceRecord = record ;
			base = me.down('#finishtool');
			base.down('[name=cate_ds]').setValue(record.get('cate_ds'));
		}
    },
    /**
     * 확인 버튼 이벤트
     * 분류4의 선택 값이 있을 경우에만 반환
     */
    finishAction: function(){
    	var me = this,
            panel = me.down('#itemcate3'),
    		selected = panel.getSelectionModel().getSelection()
    	;
    	if (me.popup.choice && me.popup.choice == 'free') {
    		if (me.choiceRecord) {
    			me.setResponse([me.choiceRecord]);
    		} else {
    			resource.showError( '분류를 선택 하여 주시기 바랍니다.'  );
    		}
    	} else {
    		if (selected.length === 0) {
    			resource.showError( '최종 분류를 선택 하여 주시기 바랍니다.'  );
    		} else {
    			me.setResponse(selected);
    		}
    	}
    }
});
