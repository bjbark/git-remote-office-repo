Ext.define('module.custom.sjflv.sale.sale.salearlist2.view.SaleArList2Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salearlist2-lister',
	store		: 'module.custom.sjflv.sale.sale.salearlist2.store.SaleArList2',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					{	dataIndex: 'cstm_code'	, text : Language.get('cstm_code'	,'거래처코드'	)	, width :  80 , align : 'center',
					},{ dataIndex: 'cstm_name'	, text : Language.get('cstm_name'	,'거래처명'		)	, width : 100 , align : 'left',
					},{ dataIndex: 'base_amnt'	, text : Language.get(''			,'기초채권'		)	, width :  90 , align : 'right', xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'sale_amnt'	, text : Language.get(''			,'매출'		)	, width :  95 , align : 'right', xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'	, text : Language.get(''			,'입금'		)	, width :  95 , align : 'right', xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'npay_amnt'	, text : Language.get(''			,'잔액'		)	, width :  95 , align : 'right', xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'drtr_name'	, text : Language.get(''			,'담당자명'		)	, width :  75	
					}
				]
			}
		;
		return item;
	}
});