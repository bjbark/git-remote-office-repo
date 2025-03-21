Ext.define('module.sale.spts.sptsmast.view.SptsMastWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sptsmast-worker-lister',
	split		: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-sptsmast-worker-search'}];
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
					'->', '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				], pagingButton : false
			}
		;
		return item ;
	},




	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_stat'		, width : 50, align : 'center'	, text: Language.get('line_stat'		, '상태'		)  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'),hidden : true
					},{	dataIndex: 'acpt_stat_dvcd'	, width:  60, align : 'center'	, text: Language.get('acpt_stat_dvcd'	, '진행상태'	)  , xtype : 'lookupcolumn', lookupValue : resource.lookup('acpt_stat_dvcd'),hidden : true
					},{	dataIndex: 'invc_numb'		, width: 120, align : 'center'	, text: Language.get('acpt_numb'		, '수주번호'	)
					},{	dataIndex: 'pcod_numb'		, width: 110, align : 'center'	, text: Language.get('pcod_numb'		, '고객주문번호'	)
					},{	dataIndex: 'cstm_lott_numb'	, width:  80, align : 'center'	, text: Language.get('cstm_lott_numb'	, 'LOT번호'	)
					},{	dataIndex: 'invc_date'		, width:  80, align : 'center'	, text: Language.get('acpt_date'		, '주문일자'	)
					},{	dataIndex: 'item_code'		, width: 120, align : 'center'	, text: Language.get('item_code'		, '품목코드'	)
					},{	dataIndex: 'item_name'		, flex :  80, minWidth : 200 	,maxWidth : 350, align : 'left'	, text: Language.get('item_name'		, '품명'		)
					},{	dataIndex: 'item_spec'		, width: 120, align : 'left'	, text: Language.get('item_spec'		, '규격'		)
					},{	dataIndex: 'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'		, '단위'		)
					},{	dataIndex: 'invc_qntt'		, width:  70, align : 'right'	, text: Language.get('invc_qntt'		, '수주수량'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'trst_qntt'		, width:  70, align : 'right'	, text: Language.get('ostt_qntt'		, '출고수량'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'not_trst_qntt'	, width:  70, align : 'right'	, text: Language.get('not_trst_qntt'	, '미출잔량'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'deli_date'		, width:  80, align : 'center'	, text: Language.get('deli_date'		, '납기일자'	)
					},{	dataIndex: 'spts_qntt'		, width:  90, align : 'right'	, text: Language.get('spts_qntt'		, '의뢰수량'	), xtype: 'numericcolumn', summaryType: 'sum'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
						},
					},{	dataIndex:	'invc_pric'		, width:  80, align : 'right'	, text: Language.get('invc_pric'	, '단가'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'sply_amnt'		, width:  80, align : 'right'	, text: Language.get('sply_amnt'	, '금액'		), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'vatx_amnt'		, width:  80, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'invc_amnt'		, width:  80, align : 'right'	, text: Language.get('invc_amnt'	, '합계금액'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'user_memo'		, flex :  20, align : 'left'	, text: Language.get('user_memo'	, '비고'		)
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (lister2, context) {
		var me = this;
		var a = this.getSelectionModel().getSelection()[0].data.trst_qntt;		//수주량
		var c = this.getSelectionModel().getSelection()[0].data.not_trst_qntt;	//미납잔량
		var d = this.getSelectionModel().getSelection()[0].data.spts_qntt;		//출고수량
		var g = this.getSelectionModel().getSelection()[0].data.invc_pric;		//단가
		var amnt = Math.floor(g*d/10)*10;	//금액
		var v = Math.floor(amnt*Number(_global.tax_rt)/1000)*10;		//부가세
		var grid = this;
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var models = grid.getStore().getRange();
		if( c<d){
			Ext.Msg.alert("알림", "출고수량을 다시 입력해주십시오.");
			models[pos].set('spts_qntt',0);
			return;
		}else{
			models[pos].set('new_sale_amnt',amnt);
			models[pos].set('new_vatx_amnt',v);
			models[pos].set('new_ttsm_amnt',amnt+v);
		}
		var	store = me.getStore(),
			selection = me.getSelectionModel().getSelection()[0],
			row = store.indexOf(selection)
		;
		grid.plugins[0].startEdit(row+1,15);
	},

	listeners: {
		validateedit : function (lister2, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit : function(lister2, context) {
			var me = this;
			me.cellEditAfter(lister2, context);
		}
	}
});
