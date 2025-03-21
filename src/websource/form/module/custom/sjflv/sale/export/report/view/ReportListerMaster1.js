Ext.define('module.custom.sjflv.sale.export.report.view.ReportListerMaster1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-report-lister-master1',
	store		: 'module.custom.sjflv.sale.export.report.store.ReportMaster1',

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
					{	text : '<span class="write-button">부대비용 등록</span>'	, action : 'inexAction'	, cls: 'button-style'	,itemId:'inex'},
					'-', '->', '-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style'} ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style'} ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style'} ,'-' ,
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
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'			) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{ dataIndex: 'cstm_name'		, text : Language.get(''		,'사업장'		) , width : 160  ,
					},{	dataIndex: 'invc_numb'		, text : Language.get(''		,'수출통관번호'	) , width : 120 , align : 'center'
					},{	dataIndex: 'invc_numb'		, text : Language.get(''		,'연장번호'		) , width : 120 , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get(''		,'신고일자'		) , width : 100  , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get(''		,'통관일자'		) , width : 100  , align : 'center'
					},{ dataIndex: 'entr_char_numb'	, text : Language.get(''		,'통관고유번호'	) , width : 100  , align : 'center'
					},{	dataIndex: 'line_stat'		, text : Language.get(''		,'수출구분'		) , width :  80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{ dataIndex: 'cstm_name'		, text : Language.get(''		,'Buyer'		) , width : 100  ,
					},{ dataIndex: 'cstm_name'		, text : Language.get(''		,'중개인'		) , width : 100  ,
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'담당자'	) , width : 100
					},{ dataIndex: 'invc_date'		, text : Language.get(''		,'신고수리일'		) , width : 100  , align : 'center'
					},{	dataIndex: 'invc_numb'		, text : Language.get(''		,'무역입고고유번호'	) , width : 120 , align : 'center'
					},{	dataIndex: 'line_stat'		, text : Language.get(''		,'수출자구분'		) , width :  80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{ dataIndex: 'deli_date'		, text : Language.get(''		,'구매자부호'		) , width : 100  , align : 'center'
					},{	dataIndex: 'line_stat'		, text : Language.get(''		,'면장거래구분'		) , width :  80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'line_stat'		, text : Language.get(''		,'면장수출구분'		) , width :  80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'line_stat'		, text : Language.get(''		,'가격조건'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'line_stat'		, text : Language.get(''		,'결제방법'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'line_stat'		, text : Language.get(''		,'결제시기'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{ dataIndex: 'drtr_name'		, text : Language.get(''		,'결제기한'		) , width : 80, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'line_stat'		, text : Language.get(''		,'Ship Via'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'line_stat'		, text : Language.get(''		,'운송형태'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{ dataIndex: 'gods_dvcd'		, text : Language.get(''		,'재화구분'		) , width : 80,
					},{ dataIndex: 'mney_unit'		, text : Language.get(''		,'화폐단위'		) , width : 80,
					},{ dataIndex: 'drtr_name'		, text : Language.get(''		,'통화'			) , width : 80
					},{ dataIndex: 'drtr_name'		, text : Language.get(''		,'적용환율'		) , width : 80, xtype:'numericcolumn'
					}
				]
			}
		;
		return item;
	}
});