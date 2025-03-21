Ext.define('module.custom.sjflv.item.itemspec.view.ItemSpecLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-itemspec-lister',
	store		: 'module.custom.sjflv.item.itemspec.store.ItemSpec',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:  'line_stat'	, width: 50 , align : 'center', text : Language.get('line_stat'		,'상태'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex:	'acct_bacd_name', width: 70, align : 'center',	text: Language.get( 'acct_bacd_name', '계정구분')
					},{	dataIndex:	'item_code'	, width: 60, align : 'left',	text: Language.get( 'item_code'		, '품목코드'	),align : 'center'
					},{	dataIndex:	'item_name'	, width: 250, align : 'left',	text: Language.get( 'item_name'		, '품명'		),align : 'left'
					},{	dataIndex:	'item_spec'	, width: 150, align : 'left',	text: Language.get( 'item_spec'		, '품목규격'	),align : 'left'
					},{	dataIndex:	'unit_name'	, width: 100, align : 'left',	text: Language.get( 'unit_name'		, '수불단위'	)
					},{	dataIndex:	'lcls_name'	, width: 100, align : 'left',	text: Language.get( 'lcls_name'		, '대분류'		)
					},{	dataIndex:	'mcls_name'	, width: 100, align : 'left',	text: Language.get( 'mcls_name'		, '중분류'		)
					},{	dataIndex:	'scls_name'	, width: 100, align : 'left',	text: Language.get( 'scls_name'		, '소분류'		)
					},{	dataIndex:	'appr'		, width: 100, align : 'left',	text: Language.get( ''		, 'Apperarance'		),hidden : true
					},{	dataIndex:	'test_ordr'	, width: 100, align : 'left',	text: Language.get( ''		, 'Test And ORDR'	),hidden : true
					},{	dataIndex:	'dnst'		, width: 100, align : 'left',	text: Language.get( ''		, 'Density(20ºC)'	),hidden : true
					},{	dataIndex:	'rfct_indx'	, width: 100, align : 'left',	text: Language.get( ''		, 'Refractive Index(20ºC)'),hidden : true
					},{	dataIndex:	'asen'		, width: 100, align : 'left',	text: Language.get( ''		, 'Arsenic'			),hidden : true
					},{	dataIndex:	'hmtl'		, width: 100, align : 'left',	text: Language.get( ''		, '중금속'				),hidden : true
					},{	dataIndex:	'lead'		, width: 100, align : 'left',	text: Language.get( ''		, '납'				),hidden : true
					},{	dataIndex:	'alin_mtrl'	, width: 100, align : 'left',	text: Language.get( ''		, '이물'				),hidden : true
					},{	dataIndex:	'ingd'		, width: 100, align : 'left',	text: Language.get( ''		, 'Ingredients'		),hidden : true
					},{	dataIndex:	'slvt_carr'	, width: 100, align : 'left',	text: Language.get( ''		, 'Solvent/Carrier'	),hidden : true
					},{	dataIndex:	'shlf_life'	, width: 100, align : 'left',	text: Language.get( ''		, 'Shelf Life'		),hidden : true
					},{	dataIndex:	'strg_cond'	, width: 100, align : 'left',	text: Language.get( ''		, 'Storage Conditions'	),hidden : true
					},{	dataIndex:	'melt_pont'	, width: 100, align : 'left',	text: Language.get( ''		, 'Melting Point'	),hidden : true
					},{	dataIndex:	'flsh_pont'	, width: 100, align : 'left',	text: Language.get( ''		, 'Flash Point'		),hidden : true
					},{	dataIndex:	'ph'		, width: 100, align : 'left',	text: Language.get( ''		, 'PH'				),hidden : true
					},{	dataIndex:	'ecil'		, width: 100, align : 'left',	text: Language.get( ''		, 'E-Coil'			),hidden : true
					},{	dataIndex:	'vtrl_cont'	, width: 100, align : 'left',	text: Language.get( ''		, 'Vacterrial Count'),hidden : true
					},{	dataIndex:	'brix'		, width: 100, align : 'left',	text: Language.get( ''		, 'Brix'			),hidden : true
					},{	dataIndex:	'etcc_cont'	, width: 100, align : 'left',	text: Language.get( ''		, '기타사항'			),hidden : true
					},{	dataIndex:	'guis'		, width: 100, align : 'left',	text: Language.get( ''		, '외관'				),hidden : true
					},{	dataIndex:	'remk_memo'	, width: 100, align : 'left',	text: Language.get( ''		, '비고'				),hidden : true
					}
				]
			};
		return item;
	}
 });