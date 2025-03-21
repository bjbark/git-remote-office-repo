Ext.define('module.mtrl.po.purctrstwork.view.PurcTrstWorkListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purctrstwork-lister-detail',
	store		: 'module.mtrl.po.purctrstwork.store.PurcTrstWorkDetail',

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
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' },
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
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
					},{	dataIndex:	'item_name'		, width: 250, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, width: 200, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'	, '단위'		)
					},{	dataIndex:	'usge_dvcd'		, width: 100, align : 'center'	, text: Language.get('usge_dvcd'	, '용도'		), xtype: 'lookupcolumn' , lookupValue : resource.lookup('usge_dvcd'), hidden: _global.hqof_idcd.toUpperCase()== 'N1000A-ONE',
					},{	dataIndex:	'reqt_qntt'		, width:  60, align : 'right'	, text: Language.get('reqt_qntt'	, '수량'		), xtype: 'numericcolumn', summaryType: 'sum', format		: '#,##0.###'
					},{	dataIndex:	'reqt_pric'		, width:  90, align : 'right'	, text: Language.get('reqt_pric'	, '단가'		), xtype: 'numericcolumn', format		: '#,##0.##',
					},{	dataIndex:	'reqt_amnt'		, width: 120, align : 'right'	, text: Language.get('reqt_amnt'	, '금액'		), xtype: 'numericcolumn', summaryType: 'sum' , format		: '#,##0.##',
					},{	dataIndex:	'offr_numb'		, width: 80, align : 'center'	, text: Language.get('offr_numb'	, '발주번호'	)
					},{	dataIndex:	'user_memo'		, flex :  20, align : 'left'	, text: Language.get('user_memo'	, '비고'		)
					}
				]
			};
		return item;
	}
});
