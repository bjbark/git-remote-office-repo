Ext.define('module.custom.dhtec.sale.sale.saleplanlist.view.SalePlanListListerMaster0', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-saleplanlist-lister-master0',
	store		: 'module.custom.dhtec.sale.sale.saleplanlist.store.SalePlanListMaster0'	,

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,
	initComponent: function () {
		var me = this;
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
					{	dataIndex : 'invc_numb'	, text : Language.get('acpt_numb'	,'구분'		), width: 250, align : 'center'
					},{	text: Language.get(''	,'당월년간계획(A)'		), dataIndex : ''	, align : 'center',
						columns: [
							{	dataIndex: ''		, text: Language.get(''		, '계획_수량'		) , width:  100, xtype : 'numericcolumn', style: 'text-align:center; padding-left : 9px;', align:'right'
							},{	dataIndex: ''		, text: Language.get(''		, '계획_금액'		) , width:  100, xtype : 'numericcolumn', style: 'text-align:center; padding-left : 9px;', align:'right'
							}
						]
					},{	text: Language.get(''	,'당월실적(B)'		), dataIndex : ''	, align : 'center',
						columns: [
							{	dataIndex: ''		, text: Language.get(''		, '실적_수량'		) , width:  100, xtype : 'numericcolumn', style: 'text-align:center; padding-left : 9px;', align:'right'
							},{	dataIndex: ''		, text: Language.get(''		, '실적_금액'		) , width:  100, xtype : 'numericcolumn', style: 'text-align:center; padding-left : 9px;', align:'right'
							}
						]
					},{	text: Language.get(''	,'차이(C=B-A)'		), dataIndex : ''	, align : 'center',
						columns: [
							{	dataIndex: ''		, text: Language.get(''		, '차이_수량'		) , width:  100, xtype : 'numericcolumn', style: 'text-align:center; padding-left : 9px;', align:'right'
							},{	dataIndex: ''		, text: Language.get(''		, '차이_금액'		) , width:  100, xtype : 'numericcolumn', style: 'text-align:center; padding-left : 9px;', align:'right'
							}
						]
					},{	text: Language.get(''	,'달성율(%)'		), dataIndex : ''	, align : 'center',
						columns: [
							{	dataIndex: ''		, text: Language.get(''		, '달성율_수량'	) , width:  100, xtype : 'numericcolumn', style: 'text-align:center; padding-left : 9px;', align:'right'
							},{	dataIndex: ''		, text: Language.get(''		, '달성율_금액'	) , width:  100, xtype : 'numericcolumn', style: 'text-align:center; padding-left : 9px;', align:'right'
							}
						]
					}
				]
			}
		;
		return item;
	}
});