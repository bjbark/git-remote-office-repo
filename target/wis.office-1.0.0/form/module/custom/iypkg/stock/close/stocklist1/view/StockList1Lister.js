Ext.define('module.custom.iypkg.stock.close.stocklist1.view.StockList1Lister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-stocklist1-lister',
	store		: 'module.custom.iypkg.stock.close.stocklist1.store.StockList1',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
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
					{	dataIndex: ''		, width: 100, align: 'center', text: Language.get(''		, '수주일자'		)
					},{	dataIndex: ''		, width: 170, align: 'left'  , text: Language.get(''		, '발주처명'		)
					},{ dataIndex: ''		, width: 230, align: 'left'  , text: Language.get(''		, '원단명'			)
					},{ dataIndex: ''		, width: 100, align: 'left'  , text: Language.get(''		, '골'			)
					},{ dataIndex: ''		, width: 100, align: 'center', text: Language.get(''		, '원단규격'		)
					},{ dataIndex: ''		, width:  80, align: 'right' , text: Language.get(''		, '절수'			)
					},{ dataIndex: ''		, width:  80, align: 'right' , text: Language.get(''		, '수주수량'		)
					},{ dataIndex: ''		, width: 100, align: 'right' , text: Language.get(''		, '출고수량'		)
					},{ dataIndex: ''		, width:  80, align: 'right' , text: Language.get(''		, '과부족량'		)
					},{ dataIndex: ''		, width: 180, align: 'left'  , text: Language.get(''		, '수주처명'		)
					},{ dataIndex: ''		, width: 150, align: 'center', text: Language.get(''		, '수주번호'		)
					},{ dataIndex: ''		, width: 220, align: 'left'  , text: Language.get(''		, '품명'			)
					}
				]
			}
		;
		return item;
	}
 });
