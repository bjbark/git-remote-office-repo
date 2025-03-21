Ext.define('module.custom.iypkg.eis.eisreport14.view.EisReport14Lister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport14-lister1',
	store		: 'module.custom.iypkg.eis.eisreport14.store.EisReport14Lister1',
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
					{	dataIndex: 'user_name'	, text : Language.get(''	,'담당자'		) , width : 120 , align : 'left'
					},{ dataIndex: 'cstm_name'	, text : Language.get(''	,'상호'		) , width  :150 , align : 'left'
					},{ dataIndex: 'sw_code'	, text : Language.get(''	,'S/W'		) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'dw_code'	, text : Language.get(''	,'D/W'		) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'sum_code'	, text : Language.get(''	,'합계'		) , width : 135 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
//					},{ dataIndex: 'cstm_idcd'	, text : Language.get(''	,'합계'		) , width : 135 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});