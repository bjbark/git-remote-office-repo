Ext.define('module.custom.iypkg.etc.trsfwork.view.TrsfWorkWorkerLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-trsfwork-worker-lister2',
	store		: 'module.custom.iypkg.etc.trsfwork.store.TrsfWorkWorkerLister2',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype :'cellediting-directinput', clicksToEdit: 1 } ],

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
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'		,'수주번호'		) , width : 100 , align : 'center'
					},{	dataIndex: 'prod_code'		, text : Language.get('prod_code'		,'품목코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'prod_name'		, text : Language.get('prod_name'		,'품목명'		) , width : 230 , align : 'left'
					},{ dataIndex: 'prod_spec'		, text : Language.get('prod_spec'		,'규격'		) , width : 130 , align : 'left'
					},{ dataIndex: 'ostt_qntt'		, text : Language.get('ostt_qntt'		,'배차량'		) , width :  80 , align : 'right', xtype: 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'm2'				, text : Language.get(''				,'총m2'		) , width :  80 , align : 'right', xtype: 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: ''				, text : Language.get(''				,'비고'		) , flex  :   1 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});