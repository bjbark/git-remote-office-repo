Ext.define('module.prod.basic.prodlineroute.view.ProdLineRouteMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodlineroute-lister-master',
	store		: 'module.prod.basic.prodlineroute.store.ProdLineRoute',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
			defaults: {style: 'text-align: center'},
			items : [
				{	dataIndex: 'line_stat'	, text : Language.get('line_stat'	,'사용')		, width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
				},{ dataIndex: 'wkfw_code'	, text : Language.get('wkfw_code'	,'생산라인코드')	, width : 100 , align :'center'
				},{ dataIndex: 'wkfw_name'	, text : Language.get('wkfw_name'	,'생산라인명')	, width : 160
				},{ dataIndex: 'remk_text'	, text : Language.get('remk_text'	,'메모사항')	, width : 300
				}
			],

		}
		;
		return item;
	}
});
