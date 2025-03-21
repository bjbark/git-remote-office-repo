Ext.define('module.custom.kitec.prod.prodplanv2.view.ProdPlanListerV21', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-prodplanv2-lister1',
	store		: 'module.custom.kitec.prod.prodplanv2.store.ProdPlanV21',
	width		: 450,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary'  }],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false , enableTextSelection: true },

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		console.log(Const.EXPORT.text);
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-' ,
					{text : '일정보기'	, iconCls: 'icon-chart',     action : 'ganttAction' , cls: 'button-style'} , '-' ,
					{text : '<font bold color="white" size= "2">생산계획</font></span>'	, iconCls: Const.MODIFY.icon,action : 'onePlanAction', cls: 'button-style' } , '-' ,
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
						{	dataIndex: 'invc_numb'		, width: 110, text: Language.get('acpt_numb'		, '수주번호'		) , align:'center'
						},{	dataIndex: 'line_seqn'		, width:  40, text: Language.get('line_seqn'		, '항번'			) , align:'center'
						},{	dataIndex: 'cstm_lott_numb'	, width: 100, text: Language.get('cstm_lott_numb'	, 'LOT 번호'		) , align:'center'
						},{	dataIndex: 'cstm_name'		, width: 100, text: Language.get('cstm'				, '거래처'		) , align:'left'
						},{	dataIndex: 'item_code'		, width: 100, text: Language.get('item_code'		, '품목코드'		) , align:'center'
						},{	dataIndex: 'item_name'		, width: 250, text: Language.get('item_name'		, '품명'			) , align:'left'
						},{	dataIndex: 'item_spec'		, width: 150, text: Language.get('item_spec'		, '규격'			) , align:'left'
						},{	dataIndex: 'invc_qntt'		, width:  70, text: Language.get('acpt_qntt'		, '발주수량'		) , xtype: 'numericcolumn', summaryType: 'sum', format: '#,##0', align : 'right'
						},{	dataIndex: 'qntt'			, width:  70, text: Language.get('upid_qntt'		, '미납수량'		) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum'
						},{	dataIndex: 'deli_date'		, width:  80, text: Language.get('deli_date'		, '납기일자'		) , align:'center'
						},{	dataIndex: 'invc_date'		, width:  80, text: Language.get('acpt_date'		, '수주일자'		) , align:'center'
						},{	dataIndex: 'drtr_name'		, width:  80, text: Language.get('cstm_drtr_name'	, '담당자'		) , align:'left'
						},{	dataIndex: 'line_stat'		, width:  60, text: Language.get('line_stat'		, '상태'			) , xtype: 'lookupcolumn' , lookupValue : resource.lookup('line_stat'), align:'center'
						},{	dataIndex: 'invc_pric'		, width:  80, text: Language.get('invc_pric'		, '단가'			) , xtype: 'numericcolumn', align : 'right'
						},{	dataIndex: 'invc_amnt'		, width:  80, text: Language.get('invc_amnt'		, '금액'			) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum'
						},{	dataIndex: 'stok_used_qntt'	, width:  80, text: Language.get('stok_used_qntt'	, '재고사용'		) , align:'right' , xtype : 'numericcolumn' , summaryType : 'sum'
						},{	dataIndex: 'plan_date'		, width:  80, text: Language.get('plan_date'		, '시작일시'		) , align:'center'
						},{	dataIndex: 'cmpl_schd_date'	, width:  80, text: Language.get('cmpl_schd_date'	, '완료일시'		) , align:'center'
						}
					]
				};
		return item;
	}
});