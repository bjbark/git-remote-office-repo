Ext.define('module.sale.sale.salework.view.SaleWorkListerDetail2', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-salework-lister-detail2',
	store		: 'module.sale.sale.salework.store.SaleWorkListerDetail',
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
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'항번'		) , width : 40 , align : 'left'
					},{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'		) , width : 90 , align : 'left'
					},{	dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width : 200 , align : 'left'
					},{	dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 150 , align : 'left'
					},{	dataIndex: ''	, text : Language.get(''	,'단위'		) , width :  50 , xtype : 'numericcolumn'
					},{	dataIndex: ''	, text : Language.get(''	,'수량'		) , width :  80 , xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: ''	, text : Language.get(''	,'단가'		) , width :  100 , xtype : 'numericcolumn'
					},{	dataIndex: ''	, text : Language.get(''	,'공급가'		) , width :  150 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: ''	, text : Language.get(''	,'부가세'		) , width :  150 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: ''	, text : Language.get(''	,'합계금액'		) , width :  190 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: ''	, text : Language.get(''	,'비고'		) , flex  :  1
					}
				]
			};
		return item;
	}
 });