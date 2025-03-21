Ext.define('module.prod.plan.plananallist.view.PlanAnalListLister1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-plananallist-lister1',
	store		: 'module.prod.plan.plananallist.store.PlanAnalList1',
	width		: 450,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false , enableTextSelection: true },

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-' ,
					{text : '일정보기'	, iconCls: 'icon-chart',     action : 'changeAction' , cls: 'button-style'} , '-' ,
					{text : '생산계획'	, iconCls: Const.MODIFY.icon,action : 'onePlanAction', cls: 'button-style'} , '-' ,
					{text : Const.EXPORT.text	, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action	, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item =
				{	defaults: {style: 'text-align:center'},
					items : [
						{	dataIndex: 'line_seqn'		, width:  40, text: Language.get('line_seqn'		,	'번호'		) , align:'center'
						},{	dataIndex: 'cstm_lott_numb'	, width: 100, text: Language.get('cstm_lott_numb'	,	'LOT 번호'	) , align:'center'
						},{	dataIndex: 'cstm_name'		, width:  80, text: Language.get('cstm_name'		,	'거래처명'	) , align:'left'
						},{	dataIndex: 'item_code'		, width: 100, text: Language.get('item_code'		,	'품목코드'	) , align:'center'
						},{	dataIndex: 'item_name'		, width: 160, text: Language.get('item_name'		,	'품명'		) , align:'left'
						},{	dataIndex: 'item_spec'		, width: 150, text: Language.get('item_spec'		,	'규격'		) , align:'left'
						},{	dataIndex: 'invc_qntt'		, width:  80, text: Language.get('invc_qntt'		,	'발주수량'	) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
						},{	dataIndex: 'qntt'			, width:  80, text: Language.get('qntt'				,	'미납수량'	) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum'
						},{	dataIndex: 'deli_date'		, width:  80, text: Language.get('deli_date'		,	'협력사납기'	) , align:'center'
						},{	dataIndex: 'cstm_deli_date'	, width:  80, text: Language.get('cstm_deli_date'	,	'원납기'		) , align:'center'
						},{	dataIndex: 'invc_date'		, width:  80, text: Language.get('offr_date'		,	'발주일자'	) , align:'center'
						},{	dataIndex: 'drtr_name'		, width:  80, text: Language.get('drtr_name'		,	'담당자'		) , align:'left'
						},{	dataIndex: 'line_stat'		, width:  60, text: Language.get('line_stat'		,	'상태'		) , xtype: 'lookupcolumn' , lookupValue : resource.lookup('line_stat'), align:'center'
						},{	dataIndex: 'remk_text'		, width:  80, text: Language.get('remk_text'		,	'후공정'		) , align:'left'
						},{	dataIndex: 'deli_chge_resn'	, width:  80, text: Language.get('deli_chge_resn'	,	'납기변동사유'	) , align:'left'
						},{	dataIndex: 'invc_pric'		, width:  80, text: Language.get('invc_pric'		,	'단가'		) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum'
						},{	dataIndex: 'invc_amnt'		, width:  80, text: Language.get('invc_amnt'		,	'금액'		) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum'
						},{	dataIndex: 'invc_numb'		, width: 150, text: Language.get('pdsd_numb'		,	'생산계획번호'	) , align:'center'
						},{	dataIndex: 'stok_used_qntt'	, width:  80, text: Language.get('stok_used_qntt'	,	'재고사용'	) , align:'right' , xtype : 'numericcolumn' , summaryType : 'sum',hidden : true
						},{	dataIndex: 'plan_qntt'		, width:  80, text: Language.get('plan_qntt'		,	'계획수량'	) , align:'right' , xtype : 'numericcolumn' , summaryType : 'sum',hidden : true
						},{	dataIndex: 'plan_date'		, width:  80, text: Language.get('plan_date'		,	'시작일시'	) , align:'center',hidden : true
						},{	dataIndex: 'cmpl_schd_date'	, width:  80, text: Language.get('cmpl_schd_date'	,	'완료일시'	) , align:'center',hidden : true
						}
					]
				};
		return item;
	}
});