Ext.define('module.custom.sjflv.sale.sale.salearlist.view.SaleArListLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salearlist-lister2',
	store		: 'module.custom.sjflv.sale.sale.salearlist.store.SaleArListLister',
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
		me.dockedItems = [{xtype: 'module-salearlist-worker-search'}];
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
					{text : '<span class="write-button">인 쇄</span>', action : 'printAction'	, cls: 'button1-style'	} , 
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
					{	dataIndex: 'invc_date'	, text : Language.get('invc_date'	,'일자')	, width :  90 , align : 'center',
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'	,'적요')	, width : 232 , align : 'left',
					},{ dataIndex: 'sale_amnt'	, text : Language.get('sale_amnt'	,'판매')	, width : 105 , xtype :'numericcolumn', align : 'right',
					},{ dataIndex: 'colt_amnt'	, text : Language.get('colt_amnt'	,'수금')	, width : 105 , xtype :'numericcolumn', align : 'right',
					},{ dataIndex: 'npay_amnt'	, text : Language.get('npay_amnt'	,'잔액')	, width : 125 , xtype :'numericcolumn', align : 'right',
					}
				]
			}
		;
		return item;
	}
});