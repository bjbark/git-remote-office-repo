Ext.define('module.custom.sjflv.sale.export.blmast.view.BlMastWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-blmast-worker-lister',
	store		: 'module.custom.sjflv.sale.export.blmast.store.BlMastWorkerLister',
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '<span class="write-button">수출신고필증 입력</span>'	, action : 'invcAction'	, cls: 'button-style'	,itemId:'invc',width:120},
					,'->', '-' ,
					{	text: Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action ,cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_stat'		, text : Language.get(''		,'상태'		) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'bzpl_idcd'		, text : Language.get(''		,'사업장'	) , width : 120 , align : 'center'
					},{	dataIndex: 'invc_numb'		, text : Language.get(''		,'Order No'	) , width : 120 , align : 'center'
					},{ dataIndex: 'amnd_degr'		, text : Language.get(''		,'AMD'		) , width : 60  , xtype : 'numericcolumn'
					},{	dataIndex: 'expt_dvcd'		, text : Language.get(''		,'수출구분'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex: 'mngt_numb'		, text : Language.get(''		,'관리번호'	) , width : 120 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get(''		,'대표품목'	) , width : 100
					},{ dataIndex: 'cstm_pcod_numb'	, text : Language.get(''		,'PO Date'	) , width : 100
					},{	dataIndex: 'ship_viaa_dvcd'	, text : Language.get(''		,'Ship Via'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{ dataIndex: 'buyr_name'		, text : Language.get(''		,'Buyer'	) , width : 120
					},{ dataIndex: 'mdtn_prsn'		, text : Language.get(''		,'중개인'		) , width : 120
					},{ dataIndex: 'drtr_idcd'		, text : Language.get(''		,'담당자'		) , width : 100
					},{	dataIndex: 'pric_cond_dvcd'	, text : Language.get(''		,'가격조건'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex: 'trde_stot_dvcd'	, text : Language.get(''		,'결제방법'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex: 'stot_time_dvcd'	, text : Language.get(''		,'결제시기'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex: 'stot_ddln'		, text : Language.get(''		,'결제기한'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{ dataIndex: 'mney_unit'		, text : Language.get(''		,'통화'		) , width :  80 , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'exrt'			, text : Language.get(''		,'적용환율'	) , width :  80 , xtype : 'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	},
});
