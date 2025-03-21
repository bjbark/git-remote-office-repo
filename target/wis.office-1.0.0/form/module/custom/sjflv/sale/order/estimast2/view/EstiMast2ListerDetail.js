Ext.define('module.custom.sjflv.sale.order.estimast2.view.EstiMast2ListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-estimast2-lister-detail',

	store: 'module.custom.sjflv.sale.order.estimast2.store.EstiMast2Detail',

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
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex:	'item_code'		, width: 120, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex:	'item_name'		, flex :  80, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, flex :  50, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'unit_idcd'		, width:  60, align : 'center'	, text: Language.get('unit_idcd'	, '단위'		)
					},{	dataIndex:	'esti_qntt'		, width:  80, align : 'right'	, text: Language.get('esti_qntt'	, '수량'		), xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0.##'
					},{	dataIndex:	'esti_pric'		, width:  80, align : 'right'	, text: Language.get('esti_pric'	, '단가'		), xtype: 'numericcolumn', format: '#,##0.##'
					},{	dataIndex:	'sply_amnt'		, width:  80, align : 'right'	, text: Language.get('sply_amnt'	, '금액'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'pack_qntt'		, width:  80, align : 'right'	, text: Language.get('pack_qntt'	, '패킹단위'	), hidden	: _global.hq_id.toUpperCase() != 'N1000SJFLV'? true : false,
					},{	dataIndex:	'acpt_numb'		, width: 100, align : 'center'	, text: Language.get('acpt_numb'	, '수주번호'	), hidden	: _global.hq_id.toUpperCase() != 'N1000SJFLV'? true : false,
					},{	dataIndex:	'user_memo'		, flex :  40, align : 'left'	, text: Language.get('user_memo'	, '비고'		)
					}
				]
			};
		return item;
	}
});
