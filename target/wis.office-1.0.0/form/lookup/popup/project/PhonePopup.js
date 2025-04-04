/**
 */
Ext.define('lookup.popup.project.PhonePopup', { extend: 'Axt.popup.Search',


	alias: 'widget.lookup-phone-popup',
	store: 'lookup.popup.project.store.PhonePopup',
    title: '콜센터 선택',
    closable: true,
    autoShow: true,
    width: 700,
    height: 500,
    layout: {
        type: 'border'
    },
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
    initComponent: function(config){
        var me = this;
        me.items = [me.createForm()];
        me.callParent(arguments);
    },
    /**
     * 화면폼
     */
    createForm: function(){
    	var me = this, form =
    	{
    		xtype : 'form-layout',
    		region : 'center',
    		border:false,
    		dockedItems : [ me.searchForm() ] ,
    		items : [ me.createGrid() ]
    	};
    	return form;
    },
    /**
     * 검색폼
     */
    searchForm: function(){
    	var me = this, form =
    	{
    		xtype: 'form-search',
    		bodyStyle: { padding: '0', background: 'transparent' },
    		dockedItems :
    		[
    		 	{
    		 		xtype : 'toolbar',
    		 		dock  : 'top',
    		 		items :
    		 		[
    		 		 	{
    		 		 		xtype      : 'searchfield',
    		 		 		itemId     : 'initfocused',
    		 				name       : 'phone_nm',
    		 				fieldLabel : '콜센터',
    		 				labelWidth : 59, height : 22, width : 200 , labelAlign : 'right'
    		 		 	},{
    		 		 		xtype : 'button'     , text: Const.SELECT.text , iconCls: Const.SELECT.icon, scope: me, handler: me.selectAction, cls: 'button-style'
    		 		 	}
        			]
    		 	},{
    		 		xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
    		 	}
    		],
    		layout: { type: 'vbox' },
        	fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
        	items :	[]
        };
        return form;
    },
    /**
     * 리스트
     */
    createGrid: function(){
        var me   = this ,
        	grid = {
        		xtype  : 'grid-panel',
        		header : false,
        		region : 'center',
        		viewConfig: {
        			loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
        		},
        		selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
        		store   : Ext.create( me.store ),
        		paging  : {
        			xtype: 'grid-paging',
        			items: [
        		 		'->' ,
        		 		{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
        		 		{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
        		 	]
        		},
        		columns: [
        		 	{ text : '콜센터'  , dataIndex: 'phone_nm'  , width: 150 } ,
        		 	{ text : '메모사항'  , dataIndex: 'user_memo' , flex: 1 },
        		 	{ text : '식별코드'  , dataIndex: 'call_cntr_id'  , width: 150 }
        		],
        		listeners: {
        			itemdblclick: function(dataview, index, item, e) {
                		me.finishAction();
                	},
	   			 	render: function(){
                		var me = this
                		;
                		new Ext.util.KeyMap({
                			target		: me.getEl(),
                			eventName	: 'keyup',
                			binding		: [
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
        ;
        return grid;
    },

    /**
     * 조회
     */
    selectAction: function(){
    	var me    = this,
    		store = me.down('grid').getStore(),
    		param = Ext.merge( me.down('form').getValues(), {
    		}, me.popup.params );
    	;
        if (me.popup.apiurl && me.popup.apiurl.search ) {
        	store.getProxy().api.read = me.popup.apiurl.search ;
        }
        store.load({
        	params   : {param:JSON.stringify(param)},
        	scope    : me,
        	callback : function(records, operation, success) {
        		if (me.popup.values && me.popup.values.barcode) {
        			delete me.popup.values.barcode ;
        		}
        	}
        });
    },

    /**
     * 확인 버튼 이벤트
     */
     finishAction: function(){
    	var  me    = this,
    		 panel    = me.down('grid'),
    		 selects = panel.getSelectionModel().getSelection(),
    		 request = []
    	;
        if (selects.length === 0) {
        	resource.showError( '선택 된 데이터가 없습니다.'  );
        } else {
        	if (me.popup.apiurl && me.popup.apiurl.master) {
        		Ext.each( selects , function( eachrow ){
        			request.push({
        				corp_id : eachrow.get('corp_id'),
        				stor_gp : eachrow.get('stor_gp'),
        				stor_id : eachrow.get('stor_id')
        			});
        		});
        		var store = Ext.create( me.store  );
        			param = Ext.merge( me.popup.params, {
        				records : request
        			});
	           		store.getProxy().api.read = me.popup.apiurl.master ;
	           		store.load({
	           			params   : {param:JSON.stringify(param)},
	           			scope    : me,
	           			callback : function(records, operation, success) {
	           				if (success) {
	           					me.setResponse(records);
	           				}
	        			}
	           		});
        	} else {
        		me.setResponse(selects);
        	}
        }
    }
});
