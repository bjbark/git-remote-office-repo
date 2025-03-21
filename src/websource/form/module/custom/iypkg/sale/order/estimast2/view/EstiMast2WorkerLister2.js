Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerLister2', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-estimast2-worker-lister2',

	region	: 'center',
	border	: 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'MULTI'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-estimast2-worker-search2'}];
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
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style',itemId : 'update'},
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
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
					{	dataIndex:	'assi_seqn'		, width: 50 , align : 'center'	, text: Language.get('', '항번'	)
					},{	dataIndex:	'invc_numb'		, width: 120, align : 'center'	, text: Language.get('', '번호'	),hidden : true
					},{	dataIndex:	'line_seqn'		, width: 120, align : 'center'	, text: Language.get('', '순번'	),hidden : true
					},{	dataIndex:	'mtrl_clss_dvcd', width: 80, align : 'center'	, text: Language.get('', '자재구분'	), xtype : 'lookupcolumn' , lookupValue : resource.lookup('mtrl_clss_dvcd'),
					},{	dataIndex:	'item_name'		, width: 200, align : 'left'	, text: Language.get('', '자재명'	)
					},{	dataIndex:	'item_line'		, width:  80, align : 'right'	, text: Language.get(''	, '평량/골'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'lookupfield',
							selectOnFocus: true,
							allowBlank		: true,
							enableKeyEvents : true,
							lookupValue : resource.lookup('line_dvcd'),
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, 3);
									}
								}
							}
						}
					},{	dataIndex:	'item_leng'		, width:  80, align : 'right'	, text: Language.get('', '장'	),  xtype: 'numericcolumn'
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
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[5]);
									}
								}
							}
						}
					},{	dataIndex:	'item_widh'		, width:  80, align : 'right'	, text: Language.get('', '폭'	),  xtype: 'numericcolumn'
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
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[6]);
									}
								}
							}
						}
					},{	dataIndex:	'item_fxqt'		, width:  80, align : 'right'	, text: Language.get('', '절수'	),  xtype: 'numericcolumn'
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
											row = store.indexOf(selection);

										grid.plugins[0].startEdit(row, grid.columns[7]);
									}
								}
							}
						}
					},{	dataIndex:	'item_numb'		, width: 80, align : 'right'	, text: Language.get('', '개수'	),  xtype: 'numericcolumn'
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
											row = store.indexOf(selection);

										grid.plugins[0].startEdit(row, grid.columns[8]);
									}
								}
							}
						}
					},{	dataIndex:	'qntt'			, width: 100, align : 'right'	, text: Language.get(''		, '수량'	),  xtype: 'numericcolumn'
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
											row = store.indexOf(selection);

										grid.plugins[0].startEdit(row, grid.columns[9]);
									}
								}
							}
						}
					},{	dataIndex:	'pric'	, width: 120, align : 'right'	, text: Language.get(''		, '단가/R(개)'	),  xtype: 'numericcolumn'
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
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[10]);
									}
								}
							}
						}
					},{	dataIndex:	'amnt'			, width: 120, align : 'right'	, text: Language.get('amnt'		, '공급가'	),xtype: 'numericcolumn'
					},{	dataIndex:	'user_memo'	, flex : 1, align : 'left'	, text: Language.get('user_memo'	, '비고'	)
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);

										grid.plugins[0].startEdit(row+1, grid.columns[5]);
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
		editor	= Ext.ComponentQuery.query('module-estimast2-worker-editor2')[0],
		context.record.recalculation( editor.getRecord() );
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			//
			if(field === 'qntt' && value > 999999){
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
			var editor = Ext.ComponentQuery.query('module-estimast2-worker-editor2')[0];
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
										editor.down('[name=chk]').setValue('Y');
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
