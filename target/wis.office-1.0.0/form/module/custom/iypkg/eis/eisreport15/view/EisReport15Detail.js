Ext.define('module.custom.iypkg.eis.eisreport15.view.EisReport15Detail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport15-detail',
	store		: 'module.custom.iypkg.eis.eisreport15.store.EisReport15Detail',
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
					{	dataIndex: 'rnum'		, text : '월' , width :  60 , align : 'center'
					},{ dataIndex: 'amnt'		, text : '금액', width : 300 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'prod_qntt'	, text : '수량', width : 300 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});