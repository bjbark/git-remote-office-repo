/**
 */
Ext.define('lookup.popup.view.ClassPopup', { extend: 'Axt.popup.Search',

	id   : 'lookup-class-popup',
    alias: 'widget.lookup-class-popup',
    store: 'lookup.popup.store.ClassPopup',

    title: Language.get('itm_clss_popup','품목 분류 정보'),
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
        //var form = me.createForm();
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
    			xtype : 'form-layout',
    			region : 'center',
    			border:false,
    			layout: { type: 'hbox', align: 'stretch' },
    			dockedItems : [ me.searchForm() , me.finishTool() ],
    			items :
    			[
    		 		{
    		 			xtype      : 'grid-panel',
    		 			itemId     : 'itemclass1' ,
    		 			flex       : 2.5 ,
    		 			style      : Const.borderLine.right,
    		 			border     : 0  ,
    		 			margin     : '0 1 0 0' ,
    		 			defaults   : {style: 'text-align:center'},
    		 			viewConfig : { loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }) },
    		 			store      : Ext.create( me.store ),
    		 			columns    : [{ text: '1차분류' , dataIndex: 'class_nm',  flex : 1  }],
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
    		 						class2 = me.down('#itemclass2').getStore()
    		 						class3 = me.down('#itemclass3').getStore(),
    		 						class4 = me.down('#itemclass4').getStore()
    		 					;

    		 					class2.loadData([],false);
    		 					class3.loadData([],false);
    		 					class4.loadData([],false);
    		 					if (record) {
    		 						me.selectRecord( record);

    		 						var param = Ext.merge({ hq_id : record.get('hq_id'), prnt_id : record.get('class_id') }, me.popup.params);
    		 						class2.load({
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
    		 			itemId     : 'itemclass2' ,
    		 			flex       : 2.5 ,
    		 			style      : Const.borderLine.left + Const.borderLine.right,
    		 			border     : 0  ,
    		 			margin     : '0 1 0 0' ,
    		 			defaults   : {style: 'text-align:center'},
    		 			viewConfig : { loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }) },
    		 			store      : Ext.create( me.store ),
    		 			columns    : [{ text: '2차분류' , dataIndex: 'class_nm',  flex : 1  }],
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
    		 						class3 = me.down('#itemclass3').getStore()
    		 						class4 = me.down('#itemclass4').getStore()
    		 					;
    		 					class3.loadData([],false);
    		 					class4.loadData([],false);
    		 					if (record) {
    		 						me.selectRecord( record);
    		 						var param = Ext.merge({ hq_id : record.get('hq_id'), prnt_id : record.get('class_id') }, me.popup.params);
    		 						class3.load({
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
    		 			itemId     : 'itemclass3' ,
    		 			flex       : 2.5 ,
    		 			style      : Const.borderLine.left + Const.borderLine.right,
    		 			border     : 0  ,
    		 			margin     : '0 1 0 0' ,
    		 			defaults   : {style: 'text-align:center'},
    		 			viewConfig : { loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }) },
    		 			store      : Ext.create( me.store ),
    		 			columns    : [{ text: '3차분류' , dataIndex: 'class_nm',  flex : 1  }],
    		 			listeners  : {
    		 				itemclick : function (dv, record, item, index, e) {
    		 					me.selectRecord( record);
    		 				},
    		 				itemdblclick: function(dataview, index, item, e) {
    		 					if ((me.popup.choice && me.popup.choice == 'free') || me.down('#itemclass4').hidden) {
    		 						me.finishAction();
    		 					}
    		 				},
    		 				selectionchange : function(grid, records ) {
    		 					var record = records[0],
    		 						lister = me.down('#itemclass4')
    		 					;
    		 					if (!lister.hidden) {
        		 					var class4 = lister.getStore();
        		 					class4.loadData([],false);
        		 					if (record) {
        		 						me.selectRecord( record);
        		 						var param = Ext.merge({ hq_id : record.get('hq_id'), prnt_id : record.get('class_id') }, me.popup.params);
        		 						class4.load({
        		 							params:{param:JSON.stringify(param)},scope: me,
        		 							callback: function(records, operation, success) {
        		 								if (!success) {
        		 								}
        		 							}
        		 						});
        		 					}
    		 					}
    		 				}
    		 			}
    		 		},{
    		 			xtype      : 'grid-panel',
    		 			itemId     : 'itemclass4' ,
    		 			hidden     :  (_global.item_class < 4),
    		 			flex       : 2.5 ,
    		 			border     : 0  ,
    		 			style      : Const.borderLine.left,
    		 			defaults   : {style: 'text-align:center'},
    		 			viewConfig : { loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }) },
    		 			store      : Ext.create( me.store ),
    		 			columns    : [{ text: '4차분류' , dataIndex: 'class_nm',  flex : 1  }],
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
    			dockedItems :
    			[
    		 		{
    		 			xtype : 'toolbar',
    		 			dock: 'top',
    		 			items:
    		 			[
    		 		 		{
    		 		 			xtype : 'button'     , text: Const.SELECT.text , iconCls: Const.SELECT.icon, scope: me, handler: me.selectAction , cls: 'button-style'
    		 		 		},{
    		 		 			xtype : 'tbfill'
    		 		 		}
    		 		 	]
    		 		},{
    		 			xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
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
    			xtype  : 'toolbar',
    			dock   : 'bottom',
    			itemId : 'finishtool' ,
    			items:
    			[
    			 	{xtype: 'textfield' , name : 'clss_desct',  height : 22,  flex  : 1 , readOnly : true , fieldCls   : 'readonlyfield' },'-',
    			 	{xtype: 'textfield' , name : 'class_id', hidden : true , readOnly : true  },
    			 	{xtype: 'button'    , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
    			 	{xtype: 'button'    , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
	 		 	]
	 		}
    	;
    	return tool;
    },


    /**
     * 조회
     */
    selectAction: function(){
        var me = this,
        	store = me.down('#itemclass1').getStore(),
    		param = Ext.merge( me.down('form').getValues(), {hq_id : _global.hq_id
    		}, me.popup.params );
        ;
        param.hq_id = _global.hq_id;
        param.prnt_id = '0' ;

		store.load({
			params:{param:JSON.stringify(param)}, scope:me,
			callback:function(records, operation, success) {
				me.down('#itemclass1').getSelectionModel().select(0);
			}
		});
    },

    selectRecord : function( record ) {
    	var me = this;
		if (record) {
			me.choiceRecord = record ;
			base = me.down('#finishtool');
			base.down('[name=clss_desct]').setValue(record.get('clss_desct'));
		}
    },
    /**
     * 확인 버튼 이벤트
     * 분류4의 선택 값이 있을 경우에만 반환
     */
    finishAction: function(){
    	var me = this,
    		panel = me.down('#itemclass4'),
    		selected = panel.getSelectionModel().getSelection()
    	;
    	if ((me.popup.choice && me.popup.choice == 'free') || panel.hidden) {
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
