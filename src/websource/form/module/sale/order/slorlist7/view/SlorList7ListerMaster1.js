Ext.define('module.sale.order.slorlist7.view.SlorList7ListerMaster1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-slorlist7-lister-master1',
	store		: 'module.sale.order.slorlist7.store.SlorList7Master1'	,

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,
	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-slorlist7-worker-search'}];
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: '수주일자'	, text : Language.get('' ,'수주일자'	) , width : 90  , align : 'center'
					},{	dataIndex: '수주처명'	, text : Language.get('' ,'수주처명'	) , width : 200 , align : 'left'
					},{	dataIndex: '품명'	, text : Language.get('' ,'품명'		) , width : 300 , align : 'left'
					},{	dataIndex: '수주수량'	, text : Language.get('' ,'수주수량'	) , width : 130 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: '단가'	, text : Language.get('','단가'		) , width : 100 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: '공급가액'	, text : Language.get('','공급가액'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: '납기요청일', text : Language.get('','납기요청일') , width : 90  , align : 'center'
					},{ dataIndex: 'pono'	, text : Language.get('','PONo'		) , width : 130
					},{ dataIndex: '납기일'	, text : Language.get('','납기일'		) , width : 90  , align : 'center'
					},{ dataIndex: '지연일'	, text : Language.get('' ,'지연일'	) , width : 60 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: '비고'	, text : Language.get('' ,'비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});