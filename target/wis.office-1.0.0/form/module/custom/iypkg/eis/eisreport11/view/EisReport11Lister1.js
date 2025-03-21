Ext.define('module.custom.iypkg.eis.eisreport11.view.EisReport11Lister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport11-lister1',
	store		: 'module.custom.iypkg.eis.eisreport11.store.EisReport111',
	width		: 515,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

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
					{	dataIndex: 'cstm_name'	, width : 250 , align : 'left'	, text : Language.get(''	,'상호'		)
					},{ dataIndex: 'sw_code'	, width : 140 , align : 'right'	, text : Language.get(''	,'S/W'		) , xtype : 'numericcolumn',summaryType:'sum'
					},{ dataIndex: 'dw_code'	, width : 140 , align : 'right'	, text : Language.get(''	,'D/W'		) , xtype : 'numericcolumn',summaryType:'sum'
					},{ dataIndex: 'istt_amnt'	, width : 140 , align : 'right'	, text : Language.get(''	,'합계'		) , xtype : 'numericcolumn',summaryType:'sum'
					}
				]
			}
		;
		return item;
	}
});