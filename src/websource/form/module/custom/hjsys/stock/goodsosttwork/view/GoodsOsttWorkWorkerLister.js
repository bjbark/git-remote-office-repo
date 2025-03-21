Ext.define('module.custom.hjsys.stock.goodsosttwork.view.GoodsOsttWorkWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-hjsys-goodsosttwork-worker-lister',
	split		: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-hjsys-goodsosttwork-worker-search'}];
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
					'->', '-' ,
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'),hidden : true
					},{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'번호'		) , width : 100 , align : 'center', hidden: true
					},{	dataIndex: 'new_invc_numb'	, text : Language.get('new_invc_numb'	,'번호'		) , width : 100 , align : 'center', hidden: true
					},{	dataIndex: 'new_line_seqn'	, text : Language.get('new_line_seqn'	,'순번'		) , width : 100 , align : 'center', hidden: true
					},{	dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'	) , width : 80 , align : 'center'
					},{	dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'		,'수주번호'	) , width : 110 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처'	) , width : 200
					},{ dataIndex: 'item_name'		, text : Language.get(''				,'모델명'	) , width : 200
					},{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		) , width : 50  , align : 'center', hidden: true
					},{ dataIndex: 'work_item_name'	, text : Language.get('work_item_name'	,'품명'		) , width : 200
					},{ dataIndex: 'trst_qntt'		, text : Language.get('trst_qntt'		,'의뢰수량'	) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ostt_qntt'		, text : Language.get(''				,'납품수량'	) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'unpaid'			, text : Language.get('unpaid'			,'미납잔량'	) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ostt_qntt2'		, text : Language.get('ostt_qntt2'		,'출고수량'	) , width : 80  , xtype : 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[15]);
									}
								}
							}
						}
					},{ dataIndex: 'unpaid2'		, text : Language.get('unpaid2'			,'미납잔량2'	) , width : 80  , xtype : 'numericcolumn', hidden: true
					},{ dataIndex: 'sale_pric'		, text : Language.get('sale_pric'		,'단가'		) , width : 80  , xtype : 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row+1, grid.columns[14]);
									}
								}
							}
						}
					},{ dataIndex: 'new_sale_amnt'	, text : Language.get('new_sale_amnt'	,'금액'		) , width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'new_vatx_amnt'	, text : Language.get('new_vatx_amnt'	,'부가세'	) , width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'new_ttsm_amnt'	, text : Language.get('new_ttsm_amnt'	,'합계금액'	) , width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		) , flex  : 30
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
						}
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (editor, context) {
		var me = this;
		var a = this.getSelectionModel().getSelection()[0].data.trst_qntt;		//수주량
		var b = this.getSelectionModel().getSelection()[0].data.ostt_qntt;		//납품수량
		var c = this.getSelectionModel().getSelection()[0].data.unpaid;			//미납잔량
		var d = this.getSelectionModel().getSelection()[0].data.ostt_qntt2;		//출고수량
		var e = this.getSelectionModel().getSelection()[0].data.qntt;			//차이수량
		var f = this.getSelectionModel().getSelection()[0].data.unpaid2;		//미납2
		var g = this.getSelectionModel().getSelection()[0].data.sale_pric;		//단가
		var i = this.getSelectionModel().getSelection()[0].data.new_vatx_amnt;	//부가세
		var amnt = Math.floor(g*d/10)*10;	//금액
		var v = Math.floor(amnt*Number(_global.tax_rt)/1000)*10;		//부가세
		var grid = this;
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var models = grid.getStore().getRange();

		if(a<d || d<0 || c<d){
			Ext.Msg.alert("알림", "출고수량을 다시 입력해주십시오.");
			models[pos].set('ostt_qntt2',0);
			return;
		}else if(a>=d){	//수주량이 출고수량보다 크거나 같으면
			models[pos].set('unpaid2',Number(b)+Number(d));
			models[pos].set('new_sale_amnt',amnt);
			models[pos].set('new_vatx_amnt',v);
			models[pos].set('new_ttsm_amnt',amnt+v);
		}
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	}
});
