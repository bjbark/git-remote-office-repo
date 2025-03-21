Ext.define('module.custom.iypkg.eis.eisreport12.view.EisReport12Lister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport12-lister1'			,
	store		: 'module.custom.iypkg.eis.eisreport12.store.EisReport121'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

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
					{	dataIndex: 'cstm_name'	, text : Language.get('cstm_name'	,'상호'		) , width : 235 , align : 'left'
					},{	dataIndex: 'wkct_name'	, text : Language.get('wkct_name'	,'공정명'		) , width : 238 , align : 'left',
					},{ dataIndex: 'istt_amnt'	, text : Language.get('istt_amnt'	,'금액'		) , width : 207 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_qntt'	, text : Language.get('istt_qntt'	,'수량'		) , width : 150 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});