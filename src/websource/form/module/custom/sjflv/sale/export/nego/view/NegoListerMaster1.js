Ext.define('module.custom.sjflv.sale.export.nego.view.NegoListerMaster1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-nego-lister-master1',
	store		: 'module.custom.sjflv.sale.export.nego.store.NegoListerMaster1',

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
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat','상태'			) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{ dataIndex: 'invc_numb'		, text : Language.get(''		,'Nego No'		) , width : 100  ,
					},{ dataIndex: 'invc_date'		, text : Language.get(''		,'Nego 일자'		) , width : 100  , align : 'center'
					},{	dataIndex: 'bzpl_idcd'		, text : Language.get(''		,'사업장'			) , width : 120
					},{	dataIndex: 'mngt_numb'		, text : Language.get(''		,'관리번호'		) , width : 120 , align : 'center'
					},{	dataIndex: 'expt_dvcd'		, text : Language.get(''		,'수출구분'		) , width :  80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{ dataIndex: 'ship_date'		, text : Language.get(''		,'선적일자'		) , width : 100  , align : 'center'
					},{ dataIndex: 'buyr_name'		, text : Language.get(''		,'Buyer'		) , width : 100  ,
					},{ dataIndex: 'mdtn_prsn'		, text : Language.get(''		,'중개인'			) , width : 100  ,
					},{ dataIndex: 'drtr_idcd'		, text : Language.get('drtr_idcd','담당자'		) , width : 100
					},{	dataIndex: 'pric_cond_dvcd'	, text : Language.get(''		,'가격조건'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'trde_stot_dvcd'	, text : Language.get(''		,'결제방법'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'stot_time_dvcd'	, text : Language.get(''		,'결제시기'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{ dataIndex: 'drtr_name'		, text : Language.get(''		,'결제기한'		) , width : 80, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'mney_unit'		, text : Language.get(''		,'화폐단위'		) , width : 80
					},{ dataIndex: 'krwn_amnt'		, text : Language.get(''		,'통화'			) , width : 80
					},{ dataIndex: 'exrt'			, text : Language.get(''		,'적용환율'		) , width : 80, xtype:'numericcolumn'
					},{ dataIndex: 'advc_yorn'		, text : Language.get(''		,'선수금여부'		) , width : 80
					},{ dataIndex: 'proc_cmpl_yorn'	, text : Language.get(''		,'처리완료'		) , width : 80
					},{ dataIndex: 'proc_amnt'		, text : Language.get(''		,'처리금액'		) , width : 80, xtype:'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'diff_amnt'		, text : Language.get(''		,'차이금액'		) , width : 80, xtype:'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});