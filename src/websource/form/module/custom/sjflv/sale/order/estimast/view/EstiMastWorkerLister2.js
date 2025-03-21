Ext.define('module.custom.sjflv.sale.order.estimast.view.EstiMastListerMaster2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjflv-estimast-worker-lister2',
	store		: 'module.custom.sjflv.sale.order.estimast.store.EstiMastMargin',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-sjflv-estimast-worker-search'}];
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'-', '->', '-',
					{	text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action ,cls: 'button-style' } ,
					{	text : '<span class="write-button">닫기</span>'	, action : 'cancelAction'		, cls: 'button-style', width: 80	} ,
				],
				pagingButton:false
			}
		;
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
					{	dataIndex: 'margin'	, width:  60  , text: Language.get('margin'	, '마진'		) , xtype : 'numericcolumn'
					},{	dataIndex: 'amnt'	, width:  120 , text: Language.get('amnt'	, '금액'		) , xtype : 'numericcolumn'
					}
				]
			};
		return item;
	}
});
