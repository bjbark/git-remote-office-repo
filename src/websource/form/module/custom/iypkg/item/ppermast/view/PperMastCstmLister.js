Ext.define('module.custom.iypkg.item.ppermast.view.PperMastCstmLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-ppermast-cstm-lister',
	store		: 'module.custom.iypkg.item.ppermast.store.PperMastCstm',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
						listeners: {
	 			 			click:function(self,e){
								me.lineInsert({});
							}
						}
					},
					'-',
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
						listeners: {
							click:function(self,e){
								me.lineDelete({});
							}
						}
					}
				]
			};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{
						text	: '원단 매입처/매출처 정보',
						columns	: [
							{	dataIndex:	'cstm_name'				, width:  200, align : 'left'   , text: Language.get( 'cstm_name'	, '거래처명'		),
								tdCls		: 'editingcolumn',
								sortable	: true
							},{	xtype	: 'actioncolumn',
									header	: '',
									width	: 20,
									align	: 'center',
									tdCls		: 'editingcolumn',
									items	: [
										{	iconCls	: Const.SELECT.icon,
										tooltip	: '거래처 찾기',
										handler	: function (grid, rowIndex, colIndex, item, e, record) {
											resource.loadPopup({
											select	: 'SINGLE',
											widget	: 'lookup-cstm-popup',
											params	: { stor_grp : _global.stor_grp , line_stat : '0',  puch_cstm_yorn : '1'},
											result	: function(records) {
												var	parent = records[0];
													grid      = me,
													store     = me.getStore()
													selection = grid.view.getSelectionModel().getSelection()[0],
													row       = store.indexOf(selection);
												;
													record.set('cstm_name',parent.data.cstm_name);
													record.set('cstm_idcd',parent.data.cstm_idcd);
													record.set('cstm_code',parent.data.cstm_code);
													me.plugins[0].startEdit(row, grid.columns[2]);
												},
											})
										},
										scope : me
										}
									]
							}
						]
					},{
						text	: 'Loss(%)',
						columns	: [
							{	dataIndex:	'bxsw_loss'			, width: 55, align : 'right'   , text: Language.get( ''	, 'SW'			), xtype : 'numericcolumn',
								tdCls		: 'editingcolumn',
								sortable	: true,
								editor	: {
									enableKeyEvents : true,
									listeners:{
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
												grid.plugins[0].startEdit(row, grid.columns[3]);
											}
										}
									}
								}
							},{	dataIndex:	'bxdw_loss'			, width: 55, align : 'right'   , text: Language.get( ''	, 'DW'		), xtype : 'numericcolumn',
								tdCls		: 'editingcolumn',
								sortable	: true,
								editor	: {
									enableKeyEvents : true,
									listeners:{
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
												grid.plugins[0].startEdit(row, grid.columns[4]);
											}
										}
									}
								}
							},{	dataIndex:	'bxtw_loss'			, width: 55, align : 'right'   , text: Language.get( ''	, 'TW'		), xtype : 'numericcolumn',
								tdCls		: 'editingcolumn',
								sortable	: true,
								editor	: {
									enableKeyEvents : true,
									listeners:{
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
												grid.plugins[0].startEdit(row, grid.columns[5]);
											}
										}
									}
								}
							},{	dataIndex:	'bxaa_loss'			, width: 55, align : 'right'   , text: Language.get( ''	, 'AA골'		), xtype : 'numericcolumn',
								tdCls		: 'editingcolumn',
								sortable	: true,
								editor	: {
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
							},{	dataIndex:	'bxee_loss'			, width: 55, align : 'right'   , text: Language.get( ''	, 'E골'		), xtype : 'numericcolumn',
								tdCls		: 'editingcolumn',
								sortable	: true,
								editor	: {
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
							}
						]
					},{
						text	: '가공비(원)',
						columns	: [
							{	dataIndex:	'bxsw_make_cost'	, width: 55, align : 'right'   , text: Language.get( ''	, 'SW'		), xtype : 'numericcolumn',
								tdCls		: 'editingcolumn',
								sortable	: true,
								editor	: {
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
							},{	dataIndex:	'bxdw_make_cost'	, width: 55, align : 'right'   , text: Language.get( ''	, 'DW'		), xtype : 'numericcolumn',
								tdCls		: 'editingcolumn',
								sortable	: true,
								editor	: {
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
							},{	dataIndex:	'bxtw_make_cost'	, width: 55, align : 'right'   , text: Language.get( ''	, 'TW'		), xtype : 'numericcolumn',
								tdCls		: 'editingcolumn',
								sortable	: true,
								editor	: {
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

							},{	dataIndex:	'bxaa_make_cost'	, width: 55, align : 'right'   , text: Language.get( ''	, 'AA골'		), xtype : 'numericcolumn',
								tdCls		: 'editingcolumn',
								sortable	: true,
								editor	: {
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
							},{	dataIndex:	'bxee_make_cost'	, width: 55, align : 'right'   , text: Language.get( ''	, 'E골'		), xtype : 'numericcolumn',
								tdCls		: 'editingcolumn',
								sortable	: true,
								editor	: {
									enableKeyEvents : true,
									listeners:{
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
												grid.plugins[0].startEdit(row+1, grid.columns[2]);
											}
										}
									}
								}
							}
						]
					}
				]
			};
		return item;
	},

	cellEditAfter : function (editor, context) {
		var me = this;
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;

//			if(field != 'adpt_date' && field != 'cstm_name' && field != 'cstm_idcd'){
//				Ext.Msg.show({ title: '확인 요청', msg: '입력한 수량을 점검해 보시기 바랍니다.  계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
//					fn : function (button) {
//						if (button==='yes') {
//							context.record.set(field, context.value);
//							me.cellEditAfter(editor, context);
//						}else{
//							context.record.reset();
//						}
//					}
//				});
//				return false;
//			}

			return true;
		},

		edit: function(editor, context) {
			var me = this;
			Ext.ComponentQuery.query('module-ppermast-editor')[0].down('[name=change]').setValue('Y');
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
					/* Ctrl + Insert */
					{	ctrl:true, key: 45,
						fn: function(key,e){
							me.lineInsert({});
						}
					},
					{	ctrl:true, key: 46,
						fn: function(key,e){
							var records = me.getSelectionModel().getSelection();
							if(records.length != 0){
								Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
									fn : function (button) {
										if (button==='yes') {
											me.getStore().remove (records);
										}
									}
								});
								Ext.ComponentQuery.query('module-ppermast-editor')[0].down('[name=change]').setValue('Y');
							}
						}
					}
				]
			});
		}
	},

	/**
	 * 새로운 Line을 추가한다....(자료 입력은 그리드에서 직접 입력한다.)
	 */
	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined,
			uper_seqn	= 0,
			mlister		= Ext.ComponentQuery.query('module-ppermast-lister')[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0],
			editor = Ext.ComponentQuery.query('module-ppermast-editor')[0]
		;
		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = 0;
		}

		console.log(editor.getValues().pper_idcd,'editor.getValues().pper_idcd');
		var seq = uper_seqn + 1;
		var dsp = uper_seqn + 1;
		record = Ext.create( store.model.modelName , {
			line_seqn		: seq,
			uper_seqn		: uper_seqn,
			disp_seqn		: dsp,
			pper_idcd		: editor.getValues().pper_idcd,
			cstm_idcd		: '',
			cstm_name		: '',
			cstm_code		: '',
			adpt_date		: '',
			bxsw_loss		: '',
			bxdw_loss		: '',
			bxtw_loss		: '',
			bxaa_loss		: '',
			bxee_loss		: '',
			bxsw_make_cost	: '',
			bxdw_make_cost	: '',
			bxtw_make_cost	: '',
			bxaa_make_cost	: '',
			bxee_make_cost	: '',
			user_memo		: '',
		});
		editor.down('[name=change]').setValue('Y');
		store.add(record);
	},
	/**
	 * 선택한 라인을 삭제처리 한다.
	 */
	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		if(records.length != 0){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove (records);
					}
				}
			});
			Ext.ComponentQuery.query('module-ppermast-editor')[0].down('[name=change]').setValue('Y');
		}
	},
 });





