Ext.define('module.custom.sjflv.sale.sale.salework.view.SaleWorkListerDetail2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-salework-lister-detail2',
	store		: 'module.custom.sjflv.sale.sale.salework.store.SaleWorkListerDetail2',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],


	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {

		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , itemId:'saleWorkDetail2' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'항번'		) , width : 40 , align : 'center'
					},{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'	) , width : 90 , align : 'left'
					},{	dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width : 200 , align : 'left'
					},{	dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 150 , align : 'left'
					},{	dataIndex: 'unit_name'	, text : Language.get('unit_name'	,'단위'		) , width :  50
					},{	dataIndex: 'ostt_qntt'	, text : Language.get('ostt_qntt'	,'수량'		) , width :  80 , xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'sale_pric'	, text : Language.get('sale_pric'	,'단가'		) , width :  100 , xtype : 'numericcolumn'
					},{	dataIndex: 'sale_amnt'	, text : Language.get('sale_amnt'	,'공급가'	) , width :  150 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'vatx_amnt'	, text : Language.get('vatx_amnt'	,'부가세'	) , width :  150 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'합계금액'	) , width :  190 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'		) , minWidth :  200 , flex  :  1
					}
				]
			};
		return item;
	}
 });