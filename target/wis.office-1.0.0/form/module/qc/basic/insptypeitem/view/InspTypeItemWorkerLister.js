Ext.define('module.qc.basic.insptypeitem.view.InspTypeItemWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-insptypeitem-worker-lister',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'SINGLE'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-insptypeitem-worker-search'}];
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
					{	text: Const.UPDATE.text    , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.ROWDELETE.text , iconCls: Const.DELETE.icon , scope  : me , handler: me.lineDelete ,cls: 'button-style' }, '-',
					{	text: Const.CANCEL.text    , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
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
					{	dataIndex:	'line_seqn'		, width:  50, align : 'center'	, text: Language.get('line_seqn'		, '순번'			)
					},{	dataIndex:	'insp_sbsc_name', width: 145, align : 'left'	, text: Language.get('insp_sbsc_name'	, '검사항목명'		)
						,tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
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
										grid.plugins[0].startEdit(row, grid.columns[1]);
									}
								}
							}
						}
					},{	dataIndex:	'insp_cond'		, width: 295, align : 'left'	, text: Language.get('insp_cond'		, '검사조건'		)
						,tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
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
										grid.plugins[0].startEdit(row, grid.columns[2]);
									}
								}
							}
						}
					},{	dataIndex:	'ctq_sbsc_yorn'	, width:  90, align : 'center'	, text: Language.get('ctq_sbsc_yorn'	, 'CTQ항목'		)	, xtype  :'lookupcolumn', lookupValue : resource.lookup('yorn')   , hidden : (_global.options.insp_item_ctq == 0)
					},{	dataIndex:	'msmt_mthd_dvcd', width:  90, align : 'center'	, text: Language.get('msmt_mthd_dvcd'	, '측정방법'		)	, xtype  :'lookupcolumn', lookupValue : resource.lookup('msmt_mthd_dvcd')
					},{	dataIndex:	'insp_cvic_idcd', width: 150, align : 'left'	, text: Language.get('insp_cvic_idcd'	, '검사기기id'	)	, hidden : true
					},{	dataIndex:	'cvic_name'		, width: 145, align : 'left'	, text: Language.get('cvic_name'		, '측정도구'		)
					},{	dataIndex:	'insp_mthd_dvcd', width:  90, align : 'center'	, text: Language.get('insp_mthd_dvcd'	, '검사방법'		)	, xtype  :'lookupcolumn', lookupValue : resource.lookup('insp_mthd_dvcd')  , hidden : (_global.options.insp_item_mthd == 0)
					},{	dataIndex:	'insp_levl'		, width:  80, align : 'left'	, text: Language.get('insp_levl'		, '검사수준'		)	, hidden : (_global.options.insp_item_levl == 0)
					},{	dataIndex:	'lott_judt_stnd', width:  80, align : 'left'	, text: Language.get('lott_judt_stnd'	, 'lot판정기준'	)	, hidden : (_global.options.insp_item_lot  == 0)
					},{	dataIndex:	'rslt_iput_dvcd', width:  80, align : 'center'	, text: Language.get('rslt_iput_dvcd'	, '입력구분'		)	, xtype  :'lookupcolumn', lookupValue : resource.lookup('rslt_iput_dvcd')
					},{	dataIndex:	'goal_levl'		, width:  70, align : 'left'	, text: Language.get('goal_levl'		, '목표수준'		)	/*, hidden : (_global.options.insp_item_goal == 0)*/
						,tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[13]);
									}
								}
							}
						}
					},{	dataIndex:	'uppr_valu'		, width:  70, align : 'right'	, text: Language.get('uppr_valu'		, '상한값'		),	/*, hidden : (_global.options.insp_item_uppr == 0)*/
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
										grid.plugins[0].startEdit(row, grid.columns[13]);
									}
								}
							}
						}
					},{	dataIndex:	'lwlt_valu'		, width:  70, align : 'right'	, text: Language.get('lwlt_valu'		, '하한값'		),	/*, hidden : (_global.options.insp_item_lwlt == 0)*/
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
										grid.plugins[0].startEdit(row, grid.columns[14]);
									}
								}
							}
						}
					},{	dataIndex:	'remk_text'		, width: 220, align : 'left'	, text: Language.get('remk_text'		, '메모'			),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
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

	cellEditAfter : function (editor, context) {
		var me = this;
		context.record.recalculation( me.editor.getRecord() );
		editor.grid.view.getSelectionModel().onKeyDown();
	},

	listeners: {
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
										Ext.ComponentQuery.query('module-insptypeitem-worker-editor')[0].down('[name = change]').setValue('Y');
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

	lineDelete : function(){
		var me = this;
		var records = me.getSelectionModel().getSelection();

		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					Ext.ComponentQuery.query('module-insptypeitem-worker-editor')[0].down('[name = change]').setValue('Y');
					me.getStore().remove (records);
				}
			}
		});
	}
});
