Ext.define('module.custom.aone.sale.order.sorderosttview.view.SorderOsttViewListerMaster1', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-sorderosttview-lister-master1',

	store: 'module.custom.aone.sale.order.sorderosttview.store.SorderOsttViewMaster1',

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
					{	dataIndex:	'cstm_name'		, width: 200 , align : 'center'	, text: Language.get(''	, '거래처명'		)
					},{	dataIndex:	'ostt_qntt'		, width: 100 , align : 'right'	, text: Language.get(''	, '출고건수'		),xtype:'numericcolumn'
					},{	dataIndex:	'invc_amnt'		, width: 150 , align : 'right'	, text: Language.get(''	, '출고금액'		),xtype:'numericcolumn'
					},{	dataIndex:	'drtr_name'		, width: 100 , align : 'center'	, text: Language.get(''	, '영업담당'		)
					}
				]
			};
		return item;
	}
});
