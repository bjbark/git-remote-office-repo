Ext.define('module.custom.sjflv.sale.export.ordermast2.view.OrderMast2WorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-sjflv-export-ordermast2-worker-lister',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType:'checkboxmodel', mode : 'MULTI'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-sjflv-export-ordermast2-worker-search'}];
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
					{	text : '<span class="write-button">행삭제</span>',
						listeners: {
							click:function(self,e){
								me.rowDelete({});
							}
					}		, cls: 'button1-style'} ,
					'-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
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
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get('line_seqn'		, '항번'		)
					},{	dataIndex:	'item_code'		, width: 100, align : 'center'	, text: Language.get('item_code'		, '품목코드'	)
					},{	dataIndex:	'item_name'		, width: 180, align : 'left'	, text: Language.get('item_name'		, '품명'		)
					},{	dataIndex:	'item_spec'		, width: 180, align : 'left'	, text: Language.get('item_spec'		, '규격'		)
					},{	dataIndex:	'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'		, '단위'		)
					},{	dataIndex:	'qntt'			, width:  80, align : 'right'	, text: Language.get('qntt'				, '수량'		), xtype:'numericcolumn', format	: '#,##0.##',
						tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[6]);
									}
								}
							}
						}
					},{	dataIndex:	'exch_pric'		, width:  80, align : 'right'	, text: Language.get('exch_pric'		, '판매단가'	), xtype:'numericcolumn',
						tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[10]);
									}
								}
							}
						}
					},{	dataIndex:	'exch_amnt'		, width: 100, align : 'right'	, text: Language.get('exch_amnt'		, '판매금액'	), xtype:'numericcolumn'
					},{	dataIndex:	'krwn_pric'		, width:  80, align : 'right'	, text: Language.get('krwn_pric'		, '원화단가'	), xtype:'numericcolumn'
					},{	dataIndex:	'krwn_amnt'		, width: 100, align : 'right'	, text: Language.get('krwn_amnt'		, '원화금액'	), xtype:'numericcolumn'
					},{	dataIndex:	'hala_yorn'		, width:  80, align : 'center'	, text: Language.get('hala_yorn'		, '할랄여부'	), xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'lookupfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							lookupValue : resource.lookup('yorn'),
							editable : false,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
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
					},{	dataIndex:	'remk_text'		, width: 200, align : 'left'	, text: Language.get('remk_text'		, '비고'	),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if (e.keyCode == e.ENTER) {
										grid.plugins[0].startEdit(row+1, grid.columns[5]);
									}else if(e.keyCode == e.TAB){
										grid.plugins[0].startEdit(row, grid.columns[5]);
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
		var	me = this,
			field = context.field,
			index = context.rowIdx,
			grid = context.grid,
			select = grid.getStore().getAt(index),
			ownEditor =  Ext.ComponentQuery.query('module-sjflv-export-ordermast2-worker-editor')[0],
			param = ownEditor.getValues()
		;
		var	qntt      = select.get('qntt'),
			exch_pric = select.get('exch_pric'),
			each_qntt = select.get('each_qntt'),
			krwn_pric = select.get('krwn_pric')
			exch_amnt = Math.round((Number(qntt) * Number(exch_pric)) * 100) /100.0
			krwn_pric = Math.round(exch_pric*param.exrt);
			krwn_amnt = Math.round(qntt * krwn_pric);
		;
		if(field == 'qntt' || field == 'exch_pric'){
			select.set('exch_amnt',exch_amnt);
			select.set('krwn_pric',krwn_pric);
			select.set('krwn_amnt',krwn_amnt);
		}
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			var records = me.getSelectionModel().getSelection();
			//
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
	},
	rowDelete:function(){
		var	me = this,
			editor = Ext.ComponentQuery.query('module-sjflv-export-ordermast2-worker-editor')[0],
			records = me.getSelectionModel().getSelection();
		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					me.getStore().remove (records);
					editor.down('[name=modify]').setValue('Y');
				}
			}
		});
	}
});
