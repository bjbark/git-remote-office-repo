Ext.define('module.custom.symct.sale.prjtprocess.view.PrjtProcessListerDetail8', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtprocess-lister-detail8',
	store		: 'module.custom.symct.sale.prjtprocess.store.PrjtProcessDetail8',
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines	: true,
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
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'colt_dvcd'		, text : Language.get('colt_dvcd'	,'결제구분'		) , width  : 200 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('colt_dvcd'), align : 'center'
					},{ dataIndex: 'colt_degr'		, text : Language.get('colt_degr'	,'차수'			) , width  : 50  , align : 'center'  , xtype : 'numericcolumn'
					},{ dataIndex: 'plan_date'		, text : Language.get('plan_date '	,'예정일자'		) , width  : 100 , align : 'center'
					},{ dataIndex: 'plan_amnt'		, text : Language.get('plan_amnt'	,'예정금액'		) , width  : 120 , align : 'right'  , xtype : 'numericcolumn'
					},{ dataIndex: 'colt_date'		, text : Language.get('colt_date '	,'수금일자'		) , width  : 100 , align : 'center',
						renderer:function(val){
							a =Ext.util.Format.strToDate(val);
							return a;
						}
					},{ dataIndex: 'colt_amnt'		, text : Language.get('colt_amnt'	,'수금금액'		) , width  : 120 , align : 'right'  , xtype : 'numericcolumn'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'	,'담당자'		) , width  : 100
					}
				]
			}
		;
		return item;
	}
});