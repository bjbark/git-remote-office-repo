Ext.define('module.custom.kortc.prod.rsvdorder.view.RsvdOrderListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-rsvdorder-lister-detail',

	store: 'module.custom.kortc.prod.rsvdorder.store.RsvdOrderDetail',

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
//					{	text : '<span class="write-button">Amend</span>', action : 'amendAction'	, cls: 'button1-style'	} , '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' } ,
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
					{	dataIndex:	'line_seqn'		, text: Language.get('line_seqn'		, '항번'			), width: 50 , align : 'center'
					},{	dataIndex:	'item_code'		, text: Language.get('item_code'		, '품목코드'		), width: 120, align : 'center'
					},{	dataIndex:	'item_name'		, text: Language.get('item_name'		, '품명'			), flex :  1 , align : 'left'	, minWidth: 340
					},{	dataIndex:	'item_spec'		, text: Language.get('item_spec'		, '규격'			), width: 160, align : 'left'
					},{	dataIndex:	'invc_qntt'		, text: Language.get('invc_qntt'		, '수량'			), width:  80, align : 'right'	, xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0.##'
					},{	dataIndex:	'deli_date2'	, text: Language.get('deli_date'		, '납기일자'		), width: 100, align : 'center'
					},{	dataIndex:	'cstm_lott_numb', text: Language.get('cstm_lott_numb'	, 'LOT번호'		), width: 160, align : 'left'
					}
				]
			};
		return item;
	}
});
