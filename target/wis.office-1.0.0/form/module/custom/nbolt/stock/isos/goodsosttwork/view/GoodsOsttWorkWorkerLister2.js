Ext.define('module.custom.nbolt.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-nbolt-goodsosttwork-worker-lister2',
	split		: true,
	store		: 'module.custom.nbolt.stock.isos.goodsosttwork.store.GoodsOsttWorkWorkerLister2',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    },{ptype:'filterbar'}],

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
					,'->', '-' ,
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
					{	dataIndex: 'invc_date'		, text : Language.get('indn_date'		,'지시일자'		) , width : 80 , align : 'center',hidden:true
					},{	dataIndex: 'acpt_date'		, text : Language.get('acpt_date'		,'수주일자'		) , width : 80 , align : 'center',hidden:true
					},{	dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'		,'수주번호'		) , width : 110 , align : 'center'
					},{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처'			) , width : 160 , align : 'center'
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'			) , flex  : 70
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'			) , width : 180
					},{ dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'단위'			) , width : 60
					},{ dataIndex: 'trst_qntt'		, text : Language.get('trst_qntt'		,'의뢰수량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ostt_qntt'		, text : Language.get(''				,'납품수량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'unpaid'			, text : Language.get('unpaid'			,'미납잔량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ostt_qntt2'		, text : Language.get('ostt_qntt2'		,'출고수량'		) , width : 80  , xtype : 'numericcolumn'
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
										grid.plugins[0].startEdit(row, grid.columns[17]);
									}
								},
							}
						}
					},{ dataIndex: 'unpaid2'		, text : Language.get('unpaid2'			,'미납잔량2'	) , width : 80  , xtype : 'numericcolumn', hidden: true
					},{ dataIndex: 'sale_pric'		, text : Language.get('sale_pric'		,'단가'		) , width : 80  , xtype : 'numericcolumn'
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
										grid.plugins[0].startEdit(row, grid.columns[21]);
									}
								}
							}
						}
					},{ dataIndex: 'new_sale_amnt'		, text : Language.get('sale_amnt'		,'금액'		) , width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'new_vatx_amnt'		, text : Language.get('vatx_amnt'		,'부가세'		) , width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'new_ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'		) , width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'lot번호'	) , width : 100
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
										grid.plugins[0].startEdit(row, grid.columns[22]);
									}
								}
							}
						}
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		) , flex  : 30
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									if (e.keyCode == e.ENTER) {
										grid.plugins[0].startEdit(row+1, grid.columns[15]);
									}else if(e.keyCode == e.TAB){
										grid.plugins[0].startEdit(row, grid.columns[15]);
									}
								}
							}
						}
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (editor, context) {
		var me = this;
		var select;
		if(context.record){
			select = context.record;
		}else{
			select = context;
		}
		var a = select.get('trst_qntt');		//수주량
		var b = select.get('ostt_qntt');		//납품수량
		var c = select.get('unpaid');			//미납잔량
		var d = select.get('ostt_qntt2');		//출고수량
		var e = select.get('qntt');			//차이수량
		var f = select.get('unpaid2');		//미납2

		var g = select.get('sale_pric');		//단가
		var i = select.get('new_vatx_amnt');		//부가세
		var amnt = Math.floor(g*d/10)*10;	//금액
		var v = Math.floor(amnt*Number(_global.tax_rt)/1000)*10;				//부가세

		if(a<d || d<0 || c<d){
			Ext.Msg.alert("알림", "출고수량을 다시 입력해주십시오.");
			select.set('ostt_qntt2',0);
			return;
		}else if(a>=d){	//의뢰량이 출고수량보다 크거나 같으면
			select.set('unpaid2',Number(b)+Number(d));
			select.set('new_sale_amnt',amnt);
			select.set('new_vatx_amnt',v);
			select.set('new_ttsm_amnt',amnt+v);
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
