Ext.define('module.custom.sjflv.prod.prodmtrlcost.view.ProdMtrlCostLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodmtrlcost-lister2',
	store		: 'module.custom.sjflv.prod.prodmtrlcost.store.ProdMtrlCostLister2',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [ { ftype : 'grid-summary'}],
	plugins		: [ { ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'} ],

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('item_name') == '누계'){
				return 'text-blue';
			}
		}
	},

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				pagingButton : false,
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults	: {style: 'text-align: center'},
				items		: [
					{ dataIndex: 'item_name'		, text : Language.get('prod_nm'	,'자재명'			)	, width : 250 ,
					},{ dataIndex: 'batch_no'	, text : Language.get('batch_no'	,'Batch No'	)	, width : 100 ,
					},{ dataIndex: 'recipe_rate', text : Language.get('recipe_rate'	,'배합비'		)	, width :  70 , xtype :'numericcolumn', summaryType: 'sum', format	: '#,##0.#####'
					},{ dataIndex: 'used_amount', text : Language.get('used_amount'	,'사용량'		)	, width :  80 , xtype :'numericcolumn', summaryType: 'sum', format	: '#,##0.#####'
					},{ dataIndex: 'ostt_amnt'	, text : Language.get('ostt_amnt'	,'출고가격'	)	, width :  130 , xtype :'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});