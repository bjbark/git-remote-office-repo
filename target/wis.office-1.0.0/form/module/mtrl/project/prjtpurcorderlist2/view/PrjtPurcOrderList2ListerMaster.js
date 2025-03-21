Ext.define('module.mtrl.project.prjtpurcorderlist2.view.PrjtPurcOrderList2ListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtpurcorderlist2-lister-master',
	store		: 'module.mtrl.project.prjtpurcorderlist2.store.PrjtPurcOrderList2Master',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
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
					'->','-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	,itemId:'master'}
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'prnt_idcd'		, text : Language.get('acpt_case_name'	,'금형명'	) , width : 100 , align : 'center'
					},{ dataIndex: 'istt_amnt'		, text : Language.get('istt_amnt'		,'매입금액'	) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'istt_vatx'		, text : Language.get('istt_vatx'		,'부가세'	) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'	) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});