Ext.define('module.sale.sale.initstay.view.InitStayWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-initstay-worker-lister',
	store		: 'module.sale.sale.initstay.store.InitStayWorkerLister',

	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var rowIndexNum;
		var me = this;
		me.dockedItems = [{xtype: 'module-initstay-worker-search'}];
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
				xtype : 'grid-paging',
				items : [
					{	xtype	: 'button',
						iconCls	: 'filterIcon',
						toggleGroup:'master',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'->', '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				], pagingButton : true
			}
		;
		return item ;
	},




	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'cstm_code'		, width: 100, align : 'center'	, text: Language.get('cstm_code'	, '거래처코드')
					},{	dataIndex:	'cstm_name'		, width: 200, align : 'left'	, text: Language.get('cstm_name'	, '거래처명'	)
					},{	dataIndex:	'invc_numb'		, width: 100, align : 'left'	, text: Language.get('invc_numb'	, '출고번호'	)
					},{	dataIndex:	'invc_date'		, width:  90, align : 'center'	, text: Language.get('invc_date'	, '출고일자'	)
					},{	dataIndex:	'deli_date'		, width:  90, align : 'center'	, text: Language.get('deli_date'	, '납기일자'	)
					},{	dataIndex:	'line_seqn'		, width:  40, align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex:	'item_code'		, width:  80, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex:	'item_name'		, width: 290, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'ostt_qntt'		, width:  70, align : 'right'	, text: Language.get('ostt_qntt'	, '수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'sale_pric'		, width:  80, align : 'right'	, text: Language.get('sale_pric'	, '단가'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'sale_amnt'		, width: 100, align : 'right'	, text: Language.get('sale_amnt'	, '금액'		), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0.###'
					},{	dataIndex:	'vatx_amnt'		, width:  90, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세'	), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0.###'
					},{	dataIndex:	'ttsm_amnt'		, width: 110, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0.###'
					},{	dataIndex:	'lott_numb'		, width: 100, align : 'left'	, text: Language.get('lott_numb'	, 'Batch No')
//					},{	dataIndex:	'user_memo'		, width: 160, align : 'left'	, text: Language.get('user_memo'	, '비고'		)
					},{	dataIndex:	'acpt_dvcd'		, width : 65, align : 'center'	, text: Language.get('user_memo'	, '수주구분'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('acpt_dvcd')
					},{	dataIndex:	'prod_trst_dvcd', width : 65, align : 'center'	, text: Language.get('user_memo'	, '생산구분'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('prod_trst_dvcd')
					}
				]
			}
		;
		return item;
	},
});
