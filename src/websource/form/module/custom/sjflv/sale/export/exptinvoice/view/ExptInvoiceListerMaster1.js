Ext.define('module.custom.sjflv.sale.export.exptinvoice.view.ExptInvoiceListerMaster1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-exptinvoice-lister-master1',
	store		: 'module.custom.sjflv.sale.export.exptinvoice.store.ExptInvoiceMaster1',

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
					},{ dataIndex: 'bzpl_name'		, text : Language.get('bzpl_name'		,'사업장'		) , width : 160  ,
					},{	dataIndex: 'paym_numb'		, text : Language.get('paym_numb'		,'Payment No'	) , width : 120 , align : 'center'
					},{ dataIndex: 'paym_date'		, text : Language.get('paym_date'		,'입금일자'		) , width : 100  , align : 'center'
					},{	dataIndex: 'expt_dvcd'		, text : Language.get('expt_dvcd'		,'수출구분'		) , width :  80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('expt_dvcd')
					},{	dataIndex: 'mngt_numb'		, text : Language.get('mngt_numb'		,'관리번호'		) , width : 120 , align : 'center'
					},{ dataIndex: ''		, text : Language.get(''		,'PO Date'		) , width : 100  , align : 'center'
					},{ dataIndex: 'buyr_name'		, text : Language.get('buyr_name'		,'Buyer'		) , width : 100  ,
					},{ dataIndex: 'mdtn_prsn'		, text : Language.get('mdtn_prsn'		,'중개인'		) , width : 100  ,
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'담당자'		) , width : 100
					},{	dataIndex: 'pric_cond_dvcd'	, text : Language.get('pric_cond_dvcd'	,'가격조건'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('pric_cond_dvcd')
					},{	dataIndex: 'trde_stot_dvcd'	, text : Language.get('trde_stot_dvcd'	,'결제방법'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('trde_stot_dvcd')
					},{	dataIndex: 'stot_time_dvcd'	, text : Language.get('stot_time_dvcd'	,'결제시기'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('stot_time_dvcd')
					},{ dataIndex: 'stot_ddln'		, text : Language.get('stot_ddln'		,'결제기한'		) , width : 80
					},{ dataIndex: 'mney_unit'		, text : Language.get('mney_unit'		,'통화'			) , width : 80
					},{ dataIndex: 'exrt'			, text : Language.get('exrt'		,'적용환율'		) , width : 80, xtype:'numericcolumn'
					/*},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'			) , flex  :  1, minWidth : 200*/
					}
				]
			}
		;
		return item;
	}
});