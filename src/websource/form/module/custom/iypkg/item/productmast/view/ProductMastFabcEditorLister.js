Ext.define('module.custom.iypkg.item.productmast.view.ProductMastFabcEditorLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-productmast-editor-fabclister',
	store		: 'module.custom.iypkg.item.productmast.store.ProductMastFabcEditor',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					{	dataIndex:	'fabc_name'			, width:  200, align : 'left'   , text: Language.get( 'fabc_name'	, '원단명'		), tdCls		: 'editingcolumn',
					},{	xtype	: 'actioncolumn',
							header	: '',
							width	: 20,
							align	: 'center',
							tdCls	: 'editingcolumn',
							items	: [
								{	iconCls	: Const.SELECT.icon,
									tooltip	: '원단 찾기',
									handler	: function (grid, rowIndex, colIndex, item, e, record) {
										var	editor	= Ext.ComponentQuery.query('module-productmast-editor')[0]
											values	= editor.getValues(),
											msg		= ''
										;
										if(values.scre_dvcd == '1'){
											if(values.prod_leng <= 0 || values.prod_widh <= 0 || values.prod_hght <= 0){
												msg = '규격을 입력 후 원단을 선택해주세요.';
											}else if(values.bxty_idcd == ''){
												msg = '상자형식을 선택해주세요.';
											}
										}else if(values.scre_dvcd == ''){
											msg = '스코어구분을 선택해주세요.';
										}
										if(msg){
											Ext.Msg.alert('알림',msg);
											return;
										}
										resource.loadPopup({
											select	: 'SINGLE',
											widget	: 'lookup-fabc-popup',
											params:{
											},
											result	: function(records) {
												var	parent = records[0];
												var grid = me.up('grid'),
												store = me.getStore(),
												selection = me.getSelectionModel().getSelection()[0]
												row = store.indexOf(selection);
													record.set('fabc_name',parent.data.fabc_name);
													record.set('fabc_idcd',parent.data.fabc_idcd);
													record.set('ppln_dvcd',parent.data.ppln_dvcd);
													record.set('stnd_pric',parent.data.stnd_pric);
													Ext.ComponentQuery.query('module-productmast-editor')[0].down('[name=change]').setValue('Y');
													Ext.Ajax.request({
														url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/item/productmast/get/fabcCalc.do',
														async		: false,
														method		: "POST",
														params		: {
														 	token	: _global.token_id,
															param	: Ext.encode({
																bxty_idcd	: values.bxty_idcd,
																fabc_idcd	: parent.data.fabc_idcd,
																cstm_idcd	: values.cstm_idcd,
																prod_leng	: values.prod_leng,
																prod_widh	: values.prod_widh,
																prod_hght	: values.prod_hght
															})
														},
														success : function(response, request) {
															var object = response,
																result = Ext.decode(object.responseText)
															;
															if (result.success) {
																if(result.records[0]){
																	record.set('item_ttln',result.records[0].length);
																	record.set('item_leng',result.records[0].length);
																	record.set('item_ttwd',result.records[0].height);
																	record.set('mxm2_pric2',result.records[0].mxm2_pric2);
																}
															} else {
																Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
															}
														},
														failure : function(response, request) {
															resource.httpError(response);
														},
														callback : function() {
														}
													});
													me.plugins[0].startEdit(row, 2);

												},
											})
									},
									scope : me
								}
							]
					},{	dataIndex	:	'ppln_dvcd'		, width:  95, align : 'center'    , text: Language.get( 'ppln_dvcd'	, '골'			),xtype: 'lookupcolumn', lookupValue : resource.lookup('line_dvcd'),
						tdCls		: 'editingcolumn',
						editor		: {
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents	: true,
							xtype			: 'lookupfield',
							lookupValue		: resource.lookup('line_dvcd'),
							listeners		:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
										var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
												index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
											 	grid.plugins[0].startEdit(row,grid.columns[index]);

									}
								}
							}
						}
					},{	dataIndex	:	'item_ttln'		, width:  60, align : 'right'    , text: Language.get( 'item_ttln'	, '총장'		), xtype: 'numericcolumn',
						tdCls		: 'editingcolumn',
						editor		: {
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
										var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
												index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
											 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex	:	'item_ttwd'		, width:  60, align : 'right'    , text: Language.get( 'item_ttwd'	, '총폭'		), xtype: 'numericcolumn',
						tdCls		: 'editingcolumn',
						editor		: {
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
										var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
												index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
											 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex	:	'item_leng'		, width:  60, align : 'right'    , text: Language.get( 'item_leng'	, '장'		), xtype: 'numericcolumn',
						tdCls		: 'editingcolumn',
						editor		: {
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
										var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
												index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
											 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex	:	'item_widh'		, width:  60, align : 'right'    , text: Language.get( 'item_widh'	, '폭'		), xtype: 'numericcolumn',
						tdCls		: 'editingcolumn',
						editor		: {
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
										var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
												index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
											 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex:	'item_fxqt'	, width: 60, align : 'right'    , text: Language.get( 'item_fxqt'	, '절수'	),
						tdCls		: 'editingcolumn',
						editor		: {
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								change : function(self,val,bfVal){
									var grid = this.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									window.fabc_mxm2_qntt2 = (store.getAt(row).get('mxm2_qntt2')/eval(bfVal)).toFixed(2);
								},
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection)
										;
										var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
												index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
												grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex:	'item_fxqt'	, width: 80, align : 'left'    , text: Language.get( 'item_fxqt'	, '재단규격'	),
						tdCls		: 'editingcolumn',
						editor		: {
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								change : function(self,val,bfVal){
									var grid = this.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
								},
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection)
										;
										var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
												index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
												grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex:	'mxm2_qntt2'	, width: 80, align : 'right'    , text: Language.get( 'mxm2_qntt2'	, 'm2/개'	), xtype: 'numericcolumn' ,
						tdCls		: 'editingcolumn',
						editor		: {
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
										var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
												index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
											 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex	:	'mxm2_pric2'		, width:  80, align : 'right'    , text: Language.get( 'mxm2_pric2'	, '단가/m2'		), xtype: 'numericcolumn' ,
						tdCls		: 'editingcolumn',
						editor		: {
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
										var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
												index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
											 	grid.plugins[0].startEdit(row,grid.columns[index]);
									}
								}
							}
						}
					},{	dataIndex	:	'pqty_pric2'		, width:  120, align : 'right'    , text: Language.get( 'pqty_pric2'	, '단가/개'		), xtype: 'numericcolumn',
						tdCls		: 'editingcolumn',
						editor		: {
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
										var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
												index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
											 	grid.plugins[0].startEdit(row+1,1);
									}
								}
							}
						}
					},{	dataIndex	:	'user_memo'		, flex:  1, align : 'left'    , text: Language.get( 'user_memo'	, '비고'		),
						tdCls		: 'editingcolumn',
						editor		: {
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
										var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
												index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
												grid.plugins[0].startEdit(row+1,1);
									}
								}
							}
						}
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
			var me = this,
				field = context.field,
				value = context.value,
				grid  = context.grid,
				records = grid.getSelectionModel().getSelection()[0],
				up_editor  = Ext.ComponentQuery.query('module-productmast-editor')[0]
			;
			switch (field) {
			case 'mxm2_pric2':
					records.set('pqty_pric2',(value*records.get('mxm2_qntt2')));
				break;
			case 'mxm2_qntt2':
				records.set('pqty_pric2',(value*records.get('mxm2_pric2')));
				break;
			case 'item_fxqt':
				if(fabc_mxm2_qntt2){
					records.set('mxm2_qntt2',(window.fabc_mxm2_qntt2*eval(value)));
					records.set('pqty_pric2',(window.fabc_mxm2_qntt2*eval(value))*records.get('mxm2_pric2'));
				}
				break;
			default:
				break;
			}
			var	totl_pqty_mxm2 = 0,
				totl_mxm2_pric = 0,
				totl_pqty_pric = 0
			;
			grid.getStore().each(function(rec){
				totl_pqty_mxm2 += Number(rec.get('mxm2_qntt2')?rec.get('mxm2_qntt2'):0);
				totl_mxm2_pric += Number(rec.get('mxm2_pric2')?rec.get('mxm2_pric2'):0);
				totl_pqty_pric += Number(rec.get('pqty_pric2')?rec.get('pqty_pric2'):0);
			})
			up_editor.down('[name=pqty_mxm2]').setValue(totl_pqty_mxm2);
			up_editor.down('[name=mxm2_pric]').setValue(totl_mxm2_pric);
			up_editor.down('[name=pqty_pric]').setValue(totl_pqty_pric);
			return true;
		},

		edit: function(editor, context) {
			var me = this;
			Ext.ComponentQuery.query('module-productmast-editor')[0].down('[name=change]').setValue('Y');
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
	 * 새로운 Line을 추가한다....(자료 입력은 그리드에서 직접 입력한다.)
	 */
	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined,
			uper_seqn	= 0,
			mlister		= Ext.ComponentQuery.query('module-productmast-lister')[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0],
			editor		= Ext.ComponentQuery.query('module-productmast-editor')[0]
		;
		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = 0;
		}
		var seq = uper_seqn + 1;
		var dsp = uper_seqn + 1;
		record = Ext.create( store.model.modelName , {
			line_seqn		: seq,
			prod_idcd		: editor.getValues().prod_idcd,
			sale_pric		: 0,
			befr_pric		: 0
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
		if(records[0]){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove (records);
					}
				}
			});
			Ext.ComponentQuery.query('module-productmast-editor')[0].down('[name=change]').setValue('Y');
		}else{
			Ext.Msg.alert('알림','삭제가능한 원단이 없습니다.');
		}
	},

 });





