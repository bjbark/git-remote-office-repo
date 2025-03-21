Ext.define('module.custom.aone.sale.order.sordercofm.view.SorderCofmListerMaster2', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-sordercofm-lister-master2',

	store: 'module.custom.aone.sale.order.sordercofm.store.SorderCofmMaster2',

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
					{	text : '<span class="write-button">주문확정</span>'	, action : ''	, cls: 'button1-style'	} , '-',
					{	text : '<span class="write-button">확정취소</span>', action : ''	, cls: 'button1-style'	} , '-',
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
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex:	'item_code'		, width: 80, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex:	'item_name'		, width : 160, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, width : 130, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'invc_qntt'		, width:  80, align : 'right'	, text: Language.get('esti_qntt'	, '수량'		), xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0.##'
					},{	dataIndex:	'invc_pric'		, width:  80, align : 'right'	, text: Language.get('esti_pric'	, '단가'		), xtype: 'numericcolumn', format: '#,##0.##'
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
