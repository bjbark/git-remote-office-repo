Ext.define('module.custom.sjflv.mtrl.imp.estimast.view.EstiMastWorkerLister3', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-estimast-worker-lister3',
	store: 'module.custom.sjflv.mtrl.imp.estimast.store.EstiMastWorkerLister3',
	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'MULTI'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

//	viewConfig: {
//		markDirty: false,
//		loadMask : false
//	},
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
					{	dataIndex: 'item_code'	, width:  90 , text: Language.get('item_code'	, '품목코드'	) , align : 'center'
					},{	dataIndex: 'item_name'	, width:  250 , text: Language.get('item_name'	, '품명'		) , align : 'left'
					},{	dataIndex: 'item_spec'	, width:  200 , text: Language.get('item_spec'	, '규격'		) , align : 'left'
					},{	dataIndex: 'unit_name'	, width:  50  , text: Language.get('unit_name'	, '단위'		) , align : 'center'
					},{	dataIndex: 'invc_numb'	, width:  250 , text: Language.get(''	, ''		) , align : 'left',hidden : true
					},{	dataIndex: 'line_seqn'	, width:  250 , text: Language.get(''	, ''		) , align : 'left',hidden : true
					}
				]
			};
		return item;
	},
});

