Ext.define('module.custom.aone.sale.esti.estimast.view.EstiMastWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-estimast-worker-lister',
	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'MULTI'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

//	viewConfig: {
//		markDirty: false,
//		loadMask : false
//	},

	initComponent: function () {
		var me = this;

		me.dockedItems = [{xtype: 'module-estimast-worker-search'}];
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {
	},
	pagingItem : function () {
		var me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
//					{	text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
//						listeners: {
//							click:function(self,e){
//								me.lineDelete({});
//							}
//						}
//				},
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.DELETE.text , iconCls: Const.DELETE.icon , action : Const.DELETE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				], pagingButton : false
			}
		;
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item = {
				defaults : {style: 'text-align:center'},
				items : [
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get(''	, '항번'		)
					},{	dataIndex:	'item_code'		, width: 70, align : 'center'	, text: Language.get(''	, '품목코드'	)
					},{	dataIndex:	'item_name'		, width: 170, align : 'left'	, text: Language.get(''	, '품명'		)
					},{	dataIndex:	'item_spec'		, width: 170, align : 'left'	, text: Language.get(''	, '규격'		)
					},{	dataIndex:	'esti_qntt'		, width: 100, align : 'right'	, text: Language.get(''	, '수량'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0.##'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection)
										;
										grid.plugins[0].startEdit(row, grid.columns[6]);
									}
								}
							}
						}

					},{	dataIndex:	'esti_pric'		, width:  100, align : 'right'	, text: Language.get(''	, '단가'		), xtype: 'numericcolumn' , format: '#,##0.##', tdCls : 'editingcolumn',
						editor	: {
							xtype			:'numericfield',
							selectOnFocus	: true,
							allowBlank		: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection)
										;
										grid.plugins[0].startEdit(row, grid.columns[9]);
									}
								}
							}
						},
					},{	dataIndex:	'sply_amnt'		, width:  100, align : 'right'	, text: Language.get(''	, '금액'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'vatx_amnt'		, width:  100, align : 'right'	, text: Language.get(''	, '부가세'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'deli_date2'	, width:  100, align : 'center'	, text: Language.get(''	, '납기일자'	),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							/*listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[10]);
									}
								}
							}*/
						},
						renderer:function(val){
							var a = null;
							if(val){
								if(val.match(/[^0-9]/)){
									var date1 = new Date(val),
										date2 = Ext.Date.format(date1,'Y-m-d'),
										a = date2
									;
								}else{
									a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
							return a;
						},
					},{	dataIndex:	'poor_cont'		, width:  250, align : 'left'	, text: Language.get(''	, '의뢰(불량)내역'	), tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection)
										;
										grid.plugins[0].startEdit(row, grid.columns[11]);
									}
								}
							}
						},
					},{	dataIndex:	'remk_text'		, width:  250, align : 'left'	, text: Language.get(''	, '전달사항'	),
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection)
										;
										grid.plugins[0].startEdit(row, grid.columns[11]);
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
	var me = this;
		context.record.recalculation( me.editor.getRecord() );
//		editor.grid.view.getSelectionModel().onKeyDown();
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this,
				field = context.field,
				value = context.value
			;

			if(field === 'invc_qntt' && value > 999999){
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
			var me = this
			;
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

//		lineDelete : function (config) {
//			var me = this;
//			var records = me.getSelectionModel().getSelection();
//			if(records.length != 0){
//				Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
//					fn : function (button) {
//						if (button==='yes') {
//							me.getStore().remove(records);
//						}
//					}
//				});
//			}
//		},
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
