/**
 */
Ext.define('lookup.popup.itemzone.ItemZonePopup', { extend: 'Axt.popup.Search',
    alias: 'widget.lookup-itemzone-popup',
    id: 'lookup-itemzone-popup',
	store   : 'lookup.popup.itemzone.store.ItemZonePopup',
	requires:
	[
	 	'Axt.form.Layout',
	 	'Axt.form.Search',
	 	'Axt.grid.Panel'
	],
    title: '검수 위치 정보',
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
    	var me = this, form =
    	{
    		xtype       : 'form-layout',
    		region      : 'center',
    		border      : false,
    		dockedItems : [ me.searchForm() ],
    		items       : [ me.createGrid() ]
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
    		 		 	{ xtype : 'searchfield' , itemId : 'initfocused', name  : 'bas_nm', fieldLabel : '코드명',    labelWidth : 59, height : 22, width : 200 },
    		 		 	{ xtype : 'tbseparator' },
    		 		 	{ xtype : 'button'      , text: Const.SELECT.text , iconCls: Const.SELECT.icon, scope: me, handler: me.selectAction , cls: 'button-style'},
    		 		 	{ xtype : 'tbfill'}
    		 		]
    			},{
    				xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
    		 	}
    		],
    		layout       : { type: 'vbox' },
    		fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
    		items        : [] // 기타 검색 조건이 필요한 경우
        };
    	return form;
    },

    /**
     * 리스트
     * @return {Ext.grid.Panel} 리스트 그리드
     */
    createGrid: function(){
    	var me = this, grid =
    	{
    		xtype   : 'grid-panel',
    		header  : false,
    		region  : 'center',
    		viewConfig: {
    			loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
    		},
    		selModel:{ selType: 'checkboxmodel', mode : 'SINGLE'  },
    		store   : Ext.create( me.store ),
    		paging:
    		{
    			xtype: 'grid-paging',
    			items:
    			[
    			 	'->',
    			 	{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},
    			 	'-',
    			 	{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
        		]
    		},
    		columns:
    		[
     		 	{   text : Language.get( '' , 'id'  ),       dataIndex: 'zone_id',  hidden : true },
    		 	{   text : Language.get( '' , '코드'  ),      dataIndex: 'zone_cd',  width: 100 },
    		 	{   text : Language.get( '' , '검수위치명'  ), dataIndex: 'zone_nm',   width: 100 },
    		 	{	text : Language.get( '' , '메모사항'),      dataIndex: 'user_memo', flex  : 200   },
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
    	};
    	return grid;
    },
    /**
     * 조회
     */
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
    /**
     * 확인 버튼 이벤트
     */
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
