Ext.define('module.custom.iypkg.stock.isos.sptsmast.view.SptsMastLister', { extend: 'Axt.grid.Panel',
	 alias		: 'widget.module-sptsmast-lister'			,
	store		: 'module.custom.iypkg.stock.isos.sptsmast.store.SptsMastLister'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features: [{ftype :'grid-summary'}],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },
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
					'->', '-' ,
//				{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon, action : Const.UPDATE.action ,cls: 'button-style' },
//				{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon, action : Const.CANCEL.action ,cls: 'button-style' },
//					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align: center', sortable: false, menuDisabled: true },
				items : [
					{	dataIndex: 'invc_date'		, width: 85, align: 'center', text: Language.get('acpt_date'		, '수주일자'		)
					},{	dataIndex: 'deli_date'		, width: 85, align: 'center', text: Language.get('deli_date'		, '납기일자'		)
					},{	dataIndex: 'cstm_name'		, width: 180, align: 'left'  , text: Language.get('cstm_name'		, '수주처명'		)
					},{ dataIndex: 'invc_numb'		, width: 90, align: 'center', text: Language.get('acpt_numb'		, '수주번호'		)
					},{ dataIndex: 'prod_name'		, width: 230, align: 'left'  , text: Language.get('item_name'		, '품명'			)
					},{ dataIndex: 'spec'			, width: 100, align: 'left'  , text: Language.get(''				, '상자규격'		)
					},{ dataIndex: 'acpt_qntt'		, width:  80, align: 'right' , text: Language.get('acpt_qntt'		, '수주수량'		), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.##'
					},{ dataIndex: 'ostt_qntt'		, width:  80, align: 'right' , text: Language.get('ostt_qntt'		, '계획량'		), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.##'
					},{ dataIndex: 'cstm_idcd'		, width:  80, align: 'right' , text: Language.get(''				, '거래처id'		),hidden : true
					},{ dataIndex: 'prod_idcd'		, width:  80, align: 'right' , text: Language.get(''				, '품목id'		),hidden : true
//					},{ dataIndex: 'trst_qntt'		, width:  80, align: 'right' , text: Language.get('trst_qntt'		, '계획량'		), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.##'
//					},{ dataIndex: 'lcal_name'		, width:  80, align: 'left'  , text: Language.get('lcal_name'		, '운송지역'		)
//					},{ dataIndex: 'cars_name'		, width:  80, align: 'left'  , text: Language.get('cars_name'		, '운송차량'		)
//					},{ dataIndex: 'dlvy_cstm_name'	, width: 200, align: 'left'  , text: Language.get('dlvy_cstm_name'	, '납품처명'		)
//					},{ dataIndex: 'user_memo'		, flex: 1   , align: 'left'  , text: Language.get('user_memo'		, '비고'			)
					}
				]
			}
		;
		return item;
	},
});
