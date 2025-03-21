Ext.define('module.custom.kortc.sale.order.sorderosttview.view.SorderOsttViewListerMaster2', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-sorderosttview-lister-master2',

	store: 'module.custom.kortc.sale.order.sorderosttview.store.SorderOsttViewMaster2',

	border		: 0 ,
	columnLines	: true ,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
				],
				pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'dlvy_date'			, width:  80 , align : 'right'	, text: Language.get(''	, '월'		)
					},{	dataIndex:	'ostt_qntt'			, width:  80 , align : 'right'	, text: Language.get(''	, '출고건수'		),xtype:'numericcolumn'
					},{	dataIndex:	'invc_amnt'			, width: 100 , align : 'right'	, text: Language.get(''	, '출고금액'		),xtype:'numericcolumn'
					}
				]
			};
		return item;
	}
});
