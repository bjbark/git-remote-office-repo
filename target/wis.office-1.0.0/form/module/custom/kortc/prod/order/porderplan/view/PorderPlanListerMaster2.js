Ext.define('module.custom.kortc.prod.order.porderplan.view.PorderPlanListerMaster2', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-porderplan-lister-master2',

	store: 'module.custom.kortc.prod.order.porderplan.store.PorderPlanMaster2',

	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	viewConfig: {
		markDirty: false,
		loadMask : false,
		enableTextSelection: true
	},
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
					{	dataIndex:	'line_seqn'		, text: Language.get('line_seqn'		, '항번'			), width :  50, align : 'center'
					},{	dataIndex:	'item_name'		, text: Language.get('item_name'		, '품명'			), width : 150, align : 'left'
					},{	dataIndex:	'item_spec'		, text: Language.get('item_spec'		, '규격'			), width : 100, align : 'left'
					},{	dataIndex:	''		, text: Language.get(''	, '차종'			), width : 100, align : 'left'
					},{	dataIndex:	'modl_name'		, text: Language.get('modl_name'		, '모델명'		), width : 120, align : 'left'
					},{	dataIndex:	'invc_qntt'		, text: Language.get('invc_qntt'		, '수주수량'		), width :  75, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'stok_asgn_qntt', text: Language.get('stok_asgn_qntt'	, '재고사용량'	), width :  75, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0.##'
					},{	dataIndex:	'need_qntt'		, text: Language.get('need_qntt'		, '생산필요량'	), width :  75, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'totl_indn_qntt', text: Language.get('totl_indn_qntt'	, '지시총량'		), width :  75, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'pror_remn_qntt', text: Language.get('pror_remn_qntt'	, '지시잔량'		), width :  75, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					}
				]
			};
		return item;
	}
});
