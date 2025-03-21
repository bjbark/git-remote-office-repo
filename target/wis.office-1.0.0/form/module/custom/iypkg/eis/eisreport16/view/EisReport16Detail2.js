Ext.define('module.custom.iypkg.eis.eisreport16.view.EisReport16Detail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport16-detail2',
	store		: 'module.custom.iypkg.eis.eisreport16.store.EisReport16Detail',
	width		: 515,
	minWidth	: 200,
	split		: true,
	features	: [{ ftype : 'grid-summary' }],

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
					{	dataIndex: ''	, text : Language.get(''	,'공정명'		) , width : 300, align : 'center'
					},{ dataIndex: ''	, text : Language.get(''	,'자체생산'		) , width : 200 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: ''	, text : Language.get(''	,'외주생산'		) , width : 200 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});