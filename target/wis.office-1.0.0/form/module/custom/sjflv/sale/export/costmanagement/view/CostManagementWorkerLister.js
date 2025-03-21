Ext.define('module.custom.sjflv.sale.export.costmanagement.view.CostManagementWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-costmanagement-worker-lister',
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-costmanagement-worker-search'}];
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					,'->', '-' ,
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'항번'		) , width :  50 , align : 'center'
					},{ dataIndex: 'acpt_numb'	, text : Language.get(''	,'비용구분'		) , width : 120 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{ dataIndex: 'sale_pric'	, text : Language.get(''	,'지급액'		) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'sale_pric'	, text : Language.get(''	,'원화입금액'		) , width : 120 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'cstm_name'	, text : Language.get(''	,'금융기관'		) , width : 100
					},{ dataIndex: 'item_name'	, text : Language.get(''	,'계좌번호'		) , width : 160
					},{ dataIndex: 'sale_pric'	, text : Language.get(''	,'수수료'		) , width : 100 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'item_name'	, text : Language.get(''	,'입금통보일'		) , width : 100,align:'center'
					},{ dataIndex: 'item_name'	, text : Language.get(''	,'비고'			) , flex : 1 ,minWidth : 200,align:'center'
					}
				]
			}
		;
		return item;
	},
});
