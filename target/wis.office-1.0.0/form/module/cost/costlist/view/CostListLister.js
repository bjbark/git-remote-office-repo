Ext.define('module.cost.costlist.view.CostListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-costlist-lister',
	store		: 'module.cost.costlist.store.CostList',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'-', '->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } //엑셀버튼.
				]
			}
		;
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'		, text : Language.get('prod_date'		,'생산일자'	) , width : 90, align : 'center'
					},{	dataIndex: 'cvic_idcd'		, text : Language.get('cvic_idcd'		,'설비ID'	) , width : 200, align : 'left' ,hidden : true
					},{	dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'호기'		) , width : 55, align : 'left'
					},{	dataIndex: 'dayn_dvcd'		, text : Language.get('dayn_dvcd'		,'주/야'		) , width : 45 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('dayn_dvcd')
					},{	dataIndex: 'mold_idcd'		, text : Language.get('pjod_idcd'		,'금형번호'	) , width : 70, align : 'left'
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'	) , width : 80, align : 'left'
					},{	dataIndex: 'item_mtrl'		, text : Language.get('item_mtrl'		,'품목재질'	) , width : 150, align : 'left' ,hidden : true
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'	) , width : 300, align : 'left'
					},{	dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'품목규격'	) , width : 250, align : 'left'
					},{	dataIndex: 'cavity'			, text : Language.get('cavity'			,'CAVITY'	) , width : 55 , align : 'center'
					},{	dataIndex: 'need_time'		, text : Language.get('need_time'		,'소요시간'	) , width : 70, align : 'center'
					},{	dataIndex: 'theo_qntt'		, text : Language.get('theo_qntt'		,'이론수량'	) , width : 65 , align : 'right'
					},{	dataIndex: 'good_qntt'		, text : Language.get('good_qntt'		,'실수량'	) , width : 60 , align : 'right'
					},{	dataIndex: 'good_prgs'		, text : Language.get('good_prgs'		,'양품율'	) , width : 70 , align : 'center'
					},{	dataIndex: 'invc_pric'		, text : Language.get('invc_pric'		,'단가'		) , width : 70, align : 'right'  , xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'invc_amnt'		, text : Language.get('invc_amnt'		,'금액'		) , width : 90, align : 'right'  , xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'unit_pric'		, text : Language.get('unit_pric'		,'개당단가'	) , width : 90, align : 'right'  , xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'	) , width : 90, align : 'right'  , xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'mtrl_amnt'		, text : Language.get('mtrl_amnt'		,'원재료비'	) , width : 90, align : 'right'  , xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'labo_amnt'		, text : Language.get('labo_amnt'		,'인건비'	) , width : 90, align : 'right'  , xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'adex_amnt'		, text : Language.get('adex_amnt'		,'임율(관리비)') , width : 90, align : 'right', xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'prof_amnt'		, text : Language.get('prof_amnt'		,'관리&이윤'	)   , width : 90, align : 'right', xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'finl_cost'		, text : Language.get('finl_cost'		,'최종생산원가') , width : 90, align : 'right', xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'finl_unit_cost'	, text : Language.get('finl_unit_cost'	,'최종개당원가') , width : 90, align : 'right' , xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'cost_sale'		, text : Language.get('cost_sale'		,'판매대비원가비'), width : 95, align : 'right', xtype: 'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});
