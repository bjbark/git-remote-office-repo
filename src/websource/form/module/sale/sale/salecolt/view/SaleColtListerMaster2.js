Ext.define('module.sale.sale.salecolt.view.SaleColtListerMaster2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salecolt-lister-master2',
	store		: 'module.sale.sale.salecolt.store.SaleColtMaster2',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					{	text : '<span class="write-button">부품식별표 발행</span>'	, action : 'PrintAction1'	, cls: 'button1-style'	,width:  90,
						hidden	: (_global.stor_id.toUpperCase() != 'N1000KITEC1000'?true:false)} ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'		, text : Language.get(''	,'매출일자'		) , width : 100 , align : 'center'
					},{ dataIndex: 'cstm_code'		, text : Language.get(''	,'거래처코드'	) , width : 100 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get(''	,'거래처명'		) , width : 140
					},{ dataIndex: 'sale_amnt'		, text : Language.get(''	,'공급가'		) , width : 80  , xtype:'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'		, text : Language.get(''	,'부가세'		) , width : 80  , xtype:'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get(''	,'합계금액'		) , width : 80  , xtype:'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'iomy_amnt'		, text : Language.get(''	,'수금액'		) , width : 80  , xtype:'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'npay_amnt'		, text : Language.get(''	,'미수잔액'		) , width : 80  , xtype:'numericcolumn' , summaryType: 'sum'
					},{ dataIndex: 'tele_numb'		, text : Language.get(''	,'전화번호'		) , width : 100
					},{ dataIndex: 'buss_numb'		, text : Language.get(''	,'사업자등록번호'	) , width : 120
					},{ dataIndex: 'mail_addr'		, text : Language.get(''	,'이메일'		) , width : 140
					},{ dataIndex: 'dept_name'		, text : Language.get(''	,'부서'		) , width : 80
					},{ dataIndex: 'user_name'		, text : Language.get(''	,'담당자'		) , width : 80
					}
				]
			}
		;
		return item;
	}
});