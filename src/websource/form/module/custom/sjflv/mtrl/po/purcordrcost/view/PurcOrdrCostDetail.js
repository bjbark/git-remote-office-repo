Ext.define('module.custom.sjflv.mtrl.po.purcordrcost.view.PurcOrdrCostDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcordrcost-detail',
	store		: 'module.custom.sjflv.mtrl.po.purcordrcost.store.PurcOrdrCostDetail',

	width		: 515,
	minWidth	: 200,
	split		: true,
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
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
				items	: [

					'-', '->', '-',
					{	text : '<span class="write-button">정산표 발행</span>', action : 'printAction'  , cls: 'button1-style'},
					{	text : '<span class="write-button">원가 정산</span>', action : 'costAction'  , cls: 'button1-style'},
					{	text : '<span class="write-button">원가 정산 취소</span>', action : 'costcancelAction'  , cls: 'button1-style'},
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style',hidden : true },
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style',hidden : true } , '-' ,
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
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex:	'item_code'		, width: 80, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex:	'item_name'		, width: 230, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, width: 180, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'	, '단위'		)
					},{	dataIndex:	'istt_qntt'		, width:  60, align : 'right'	, text: Language.get('reqt_qntt'	, '수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'istt_pric'		, width:  90, align : 'right'	, text: Language.get('reqt_pric'	, '단가'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'istt_amnt'		, width: 120, align : 'right'	, text: Language.get('reqt_amnt'	, '금액'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'sett_pric'		, width: 120, align : 'right'	, text: Language.get('reqt_amnt'	, '원화단가'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'sett_amnt'		, width: 120, align : 'right'	, text: Language.get('reqt_amnt'	, '부가세제외'	), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'offr_numb'		, width: 120, align : 'center'	, text: Language.get('offr_numb'	, '발주번호'	)
					},{	dataIndex:	'offr_date'		, width: 90, align : 'center'	, text: Language.get('offr_date'	, '발주일자'	)
					},{	dataIndex:	'user_memo'		, flex :  20, align : 'left'	, text: Language.get('user_memo'	, '비고'		)
					}
				]
			};
		return item;
	}
});
