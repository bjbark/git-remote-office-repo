Ext.define('module.custom.aone.sale.esti.estimast.view.EstiMastListerMaster2', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-estimast-lister-master2',
	store: 'module.custom.aone.sale.esti.estimast.store.EstiMastMaster2',

	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype :'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	initComponent : function() {
		var me = this;
			me.paging  = me.pagingItem(),
			me.columns = me.columnItem(),
			me.callParent()
		;
	},

	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style', itemId: 'btnInsert', hidden : false } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style', itemId: 'btnModify', hidden : false } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style', itemId: 'btnExport', hidden : false } ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style', itemId: 'btnDelete', hidden : false }
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
					{	dataIndex:	'line_seqn'		, width:  50, align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex:	'item_code'		, width:  80, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex:	'invc_numb'		, width:  80, align : 'center'	, text: Language.get('invc_numb'	, 'invc'	), hidden : true
					},{	dataIndex:	'item_name'		, width: 150, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, width: 130, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'esti_qntt'		, width:  80, align : 'right'	, text: Language.get('esti_qntt'	, '수량'		), xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0.##'
					},{	dataIndex:	'esti_pric'		, width:  80, align : 'right'	, text: Language.get('esti_pric'	, '단가'		), xtype: 'numericcolumn', format: '#,##0.##'
					},{	dataIndex:	'sply_amnt'		, width: 100, align : 'right'	, text: Language.get('sply_amnt'	, '금액'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'vatx_amnt'		, width:  80, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'deli_date2'	, width:  90, align : 'center'	, text: Language.get('deli_date2'	, '납기일자'	),
						xtype : 'datecolumn',
						editor	: {
							xtype			:'datefield',
							allowBlank		: false,
							format			: Const.DATE_FORMAT_YMD_BAR,
							submitFormat	: Const.DATE_FORMAT_YMD
						},
						renderer:function(val){
							a = Ext.util.Format.strToDate(val);
							return a;
						}
					},{	dataIndex:	'poor_cont'		, width:  90, align : 'left'	, text: Language.get('poor_cont'	, '의뢰내역'	),
					},{	dataIndex:	'remk_text'		, width:  90, align : 'left'	, text: Language.get('remk_text'	, '전달사항'	),
					}
				]
			};
		return item;
	}
});
