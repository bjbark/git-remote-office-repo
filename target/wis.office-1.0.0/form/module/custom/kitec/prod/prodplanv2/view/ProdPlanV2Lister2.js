Ext.define('module.custom.kitec.prod.prodplanv2.view.ProdPlanV2Lister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodplanv2-lister2',
	store		: 'module.custom.kitec.prod.prodplanv2.store.ProdPlanV22',

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
					{text : '<span class="write-button">작업지시</span>'	, action : 'workAction'			, cls: 'button1-style', hidden : _global.options.prod_order_type == '0'? false : true } ,
					'->', '-',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action, button : 'part2detail' ,cls: 'button-style'}
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
				{	dataIndex: 'line_clos'		, width:  60, text: Language.get('line_clos'		, '상태'			), xtype: 'lookupcolumn'  , lookupValue : resource.lookup('line_clos'), align:'center'
				},{	dataIndex: 'invc_numb'		, width: 130, text: Language.get('plan_numb'		, '계획번호'		), align:'center'
				},{	dataIndex: 'item_code'		, width: 100, text: Language.get('item_code'		, '품목코드'		), align:'center'
				},{	dataIndex: 'item_name'		, width: 200, text: Language.get('item_name'		, '품명'			), align:'left'
				},{	dataIndex: 'item_spec'		, width: 150, text: Language.get('item_spec'		, '규격'			), align:'left'
				},{	dataIndex: 'mold_code'		, width:  90, text: Language.get('acpt_numb'		, '금형코드'		), align:'center'	, hidden : true
				},{	dataIndex: 'mtrl_name'		, width:  80, text: Language.get('mtrl_name'		, '재질'			), align:'center'	, hidden : true
				},{	dataIndex: 'prod_line_name'	, width: 120, text: Language.get('prod_line_name'	, '생산라인'		), align:'left'
				},{	dataIndex: 'trst_qntt'		, width:  70, text: Language.get('trst_qntt'		, '의뢰수량'		), align:'right'	, xtype : 'numericcolumn' , summaryType : 'sum'
				},{	dataIndex: 'stok_used_qntt'	, width:  70, text: Language.get('stok_used_qntt'	, '재고사용'		), align:'right'	, xtype : 'numericcolumn' , summaryType : 'sum'
				},{	dataIndex: 'plan_qntt'		, width:  85, text: Language.get('plan_qntt'		, '계획수량 (L)'	), align:'right'	, xtype : 'numericcolumn' , summaryType : 'sum' , hidden : false
				},{	dataIndex: 'plan_qntt_1fst'	, width:  85, text: Language.get('plan_qntt_1fst'	, '계획수량 (R)'	), align:'right'	, xtype : 'numericcolumn' , summaryType : 'sum' , hidden : false
				},{	dataIndex: 'lott_numb'		, width:  90, text: Language.get('lott_numb'		, 'lot번호'		), align:'left'
				},{	dataIndex: 'plan_sttm'		, width: 125, text: Language.get('plan_sttm'		, '시작일시'		), align:'center'
				},{	dataIndex: 'plan_edtm'		, width: 125, text: Language.get('plan_edtm'		, '완료일시'		), align:'center'	, hidden : true
				},{	dataIndex: 'prod_trst_numb'	, width: 100, text: Language.get('prod_trst_numb'	, '생산의뢰번호'	), align:'center'
				},{	dataIndex: 'deli_date'		, width:  80, text: Language.get('ptnr_comp_deli_date', '협력사납기'	),align:'center'	, hidden : true
				},{	dataIndex: 'cstm_deli_date'	, width:  80, text: Language.get('orig_deli_date'	, '원납기'		), align:'center'	, hidden : true
				},{	dataIndex: 'invc_date'		, width:  80, text: Language.get('offr_date'		, '발주일자'		), align:'center'	, hidden : true
				},{	dataIndex: 'drtr_name'		, width:  80, text: Language.get('trst_drtr_name'	, '담당자'		), align:'left'		, hidden : true
				},{	dataIndex: 'remk_text'		, width: 100, text: Language.get(''					, '후공정'		), align:'left'		, hidden : true
				},{	dataIndex: 'deli_chge_resn'	, width:  80, text: Language.get('deli_chge_resn'	, '납기변동사유'	), align:'left'		, hidden : true
				},{	dataIndex: 'user_memo'		, flex : 100, text: Language.get('user_memo'		, '비고'			), align:'left'
				}
			]
		};
		return item;
	}
});
