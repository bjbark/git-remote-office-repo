Ext.define('module.custom.sjflv.sale.sale.salework.view.SaleWorkListerDetail', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-salework-lister-detail',
	store		: 'module.custom.sjflv.sale.sale.salework.store.SaleWorkListerDetail',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary', remote : false }],
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
					{	xtype: 'rownumberer'	     , width: 40  , text: '항번'          , align : 'center'
					},{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'항번'		) , width : 40 , align : 'center',hidden:true
					},{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'	) , width : 90 , align : 'left'
					},{	dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width : 200 , align : 'left'
					},{	dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 150 , align : 'left'
					},{	dataIndex: 'qntt'		, text : Language.get('qntt'		,'수량'		) , width :   80 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'sply_pric'	, text : Language.get('sply_pric'	,'단가'		) , width :  100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'sply_amnt'	, text : Language.get('sply_amnt'	,'공급가'	) , width :  150 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'vatx_amnt'	, text : Language.get('vatx_amnt'	,'부가세'	) , width :  150 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'합계금액'	) , width :  190 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'remk_text'	, text : Language.get('remk_text'	,'비고'		) , flex  :  1
					}
				]
			};
		return item;
	}
 });