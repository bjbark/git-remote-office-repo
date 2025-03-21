Ext.define('module.custom.iypkg.eis.eisreport13.view.EisReport13Detail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport13-detail2',
	store		: 'module.custom.iypkg.eis.eisreport13.store.EisReport13Detail2',
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
					{	dataIndex: 'goalname'	, text : Language.get(''				,'월'		) , width : 40  , align : 'center'
					},{ dataIndex: 'goal'		, text : Language.get(''				,'목표'		) , width : 80 , xtype : 'numericcolumn', summaryType: 'sum', format: '#,##0'
					},{ dataIndex: 'rslt'		, text : Language.get(''				,'실적'		) , width : 80 , xtype : 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{ dataIndex: 'percent'	, text : Language.get(''				,'달성율'		) , width  : 60 , xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	}
});