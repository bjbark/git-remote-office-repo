Ext.define('module.prod.plan.prodplan.view.ProdPlanLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodplan-lister2',
	store		: 'module.prod.plan.prodplan.store.ProdPlan2',
	border		: 0 ,
	columnLines : true ,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary'} ],
	plugins		: [{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig 	: { markDirty: false , loadMask : false, enableTextSelection: true },

	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					{	text : '<span class="write-button">지시확정</span>', action : 'okAction'    , cls: 'button1-style' ,hidden   : !_global.auth.auth_prod_1001 }
					, '-',
					{	text	: '식별표출력',hidden   : !_global.auth.auth_prod_1001,
						menu	: [
							{	text : '겉지', action : 'printAction'
							},{	text : '속지', action : 'printAction2'
							}
						]
					},
					{	text : '<span class="write-button" style="color:#FF0000;">확정취소</span>', action : 'cancleAction', cls: 'button-style',hidden   : !_global.auth.auth_prod_1001}, '-',
					,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action  , cls: 'button-style'	,hidden   : !_global.auth.auth_prod_1001} ,
					{ text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style'	,hidden   : !_global.auth.auth_prod_1001},
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action, button : 'part2detail' ,cls: 'button-style'},
				],
				pagingButton : true
			}
		;
		return item;
	},

	columnItem : function () {
		var me = this,
			item = {
			defaults: {style: 'text-align:center'},
			items : [
				{	xtype: 'rownumberer'  , width:50
				},{	dataIndex: 'line_stat'		, width:  65, text: Language.get('line_stat'		, '확정상태'			), xtype: 'lookupcolumn'  ,  lookupValue : [['0','대기' ], ['1', '확정', 'red']], align:'center'
				},{	dataIndex: 'prog_stat_dvcd'	, width:  60, text: Language.get('prog_stat_dvcd'	, '진행상태'			), xtype: 'lookupcolumn'  , lookupValue : resource.lookup('prog_stat_dvcd') , align:'center'
				},{	dataIndex: 'invc_numb'		, width:  90, text: Language.get('invc_numb'		, 'Invoice번호'		), align:'center', hidden : true
				},{	dataIndex: 'line_seqn'		, width:  90, text: Language.get('line_seqn'		, '순번'				), align:'center', hidden : true
				},{	dataIndex: 'cvic_code'		, width:  90, text: Language.get('cvic_code'		, '설비코드'			), align:'center', hidden : true
				},{	dataIndex: 'cvic_name'		, width: 100, text: Language.get('cvic_name'		, '설비명'			), align:'left'
				},{	dataIndex: 'acpt_numb'		, width: 130, text: Language.get('acpt_numb'		, '수주번호'			), align:'center'
				},{	dataIndex: 'acpt_seqn'		, width: 200, text: Language.get('acpt_seqn'		, '수주순번'			), align:'center', hidden : true
				},{	dataIndex: 'lott_numb'		, width:  80, text: Language.get('lott_numb'		, 'LOT번호'			), align:'center'
				},{	dataIndex: 'item_idcd'		, width:  95, text: Language.get('item_idcd'		, '품목코드'			), align:'center', hidden : true
				},{	dataIndex: 'item_code'		, width:  95, text: Language.get('item_code'		, '품목코드'			), align:'center'
				},{	dataIndex: 'item_name'		, width: 160, text: Language.get('item_name'		, '품명'				), align:'left'
				},{	dataIndex: 'item_spec'		, width: 150, text: Language.get('item_spec'		, '규격'				), align:'left'
				},{	dataIndex: 'invc_qntt'		, width:  70, text: Language.get('invc_qntt'		, '발주수량'			), align:'right' , xtype : 'numericcolumn'
				},{	dataIndex: 'deli_date'		, width:  95, text: Language.get('deli_date'		, '(협력사)납기일자'	), align:'center'
				},{	dataIndex: 'invc_date'		, width:  95, text: Language.get('offr_date'		, '발주일자'			), align:'center', hidden : true
				},{	dataIndex: 'acpt_remk_text'	, width:  90, text: Language.get('acpt_remk_text'	, '후공정'			), align:'left'
				},{	dataIndex: 'user_memo'		, width:  80, text: Language.get('user_memo'		, '발주품목비고'		), hidden : true
				},{	dataIndex: 'deli_chge_resn'	, width:  95, text: Language.get('deli_chge_resn'	, '(협력사)변경사유'	), align:'left'
				},{	dataIndex: 'mold_code'		, width:  70, text: Language.get('acpt_numb'		, '금형코드'			), align:'center'
				},{	dataIndex: 'mold_name'		, width: 150, text: Language.get('acpt_case_name'	, '금형명'			), align:'left'  , hidden : true
				},{	dataIndex: 'mtrl_bacd'		, width: 100, text: Language.get('mtrl_bacd'		, '재질코드'			), align:'center', hidden : true
				},{	dataIndex: 'mtrl_name'		, width:  75, text: Language.get('mtrl_name'		, '재질'				), align:'center'
				},{	dataIndex: 'pckg_cotr_bacd'	, width:  80, text: Language.get('pckg_cotr_bacd'	, '포장용기코드'		), align:'center', hidden : true
				},{	dataIndex: 'pckg_cotr_name'	, width: 115, text: Language.get('pckg_cotr_name'	, '포장용기'			), align:'center'
				},{	dataIndex: 'stok_used_qntt'	, width:  75, text: Language.get('stok_used_qntt'	, '재고사용'			), align:'right' , xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex: 'indn_qntt'		, width:  75, text: Language.get('indn_qntt'		, '지시수량'			), align:'right' , xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex: 'sum_indn_qntt'	, width:  75, text: Language.get('sum_indn_qntt'	, '총지시수량'		), align:'right' , xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex: 'prod_qntt'		, width:  75, text: Language.get('prod_qntt'		, '생산수량'			), align:'right' , xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex: 'pckg_bacd'		, width:  75, text: Language.get('pckg_bacd'		, '포장분류코드'		), hidden : true
				},{	dataIndex: 'pckg_qntt'		, width:  75, text: Language.get('pckg_qntt'		, '포장수량'			), hidden : true
				},{	dataIndex: 'qntt'			, width:  75, text: Language.get('qntt'				, '잔량'				), align:'right' , xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex: 'plan_strt_dttm'	, width: 125, text: Language.get('plan_strt_dttm'	, '시작예정'			), align:'center'
				},{	dataIndex: 'prod_strt_dttm'	, width: 125, text: Language.get('prod_strt_dttm'	, '시작일시'			), align:'center'
				},{	dataIndex: 'prod_endd_dttm'	, width: 125, text: Language.get('prod_endd_dttm'	, '완료(정지)일시'	), align:'center'
				},{	dataIndex: 'cstm_offr_date'	, width:  95, text: Language.get('cstm_offr_date'	, '고객발주일자'		), align:'center', hidden : true
				},{	dataIndex: 'remk_text'		, width: 185, text: Language.get('remk_text'		, '비고'				), align:'left'
				},{	dataIndex: 'crte_user_name'	, width: 80, text: Language.get('crte_user_name'	, '등록자'			), align:'left'
				}
			]
		};
		return item;
	}
});
