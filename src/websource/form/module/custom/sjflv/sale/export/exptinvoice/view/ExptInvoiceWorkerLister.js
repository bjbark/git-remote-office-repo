Ext.define('module.custom.sjflv.sale.export.exptinvoice.view.ExptInvoiceWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-exptinvoice-worker-lister',
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
					{	text : '<span class="write-button">Invoice 등록</span>'	, action : 'invcAction'	, cls: 'button-style'	,itemId:'invc'},
//					{	text : '<span class="write-button">수금 등록</span>'		, action : 'coltAction'	, cls: 'button-style'	,itemId:'colt'}
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
					},{	dataIndex: 'new_invc_numb'	, text : Language.get(''		,'사업장'	) , width : 120 , align : 'center'
					},{	dataIndex: 'new_line_seqn'	, text : Language.get(''		,'Order No'	) , width : 120 , align : 'center'
					},{ dataIndex: 'trst_qntt'		, text : Language.get(''		,'AMD'		) , width : 60  , xtype : 'numericcolumn'
					},{	dataIndex: 'deli_date'		, text : Language.get(''		,'수출구분'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex: 'acpt_numb'		, text : Language.get(''		,'관리번호'	) , width : 120 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get(''		,'대표품목'	) , width : 100
					},{ dataIndex: 'item_name'		, text : Language.get(''		,'PO Date'	) , width : 100
					},{	dataIndex: 'deli_date'		, text : Language.get(''		,'Ship Via'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{ dataIndex: 'work_item_name'	, text : Language.get(''		,'Buyer'	) , width : 120
					},{ dataIndex: 'work_item_name'	, text : Language.get(''		,'중개인'	) , width : 120
					},{ dataIndex: 'work_item_name'	, text : Language.get(''		,'담당자'	) , width : 100
					},{	dataIndex: 'deli_date'		, text : Language.get(''		,'가격조건'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex: 'deli_date'		, text : Language.get(''		,'결제방법'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex: 'deli_date'		, text : Language.get(''		,'결제시기'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex: 'deli_date'		, text : Language.get(''		,'결제기한'	) , width : 100 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{ dataIndex: 'unpaid'			, text : Language.get(''		,'통화'		) , width :  80 , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'unpaid'			, text : Language.get(''		,'적용환율'	) , width :  80 , xtype : 'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	},
});
