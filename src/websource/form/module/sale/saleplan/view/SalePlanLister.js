Ext.define('module.sale.saleplan.view.SalePlanLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-saleplan-lister',
	store		: 'module.sale.saleplan.store.SalePlan',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ftype :'grid-summary'}],
	border		: 0,
	columnLines : true,
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'},{ ptype:'filterbar'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'planlister',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'->', '-' ,
					{ text : Const.INSERT.text, iconCls : Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' },
					{ text : Const.DELETE.text, iconCls : Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' },
					'-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			cvic = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'user_name'		, text : Language.get(''				,'담당자'	) , width : 80  ,
					},{ dataIndex: 'cstm_name'		, text : Language.get(''				,'상호'		) , width : 100 ,
					},{ dataIndex: 'goal'			, text : Language.get(''				,'목표'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{ dataIndex: 'rslt'			, text : Language.get(''				,'실적'		) , width : 80  , xtype : 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{ dataIndex: 'percent'		, text : Language.get(''				,'달성율'	) , width : 60  , xtype : 'numericcolumn'
					}
				]
			}
		;
		return cvic;
	}
});
