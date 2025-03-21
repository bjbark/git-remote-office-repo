Ext.define('module.custom.iypkg.eis.eisreport11.view.EisReport11Lister3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport11-lister3'			,
	store		: 'module.custom.iypkg.eis.eisreport11.store.EisReport113'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	border		: 0,
	columnLines : true,

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-eisreport11-search2'}];
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
					{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name'	,'상호'		) , width : 235 , align : 'left'
					},{ dataIndex: 'istt_amnt'		, text : Language.get('istt_amnt'	,'매입금액'		) , width : 198 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'amnt'			, text : Language.get('amnt'		,'지급액'		) , width : 198 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'unpd_amnt'		, text : Language.get('unpd_amnt'	,'미지급금'		) , width : 198 , xtype : 'numericcolumn', align : 'right'
					}
				]
			}
		;
		return item;
	}
});