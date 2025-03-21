Ext.define('module.custom.iypkg.eis.eisreport11.view.EisReport11Lister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport11-lister2'			,
	store		: 'module.custom.iypkg.eis.eisreport11.store.EisReport112'	,
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
					{	dataIndex: 'cstm_name'	, text : Language.get('cstm_name'	,'상호'		) , width : 250 , align : 'left'
					},{ dataIndex: 'istt_amnt'	, text : Language.get('istt_amnt'	,'매입금액'	) , width : 110 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'january'	, text : Language.get('january'		,'1월'		) , width : 110 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'february'	, text : Language.get('february'	,'2월'		) , width : 110 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'march'		, text : Language.get('march'		,'3월'		) , width : 110 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'april'		, text : Language.get('april'		,'4월'		) , width : 110 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'may'		, text : Language.get('may'			,'5월'		) , width : 110 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'jun'		, text : Language.get('jun'			,'6월'		) , width : 110 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'july'		, text : Language.get('july'		,'7월'		) , width : 110 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'august'		, text : Language.get('august'		,'8월'		) , width : 110 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'september'	, text : Language.get('september'	,'9월'		) , width : 110 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'october'	, text : Language.get('october'		,'10월'		) , width : 110 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'novemeber'	, text : Language.get('novemeber'	,'11월'		) , width : 110 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'december'	, text : Language.get('december'	,'12월'		) , width : 110 , xtype : 'numericcolumn', align : 'right'
					}
				]
			}
		;
		return item;
	}
});