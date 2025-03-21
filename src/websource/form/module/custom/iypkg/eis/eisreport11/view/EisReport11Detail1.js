Ext.define('module.custom.iypkg.eis.eisreport11.view.EisReport11Detail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport11-detail1',
	store		: 'module.custom.iypkg.eis.eisreport11.store.EisReportDetail111',
	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-eisreport11-search1'}];
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
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
				items : [
					{	dataIndex: 'mm'			, text : Language.get('mm'			,'월'	) , width : 80 , align : 'center'
					},{ dataIndex: 'sw_code'	, text : Language.get('sw_code'		,'S/W'	) , width : 250 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'dw_code'	, text : Language.get('dw_code'		,'D/W'	) , width : 250 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'sub'		, text : Language.get('sub'			,'합계'	) , width : 250 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});