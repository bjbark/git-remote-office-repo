Ext.define('module.custom.iypkg.eis.eisreport13.view.EisReport13Lister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport13-lister1',
	store		: 'module.custom.iypkg.eis.eisreport13.store.EisReport131',
	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	initComponent: function () {
		var me = this;
//		me.dockedItems = [{xtype: 'module-eisreport13-search1'}];
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
					{	dataIndex: 'user_name'	, text : Language.get('user_name'	,'담당자'		) , width : 100 , align : 'left',
					},{	dataIndex: 'cstm_name'	, text : Language.get('cstm_name'	,'상호'		) , width : 200 , align : 'left',
					},{ dataIndex: 'sw_code'	, text : Language.get('sw_code'		,'S/W'		) , width : 120 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'dw_code'	, text : Language.get('dw_code'		,'D/W'		) , width : 120 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'합계'		) , width : 150 , xtype : 'numericcolumn', align : 'right'
					}
				]
			}
		;
		return item;
	}
});