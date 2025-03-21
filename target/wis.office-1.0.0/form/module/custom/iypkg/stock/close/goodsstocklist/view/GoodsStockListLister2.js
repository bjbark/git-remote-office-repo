Ext.define('module.custom.iypkg.stock.close.goodsstocklist.view.GoodsStockListLister2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-goodsstocklist-lister2',
	store		: 'module.custom.iypkg.stock.close.goodsstocklist.store.GoodsStockList2',
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
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
				items	: [
					{	dataIndex:	'invc_date'	, width:  80, align : 'center'	, text: Language.get('', '일자'	)
					},{	dataIndex:	'prod_name'	, width: 350, align : 'left'	, text: Language.get('', '제품명'	)
					},{	dataIndex:	'prod_spec'	, width: 150, align : 'left'	, text: Language.get('', '규격'	)
					},{	dataIndex:	'invc_dvcd'	, width: 90, align : 'left'	, text: Language.get('', '구분'	), xtype:'lookupcolumn',lookupValue:resource.lookup('invc_dvcd')
					},{	dataIndex:	'qntt'		, width: 100, align : 'right'	, text: Language.get('', '수량'	),xtype:'numericcolumn'
					},{	dataIndex:	'istt_pric'	, width: 120, align : 'right'	, text: Language.get( ''	, '단가'	),xtype:'numericcolumn'
					},{	dataIndex:	'istt_amnt'	, width: 180, align : 'right'	, text: Language.get( ''	, '금액'	),xtype:'numericcolumn'
					}
				]
			};
		return item;
	}
 });