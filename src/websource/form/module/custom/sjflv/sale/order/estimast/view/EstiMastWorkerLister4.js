Ext.define('module.custom.sjflv.sale.order.estimast.view.EstiMastListerMaster4', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjflv-estimast-worker-lister4',
	store		: 'module.custom.sjflv.sale.order.estimast.store.EstiMastWorkerLister3',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
					{	dataIndex: 'item_code'	, width:  85 , text: Language.get('item_code'	, '품목코드'	) , align : 'center'
					},{	dataIndex: 'item_name'	, width:  180 , text: Language.get('item_name'	, '품명'		) , align : 'left'
					},{	dataIndex: 'item_spec'	, width:  112 , text: Language.get('item_spec'	, '규격'		) , align : 'left'
					},{	dataIndex: 'revs_numb'	, width:  50  , text: Language.get('revs_numb'	, 'REV'		) , xtype : 'numericcolumn' , align : 'right'
					},{	dataIndex: 'invc_numb'	, width:  250 , text: Language.get(''	, ''		) , align : 'left',hidden : true
					},{	dataIndex: 'line_seqn'	, width:  250 , text: Language.get(''	, ''		) , align : 'left',hidden : true
					}
				]
			};
		return item;
	},
});
