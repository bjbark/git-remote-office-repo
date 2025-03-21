Ext.define('module.custom.iypkg.eis.eisreport14.view.EisReport14Lister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport14-lister2',
	store		: 'module.custom.iypkg.eis.eisreport14.store.EisReport14Lister2',
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
					{	dataIndex: 'drtr_name'	, text : Language.get(''	,'담당자'		) , width : 140 , align : 'left'
					},{ dataIndex: 'cstm_name'	, text : Language.get(''	,'상호'		) , width : 230 , align : 'left'
					},{ dataIndex: 'goal'	, text : Language.get(''	,'목표'		) , width : 150 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'rslt'	, text : Language.get(''	,'실적금액'		) , width : 150 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});