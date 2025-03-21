Ext.define('lookup.popup.shopcust.ShopCustPopup', { extend: 'Axt.popup.Search',
	alias   : 'widget.lookup-shopcust-popup',
	store   : 'lookup.popup.shopcust.store.ShopCustPopup',
	title   : '고객 코드 찾기',
	closable: true,
	autoShow: true,
	width   : 700,
	height  : 500,
	layout  : {
        type: 'border'
    },
	 defaultFocus : 'initfocused',
     initComponent: function(config){
        var me = this;
        me.items = [me.createForm()];
        me.callParent(arguments);
    },
    createForm: function(){
    	var  me   = this,
    		form = {
    			 xtype       : 'form-layout',
    			 region      : 'center',
    			 border      : false,
    			 dockedItems : [ me.searchForm() ],
    			 items       : [ me.createGrid() ]
    		}
    	;
    	return form;
    },
    /**
     * 검색폼
     */
     searchForm: function(){
    	var  me   = this,
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
    		 		 		 { xtype : 'searchfield' , itemId : 'initfocused', name  : 'cust_nm', fieldLabel : '코드명',    labelWidth : 59, height : 22, width : 200 },
    		 		 		 { xtype : 'tbseparator' },
    		 		 		 { xtype : 'button'      , text: Const.SELECT.text , iconCls: Const.SELECT.icon, scope: me, handler: me.selectAction },
    		 		 		 { xtype : 'tbfill'}
    		 		 	]
    		 		},
    		 	   {
    		 		xtype : 'container'  , layout: 'border', border : 0 , height: 3
    		 		}
    		 	],
    		 	 layout       : { type: 'vbox' },
    		 	 fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
    		 	 items        : []
        	}
    	;
        return form;
    },

     createGrid: function(){
        var  me = this,
        	 grid = {
        		 xtype   : 'grid-panel',
        		 header  : false,
        		 region  : 'center',
        		 viewConfig: {
        			loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
        		},
        		selModel:{ selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
        		store   : Ext.create( me.store ),
        		paging:
        		{
        			 xtype: 'grid-paging',
        			items: [
        		 		 '->',
        		 		 {xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction},
        		 		 '-',
        		 		 {xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close }
        		 	]
        		},
        		columns: [

        		 	{ dataIndex: 'cust_nm'         , width   : 120 , text : '고객명'    },
        		 	{ dataIndex: 'mmb_nm'         , width   : 120 , text : '회원명'    },
        		 	{ dataIndex: 'login_id'        , width   : 100 , text : '로그인ID'   , summaryType : 'count'   },
        		 	{ dataIndex: 'cust_sts'        , width   :  60 , text : '계정상태'  , xtype: 'lookupcolumn' , lookupValue : resource.getList('cust_sts_web').concat( resource.getList('cust_sts_out')) , align : 'center' },
        		 	{ dataIndex: 'shop_nm'         , width   : 120 , text : '쇼핑몰'    },
        		],
        		 listeners: {
        			 itemdblclick: function(dataview, index, item, e) {
        				me.finishAction();
        			},
        			 render: function(){
        				var me = this
        				;
        				new Ext.util.KeyMap({
        					 target: me.getEl(),
        					 eventName : 'keyup',
        					 binding: [{ key: Ext.EventObject.ENTER ,fn: function(key,e) { me.fireEvent('itemdblclick', me.getView() ); }}]
        				});
        			}
        		}
    		}
        ;
        return grid;
    },
    selectAction: function(){
        var  me    = this,
        	store = me.down('grid').getStore(),
        	param = Ext.merge( me.down('form').getValues(), {
        	}, me.popup.params );
        ;
        if (me.popup.apiurl && me.popup.apiurl.search ) {
        	store.getProxy().api.read = me.popup.apiurl.search ;
        }
		store.load({
			 params:{param:JSON.stringify(param)}, scope:me,
			 callback:function(records, operation, success) {
			}
		});
    },
     finishAction: function(){
    	var  me    = this,
    		 panel = me.down('grid'),
    		 selected = panel.getSelectionModel().getSelection()
    	;
        if (selected.length === 0) {
        	resource.showError( '선택 된 데이터가 없습니다.'  );
        } else {
    		me.setResponse(selected);
        }
    }
});
