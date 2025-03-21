Ext.define('module.prod.plan.prodplan.view.ProdPlanLister1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prodplan-lister1',
	store		: 'module.prod.plan.prodplan.store.ProdPlan1',
	width		: 450,
	minWidth	: 200,
	split		: true,
	pagging		: false,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary'}],
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
					{text : '<span class="write-button">일정보기</span>'	, iconCls: 'icon-chart',     action : 'changeAction' , cls: 'button-style',hidden   : !_global.auth.auth_prod_1001} , '-' ,
					{text : '<span class="write-button">생산계획</span>'	, iconCls: Const.MODIFY.icon,action : 'onePlanAction', cls: 'button-style',hidden   : !_global.auth.auth_prod_1001} , '-' ,
					{text : Const.EXPORT.text	, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action	, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item =
				{	defaults: {style: 'text-align:center' , align : 'center'},
					items : [
						{	xtype: 'rownumberer'  , width:50
						},{	dataIndex: 'crte_dttm'		, width:  80, text: Language.get('crte_dttm'		,	'생성일자'			)
						},{	dataIndex: 'updt_dttm'		, width:  80, text: Language.get('updt_dttm'		,	'수정일자'			)
						},{	dataIndex: 'invc_numb'		, width: 120, text: Language.get('acpt_numb'		,	'수주번호'			)
						},{	dataIndex: 'cstm_lott_numb'	, width:  80, text: Language.get('cstm_lott_numb'	,	'LOT 번호'			)
						},{	dataIndex: 'cstm_name'		, width:  80, text: Language.get('cstm_name'		,	'거래처명'			) , align: 'left', hidden : true
						},{	dataIndex: 'item_code'		, width: 100, text: Language.get('item_code'		,	'품목코드'			)
						},{	dataIndex: 'item_name'		, width: 250, text: Language.get('item_name'		,	'품명'				) , align: 'left'
						},{	dataIndex: 'item_spec'		, width: 150, text: Language.get('item_spec'		,	'규격'				) , align: 'left'
						},{	dataIndex: 'invc_qntt'		, width:  80, text: Language.get('invc_qntt'		,	'발주수량'			) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
						},{	dataIndex: 'sum_indn_qntt'	, width:  80, text: Language.get('sum_indn_qntt'	,	'총지시수량'			) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
						},{	dataIndex: 'sum_indn_etc'	, width:  80, text: Language.get('sum_indn_etc'		,	'총지시잔량'			) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
						},{	dataIndex: 'sum_prod_qntt'	, width:  80, text: Language.get('sum_prod_qntt'	,	'총생산수량'			) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
						},{	dataIndex: 'sum_prod_etc'	, width:  80, text: Language.get('sum_prod_etc'		,	'총생산잔량'			) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
						},{	dataIndex: 'qntt'			, width:  80, text: Language.get('qntt'				,	'미납수량'			) , xtype: 'numericcolumn', summaryType: 'sum', align : 'right', hidden : true
						},{	dataIndex: 'deli_date'		, width:  95, text: Language.get('deli_date'		,	'(협력사)납기일자'	)
						},{	dataIndex: 'cstm_deli_date'	, width:  80, text: Language.get('cstm_deli_date'	,	'납기일자'			) , hidden : true
						},{	dataIndex: 'cstm_offr_date'	, width:  80, text: Language.get('cstm_offr_date'	,	'발주일자'			) , hidden : true
						},{	dataIndex: 'cstm_drtr_name'	, width:  80, text: Language.get('cstm_drtr_name'	,	'담당자'				) , align: 'left'  , hidden : true
						},{	dataIndex: 'line_stat'		, width:  60, text: Language.get('line_stat'		,	'상태'				) , xtype: 'lookupcolumn'  , lookupValue : resource.lookup('line_stat'), align:'center', hidden : true
						},{	dataIndex: 'remk_text'		, width: 130, text: Language.get('remk_text'		,	'후공정'				) , align: 'left'
						},{	dataIndex: 'user_memo'		, width:  80, text: Language.get('user_memo'		,	'발주품목비고'		)
						},{	dataIndex: 'deli_chge_resn'	, width: 270, text: Language.get('deli_chge_resn'	,	'(협력사)변경사유'	) , align: 'left'
						},{	dataIndex: 'invc_pric'		, width:  80, text: Language.get('invc_pric'		,	'단가'				) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum', hidden : true
						},{	dataIndex: 'sply_amnt'		, width:  80, text: Language.get('sply_amnt'		,	'금액'				) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum', hidden : true
						},{	dataIndex: 'stok_used_qntt'	, width:  80, text: Language.get('stok_used_qntt'	,	'재고사용'			) , align: 'right' , xtype : 'numericcolumn' , summaryType : 'sum',hidden : true
						},{	dataIndex: 'plan_qntt'		, width:  80, text: Language.get('plan_qntt'		,	'계획수량'			) , align: 'right' , xtype : 'numericcolumn' , summaryType : 'sum',hidden : true
						},{	dataIndex: 'plan_date'		, width:  80, text: Language.get('plan_date'		,	'시작일시'			) , hidden : true
						},{	dataIndex: 'cmpl_schd_date'	, width:  80, text: Language.get('cmpl_schd_date'	,	'완료일시'			) , hidden : true
						}
					]
				};
		return item;
	}
});