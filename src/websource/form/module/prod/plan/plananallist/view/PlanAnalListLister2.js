Ext.define('module.prod.plan.plananallist.view.PlanAnalListLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-plananallist-lister2',
	store		: 'module.prod.plan.plananallist.store.PlanAnalList2',

	border		: 0 ,
	columnLines : true ,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' } ],
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
				{	dataIndex: 'line_clos'		, width:  45, text: Language.get('line_clos'		, '마감'				), xtype: 'lookupcolumn'  , lookupValue : resource.lookup('line_clos'), align:'center'
				},{	dataIndex: 'ordr_dvcd'		, width:  60, text: Language.get('prcs_stat'		, '주문상태'			), xtype: 'lookupcolumn'  , lookupValue : resource.lookup('ordr_dvcd'), align:'center'
				},{	dataIndex: 'invc_numb'		, width: 100, text: Language.get('PROD_NUMB'		, '주문번호'			), align:'center'
				},{	dataIndex: 'line_seqn'		, width:  40, text: Language.get('line_seqn'		, '순번'				), align:'center'
				},{	dataIndex: 'lott_numb'		, width:  80, text: Language.get('lott_numb'		, 'lot'				), align:'center'
				},{	dataIndex: 'item_code'		, width:  90, text: Language.get('item_code'		, '품목코드'			), align:'center'
				},{	dataIndex: 'item_name'		, width: 270, text: Language.get('item_name'		, '품명'				), align:'left'
				},{	dataIndex: 'item_spec'		, width: 150, text: Language.get('item_spec'		, '규격'				), align:'left'
				},{	dataIndex: 'acpt_qntt'		, width:  70, text: Language.get('acpt_qntt'		, '의뢰수량'			), align:'right' , xtype : 'numericcolumn' , summaryType : 'sum'
				},{	dataIndex: 'indn_qntt'		, width:  70, text: Language.get('indn_qntt'		, '계획수량'			), align:'right' , xtype : 'numericcolumn' , summaryType : 'sum'
				},{	dataIndex: 'stok_used_qntt'	, width:  80, text: Language.get('stok_used_qntt'	, '재고사용'			), align:'right' , xtype : 'numericcolumn' , summaryType : 'sum'
				},{	dataIndex: 'plan_strt_dttm'	, width: 130, text: Language.get('plan_strt_dttm'	, '시작일시(계획)'	), align:'center'
				},{	dataIndex: 'plan_endd_dttm'	, width: 130, text: Language.get('plan_endd_dttm'	, '완료일시(계획)'	), align:'center'
				},{	dataIndex: 'work_qntt'		, width:  70, text: Language.get('prod_qntt'		, '실적수량'			), align:'right' , xtype : 'numericcolumn' , summaryType : 'sum'
				},{	dataIndex: 'work_strt_dttm'	, width: 130, text: Language.get('work_strt_dttm'	, '시작일시(실적)'	), align:'center'
				},{	dataIndex: 'work_endd_dttm'	, width: 130, text: Language.get('work_endd_dttm'	, '완료일시(실적)'	), align:'center'
				},{	dataIndex: 'dely_dcnt'		, width:  65, text: Language.get('dely_dcnt'		, '지연일수'			), align:'right'
				},{	dataIndex: 'cstm_name'		, width: 130, text: Language.get('cstm'				, '거래처'			), align:'left'
				},{	dataIndex: 'cstm_deli_date'	, width:  95, text: Language.get('cstm_deli_date'	, '협력사납기'		), align:'center'
				},{	dataIndex: 'deli_date'		, width:  95, text: Language.get('deli_date'		, '납기일자'			), align:'center'
				},{	dataIndex: 'acpt_date'		, width:  95, text: Language.get('acpt_date'		, '발주일자'			), align:'center'
				},{	dataIndex: 'pdod_date'		, width:  95, text: Language.get('indn_date'		, '발주일자'			), align:'center'
				},{	dataIndex: 'drtr_name'		, width:  80, text: Language.get('drtr_name'		, '담당자'			), align:'left'
				},{	dataIndex: 'user_memo'		, flex :   1, text: Language.get('user_memo'		, '비고'				), align:'left'
				},{	dataIndex: 'deli_chge_resn'	, flex :   1, text: Language.get('deli_chge_resn'	, '납기변동사유'		), align:'left'
				}
			]
		};
		return item;
	}
});
