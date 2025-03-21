Ext.define('module.custom.aone.sale.order.sordersumlist2.view.SorderSumList2Lister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sordersumlist2-lister2',
	store		: 'module.custom.aone.sale.order.sordersumlist2.store.SorderSumList2Master',

	selModel	: { selType: 'cellmodel'},
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
//					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: ''		, text : Language.get(''		,'No'		) , width : 105 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), hidden : (_global.options.mes_system_type !='Frame'? false:true)
					},{	dataIndex: ''		, text : Language.get(''		,'구분'		) , width : 120 , align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'김상현'		) , width : 120 , align : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: ''		, text : Language.get(''		,'고광석'		) , width : 120 , align : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: ''		, text : Language.get(''		,'지정남'		) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: ''		, text : Language.get(''		,'....'		) , width : 400 , align : 'left'
					},{ dataIndex: ''		, text : Language.get(''		,'기타'		) , width : 180 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
//					},{ dataIndex: ''		, text : Language.get(''		,'부가세'		) , width : 180 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: ''		, text : Language.get(''		,'합계금액'		) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});