Ext.define('module.sale.sale.salelist4.view.SaleList4Lister3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salelist4-lister3',
	store		: 'module.sale.sale.salelist4.store.SaleList4Lister3',
	border		: 0 ,
	columnLines : true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary'} ],
	plugins		: [{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],

	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action, button : 'part2detail' ,cls: 'button-style'},
				],
				pagingButton : false
			}
		;
		return item;
	},

	columnItem : function () {
		var me = this,
			item = {
			defaults: {style: 'text-align:center'},
			items : [
				{	dataIndex: 'ranking'		, width:  40, text: Language.get('invc_date',	'순위'	), align : 'center'
				},{	dataIndex: 'cstm_code'		, width:  90, text: Language.get('cstm_code',	'납품처코드'), align : 'center'
				},{	dataIndex: 'cstm_name'		, width: 200, text: Language.get('cstm_name',	'납품처명'	), align : 'left'
				},{	dataIndex: 'ttsm_amnt'		, width: 130, text: Language.get('ttsm_amnt',	'매출액'	), xtype : 'numericcolumn', summaryType: 'sum', align : 'right'
				},{	dataIndex: 'rate'		, width: 100, text: Language.get('',		'점유율'	), align : 'right', xtype : 'numericcolumn'
				}
			]
		};
		return item;
	}
});
