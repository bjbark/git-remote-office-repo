Ext.define('module.prod.basic.prodlineroute.view.ProdLineRouteItem2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodlineroute-lister-item2',
	store		: 'module.prod.basic.prodlineroute.store.ProdLineRouteItem2',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
		item = {
			layout:'border',
			defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'wkct_code'		, text : Language.get('wkct_code'		,'공정코드')		, width : 100,align :'center'
					},{	dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명')		, width : 120
//					},{	dataIndex: 'wkct_insp_yorn'	, text : Language.get('wkct_insp_yorn'	,'공정검사여부')	, width : 90, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
//					},{	dataIndex: 'last_wkct_yorn'	, text : Language.get('last_wkct_yorn'	,'최종공정여부')	,width : 90, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
//					},{	dataIndex: 'aftr_wkct_ordr'	, text : Language.get('aftr_wkct_ordr'	,'다음공정순서')	, flex  : 1,minWidth:80,align : 'right'
//					},{	dataIndex: 'mtrl_cost_rate'	, text : Language.get('mtrl_cost_rate'	,'재료비진척율')	, flex  : 1,minWidth:80,align : 'right'
//					},{	dataIndex: 'labo_cost_rate'	, text : Language.get('labo_cost_rate'	,'노무비진척율')	, flex  : 1,minWidth:80,align : 'right'
//					},{	dataIndex: 'expn_rate'		, text : Language.get('expn_rate'	,'경비진척율')	, flex  : 1,minWidth:80,align : 'right'
					}
				]
			}
		;
		return item;
	}
});