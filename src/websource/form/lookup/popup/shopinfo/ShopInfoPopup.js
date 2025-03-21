Ext.define('lookup.popup.shopinfo.ShopInfoPopup', { extend: 'Axt.popup.Search',

	alias: 'widget.lookup-shopinfo-popup',

    store: 'lookup.popup.shopinfo.store.ShopInfoPopup',
    title: Language.get( 'shop_info' , '쇼핑몰 선택') ,
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

   		me.selectAction();

    },
    /**
     * 화면폼
     */
    createForm: function(){
    	var me = this, form = //Ext.create('com.common.form.Layout',
    	{
    		xtype : 'form-layout',
    		region : 'center',
    		border:false,
    		dockedItems : [ me.searchForm() ] , items : [ me.createGrid() ]
    	};
    	return form;
    },
    /**
     * 검색폼
     */
    searchForm: function(){
    	var me = this, form = //Ext.create( 'com.common.form.Search',
    	{
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
    		 		 		xtype  : 'searchfield',
    		 		 		itemId : 'initfocused',
    		 				name   : 'shop_nm',
    		 				fieldLabel : '쇼핑몰명',
    		 				labelWidth : 59, height : 22, width : 200
    		 		 	},{
    		 		 		xtype : 'tbseparator'
    		 		 	},{
    		 		 		xtype : 'button'     , text: Const.SELECT.text , iconCls: Const.SELECT.icon, scope: me, handler: me.selectAction
    		 		 	},{
    		 		 		xtype : 'tbfill'
    		 		 	}
        			]
    		 	},{
    		 		xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
    		 	}
    		],
    		layout: { type: 'vbox' }, //, align: 'stretch'  // Child items are stretched to full width
        	fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
        	items :	[] // 기타 검색 조건이 필요한 경우
        };
        return form;
    },
    /**
     * 리스트
     * @return {Ext.grid.Panel} 리스트 그리드
     */
    createGrid: function(){
        var me = this, grid = //Ext.create('com.common.grid.Panel',//{
        {
        	xtype: 'grid-panel',
        	header : false,
        	region: 'center',
        	viewConfig: {
        		loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
        	},
        	selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
            store: Ext.create( me.store ),

            columns:[
             	{ text: Language.get('shop_nm' , '쇼핑몰'   )	, dataIndex: 'shop_nm', width: 130 } ,
             	{ text: Language.get('shop_cd' , '도메인'   )	, dataIndex: 'shop_cd', width: 200 } ,

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
        };
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
//    			me.down('grid').getSelectionModel().select(0);
        		if (me.popup.values && me.popup.values.barcode) {
        			delete me.popup.values.barcode ;
        		}
        	}
        });
    },


    /**
     * 확인 버튼 이벤트
     * 분류4의 선택 값이 있을 경우에만 반환
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
        				shop_gp : eachrow.get('shop_gp'),
                        shop_id : eachrow.get('shop_id'),
                        shop_nm : eachrow.get('shop_nm')
        			});
        		});
        		var store = Ext.create( me.store );
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
