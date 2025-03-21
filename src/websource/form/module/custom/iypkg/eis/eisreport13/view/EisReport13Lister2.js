Ext.define('module.custom.iypkg.eis.eisreport13.view.EisReport13Lister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport13-lister2'			,
	store		: 'module.custom.iypkg.eis.eisreport13.store.EisReport132'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	border		: 0,
	columnLines : true,

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
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
					{	dataIndex: 'drtr_name'	, text : Language.get('drtr_name'	,'담당자'	) , width : 100 , align : 'left',
					},{	dataIndex: 'cstm_name'	, text : Language.get('cstm_name'	,'상호'		) , width : 200 , align : 'left'
					},{ dataIndex: 'goal'		, text : Language.get('goal'		,'목표'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: '#,##0'
					},{ dataIndex: 'rslt'		, text : Language.get('rslt'		,'실적금액'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', format: '#,##0'
					}
				]
			}
		;
		return item;
	}
});