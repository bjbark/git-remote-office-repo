Ext.define('module.custom.iypkg.eis.eisreport14.view.EisReport14Detail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport14-detail1',
	store		: 'module.custom.iypkg.eis.eisreport14.store.EisReport14Detail1',
	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function () {
		var me = this;
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
					{	dataIndex: 'mon'		, text : Language.get(''	,'월'		) , width : 80 , align : 'center'
					},{ dataIndex: 'sw_code'	, text : Language.get(''	,'S/W'		) , width : 200 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'dw_code'	, text : Language.get(''	,'D/W'		) , width : 200 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'sum_code'	, text : Language.get(''	,'합계'		) , width : 200 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});