Ext.define('module.sale.project.salework.view.SaleWorkListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salework-lister-detail',
	store		: 'module.sale.project.salework.store.SaleWorkDetail',
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
					{	dataIndex: 'invc_numb'	, text : Language.get('publ_numb'	,'발행번호'		) , width : 110 , align : 'center',hidden:true
					},{	dataIndex: 'acpt_numb'	, text : Language.get('acpt_numb'	,'금형번호'		) , width : 100 ,  align : 'center'
					},{	dataIndex: 'sale_amnt'	, text : Language.get('sale_amnt'	,'공급가'		) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'vatx_amnt'	, text : Language.get('vatx_amnt'	,'부가세'		) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'합계금액'		) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'colt_amnt'	, text : Language.get('colt_amnt'	,'수금액'		) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'yotp_amnt'	, text : Language.get('yotp_amnt'	,'미수잔액'		) , width :  100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'		) , flex : 1 ,  align : 'center'
					}
				]
			}
		;
		return item;
	}
});