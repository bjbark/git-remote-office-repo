Ext.define('module.basic.item.eco.ecomast.view.EcoMastListerDetail2', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-ecomast-lister-detail2',
	height		: 200,
	store: 'module.basic.item.eco.ecomast.store.EcoMastDetail2',

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
					{	text : '순번'			, dataIndex: 'bomt_seqn'		, width : 40	, align : 'center', hidden:true
					},{	text : '순번'			, dataIndex: 'line_seqn'		, width : 40	, align : 'center'
					},{	text : 'ecod_idcd'	, dataIndex: 'ecod_idcd'		, width : 60	, align : 'center', hidden:true
					},{	text : 'Level'		, dataIndex: ''					, width : 60	, align : 'center', hidden:true
					},{	text : 'Rev.'		, dataIndex: ''					, width : 50	, align : 'center', hidden:true
					},{	text : '품목코드'		, dataIndex: 'item_code'		, width : 160	, align : 'center'
					},{	text : '품명'			, dataIndex: 'item_name'		, width : 220,
						renderer: function(value) {
							return	'<span data-qwidth="200" '+
									'data-qtip="'+value+'">'+
									value+'</span>';
						}
					},{	text : '규격'		, dataIndex: 'item_spec'		, width : 180,
						renderer: function(value) {
							return '<span data-qwidth="200" '+
									'data-qtip="'+value+'">'+
									value+'</span>';
						}
					},{	text : '고객품번'	, dataIndex: 'cstm_itid'		, width :  80	, align : 'center'
					},{	text : '투입수량'	, dataIndex: 'ndqt_dnmn'		, width : 130	, align : 'right'
					},{	text : '부품위치'	, dataIndex: 'prts_plac'		, width :  85	, xtype : 'numericcolumn', align : 'left'
					},{	text : '표면처리'	, dataIndex: 'srfc_proc'		, width :  85	, xtype : 'numericcolumn', align : 'center'
					},{	text : '색상'		, dataIndex: 'colr_bacd'		, width :  80	, xtype : 'numericcolumn', align : 'center'
					},{	text : '재질'		, dataIndex: 'mtrl_bacd'		, width :  80	, xtype : 'numericcolumn', align : 'center'
					},{	text : 'MSL'	, dataIndex: 'msll_valu'		, width : 80	,renderer:function(value){return value.substr(0,10);},align : 'center'
					},{	text : '제조사명'	, dataIndex: 'mker_name'		, flex  : 100	, align : 'left'
					},{	text : '2D도면번호'	, dataIndex: 'flat_drwg_numb'	, flex  : 100	, align : 'right'
					},{	text : '3D도면번호'	, dataIndex: 'sold_drwg_numb'	, flex  : 100	, align : 'right'
					},{	text : '차종'		, dataIndex: 'crty_bacd'		, width:  80/*,xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat'), align : 'center'*/
					}
				],
			};
		return item;
	}
});
