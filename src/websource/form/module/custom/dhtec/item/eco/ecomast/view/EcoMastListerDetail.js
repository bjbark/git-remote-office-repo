Ext.define('module.custom.dhtec.item.eco.ecomast.view.EcoMastListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-ecomast-lister-detail',
	height		: 200,
	store: 'module.custom.dhtec.item.eco.ecomast.store.EcoMastDetail',

	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },


//	border		: 0 ,
//	columnLines	: true ,
//	features	: [{ ftype : 'grid-summary' }],
//	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
				],
				pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items	: [
					{	text : '순번'		, dataIndex: 'line_seqn'		, width : 40	, align : 'center'
					},{	text : 'Level'		, dataIndex: ''					, width : 60	, align : 'center', hidden:true
					},{	text : 'Rev.'		, dataIndex: ''					, width : 50	, align : 'center', hidden:true
					},{	dataIndex: 'item_code'			, text : Language.get('item_code'		,'품목코드'		)	, width : 90 , align : 'center'
					},{	dataIndex: 'item_name'			, text : Language.get('item_name'		,'품명'			)	, width : 260  , align : 'left'
					},{	dataIndex: 'item_spec'			, text : Language.get('item_spec'		,'규격'			)	, width : 180  , align : 'left'
					},{	dataIndex: 'dely_cstm_itid'		, text : Language.get('dely_cstm_itid'	,'고객품번'		)	, width : 80  , align : 'center'
					},{	dataIndex: 'ndqt_dnmn'			, text : Language.get('ndqt_dnmn'		,'투입수량'		)	, width : 90 , align : 'right'
					},{	dataIndex: 'wkfw_name'			, text : Language.get('wkfw_name'		,'공정흐름명'		)	, width : 80 , align : 'left'
					}
				]
			};
		return item;
	}
});
