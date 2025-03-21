Ext.define('module.custom.iypkg.sale.order.saleorder.view.SaleOrderFabc', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-saleorder-fabc-lister',
	store		: 'module.custom.iypkg.sale.order.saleorder.store.SaleOrderFabc',
	border		: 0,
	height		: 280,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features: [{ftype :'grid-summary'}],
	plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 },{
		ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
		trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
		leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
	}],

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
					},
//					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon,
//						cls: 'button-style',
//						hidden : _global.hq_id.toUpperCase()!='N1000DAE-A'? true : false ,
//						listeners: {
//							click:function(self,e){
//								me.deleteAction({});
//							}
//						}
//					},
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
				items	: [
					{	dataIndex:	'fabc_name'			, width:  100, align : 'left'   , text: Language.get( 'fabc_name'	, '원단명'		), tdCls		: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, 1);
									}
								}
							}
						}
					},{	xtype	: 'actioncolumn',
							header	: '',
							width	: 20,
							align	: 'center',
							tdCls	: 'editingcolumn',
							items	: [
								{	iconCls	: Const.SELECT.icon,
									tooltip	: '원단 찾기',
									handler	: function (grid, rowIndex, colIndex, item, e, record) {
										var	editor	= Ext.ComponentQuery.query('module-saleorder-editor')[0];
											values	= editor.getValues(),
											msg		= ''
										;
										resource.loadPopup({
											select	: 'SINGLE',
											widget	: 'lookup-fabc-popup',
											params:{
											},
											result	: function(records) {
												var	parent    = records[0];
													store     = me.getStore(),
													selection = me.getSelectionModel().getSelection()[0],
													row       = store.indexOf(selection),
													editor    = Ext.ComponentQuery.query('module-saleorder-editor')[0];
												;

													record.set('fabc_name',parent.data.fabc_name);
													record.set('fabc_idcd',parent.data.fabc_idcd);
													record.set('ppln_dvcd',parent.data.ppln_dvcd);
													record.set('stnd_pric',parent.data.stnd_pric);
													console.log(parent);
//												record.set('fdat_spec',result.records[0].result);
//												record.set('item_leng',result.records[0].length);
//												record.set('item_ttln',result.records[0].length);
//												record.set('item_ttwd',result.records[0].height);
//												record.set('mxm2_qntt2',result.records[0].mxm2_qntt2);
												record.set('item_fxqt',null);
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
																prod_leng	: values.item_leng,
																prod_widh	: values.item_widh,
																prod_hght	: values.item_hght
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
					},{	dataIndex	:	'ppln_dvcd'		, width:  90, align : 'left'    , text: Language.get( 'ppln_dvcd'	, '골'			), xtype: 'lookupcolumn'  , lookupValue:resource.lookup('line_dvcd'),
						tdCls		: 'editingcolumn',
						editor		: {
							xtype: 'lookupfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							lookupValue:resource.lookup('line_dvcd'),
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
										grid.plugins[0].startEdit(row, 4);
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
										grid.plugins[0].startEdit(row, 5);
									}
								}
							}
						}
					},{	dataIndex	:	'item_ttln'		, width:  60, align : 'right'    , text: Language.get( 'item_ttln'	, '장'		), xtype: 'numericcolumn',
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
										grid.plugins[0].startEdit(row, 6);
									}
								}
							}
						}
					},{	dataIndex	:	'length'		, width:  60, align : 'right'    , text: Language.get( 'length'	, '발주폭'		), xtype: 'numericcolumn',
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
										grid.plugins[0].startEdit(row,7);
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
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
									store = me.getStore(),
									selection = me.getSelectionModel().getSelection()[0],
									row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, 8);
									}
								}
							}
						}
					},{	dataIndex:	'fdat_spec'				, width: 150, align : 'left'   , text: Language.get( 'fdat_spec'			, '재단규격'		),
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
										grid.plugins[0].startEdit(row, 9);
									}
								}
							}
						}
					},{	dataIndex:	'need_qntt'				, width: 80   , text: Language.get( 'need_qntt'			, '소요량'		), xtype: 'numericcolumn',
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
										grid.plugins[0].startEdit(row, 10);
									}
								}
							}
						}
