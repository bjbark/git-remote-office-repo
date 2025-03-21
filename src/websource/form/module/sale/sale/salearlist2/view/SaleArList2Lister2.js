Ext.define('module.sale.sale.salearlist2.view.SaleArList2Lister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salearlist2-lister2',
	store		: 'module.sale.sale.salearlist2.store.SaleArList2Lister2',
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
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	)		, width : 160 ,
					},{ dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'일자'	)		, width : 100 , align : 'center',
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명')		, width : 160 ,
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격')		, width : 140 ,
					},{ dataIndex: 'sale_qntt'		, text : Language.get(''		,'출고수량'	)		, width : 100 , xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'sale_pric'		, text : Language.get(''		,'단가'	)		, width : 100 , xtype :'numericcolumn'
					},{ dataIndex: 'sply_amnt'		, text : Language.get(''		,'공급가'	)		, width : 100 , xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'		, text : Language.get(''		,'부가세'	)		, width : 100 , xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get(''		,'합계금액'	)		, width : 100 , xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'iomy_date'		, text : Language.get(''		,'수금일자'	)		, width : 100 , align : 'center'
					},{ dataIndex: 'iomy_amnt'		, text : Language.get(''		,'수금액'	)		, width : 100 , xtype :'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'urcp_amnt'		, text : Language.get(''		,'미수잔액'	)		, width : 100 , xtype :'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});