Ext.define('module.basic.item.eco.ecomast.view.EcoMastListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-ecomast-lister-detail',
	height		: 200,
	store: 'module.basic.item.eco.ecomast.store.EcoMastDetail',

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
					},{	dataIndex: 'befr_stok_plac'		, text : Language.get('befr_stok_plac'	,'부품위치'		)	, width : 85  , align : 'left'
					},{	dataIndex: 'srfc_proc'			, text : Language.get('srfc_proc'		,'표면처리'		)	, width : 85  , align : 'left'
					},{	dataIndex: 'colr_bacd_name'		, text : Language.get('colr_bacd_name'	,'색상'			)	, width : 120 , align : 'left'
					},{	dataIndex: 'mtrl_name'			, text : Language.get('mtrl_name'		,'재질'			)	, width : 80  , align : 'left'
					},{	dataIndex: 'msll_valu'			, text : Language.get('msll_valu'		,'MSL'			)	, width : 80  , align : 'left'
					},{	dataIndex: 'mker_name'			, text : Language.get('mker_name'		,'제조사명'		)	, width : 100 , align : 'left'
					},{	dataIndex: 'flat_drwg_numb'		, text : Language.get('flat_drwg_numb'	,'2D도면번호'	)	, width : 130 , align : 'left'
					},{	dataIndex: 'sold_drwg_numb'		, text : Language.get('sold_drwg_numb'	,'3D도면번호'	)	, width : 130 , align : 'left'
					},{	dataIndex: 'crty_bacd_name'		, text : Language.get('crty_bacd_name'	,'차종'			)	, width : 100 , align : 'left'
					}
				]
			};
		return item;
	}
});
