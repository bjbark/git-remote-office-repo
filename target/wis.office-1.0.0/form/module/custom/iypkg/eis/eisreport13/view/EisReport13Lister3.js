Ext.define('module.custom.iypkg.eis.eisreport13.view.EisReport13Lister3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport13-lister3'			,
	store		: 'module.custom.iypkg.eis.eisreport13.store.EisReport133'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	border		: 0,
	columnLines : true,

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-eisreport13-search2'}];
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
					{	dataIndex: 'user_name'		, text : Language.get('user_name'	,'담당자'		) , width : 100 , align : 'left',
					},{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name'	,'상호'		) , width : 200 , align : 'left'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'	,'매출금액'		) , width : 100 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'colt_amnt'		, text : Language.get('colt_amnt'	,'수금액'		) , width : 100 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'uncolt'			, text : Language.get('uncolt'		,'미수금'		) , width : 100 , xtype : 'numericcolumn', align : 'right'
					}
				]
			}
		;
		return item;
	}
});