Ext.define('module.custom.sjflv.sale.export.report.view.ReportListerDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-report-lister-detail1',
	store		: 'module.custom.sjflv.sale.export.report.store.ReportDetail1',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ,{ptype  :'cellediting-directinput', clicksToEdit: 1 }],
	columnLines : true,
	initComponent: function () {
		var me = this;
//		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->','-' ,

//					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style',itemId : 'detail'}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'항번'		) , width :  50 , align : 'center'
					},{ dataIndex: 'acpt_numb'	, text : Language.get(''	,'HS Code'	) , width : 120 , align : 'center'
					},{ dataIndex: 'cstm_name'	, text : Language.get(''	,'품목코드'	) , width : 160
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width : 260
					},{ dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 100
					},{ dataIndex: 'item_spec'	, text : Language.get(''	,'단위'		) , width : 100
					},{ dataIndex: 'sale_pric'	, text : Language.get(''	,'수량'		) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'sale_pric'	, text : Language.get(''	,'판매단가'	) , width : 100 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'sale_amnt'	, text : Language.get(''	,'판매금액'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'	, text : Language.get(''	,'원화단가'	) , width : 100 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'vatx_amnt'	, text : Language.get(''	,'원화금액'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});