Ext.define('module.custom.aone.sale.order.sordersumlist2.view.SorderSumList2Lister4', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sordersumlist2-lister4',
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
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: ''		, text : Language.get(''		,'거래처명'		) , width : 205 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), hidden : (_global.options.mes_system_type !='Frame'? false:true)
					},{	dataIndex: ''		, text : Language.get(''		,'입고'		) , width : 150 , align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'출고'		) , width : 150 , align : 'left'
					},{ dataIndex: ''		, text : Language.get(''		,'수리중'		) , width : 150 , align : 'left'
//					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'수량'		) , width : 180 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
//					},{ dataIndex: 'acpt_case_name'	, text : Language.get('modl_name'		,'평균단가'		) , width : 180 , align : 'left'
//					},{ dataIndex: 'istt_pric'		, text : Language.get('istt_pric'		,'공급가액'		) , width : 180 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
//					},{ dataIndex: 'istt_vatx'		, text : Language.get('istt_vatx'		,'부가세'		) , width : 180 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
//					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'		) , flex  :   1 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});