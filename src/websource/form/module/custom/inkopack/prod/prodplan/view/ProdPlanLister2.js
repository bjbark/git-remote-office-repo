Ext.define('module.custom.inkopack.prod.prodplan.view.ProdPlanLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodplan-lister2',
	store		: 'module.custom.inkopack.prod.prodplan.store.ProdPlan2',
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
					{	text : '<span class="write-button">지시확정</span>', action : 'okAction'    , cls: 'button1-style'	}, '-',
					{	text : '<span class="write-button">확정취소</span>', action : 'cancleAction', cls: 'button1-style'	}, '-',
					,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action  , cls: 'button-style'	} ,
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action, button : 'part2detail' ,cls: 'button-style'},
					{ text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style'	},
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
				{	dataIndex: 'line_clos'		, width:  45, text: Language.get('line_clos'		, '상태'			), align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_clos')
				},{	dataIndex: 'line_stat'		, width:  45, text: Language.get('line_stat'		, '확정상태'		), xtype: 'lookupcolumn'  ,  lookupValue : [['0','대기' ], ['1', '확정', 'red']], align:'center'
				},{	dataIndex: 'prog_stat_dvcd'	, width:  80, text: Language.get('prog_stat'		, '진행상태'		), xtype: 'lookupcolumn'  , lookupValue : resource.lookup('prog_stat_dvcd') , align:'center'
				},{	dataIndex: 'invc_numb'		, width:  90, text: Language.get('invc_numb'		, 'Invoice번호'	), align:'center'
				},{	dataIndex: 'cvic_code'		, width:  90, text: Language.get('cvic_code'		, '설비코드'		), align:'center', hidden : true
				},{	dataIndex: 'pref_rank'		, width:  55, text: Language.get('pref_rank'		, '우선순위'		), align:'center'
				},{	dataIndex: 'wkct_name'		, width: 100, text: Language.get('wkct_name'		, '공정'			), align:'left'
				},{	dataIndex: 'cvic_name'		, width: 100, text: Language.get('cvic_name'		, '설비명'			), align:'left'
				},{	dataIndex: 'orig_invc_numb'	, width: 100, text: Language.get('acpt_numb'		, '수주번호'		), align:'center', hidden : true
				},{	dataIndex: 'lott_numb'		, width:  80, text: Language.get('lott_numb'		, 'LOT번호'		), align:'center'
				},{	dataIndex: 'item_idcd'		, width:  95, text: Language.get('item_idcd'		, '품목코드'		), align:'center', hidden : true
				},{	dataIndex: 'item_code'		, width:  95, text: Language.get('item_code'		, '품목코드'		), align:'center'
				},{	dataIndex: 'item_name'		, width: 270, text: Language.get('item_name'		, '품명'			), align:'left'
				},{	dataIndex: 'item_spec'		, width: 150, text: Language.get('item_spec'		, '규격'			), align:'left'
				},{	dataIndex: 'invc_qntt'		, width:  70, text: Language.get('invc_qntt'		, '발주수량'		), align:'right' , xtype : 'numericcolumn'
				},{	dataIndex: 'plan_strt_dttm'	, width:  90, text: Language.get('work_strt_dttm'	, '시작일시'		), align:'center'
				},{	dataIndex: 'deli_date'		, width:  95, text: Language.get('deli_date'		, '납기일자'		), align:'center'
				},{	dataIndex: 'acpt_remk_text'	, width:  90, text: Language.get('acpt_remk_text'	, '후공정'			), align:'left'
				},{	dataIndex: 'deli_chge_resn'	, width:  95, text: Language.get('deli_chge_resn'	, '(협력사)변경사유'	), align:'left'
				},{	dataIndex: 'wkfw_name'		, width: 170, text: Language.get('wkfw_name'		, '생산라인'		), align:'left'
				},{	dataIndex: 'mtrl_name'		, width:  75, text: Language.get('mtrl_name'		, '재질'			), align:'center'
				},{	dataIndex: 'pckg_cotr_name'	, width: 115, text: Language.get('pckg_cotr_name'	, '포장용기'		), align:'center'
				},{	dataIndex: 'stok_used_qntt'	, width:  75, text: Language.get('stok_used_qntt'	, '재고사용'		), align:'right' , xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex: 'indn_qntt'		, width:  75, text: Language.get('indn_qntt'		, '지시수량'		), align:'right' , xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex: 'sum_indn_qntt'	, width:  75, text: Language.get('sum_indn_qntt'	, '총지시수량'		), align:'right' , xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex: 'prod_qntt'		, width:  75, text: Language.get('prod_qntt'		, '생산수량'		), align:'right' , xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex: 'pckg_qntt'		, width:  75, text: Language.get('pckg_qntt'		, '포장수량'		), align:'right' , hidden : true
				},{	dataIndex: 'qntt'			, width:  75, text: Language.get(''					, '잔량'			), align:'right' , xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex: 'prod_strt_dttm'	, width: 125, text: Language.get('prod_strt_dttm'	, '생산시작일시'		), align:'center'
				},{	dataIndex: 'work_endd_dttm'	, width: 125, text: Language.get('work_endd_dttm'	, '완료일시'		), align:'center'
				},{	dataIndex: 'user_memo'		, width: 185, text: Language.get('user_memo'		, '비고'			), align:'left'
				}
			]
		};
		return item;
	}
});
