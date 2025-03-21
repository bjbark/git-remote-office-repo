Ext.define('module.custom.dhtec.prod.bomwork.view.BomWorkListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-bomwork-lister-master',
	store		: 'module.custom.dhtec.prod.bomwork.store.BomWorkMaster',
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
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태')			, width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'prjt_code'		, text : Language.get('prjt_code'		,'')	, width : 110 , align : 'center'
					},{ dataIndex: 'prjt_amnd'		, text : Language.get('prjt_amnd'		,'품목코드')			, width : 40 , align : 'center'
					},{ dataIndex: 'prjt_dvcd'		, text : Language.get('prjt_dvcd'		,'소요량')			, width : 40 , xtype : 'lookupcolumn', lookupValue : resource.lookup('cvic_stat_dvcd'), align : 'center'
					}
				]
			}
		;
		return item;
	}
});
