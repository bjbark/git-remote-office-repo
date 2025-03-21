Ext.define('module.custom.sjflv.mtrl.isttcalc.initstay2.view.InitStay2WorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-mtrl-initstay2-worker-lister',
	store		: 'module.custom.sjflv.mtrl.isttcalc.initstay2.store.InitStay2WorkerLister',

	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var rowIndexNum;
		var me = this;
		me.dockedItems = [{xtype: 'module-mtrl-initstay2-worker-search'}];
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
					{	dataIndex:	'invc_numb'		, width: 100, align : 'left'	, text: Language.get('invc_numb'	, '입고번호'	)
					},{	dataIndex:	'line_seqn'		, width:  60, align : 'center'	, text: Language.get('line_seqn'	, '입고항번'	)
					},{	dataIndex:	'invc_date'		, width:  90, align : 'center'	, text: Language.get('invc_date'	, '입고일자'	)
					},{	dataIndex:	'cstm_code'		, width: 100, align : 'center'	, text: Language.get('cstm_code'	, '거래처코드')
					},{	dataIndex:	'cstm_name'		, width: 250, align : 'left'	, text: Language.get('cstm_name'	, '거래처명'	)
					},{	dataIndex:	'item_code'		, width:  70, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex:	'item_name'		, width: 250, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, width: 140, align : 'left'	, text: Language.get('item_name'	, '규격'		)
					},{	dataIndex:	'istt_qntt'		, width:  70, align : 'right'	, text: Language.get('ostt_qntt'	, '수량'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'istt_pric'		, width:  80, align : 'right'	, text: Language.get('sale_pric'	, '단가'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'istt_amnt'		, width: 100, align : 'right'	, text: Language.get('sale_amnt'	, '금액'		), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0.###'
					},{	dataIndex:	'istt_vatx'		, width:  90, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세'	), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0.###'
					},{	dataIndex:	'ttsm_amnt'		, width: 110, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format: '#,##0.###'
					},{	dataIndex:	'lott_numb'		, width: 100, align : 'left'	, text: Language.get('lott_numb'	, 'Batch No')
					},{	dataIndex:	'user_memo'		, width: 160, align : 'left'	, text: Language.get('user_memo'	, '비고'		)
					}
				]
			}
		;
		return item;
	},
});
