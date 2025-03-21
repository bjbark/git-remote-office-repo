Ext.define('module.custom.kortc.prod.order.prodnotlist.view.ProdNotListLister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prodnotlist-lister',

	store		: 'module.custom.kortc.prod.order.prodnotlist.store.ProdNotListLister',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-prodnotlist-worker-search'}];
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [

					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: '수주일자'	, text : Language.get('' ,'수주일자'	) , width : 90  , align : 'center'
					},{	dataIndex: '수주처명'	, text : Language.get('' ,'수주처명'	) , width : 200 , align : 'left'
					},{	dataIndex: '품명'	, text : Language.get('' ,'품명'		) , width : 300 , align : 'left'
					},{ dataIndex: '납기요청일', text : Language.get('','납기요청일') , width : 90  , align : 'center'
					},{	dataIndex: '수주수량'	, text : Language.get('' ,'수주수량'	) , width : 90 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: '생산량'	, text : Language.get('','생산량'		) , width : 90 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: '불량수량'	, text : Language.get('','불량수량'	) , width : 90 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: '납품수량'	, text : Language.get('' ,'납품수량'	) , width : 90 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: '납기일'	, text : Language.get('','납기일'		) , width : 90  , align : 'center'
					},{ dataIndex: '비고'	, text : Language.get('' ,'비고'		) , flex  : 100,
					}
				]
			};
		return item;
	}
});
