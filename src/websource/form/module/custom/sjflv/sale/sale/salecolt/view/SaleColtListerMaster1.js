Ext.define('module.custom.sjflv.sale.sale.salecolt.view.SaleColtListerMaster1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-salecolt-lister-master1',
	store		: 'module.custom.sjflv.sale.sale.salecolt.store.SaleColtMaster1',

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
					},{ dataIndex: 'user_name'		, text : Language.get(''		,'담당자'		) , width : 80
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get(''		,'합계금액'		) , width : 120 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'stot_dvcd'		, text : Language.get(''		,'결제구분'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('stot_dvcd')
					},{ dataIndex: 'paym_bank_name'	, text : Language.get(''		,'은행(발행인)명'	) , width : 150
					},{ dataIndex: 'stot_bass'		, text : Language.get(''		,'계좌(어음)번호'	) , width : 180
					},{ dataIndex: 'publ_date'		, text : Language.get(''		,'발행일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'expr_date'		, text : Language.get(''		,'만기일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'iomy_date'		, text : Language.get(''		,'어음입금일자'	) , width : 80  , align : 'center'
					},{ dataIndex: 'iomy_amnt'		, text : Language.get(''		,'어음입금액'	) , width : 120 , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'remk_text'		, text : Language.get(''		,'비고'		) , flex  : 1   ,
					}
				]
			}
		;
		return item;
	}
});