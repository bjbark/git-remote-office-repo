Ext.define('module.mtrl.po.purctrstwork.view.PurcTrstWorkWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-purctrstwork-worker-lister',
	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'SINGLE' },
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-purctrstwork-worker-search'}];
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
					{	text : '<span class="write-button">신규품목추가</span>', action :  'itemAction'	, cls: 'button-style', hidden:_global.hq_id.toUpperCase() == 'N1000KORTC'? true : false} , '-',
					{	text : '<span class="write-button">기존품목추가</span>', action :  'itemupdateAction'	, cls: 'button-style', 	} , '-',
					{	text : '<span class="write-button">품목삭제</span>', action :  'lineDelete'	, cls: 'button-style',
						listeners: {
						click:function(self,e){
							me.lineDelete({});
						}
					}
						} , '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },'-',
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' },
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
					},{	dataIndex:	'item_code'		, width: 80, align : 'center'	, text: Language.get('item_code'		, '품목코드'	)
					},
//						{	xtype	: 'actioncolumn',
//						header	: '',
//						width	: 20,
//						align	: 'center',
//						tdCls	: 'editingcolumn',
//						items	: [
//							{	iconCls	: Const.SELECT.icon,
//								tooltip	: '품목 찾기',
//								handler	: function (grid, rowIndex, colIndex, item, e, record) {
//									resource.loadPopup({
//									select	: 'SINGLE',
//									widget	: 'lookup-item-popup',
//									params:{stor_grp	: _global.stor_grp,
//											stor_id		: _global.stor_id,
//											line_stat	: '0',
//											acct_bacd	: '자재'
//									},
//									result	: function(records) {
//										var	parent = records[0];
//										var grid = me.up('grid'),
//											store = me.getStore(),
//											selection = me.getSelectionModel().getSelection()[0]
//											row = store.indexOf(selection);
//											record.set('item_name',parent.data.item_name);
//											record.set('item_code',parent.data.item_code);
//											record.set('item_spec',parent.data.item_spec);
//											record.set('item_idcd',parent.data.item_idcd);
//											record.set('unit_idcd',parent.data.unit_idcd);
//											record.set('unit_name',parent.data.unit_name);
//											Ext.ComponentQuery.query('module-purctrstwork-worker-editor')[0].down('[name=change]').setValue('Y');
//											me.plugins[0].startEdit(row, 6);
//										},
//									})
//								},
//								scope : me
//							}
//						]
					{	dataIndex:	'item_name'		, flex :  10, align : 'left'	, text: Language.get('item_name'		, '품명'		), minWidth : 180,
					},{	dataIndex:	'item_spec'		, width: 150, align : 'left'	, text: Language.get('item_spec'		, '규격'		)
					},{	dataIndex:	'unit_name'		, width:  50, align : 'center'	, text: Language.get('unit_name'		, '단위'		)
					},
//						{	xtype	: 'actioncolumn',
//						header	: '',
//						width	: 20,
//						align	: 'center',
//						tdCls	: 'editingcolumn',
//						items	: [
//							{	iconCls	: Const.SELECT.icon,
//								tooltip	: '단위 찾기',
//								handler	: function (grid, rowIndex, colIndex, item, e, record) {
//									resource.loadPopup({
//									select	: 'SINGLE',
//									widget	: 'lookup-unit-popup',
//									params:{
//									},
//									result	: function(records) {
//										var	parent = records[0];
//										var grid = me.up('grid'),
//											store = me.getStore(),
//											selection = me.getSelectionModel().getSelection()[0]
//											row = store.indexOf(selection);
//											record.set('unit_name',parent.data.unit_name);
//											record.set('unit_idcd',parent.data.unit_idcd);
//											Ext.ComponentQuery.query('module-purctrstwork-worker-editor')[0].down('[name=change]').setValue('Y');
//											me.plugins[0].startEdit(row, 6);
//										},
//									})
//								},
//								scope : me
//							}
//						]
					{	dataIndex:	'reqt_qntt'		, width:  70, align : 'right'	, text: Language.get('reqt_qntt'		, '수량'		), xtype: 'numericcolumn' , summaryType: 'sum', format:  '#,##0.###',
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
										grid.plugins[0].startEdit(row, grid.columns[7]);
									}
								}
							}
						}
					},{	dataIndex:	'reqt_pric'	, width:  90, align : 'right'	, text: Language.get('', '단가'		), xtype: 'numericcolumn',format:  '#,##0.##',
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
										grid.plugins[0].startEdit(row, grid.columns[8]);
									}
								}
							}
						}
					},{	dataIndex:	'reqt_amnt'	, width:  120, align : 'right'	, text: Language.get('', '판매금액'		), xtype: 'numericcolumn' , summaryType: 'sum',format:  '#,##0.##',
					},{	dataIndex:	'usge_dvcd'	, width:  120, align : 'left'	, text: Language.get('', '용도'		), hidden : true,
						xtype	: 'lookupcolumn',
						lookupValue : resource.lookup('usge_dvcd'),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		: 'lookupfield',
							lookupValue	: resource.lookup('usge_dvcd'),
							editable	: false,
							selectOnFocus: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var	grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row, grid.columns[26]);
									}else if(e.keyCode == 38){
										grid.plugins[0].startEdit(row-1, grid.columns[22]);
									}else if(e.keyCode == 40){
										grid.plugins[0].startEdit(row+1, grid.columns[22]);
									}
								}
							}
						}
					},{	dataIndex:	'user_memo'	, flex :  20, align : 'left'	, text: Language.get('', '비고'		),
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							maxLength	: 100,
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									if (e.keyCode == e.ENTER) {
										grid.plugins[0].startEdit(row+1, grid.columns[6]);
									}else if(e.keyCode == e.TAB){
										grid.plugins[0].startEdit(row, grid.columns[6]);
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
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			var records = me.getSelectionModel().getSelection();
			//
			if(field === 'reqt_qntt' && value > 999999){
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
							me.appendRow({});
						}
					},
					{	ctrl:true, key: 47,
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

	/**
	 * 선택한 라인을 삭제처리 한다.
	 */
	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		if(records[0]) {
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove (records);
					}
				}
			});
		}
		Ext.ComponentQuery.query('module-purctrstwork-worker-editor')[0].down('[name=change]').setValue('Y');
	},

});
