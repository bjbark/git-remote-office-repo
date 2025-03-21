Ext.define('module.custom.sjflv.sale.export.nego.view.NegoWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-nego-worker-lister',
	store		: 'module.custom.sjflv.sale.export.nego.store.NegoWorkerLister',

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
					{	text : '<span class="write-button">Nego 등록</span>'	, action : 'invcAction'	, cls: 'button-style'	,itemId:'invc',width:120},
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
					},{	dataIndex: 'invc_numb'		, text : Language.get(''		,'BL No'	) , width : 120
					},{	dataIndex: 'invc_date'		, text : Language.get(''		,'BL Date'	) , width : 100 , align : 'center'
					},{	dataIndex: 'bzpl_idcd'		, text : Language.get(''		,'사업장'		) , width : 120 , align : 'center'
					},{	dataIndex: 'mngt_numb'		, text : Language.get(''		,'관리번호'	) , width : 120 , align : 'center'
					},{	dataIndex: 'expt_dvcd'		, text : Language.get(''		,'수출구분'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{ dataIndex: 'buyr_name'		, text : Language.get(''		,'Buyer'	) , width : 120
					},{ dataIndex: 'mdtn_prsn'		, text : Language.get(''		,'중개인'		) , width : 120
					},{ dataIndex: 'drtr_idcd'		, text : Language.get(''		,'담당자'		) , width : 100
					},{	dataIndex: 'pric_cond_dvcd'	, text : Language.get(''		,'가격조건'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex: 'trde_stot_dvcd'	, text : Language.get(''		,'결제방법'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex: 'trde_stot_dvcd'	, text : Language.get(''		,'결제시기'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex: 'deli_date'		, text : Language.get(''		,'결제기한'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{ dataIndex: 'mney_unit'		, text : Language.get(''		,'화폐단위'	) , width : 100
					},{ dataIndex: 'exrt'			, text : Language.get(''		,'통화'		) , width :  80 , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'exrt'			, text : Language.get(''		,'적용환율'	) , width :  80 , xtype : 'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	},
});
