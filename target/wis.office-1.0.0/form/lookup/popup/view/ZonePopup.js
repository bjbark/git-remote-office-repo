/**
 */
Ext.define('lookup.popup.view.ZonePopup', { extend: 'Axt.popup.Search',

    id   : 'lookup-zone-popup',
    alias: 'widget.lookup-zone-popup',
    store: 'lookup.popup.store.ZonePopup',

    title: Language.get( '' , '검수위치 정보 선택') ,
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
    	var me = this, form =
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
    	var me = this, form =
    	{
    		xtype: 'form-search',
    		bodyStyle: { padding: '0', background: 'transparent' },
    		dockedItems :[
    		 	{
    		 		xtype : 'toolbar',
    		 		dock: 'top',
    		 		items:[
    		 		 	{ xtype  : 'searchfield' , itemId : 'initfocused', name   : 'zone_nm',    fieldLabel : '검수위치명', labelWidth : 59, height : 22, width : 200 },
    		 		 	{ xtype : 'tbseparator' },
    		 		 	{ xtype : 'button'       , text: Const.SELECT.text , iconCls: Const.SELECT.icon, scope: me, handler: me.selectAction, cls: 'button-style' },
    		 		 	{ xtype : 'tbfill'      }
        			]
    		 	},{
    		 		xtype : 'container'  , layout: 'border', border : 0 , height: 3
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
        var me = this,
        	grid = {
        		xtype: 'grid-panel',
        		header : false,
        		region: 'center',
        		viewConfig: {
        			loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
        		},
        		selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
        		store: Ext.create( me.store ),
        		paging:
        		{
        			xtype: 'grid-paging',
        			items:[
        		 		'->' ,
        		 		{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
        		 		{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
        		 	]
        		},
        		columns:[
        		 	{ text: Language.get('zone_nm' , '검수위치명'   ) , dataIndex: 'zone_nm', width: 80 },
             		{ text: Language.get('zone_cd' , '검수위치코드' ) , dataIndex: 'zone_cd',   flex  : 1  }

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
    			 if(records){
						me.down('grid').getSelectionModel().select(0);
				}
    		}
    	});
    },

    /**
     * 선택
     */
    finishAction: function(){
    	var me    = this,
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
    					stor_grp : eachrow.get('stor_grp'),
    					emp_id  : eachrow.get('emp_id' )
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
