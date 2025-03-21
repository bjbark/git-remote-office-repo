Ext.define('module.sale.project.salecolt.view.SaleColtDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salecolt-detail2',
	store		: 'module.sale.project.salecolt.store.SaleColtDetail2',
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	border		: 0,
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
					{	dataIndex: 'invc_numb'	, text : Language.get('colt_numb'	,'수금번호'		) , width : 110 , align : 'center',hidden:true
					},{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'순번'			) , width : 50 ,  align : 'center'
					},{	dataIndex: 'acpt_numb'	, text : Language.get('acpt_numb'	,'수주번호'		) , width : 100
					},{	dataIndex: 'acpt_seqn'	, text : Language.get('acpt_seqn'	,'수주순번'		) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum',hidden:true
					},{	dataIndex: 'assi_seqn'	, text : Language.get('assi_seqn'	,'보조순번'		) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum',hidden:true
					},{	dataIndex: 'sale_numb'	, text : Language.get('sale_numb'	,'매출번호'		) , width : 110
					},{	dataIndex: 'sale_seqn'	, text : Language.get('sale_seqn'	,'매출순번'		) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum',hidden:true
					},{	dataIndex: 'colt_dvcd'	, text : Language.get('colt_dvcd'	,'구분코드'		) , width : 100 ,  align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'colt_dvcd' ),align:'center'
					},{	dataIndex: 'colt_degr'	, text : Language.get('colt_degr'	,'수금차수'		) , width : 100 ,  align : 'center',hidden:true
					},{	dataIndex: 'plan_date'	, text : Language.get('plan_date'	,'계획일자'		) , width : 100 ,  align : 'center',hidden:true
					},{	dataIndex: 'plan_amnt'	, text : Language.get('plan_amnt'	,'계획금액'		) , width : 100 ,  align : 'center', xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'colt_amnt'	, text : Language.get('colt_amnt'	,'수금금액'		) , width : 100 ,  align : 'center', xtype : 'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});