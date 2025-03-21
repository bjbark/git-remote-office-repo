Ext.define('module.custom.sjflv.mtrl.po.purcordrndqt.view.PurcOrdrNdqtLister2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjflv-purcordrndqt-lister2',
	store		: 'module.custom.sjflv.mtrl.po.purcordrndqt.store.PurcOrdrNdqtLister2',
	plugins		: [{ptype  :'cellediting-directinput', clicksToEdit: 1 },{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }],
	features	: [{  ftype: 'grid-summary' } ],

	border : 0  ,
	title  : Language.get('','소요량계산'),

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [
					'-','->',
					{	text : Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action , cls: 'button-style'	}
				]
			}
		;
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this, item =
		{
			defaults: {style: 'text-align:center'},
			items	: [
				{	dataIndex:	'item_code'	, width: 80, align : 'center'   , text: Language.get( ''	, '품목코드'	),
				},{	dataIndex:	'item_name'	, width: 270, align : 'left'   , text: Language.get( ''	, '품명'	),
				},{	dataIndex:	'item_spec'	, width: 200, align : 'left'   , text: Language.get( ''	, '규격'	),
				},{	dataIndex:	'prod_qntt'	, width: 130, align : 'right'   , text: Language.get( ''	, '소요량'	), xtype: 'numericcolumn'
				},{	dataIndex:	'loss_qntt'	, width: 120, align : 'right'   , text: Language.get( ''	, 'loss 소요량'	), xtype: 'numericcolumn'
				},{	dataIndex:	'stok_qntt'	, width: 130, align : 'right'   , text: Language.get( ''	, '재고량'	), xtype: 'numericcolumn'
				}

			]
		};
		return item;
	},
});





