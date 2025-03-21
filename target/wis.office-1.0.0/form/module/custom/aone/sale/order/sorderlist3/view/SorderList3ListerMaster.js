Ext.define('module.custom.aone.sale.order.sorderlist3.view.SorderList3ListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sorderlist3-lister-master',
	store		: 'module.custom.aone.sale.order.sorderlist3.store.SorderList3Master'	,

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
					{	text : '<span class="write-button">라벨발행</span>'	, action : 'labelAction'		, cls: 'button1-style'	},
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
					{	dataIndex: 'line_clos'		, width:  40, align : 'center'	, text: Language.get('line_clos'		, '상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'invc_numb'		, width: 100, align : 'center'	, text: Language.get('acpt_numb'		, '주문번호'	)
					},{	dataIndex: ''				, width:  150, align : 'center'	, text: Language.get(''		, '주문명'			)
					},{	dataIndex: 'item_count'		, width:  200, align : 'center'	, text: Language.get('cstm_name'		, '거래처명'	)
					},{	dataIndex: ''				, width:  90, align : 'center'	, text: Language.get(''		, '등록일자'				)
					},{	dataIndex: 'line_seqn'		, width:  40, align : 'center'	, text: Language.get('line_seqn'		, '항번'		)
					},{	dataIndex: 'item_code'		, width: 100, align : 'center'	, text: Language.get('item_code'		, '품목코드'	)
					},{	dataIndex: 'item_name'		, width: 250, align : 'left'	, text: Language.get('item_name'		, '품명'		)
					},{	dataIndex: 'item_spec'		, width: 200, align : 'left'	, text: Language.get('item_spec'		, '규격'		)
					},{	dataIndex: 'invc_qntt'		, width:  80, align : 'right'	, text: Language.get('acpt_qntt'		, '수량'		) , xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'invc_pric'		, width: 100, align : 'right'	, text: Language.get('invc_pric'		, '단가'		) , xtype: 'numericcolumn'
					},{	dataIndex: 'sply_amnt'		, width: 150, align : 'right'	, text: Language.get('sply_amnt'		, '금액'		) , xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'vatx_amnt'		, width: 100, align : 'right'	, text: Language.get('vatx_amnt'		, '부가세'		) , xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'deli_date'		, width:  90, align : 'center'	, text: Language.get('deli_date'		, '납기일자'	)
					}
				]
			}
		;
		return item;
	}
});