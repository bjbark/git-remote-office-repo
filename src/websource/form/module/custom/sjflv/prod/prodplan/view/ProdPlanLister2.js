Ext.define('module.custom.sjflv.prod.prodplan.view.ProdPlanLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-prodplan-lister2',
	store		: 'module.custom.sjflv.prod.prodplan.store.ProdPlanLister2',
	border		: 0,
	title		: Language.get('','생산계획현황'),
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	
	pagingItem : function () {
		var me = this,
		btnText = '<span style="font-size: small !important; color: white;">재고할당 등록</span>',
		item = {
			xtype	: 'grid-paging',
			dock	: 'bottom',
			items	: [
				'->',
				{ text: '<span style="font-size: small !important; color: white;">계획일자 변경</span>', iconCls: Const.UPDATE.icon, action: Const.UPDATE.action, cls: 'button-style' , width: 120 , align: 'center'},
				'->',
				{ text: Const.DELETE.text, iconCls: Const.DELETE.icon, action: Const.DELETE.action, cls: 'button-style' },
				{ text: Const.EXPORT.text, iconCls: Const.EXPORT.icon, action: Const.EXPORT.action, cls: 'button-style' },
			]
		};
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
					{	text: Language.get('invc_numb'		, '계획번호'		) , dataIndex: 'invc_numb'		, width: 120	, align: 'center'
					},{	text: Language.get(''				, '생산계획일자'	) , dataIndex: 'plan_date'		, width: 80		, align: 'center'
					},{	text: Language.get(''				, '주문번호'		) , dataIndex: 'acpt_invc_numb'	, width: 90		, align: 'center'
					},{	text: Language.get(''				, '항번'			) , dataIndex: 'acpt_line_seqn'	, width: 35		, align: 'center'
					},{	text: Language.get('deli_date'		, '납기일자'		) , dataIndex: 'deli_date'		, width: 80		, align: 'center'
					},{	text: Language.get('prod_trst_dvcd'	, '생산구분'		) , dataIndex: 'prod_trst_dvcd'	, width: 80		, align: 'center'	, xtype: 'lookupcolumn'	, lookupValue: resource.lookup('prod_trst_dvcd')
					},{	text: Language.get('cstm_name'		, '거래처명'		) , dataIndex: 'cstm_name'		, width: 120
					},{	text: Language.get('item_code'		, '제품코드'		) , dataIndex: 'item_code'		, width: 100	, align: 'center'
					},{	text: Language.get('item_name'		, '품명'			) , dataIndex: 'item_name'		, width: 250	, align: 'left'
					},{	text: Language.get('item_spec'		, '규격'			) , dataIndex: 'item_spec'		, width: 140	, align: 'left'
					},{	text: Language.get('invc_qntt'		, '주문수량'		) , dataIndex: 'invc_qntt'		, width: 70		, align: 'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{	text: Language.get('stok_asgn_qntt'	, '재고할당'		) , dataIndex: 'stok_asgn_qntt'	, width: 80		, align: 'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{	text: Language.get(''				, '추가생산량'		) , dataIndex: 'add_plan_qntt'	, width: 75		, align: 'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{	text: Language.get('stok_qntt'		, '재고수량'		) , dataIndex: 'stok_qntt'		, width: 80		, align: 'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{	text: Language.get('plan_qntt'		, '생산계획량'		) , dataIndex: 'plan_qntt'		, width: 75		, align: 'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{	text: Language.get('indn_qntt'		, '작업지시량'		) , dataIndex: 'indn_qntt'		, width: 75		, align: 'right'	, xtype: 'numericcolumn'	, format: '#,##0.##9'
					},{	text: Language.get('plan_baln_qntt'	, '계획잔량'		) , dataIndex: 'plan_baln_qntt'	, width: 75		, align: 'right'	, xtype: 'numericcolumn'	, format: '#,##0.###'
					},{	text: Language.get(''				, '원재료재고여부'	) , dataIndex: 'need_stok_yorn'	, width: 100	, align: 'center'
						, renderer: function(val,meta,rec) {
							if (val === 'N') {
								meta.style = "background-color: red; color: white; font-weight: bold;";
							}
							return val;
						}
					},{	text: Language.get('remk_text'		, '특이사항'		) , dataIndex: 'remk_text'		, minWidth: 150	, align: 'center'	, flex: 1
					},
				]
			};
		return item;
	},
});

