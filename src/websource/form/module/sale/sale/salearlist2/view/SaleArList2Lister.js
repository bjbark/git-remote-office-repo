Ext.define('module.sale.sale.salearlist2.view.SaleArList2Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salearlist2-lister',
	store		: 'module.sale.sale.salearlist2.store.SaleArList2Lister',
//	selModel	: { selType: 'checkboxmodel', mode : 'multi' },
	border		: 0,
	columnLines : true,
	features	: [ { ftype : 'grid-summary'}],
	plugins		: [ { ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'} ],
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
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				], pagingButton : false
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults	: {style: 'text-align: center'},
				items		: [
					{	dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드')		, width : 70 , align : 'center',
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명')		, width : 160 , align : 'left',
					},{ dataIndex: 'bmon_amnt'		, text : Language.get('bmon_amnt'		,'전월잔액')		, width : 100 , align : 'right', xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'cumn_sale'		, text : Language.get('cumn_sale'		,'당월매출')		, width : 100 , align : 'right', xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'cumn_iamt'		, text : Language.get('cumn_iamt'		,'당월입금')		, width : 100 , align : 'right', xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'urcp_amnt'		, text : Language.get('urcp_amnt'		,'미수잔액')		, width : 100 , align : 'right', xtype :'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});