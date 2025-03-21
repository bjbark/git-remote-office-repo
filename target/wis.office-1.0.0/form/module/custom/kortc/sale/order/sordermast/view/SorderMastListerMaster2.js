Ext.define('module.custom.kortc.sale.order.sordermast.view.SorderMastListerMaster2', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-sordermast-lister-master2',

	store: 'module.custom.kortc.sale.order.sordermast.store.SorderMastMaster2',

	border		: 0,
	columnLines	: true,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					{	text : '<span class="write-button">엑셀 Upload</span>', action : 'uploadAction'	, cls: 'button1-style',} , '-',
					{	text : '<span class="write-button">주문복사</span>'	, action : 'copyAction'		, cls: 'button1-style', itemId: 'btnCopy', hidden : false	} , '-',
					{	text : '<span class="write-button">Amend</span>', action : 'amendAction'	, cls: 'button1-style', itemId: 'btnAmend' , hidden : false	} , '-',
					{	text : '<span class="write-button">주문서 발행</span>', action : 'printAction'	, cls: 'button1-style'	} , '-',
					{	text : '<span class="write-button">출하지시</span>', action : 'shipAction'	, cls: 'button1-style'	} , '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style', itemId: 'btnModify' , hidden : true } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style', itemId: 'btnDelete' , hidden : true }
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
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex:	'item_idcd'		, width: 50  , align : 'center'	, text: Language.get('item_idcd'	, '품목ID'	), hidden :true,
					},{	dataIndex:	'item_code'		, width: 80, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex:	'item_name'		, width: 160, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'invc_numb'		, width: 160, align : 'left'	, text: Language.get('invc_numb'	, '품명'		), hidden :true,
					},{	dataIndex:	'item_spec'		, width: 130, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'cstm_lott_numb', width: 130, align : 'left'	, text: Language.get('cstm_lott_numb', 'LOT번호'		),hidden : false,
					},{	dataIndex:	'invc_qntt'		, width:  80, align : 'right'	, text: Language.get('invc_qntt'	, '수량'		), xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0.##'
					},{	dataIndex:	'invc_pric'		, width:  80, align : 'right'	, text: Language.get('invc_pric'	, '단가'		), xtype: 'numericcolumn', format: '#,##0.##'
					},{	dataIndex:	'sply_amnt'		, width: 100, align : 'right'	, text: Language.get('sply_amnt'	, '금액'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'vatx_amnt'		, width:  80, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'deli_date2'	, width:  90, align : 'center'	, text: Language.get('deli_date2'	, '납기일자'	),
						renderer:function(val){
							var value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
							return value;
						}
					}
				]
			};
		return item;
	}
});