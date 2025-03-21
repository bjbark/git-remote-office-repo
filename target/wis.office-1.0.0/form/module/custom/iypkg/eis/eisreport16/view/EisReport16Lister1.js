Ext.define('module.custom.iypkg.eis.eisreport16.view.EisReport16Lister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport16-lister1',
	store		: 'module.custom.iypkg.eis.eisreport16.store.EisReport16Lister1',
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
					{	dataIndex: ''	, text : Language.get(''	,'담당자'		) , width : 140 , align : 'left'
					},{ dataIndex: ''	, text : Language.get(''	,'상호'		) , flex  :   1 , align : 'left'
					},{ dataIndex: ''	, text : Language.get(''	,'매출금액'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: ''	, text : Language.get(''	,'원자재매입'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: ''	, text : Language.get(''	,'부가금액'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: ''	, text : Language.get(''	,'%'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});