Ext.define('module.custom.iypkg.sale.order.sptsmast.view.SptsMastLister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sptsmast-lister',
	store		: 'module.custom.iypkg.sale.order.sptsmast.store.SptsMast',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,

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
					'->','-' ,
//					{	text : '<span class="write-button">출하계획서 출력</span>'	, action : 'printAction'	, cls: 'button1-style',width:100	} , '-',
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style'	},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'		, width: 90, align: 'center', text: Language.get('invc_date'		, '계획일자'		)
					},{	dataIndex: 'acpt_date'		, width: 90, align: 'center', text: Language.get('acpt_date'		, '수주일자'		)
					},{	dataIndex: 'deli_date'		, width: 90, align: 'center', text: Language.get('deli_date'		, '납기일자'		)
					},{	dataIndex: 'cstm_name'		, width: 180, align: 'left'  , text: Language.get('cstm_name'		, '수주처명'		)
					},{ dataIndex: 'acpt_numb'		, width: 100, align: 'center', text: Language.get('acpt_numb'		, '수주번호'		)
					},{ dataIndex: 'prod_name'		, width: 230, align: 'left'  , text: Language.get('item_name'		, '품명'			)
					},{ dataIndex: 'spec'			, width: 100, align: 'left'  , text: Language.get(''				, '상자규격'		)
					},{ dataIndex: 'acpt_qntt'		, width:  80, align: 'right' , text: Language.get('acpt_qntt'		, '수주수량'		), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.##'
					},{ dataIndex: 'trst_qntt'		, width:  80, align: 'right' , text: Language.get('trst_qntt'		, '계획량'		), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.##'
					},{ dataIndex: 'lcal_name'		, width:  80, align: 'left'  , text: Language.get('lcal_name'		, '운송지역'		)
					},{ dataIndex: 'cars_name'		, width:  80, align: 'left'  , text: Language.get('cars_name'		, '운송차량'		)
//					},{ dataIndex: 'm2'				, width:  80, align: 'right' , text: Language.get(''				, 'm2/총'		)
//					},{ dataIndex: 'pcod_numb'		, width: 100, align: 'left'  , text: Language.get('pcod_numb'		, 'P/O No'		)
					},{ dataIndex: 'dlvy_cstm_name'	, width: 200, align: 'left'  , text: Language.get('dlvy_cstm_name'	, '납품처명'		)
					},{ dataIndex: 'user_memo'		, flex: 1   , align: 'left'  , text: Language.get('user_memo'		, '비고'			)
					}
				]
			}
		;
		return item;
	}
 });
