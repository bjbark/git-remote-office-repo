Ext.define('module.custom.komec.stock.isos.prodosttwork.view.ProdOsttWorkWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-prodosttwork-worker-lister',
//	store  : 'module.custom.komec.stock.isos.prodosttwork.store.ProdOsttWorkWorkerLister',
	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType:'cellmodel'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var rowIndexNum;
		var me = this;
		me.dockedItems = [{xtype: 'module-prodosttwork-worker-search'}];
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style'}, '-'
				], pagingButton : false
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_seqn'	, width: 50	, align:'center'	, text: '순번'		},
					{	dataIndex: 'item_code'	, width: 110	, align:'left'	, text: '품목코드'	},
					{	dataIndex: 'item_name'	, width: 200	, align:'left'	, text: '품명'		, summaryType : 'count' },
					{	dataIndex: 'item_spec'	, width: 150	, align:'left'	, text: '규격'		},
					{	dataIndex: 'unit_name'	, width:  45	, align:'left'	, text: '단위'		},
					{	dataIndex: 'lott_numb'	, width: 110	, align:'left'	, text: 'LOT번호'	},
					{	dataIndex: 'istt_qntt'	, width:  70	, align:'right'	, text: '입고수량'	},
					{	dataIndex: 'istt_qntt'	, width:  70	, align:'right'	, text: '입고수량'	},
					{	dataIndex: 'ostt_qntt'	, width:  70	, align:'right'	, text: '출고수량'		, tdCls : 'editingcolumn'  , summaryType : 'sum' ,
						xtype	: 'numericcolumn'	, format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[7]);
									}
								}
							}
						}
					},{	dataIndex: 'stnd_pric'	, width:  80	, align:'right'	, text: '단가'	, xtype: 'numericcolumn'	, format : '#,##0',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[9]);
									}
								}
							}
						}
					},
					{	dataIndex: 'amnt'		, width:  80	, align:'right'	, text: '금액'	, xtype: 'numericcolumn'	, format : '#,##0'  , font_color : Const.COLOR.FONT.inv_amt , summaryType : 'sum' },
					{	dataIndex: 'user_memo'	, flex:    1	, align:'left'	, text: '메모'	, tdCls: 'editingcolumn'	,
						editor	: {
							maxLength		: 100,
							maxLengthText	: '한글 100자 이내로 작성하여 주십시오.',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var index = self.up('grid').view.getSelectionModel().getCurrentPosition().row;
										if(e.keyCode == e.ENTER){
											self.up("grid").plugins[0].startEdit(index+1 , 5);
										}else if(e.keyCode == e.TAB){
											var selection = self.up('grid').view.getSelectionModel().getCurrentPosition();
												if(index == (me.getStore().data.length-1) && selection.column == 9){
													selection = me.getSelectionModel().getSelection()[0],
													self.blur();
												}else{
													self.up("grid").plugins[0].startEdit(index , 5);
												}
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

	cellEditAfter : function (editor, context) {
		/* MODIFY - 2022.02.22 - 이강훈 - 수량, 단가 변경 시 금액이 계산되지 않는 현상 처리  - START
		var me = this;
		var grid = this;
		var a = grid.getStore().getAt(rowIndexNum).get('ostt_qntt');
		var b = grid.getStore().getAt(rowIndexNum).get('stnd_pric');
		var amnt = a*b;							//금액
		var v = Math.floor(amnt/100)*10;		//부가세

		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var models = grid.getStore().getRange();

		models[rowIndexNum].set('amnt',amnt);
		   AFTER */
		var me = this;
		context.record.recalculation( me.editor.getRecord() );
		/* MODIFY - 2022.02.22 - 이강훈 - 수량, 단가 변경 시 금액이 계산되지 않는 현상 처리  - END */
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			//
			if(field === 'ostt_qntt' && value > 999999){
				Ext.Msg.show({ title: '수량 확인 요청', msg: '입력한 수량을 점검해 보시기 바랍니다.  계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
					fn : function (button) {
						if (button==='yes') {
							context.record.set(field, context.value);
							me.cellEditAfter(editor, context);
						}
					}
				});
				return false;
			}

			return true;
		},

		edit: function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		},

		keypress: {
			element: 'el',
			fn: function(e, iElement ) {
				key = e.getKey();
				if (key != undefined && key != e.LEFT && key != e.RIGHT && key != e.UP && key != e.DOWN && key != e.ENTER && key != e.ESC) {
					var grid = Ext.getCmp(this.id),
						pos  = grid.getView().selModel.getCurrentPosition()
					;
				}
			}
		},
		render: function(){
			var me = this;
			new Ext.util.KeyMap({
				target: me.getEl().dom,
				binding: [
					/* Ctrl + Delete */
					{	ctrl:true, key: 46,
						fn: function(key,e){
							var records = me.getSelectionModel().getSelection();

							Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
								fn : function (button) {
									if (button==='yes') {
										me.getStore().remove (records);
									}
								}
							});
						}
					}
				]
			});
		}
	}
});
