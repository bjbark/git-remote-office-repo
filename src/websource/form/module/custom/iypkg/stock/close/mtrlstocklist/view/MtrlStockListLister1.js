Ext.define('module.custom.iypkg.stock.close.mtrlstocklist.view.MtrlStockListLister1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-mtrlstocklist-lister1',
	store		: 'module.custom.iypkg.stock.close.mtrlstocklist.store.MtrlStockListLister1',

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
					{	dataIndex: 'fabc_name'	, width: 250, align: 'left'  , text: Language.get('fabc_name'		, '원단명'		)
					},{	dataIndex: 'ppln_dvcd'	, width:  80, align: 'center', text: Language.get('ppln_dvcd'		, '골'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{ dataIndex: 'fabc_spec'	, width: 170, align: 'left'  , text: Language.get('fabc_spec'		, '규격'		)
					},{ dataIndex: 'base_qntt'	, width: 130, align: 'right' , text: Language.get('base_qntt'		, '기초재고'	), xtype : 'numericcolumn' , format: '#,##0'
					},{ dataIndex: 'istt_qntt'	, width: 130, align: 'right' , text: Language.get('istt_qntt'		, '입고'		), xtype : 'numericcolumn' , format: '#,##0'
					},{ dataIndex: 'prod_qntt'	, width: 130, align: 'right' , text: Language.get('prod_qntt'		, '생산투입'	), xtype : 'numericcolumn' , format: '#,##0'
					},{ dataIndex: 'stok_qntt'	, width: 130, align: 'right' , text: Language.get('stok_qntt'		, '재고'		), xtype : 'numericcolumn' , format: '#,##0'
					},{ dataIndex: 'pric'		, width: 100, align: 'right' , text: Language.get('pric'			, '단가'		), xtype : 'numericcolumn' , format: '#,##0'
					},{ dataIndex: 'stok_amnt'	, width: 150, align: 'right' , text: Language.get('stok_amnt'		, '금액'		), xtype : 'numericcolumn' , format: '#,##0'
					}
				]
			}
		;
		return item;
	}
 });
