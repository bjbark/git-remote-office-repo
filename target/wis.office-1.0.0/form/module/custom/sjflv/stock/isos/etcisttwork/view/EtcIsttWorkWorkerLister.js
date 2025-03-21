Ext.define('module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-etcisttwork-worker-lister',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-etcisttwork-worker-search'}];
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
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
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
					{	dataIndex: 'disp_seqn'	, width:  50	, align:'right'	, text: '항번'		, xtype: 'numericcolumn' , format : '#,##0.##'
					},{	dataIndex: 'item_code'	, width: 110	, align:'center', text: '품목코드'
					},{	dataIndex: 'item_name'	, width: 200	, align:'left'	, text: '품명'		, summaryType : 'count'
					},{	dataIndex: 'item_spec'	, width: 150	, align:'left'	, text: '규격'
					},{	dataIndex: 'unit_idcd'	, width:  45	, align:'center', text: '단위'
					},{	dataIndex: 'lott_numb'	, width: 150	, align:'left'	, text: Language.get('lott_numb', 'Batch No')		, tdCls: 'editingcolumn'	,
						editor	: {
							maxLength		: 40,
							maxLengthText	: '40자 이내로 작성하여 주십시오.',
							selectOnFocus	: true,
							allowBlank		: true,
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
					},{	dataIndex: 'cstm_lott_numb'	, width: 150	, align:'left'	, text: Language.get('cstm_lott_numb', 'Supplier No')		, tdCls: 'editingcolumn'	,
						editor	: {
							maxLength		: 40,
							maxLengthText	: '40자 이내로 작성하여 주십시오.',
							selectOnFocus	: true,
							allowBlank		: true,
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
					},{	dataIndex: 'make_natn'	, width: 120	, align:'left'	, text: Language.get('make_natn', '제조국')		, tdCls: 'editingcolumn'	,
						editor	: {
							maxLength		: 40,
							maxLengthText	: '40자 이내로 작성하여 주십시오.',
							selectOnFocus	: true,
							allowBlank		: true,
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
					},{	dataIndex: 'make_cmpy_name'	, width: 120	, align:'left'	, text: Language.get('make_cmpy_name', '제조회사')		, tdCls: 'editingcolumn'	,
						editor	: {
							maxLength		: 40,
							maxLengthText	: '40자 이내로 작성하여 주십시오.',
							selectOnFocus	: true,
							allowBlank		: true,
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
					},{	dataIndex: 'make_date'	, width: 80	, align:'left'	, text: Language.get('make_date', '제조일자'), hidden: true,
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
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
										var val = this.getValue()
										var a = "";
										if(val != null){
											if((typeof val) == "object"){
												if (val != null) {
													var date1 = new Date(val);
													date2 = Ext.Date.format(date1,'Y-m-d'),
													a = date2;
												}
											}else{
												if(val.match(/[0-9]/)){
													a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
												}
											}
										}
										if(a!="" && a != null){
											this.setValue(a);
										}else{
											this.setValue(val);
										}
										grid.plugins[0].startEdit(row, grid.columns[10]);
									}
								}
							}
						},
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
					},{	dataIndex: 'rtil_ddln_date'	, width: 80	, align:'left'	, text: Language.get('rtil_ddln_date', '유통기한'), hidden: true,
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
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
										var val = this.getValue()
										var a = "";
										if(val != null){
											if((typeof val) == "object"){
												if (val != null) {
													var date1 = new Date(val);
													date2 = Ext.Date.format(date1,'Y-m-d'),
													a = date2;
												}
											}else{
												if(val.match(/[0-9]/)){
													a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
												}
											}
										}
										if(a!="" && a != null){
											this.setValue(a);
										}else{
											this.setValue(val);
										}
										grid.plugins[0].startEdit(row, grid.columns[11]);
									}
								}
							}
						},
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
					},{	dataIndex: 'pack_qntt'	, width:  70	, align:'right'	, text: '패킹단위'  , tdCls : 'editingcolumn'  ,hidden: _global.hqof_idcd.toUpperCase()!= 'N1000SJFLV',
						xtype	: 'numericcolumn'	, format: _global.hq_id.toUpperCase()!='N1000SJFLV'?'#,##0.##':'#,##0.###',
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
					},{	dataIndex: 'istt_qntt'	, width:  70	, align:'right'	, text: '입고수량'  , tdCls : 'editingcolumn'  , summaryType : 'sum' ,
						xtype	: 'numericcolumn'	, format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
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
										grid.plugins[0].startEdit(row, grid.columns[12]);
									}
								},
							}
						}
					},{	dataIndex: 'stnd_pric'	, width:  80	, align:'right'	, text: '단가'		, xtype: 'numericcolumn'	, format : '#,##0', tdCls : 'editingcolumn'  , summaryType : 'sum' ,
						xtype	: 'numericcolumn'	, format : '#,##0.##',
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
										grid.plugins[0].startEdit(row, grid.columns[15]);
									}
								}
							}
						}
					},{	dataIndex: 'amnt'		, width:  80	, align:'right'	, text: '금액'		, xtype: 'numericcolumn'	, format : '#,##0'  , font_color : Const.COLOR.FONT.inv_amt , summaryType : 'sum'
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
		var me = this;
		context.record.recalculation( me.editor.getRecord() );
//		editor.grid.view.getSelectionModel().onKeyDown();
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			//
			if(field === 'istt_qntt' && value > 999999){
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
										var editor = Ext.ComponentQuery.query('module-etcisttwork-worker-editor')[0];
										editor.down('[name=modify]').setValue('Y');
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
		Ext.ComponentQuery.query('module-etcisttwork-worker-editor')[0].down('[name=change]').setValue('Y');
	},
});
