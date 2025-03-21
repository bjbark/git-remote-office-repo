Ext.define('module.custom.sjflv.mtrl.isttcalc.initstay.view.InitStayListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-mtrl-initstay-lister-master',
	store		: 'module.custom.sjflv.mtrl.isttcalc.initstay.store.InitStayMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('row_type') == '3' ){
				return 'text-warn';
			}else if(record.get('row_type') == '2'){
				return 'text-blue';
			}else if(record.get('row_type') == '1'){
				return 'text-green';
			}
		}
	},

	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				pagingButton : false,
				items	: [
					'-', '->', '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' },
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' },
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }, '-' ,
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	xtype: 'rownumberer'  , width:30, text: Language.get(''	, 'No'), align : 'center'
					},{	dataIndex:	'trns_date'		, width: 80, align : 'center'	, text: Language.get('trns_date'	, '이월일자')
					},{	dataIndex:	'cstm_code'		, width: 80, align : 'center'	, text: Language.get('cstm_code'	, '거래처코드')
					},{	dataIndex:	'cstm_name'		, width: 180, align : 'left'	, text: Language.get('cstm_name'	, '거래처명'	)
					},{	dataIndex:	'invc_date'		, width: 80, align : 'center'	, text: Language.get('invc_date'	, '입고일자'	)
					},{	dataIndex:	'invc_numb'		, width: 100, align : 'left'	, text: Language.get('invc_numb'	, '입고번호'	)
					},{	dataIndex:	'line_seqn'		, width: 50, align : 'center'	, text: Language.get('line_seqn'	, '항번'	)
					},{	dataIndex:	'item_code'		, width: 80, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex:	'item_name'		, width: 230, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'istt_qntt'		, width:  70, align : 'right'	, text: Language.get('istt_qntt'	, '수량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'istt_pric'		, width:  80, align : 'right'	, text: Language.get('istt_pric'	, '단가'		), xtype: 'numericcolumn' , format: '#,##0.###'
					},{	dataIndex:	'istt_amnt'		, width:  80, align : 'right'	, text: Language.get('istt_amnt'	, '금액'		), xtype: 'numericcolumn' , format: '#,##0.###'
					},{	dataIndex:	'istt_vatx'		, width:  80, align : 'right'	, text: Language.get('istt_vatx'	, '부가세'	), xtype: 'numericcolumn' , format: '#,##0.###'
					},{	dataIndex:	'ttsm_amnt'		, width:  90, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , format: '#,##0.###'
					},{	dataIndex:	'lott_numb'		, width: 100, align : 'left'	, text: Language.get('lott_numb'	, 'Batch No')
					},{	dataIndex:	'user_memo'		, width: 180, align : 'left'	, text: Language.get('user_memo'	, '비고'		)
					},{	dataIndex:	'purc_invc_date', width: 80, align : 'center'	, text: Language.get('purc_invc_date', '발주일자'	)
					},{	dataIndex:	'purc_invc_numb', width: 100, align : 'left'	, text: Language.get('purc_invc_numb', '발주번호'	)
					}
				]
			};
		return item;
	}
});
