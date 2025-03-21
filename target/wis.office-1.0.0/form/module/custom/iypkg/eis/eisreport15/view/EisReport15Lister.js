Ext.define('module.custom.iypkg.eis.eisreport15.view.EisReport15Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport15-lister',
	store		: 'module.custom.iypkg.eis.eisreport15.store.EisReport15Lister',
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
					{	dataIndex: 'wkct_name'	, text : Language.get('wkct_name'	,'공정명'		) , width : 140 , align : 'left'
					},{ dataIndex: 'wkct_stnm'	, text : Language.get('wkct_stnm'	,'보조공정'		) , width : 120 , align : 'left'
					},{ dataIndex: 'amnt'		, text : Language.get('amnt'		,'금액'		) , width : 250 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'prod_qntt'	, text : Language.get('prod_qntt'	,'수량'		) , width : 250 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});