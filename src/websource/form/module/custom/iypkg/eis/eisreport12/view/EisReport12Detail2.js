Ext.define('module.custom.iypkg.eis.eisreport12.view.EisReport12Detail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport12-detail2',
	store		: 'module.custom.iypkg.eis.eisreport12.store.EisReport12Detail2',
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
					{	dataIndex: 'mm'			, text : Language.get('mm'			,'월'		) , width : 80 , align : 'center'
					},{	dataIndex: 'istt_amnt'	, text : Language.get('istt_amnt'	,'매입액'		) , width : 250 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_qntt'	, text : Language.get('istt_qntt'	,'수량'		) , width : 250 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});