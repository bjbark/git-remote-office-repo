Ext.define('module.prod.plan.rsvdorder.view.RsvdOrderListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-rsvdorder-lister-detail',

	store: 'module.prod.plan.rsvdorder.store.RsvdOrderDetail',

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
					{	text : '<span class="write-button">생산지시</span>'	, action : 'prorAction'	, cls: 'button1-style',
						hidden	: !(_global.options.prod_order_type=='수주로 생산지시'),
					} , '-',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
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
					{	dataIndex: 'line_seqn'	, width: 50 , align : 'center'	, text: Language.get('line_seqn', '항번'		)
					},{	dataIndex: 'item_code'	, width: 120, align : 'center'	, text: Language.get('item_code', '품목코드'	)
					},{	dataIndex: 'item_name'	, flex :  80, align : 'left'	, text: Language.get('item_name', '품명'		)
					},{	dataIndex: 'item_spec'	, width: 100, align : 'left'	, text: Language.get('item_spec', '규격'		)
					},{	dataIndex: 'unit_name'	, width:  60, align : 'center'	, text: Language.get('unit_name', '단위'		)
					},{	dataIndex: 'invc_qntt'	, width:  80, align : 'right'	, text: Language.get('invc_qntt', '수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'invc_pric'	, width:  80, align : 'right'	, text: Language.get('invc_pric', '단가'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex: 'sply_amnt'	, width:  80, align : 'right'	, text: Language.get('sply_amnt', '금액'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex: 'vatx_amnt'	, width:  80, align : 'right'	, text: Language.get('vatx_amnt', '부가세'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex: 'invc_amnt'	, width:  80, align : 'right'	, text: Language.get('invc_amnt', '합계금액'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex: 'deli_date'	, width:  80, align : 'center'	, text: Language.get('deli_date', '납기일자'	),
						renderer:function(val){
							var value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
							return value;
						}
					},{	dataIndex: 'pdsd_yorn'	, width:  80, align : 'center'	, text: Language.get('pdsd_yorn', '생산지시'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn')
					},{	dataIndex: 'user_memo'	, flex :  20, align : 'left'	, text: Language.get('user_memo', '비고'		)
					}
				]
			};
		return item;
	}
});