//					},{	dataIndex:	'mxm2_qntt2'				, width: 80   , text: Language.get( 'mxm2_qntt2'			, 'm2/개'		), xtype: 'numericcolumn',
//						tdCls		: 'editingcolumn',
//						editor		: {
//							selectOnFocus	: true,
//							allowBlank		: true,
//							enableKeyEvents : true,
//							listeners:{
//								keydown : function(self, e) {
//									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//									var grid = self.up('grid'),
//									store = me.getStore(),
//									selection = me.getSelectionModel().getSelection()[0],
//									row = store.indexOf(selection);
//										grid.plugins[0].startEdit(row, 11);
//									}
//								}
//							}
//						}
//					},{	dataIndex:	'mxm2_pric2'				, width: 80   , text: Language.get( 'mxm2_pric2'			, '단가/m2'		), xtype: 'numericcolumn',
//						tdCls		: 'editingcolumn',
//						editor		: {
//							selectOnFocus	: true,
//							allowBlank		: true,
//							enableKeyEvents : true,
//							listeners:{
//								keydown : function(self, e) {
//									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//									var grid = self.up('grid'),
//									store = me.getStore(),
//									selection = me.getSelectionModel().getSelection()[0],
//									row = store.indexOf(selection);
//										grid.plugins[0].startEdit(row, 12);
//									}
//								}
//							}
//						}
//					},{	dataIndex:	'pqty_pric2'				, width: 80   , text: Language.get( 'pqty_pric2'			, '단가/개'		), xtype: 'numericcolumn',
//						tdCls		: 'editingcolumn',
//						editor		: {
//							selectOnFocus	: true,
//							allowBlank		: true,
//							enableKeyEvents : true,
//							listeners:{
//								keydown : function(self, e) {
//									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//									var grid = self.up('grid'),
//									store = me.getStore(),
//									selection = me.getSelectionModel().getSelection()[0],
//									row = store.indexOf(selection);
//										grid.plugins[0].startEdit(row+1, 1);
//									}
//								}
//							}
//						}
					},{	dataIndex:	''				, width: 80, align : 'left'   , text: Language.get( ''			, '여유'			),
					},{	dataIndex:	''				, width: 80, align : 'left'   , text: Language.get( ''			, '재고량'		),
					},{	dataIndex:	''				, width: 80, align : 'left'   , text: Language.get( ''			, '발주량'		),
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
			var	me		= this,
				field	= context.field,
				value	= context.value,
				pos		= me.view.getSelectionModel().getCurrentPosition().row;
				models	= me.getStore().getRange();

			if(field === 'need_qntt'){
				if(value<=0){
					Ext.Msg.alert('알림','소요량을 확인해주세요.');
					return false;
				}
			}else if(field === 'item_fxqt'){
				var	form		= me.up('form'),
					prod_qntt	= form.down('[name=prod_qntt]').getValue()
				;
				models[pos].set('need_qntt',Math.ceil(prod_qntt*eval(value),0));
			}

			return true;
		},

		edit: function(editor, context) {
			var me = this;
			Ext.ComponentQuery.query('module-saleorder-editor')[0].down('[name=change]').setValue('Y');
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
							me.appendRow({});
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
			mlister		= Ext.ComponentQuery.query('module-saleorder-lister')[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0],
			editor		= Ext.ComponentQuery.query('module-saleorder-editor')[0],
			param		= editor.getValues()
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
			invc_numb		: param.invc_numb,
			item_idcd		: param.item_idcd
		});
		Ext.ComponentQuery.query('module-saleorder-editor')[0].down('[name=change]').setValue('Y');
		store.add(record);
	},
	/**
	 * 선택한 라인을 삭제처리 한다.
	 */
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
		Ext.ComponentQuery.query('module-saleorder-editor')[0].down('[name=change]').setValue('Y');
	},

//	deleteAction : function(){
//		var me = this,
//			records = me.getSelectionModel().getSelection()
//		;
//		if (records.length === 0) {
//			Ext.Msg.alert('알림', '삭제할 항목을 선택해주세요.');
//			return;
//		}
//
//		Ext.Msg.show({
//			title: '삭제 확인 요청',
//			msg: '선택한 자료를 삭제하시겠습니까?',
//			icon: Ext.Msg.ERROR,
//			buttons: Ext.Msg.YESNO,
//			defaultFocus: 'no',
//			scope: me,
//			fn: function(button) {
//				if (button === 'yes') {
//					me.getStore().remove(records);
//					Ext.ComponentQuery.query('module-saleorder-editor')[0].down('[name=change]').setValue('Y');
//				}
//			}
//		});
//	}

 });





