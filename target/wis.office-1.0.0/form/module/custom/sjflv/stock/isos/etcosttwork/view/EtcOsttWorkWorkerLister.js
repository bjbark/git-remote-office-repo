Ext.define('module.custom.sjflv.stock.isos.etcosttwork.view.EtcOsttWorkWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-etcosttwork-worker-lister',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features: [{ftype :'grid-summary'}],
	plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 },  { ptype:'gridcolumnconfig'  }],

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-etcosttwork-worker-search'}];
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
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon, name : 'delete',
						listeners: {
							click:function(self,e){
								me.lineDelete({});
							}
						}
					},
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
					{	dataIndex: 'disp_seqn'	, width:  50	, align:'center', text: '항번'	, xtype: 'numericcolumn'},
					{	dataIndex: 'item_idcd'	, width: 110	, align:'left'	, text: '품목ID'	,hidden : true},
					{	dataIndex: 'item_code'	, width: 110	, align:'left'	, text: '품목코드'	},
					{	dataIndex: 'item_name'	, width: 200	, align:'left'	, text: '품명'	, summaryType : 'count' },
					{	dataIndex: 'item_spec'	, width: 150	, align:'left'	, text: '규격'	},
					{	dataIndex: 'unit_idcd'	, width:  45	, align:'left'	, text: '단위'	},
					{	dataIndex: 'lott_numb'	, width: 110	, align:'left'	, text: Language.get('lott_numb', 'LOT번호'), tdCls: 'editingcolumn'	,
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: 'LOT 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									var item_idcd = record.data.item_idcd;
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-lott-popup',
									params	: {	stor_grp	: _global.stor_grp,
										stor_id		: _global.stor_id,
										line_stat	: '0',
										item_idcd	: item_idcd
									},
									result	: function(records) {
										var	parent = records[0];
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										row = store.indexOf(selection);
											record.set('lott_numb',parent.data.lott_numb);
											record.set('make_date',parent.data.make_date);
										},
									})
								},
								create : function (self ) {
									var	panel		= self.up('form'),
										item_idcd	= panel.down('[name=item_idcd]').getValue();
									Ext.merge(self.popup.params, {
										item_idcd : item_idcd
									});
								},
								scope : me
							},
						]
					},{	dataIndex:	'make_date'	, width: 90, align : 'center'	, text: '제조일자',
						renderer:function(val){
							var a = null;
							if(val){
								if(val.match(/[^0-9]/)){
									var date1 = new Date(val);
									date2 = Ext.Date.format(date1,'Y-m-d'),
									a = date2
									;
								}else{
									a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
						return a;
						},
					},{	dataIndex: 'piece_qty'	, width:  60	, align:'right'	, text: '포장량'	, xtype : 'numericcolumn' ,hidden : true
					},{	dataIndex: 'ostt_qntt'	, width:  70	, align:'right'	, text: '출고수량'	, tdCls : 'editingcolumn'  , summaryType : 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
						xtype	: 'numericcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[11]);
									}
								}
							}
						}
					},{	dataIndex: 'stnd_pric'	, width:  80	, align:'right'	, text: '단가'	, xtype: 'numericcolumn'	, format : '#,##0',
						tdCls: 'editingcolumn'	,
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
					},{	dataIndex: 'amnt'		, width:  80	, align:'right'	, text: '금액'	, xtype: 'numericcolumn'	, format : '#,##0'  , font_color : Const.COLOR.FONT.inv_amt , summaryType : 'sum'
					},{	dataIndex: 'user_memo'	, flex:    1	, align:'left'	, text: '메모'	, tdCls: 'editingcolumn'	,
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
												if(index == (me.getStore().data.length-1) && selection.column == 10){
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
		var me = this;
		context.record.recalculation( me.editor.getRecord() );
//		editor.grid.view.getSelectionModel().onKeyDown();
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
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
	},

	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					me.getStore().remove (records);
				}
			}
		});
		Ext.ComponentQuery.query('module-etcosttwork-worker-editor')[0].down('[name=change]').setValue('Y');
	},
});
