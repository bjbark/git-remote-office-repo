Ext.define('module.sale.sale.salecolt.view.SaleColtListerMaster1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salecolt-lister-master1',
	store		: 'module.sale.sale.salecolt.store.SaleColtMaster1',

	selModel	: { selType: 'checkboxmodel', mode : 'multi' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
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
					'-', '->', '-',
					{	text : '<span class="write-button">수금 삭제</span>', action : 'coltdeleteAction',cls: 'button-style', width: 100	},
					'->',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style', itemId : 'master'	}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{   dataIndex: 'invc_date'		, text : Language.get(''		,'수금일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'cstm_code'		, text : Language.get(''		,'거래처코드'	) , width : 100 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get(''		,'거래처명'		) , width : 130
					},{ dataIndex: 'dept_name'		, text : Language.get(''		,'부서'		) , width : 80
					},{ dataIndex: 'user_name'		, text : Language.get(''		,'담당자'		) , width : 80
					},{ dataIndex: 'sply_amnt'		, text : Language.get(''		,'공급가'		) , width : 100  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'		, text : Language.get(''		,'부가세'		) , width : 100  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get(''		,'합계금액'		) , width : 100  , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'stot_dvcd'		, text : Language.get(''		,'결제구분'		) , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('stot_dvcd')
					},{ dataIndex: 'stot_bass'		, text : Language.get(''		,'결제근거'		) , width : 80
					}
				]
			}
		;
		return item;
	}
});