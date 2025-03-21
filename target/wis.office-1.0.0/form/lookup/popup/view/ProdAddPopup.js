Ext.define('lookup.popup.view.ProdAddPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-prod-add-popup',

	title		: '제품 간편등록',
	closable	: true,
	autoShow	: true,
	width		: 900 ,
	height		: 500 ,
	layout		: {
		type : 'border'
	},
	defaultFocus : 'prod_code',
	requires: [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.BxtyPopup',
		'lookup.popup.view.AsmtPopup',

	],
	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-layout',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.UPDATE.text, iconCls: Const.UPDATE.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ,me.createTab()]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			region	: 'center',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	xtype	: 'fieldset',
									layout	: 'hbox',
									padding	: '0',
									border	:  0,
									margin	: '5 0 5 0' ,
									items	: [
										{	fieldLabel	: Language.get( 'prod_code', '제품코드' ),
											name		: 'prod_code',
											xtype		: 'textfield',
											maxLength	: 50,
											width		: 260,
											allowBlank	: false,
											required	: true,
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
											value		: me.popup.params.prod_code
										},{	name		: 'prod_idcd', xtype	: 'textfield', hidden	: true, value : me.popup.params.prod_idcd
										},{	fieldLabel	: Language.get('bxty_name','상자형식'),
											xtype		: 'popupfield',
											name		: 'bxty_name',
											pair		: 'bxty_idcd',
											editable	: true,
											clearable	: true,
											enableKeyEvents	: true,
											width		: 260,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-bxty-popup',
												params	:{

												},
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('bxty_name'));
													pairField.setValue(records[0].get('bxty_idcd'));
												}
											}
										},{	xtype:'hiddenfield', name:'bxty_idcd'
										},{	fieldLabel	: Language.get('cstm','거래처'),
											xtype		: 'popupfield',
											name		: 'cstm_name',
											pair		: 'cstm_idcd',
											editable	: true,
											clearable	: true,
											enableKeyEvents	: true,
											width		: 260,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-cstm-popup',
												params	:{
													 sale_cstm_yorn:1
												},
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
												}
											}
										},{	name : 'cstm_idcd'  , xtype : 'textfield', hidden : true
										}
									]
								},{	xtype	: 'fieldset',
									layout	: 'hbox',
									padding	: '0',
									border	:  0,
									margin	: '0 0 5 0' ,
									items	: [
										{ fieldLabel	: Language.get('prod_name','품명'),
											xtype		: 'textfield',
											name		: 'prod_name',
											width		: 260,
										},{	fieldLabel	:  Language.get( 'pqty_mxm2' , 'm2/개'),
											name		: 'pqty_mxm2',
											xtype		: 'numericfield',
											width		: 130,
										},{	fieldLabel	:  Language.get( 'pqty_pric' , '단가/개'),
											name		: 'pqty_pric',
											xtype		: 'numericfield',
											width		: 130,
										},{	fieldLabel	:  Language.get( 'cpst_numb' , '조판번호'),
											name		: 'cpst_numb',
											xtype		: 'textfield',
											width		: 260,
										}
									]
								},{	xtype	: 'fieldset',
									layout	: 'hbox',
									padding	: '0',
									border	:  0,
									margin	: '0 0 5 0' ,
									items	: [
										{	fieldLabel	:  Language.get( 'prod_spec' , '장/폭/고'),
											name		: 'prod_leng',
											xtype		: 'numericfield',
											width		: 125,
											margin		: '0 7 0 0',
										},{	name		: 'prod_widh',
											xtype		: 'numericfield',
											width		: 60,
											margin		: '0 7 0 0',
										},{	name		: 'prod_hght',
											xtype		: 'numericfield',
											width		: 61,
										},{	fieldLabel	:  Language.get( 'mxm2_pric' , '단가/m2'),
											name		: 'mxm2_pric',
											xtype		: 'numericfield',
											width		: 130,
										},{	fieldLabel	:  Language.get( 'crny_dvcd' , '통화'),
											name		: 'crny_dvcd',
											xtype		: 'lookupfield',
											width		: 130,
											lookupValue	: resource.lookup('crny_dvcd'),
											value		: '1000'
										},{	fieldLabel	:  Language.get( 'inkk_colr_name' , '잉크색상'),
											name		: 'inkk_colr_name',
											xtype		: 'textfield',
											width		: 260,
										}
									]
								},{	xtype	: 'fieldset',
									layout	: 'hbox',
									padding	: '0',
									border	:  0,
									margin	: '0 0 5 0' ,
									items	: [
										{	fieldLabel	:  Language.get( 'scre_dvcd' , '스코어구분'),
											name		: 'scre_dvcd',
											xtype		: 'lookupfield',
											lookupValue	: resource.lookup('scre_dvcd'),
											width		: 260,
										},{	fieldLabel	: Language.get('wmld_numb','목형번호'),
											xtype		: 'popupfield',
											name		: 'wmld_numb',
											pair		: 'wmld_idcd',
											editable	: true,
											clearable	: true,
											enableKeyEvents	: true,
											width		: 260,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-asmt-popup',
												params	:{
													 asmt_dvcd:'02'
												},
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('asmt_name'));
													pairField.setValue(records[0].get('asmt_idcd'));
												}
											}
										},{	name		: 'wmld_idcd', xtype: 'textfield' , hidden:true,
										},{	fieldLabel	:  Language.get( 'pcod_numb' , 'PO No'),
											name		: 'pcod_numb',
											xtype		: 'textfield',
											width		: 260,
										}
									]
								},{	xtype	: 'fieldset',
									layout	: 'hbox',
									padding	: '0',
									border	:  0,
									margin	: '0 0 5 0' ,
									items	: [
										{	fieldLabel	: Language.get( 'scre_spec_frml', '스코어규격' ),
											name		: 'scre_spec_frml',
											xtype		: 'textfield',
											maxLength	: 50,
											width		: 185,
										},{	fieldLabel	: Language.get( 'scre_spec', '=' ),
											name		: 'scre_spec'  ,
											xtype		: 'numericfield',
											width		: 75,
											labelWidth	: 10,
										},{	fieldLabel	:  Language.get( 'wmld_size' , '목형Size'),
											name		: 'wmld_size',
											xtype		: 'textfield',
											width		: 260,

										}
									]
								}
							]
						}
					]
				}
			]
		};
		return form;
	},
	createTab: function(){
		var me = this;
			tab  = {
				xtype		: 'tab-panel',
				header		: false,
				region		: 'south',
				cls			: tema,
				flex		: 2,
				items	: [
					{	title	: '작업공정',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype		: 'grid-panel',
								region		: 'center',
								style		: Const.borderLine.top,
								columnLines	: true,
								selModel	: {selType:'cellmodel' },
								features	: [{ftype :'grid-summary'}],
								plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },
								store		: Ext.create( 'lookup.popup.store.ProdPopupWkct' ),
								itemId		: 'prod_wkct',
								paging		: {
									xtype	: 'grid-paging',
									items	: [
										'->' ,
										{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
											listeners: {
						 			 			click:function(self,e){
													me.WkctlineInsert({});
												}
											}
										},
										'-',
										{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
											listeners: {
												click:function(self,e){
													me.WkctlineDelete({});
												}
											}
										}
									]
								},
								columns: [
									{	dataIndex:	'wkct_name'			, width:  200, align : 'left'   , text: Language.get( 'wkct_name'	, '공정명'		)
									},{	xtype	: 'actioncolumn',
											header	: '',
											width	: 20,
											align	: 'center',
											tdCls	: 'editingcolumn',
											items	: [
												{	iconCls	: Const.SELECT.icon,
													tooltip	: '작업공정 찾기',
													handler	: function (grid, rowIndex, colIndex, item, e, record) {
														resource.loadPopup({
														select	: 'SINGLE',
														widget	: 'lookup-wkct-popup',
														params:{
														},
														result	: function(records) {
															var	parent = records[0];
															var	grid = me.down('[itemId=prod_wkct]'),
																store = grid.getStore(),
																selection = grid.getSelectionModel().getSelection()[0]
																row = store.indexOf(selection);
																record.set('wkct_name',parent.data.wkct_name);
																record.set('wkct_idcd',parent.data.wkct_idcd);
																grid.plugins[0].startEdit(row, 2);
															},
														})
													},
													scope : me
												}
											]
									},{	dataIndex	:	'wkun_dvcd'		, width:  85, align : 'center'    , text: Language.get( 'wkun_dvcd'	, '작업단위'			), xtype:'lookupcolumn',lookupValue:resource.lookup('wkun_dvcd'),
										tdCls		: 'editingcolumn',
										editor		: {
											xtype			: 'lookupfield',
											selectOnFocus	: true,
											allowBlank		: true,
											enableKeyEvents : true,
											lookupValue		: resource.lookup('wkun_dvcd'),
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													var	grid = me.down('[itemId=prod_wkct]'),
														store = grid.getStore(),
														selection = grid.getSelectionModel().getSelection()[0]
														row = store.indexOf(selection);
														grid.plugins[0].startEdit(row, grid.columns[3]);
													}
												}
											}
										}
									},{	dataIndex	:	'unit_name'		, width:  85, align : 'center'    , text: Language.get( 'unit_name'	, '수량단위'		)
									},{	xtype	: 'actioncolumn',
										header	: '',
										width	: 20,
										align	: 'center',
										tdCls	: 'editingcolumn',
										items	: [
											{	iconCls	: Const.SELECT.icon,
												tooltip	: '단위 찾기',
												handler	: function (grid, rowIndex, colIndex, item, e, record) {
													resource.loadPopup({
													select	: 'SINGLE',
													widget	: 'lookup-unit-popup',
													params:{
													},
													result	: function(records) {
														var	parent = records[0];
														var	grid = me.down('[itemId=prod_wkct]'),
															store = grid.getStore(),
															selection = grid.getSelectionModel().getSelection()[0]
															row = store.indexOf(selection);
															record.set('unit_name',parent.data.unit_name);
															record.set('qntt_unit_idcd',parent.data.unit_idcd);
															grid.plugins[0].startEdit(row, 5);
														},
													})
												},
												scope : me
											}
										]
									},{	dataIndex	:	'stnd_pric'		, width:  65, align : 'right'    , text: Language.get( 'stnd_pric'	, '표준단가'		), xtype: 'numericcolumn' , summaryType: 'sum',
										tdCls		: 'editingcolumn',
										editor		: {
											selectOnFocus	: true,
											allowBlank		: true,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													var	grid = me.down('[itemId=prod_wkct]'),
														store = grid.getStore(),
														selection = grid.getSelectionModel().getSelection()[0]
														row = store.indexOf(selection);
														grid.plugins[0].startEdit(row, 6);
													}
												}
											}
										}
									},{	dataIndex:	'cstm_name'	, width: 120, align : 'left'    , text: Language.get( 'cstm_name'	, '외주처'	),
									},{	xtype	: 'actioncolumn',
										header	: '',
										width	: 20,
										align	: 'center',
										tdCls	: 'editingcolumn',
										items	: [
											{	iconCls	: Const.SELECT.icon,
												tooltip	: '작업공정 찾기',
												handler	: function (grid, rowIndex, colIndex, item, e, record) {
													resource.loadPopup({
													select	: 'SINGLE',
													widget	: 'lookup-cstm-popup',
													params:{
														otod_cstm_yorn:1
													},
													result	: function(records) {
														var	parent = records[0];
														var	grid = me.down('[itemId=prod_wkct]'),
															store = grid.getStore(),
															selection = grid.getSelectionModel().getSelection()[0]
															row = store.indexOf(selection);
															record.set('cstm_name',parent.data.cstm_name);
															record.set('otod_cstm_idcd',parent.data.cstm_idcd);
															record.set('otod_yorn','1');
														},
													})
												},
												scope : me
											}
										]
									},{	dataIndex:	'user_memo2'	, width: 220, align : 'left'    , text: Language.get( 'user_memo2'	, '비고'	),
										tdCls		: 'editingcolumn',
										editor		: {
											selectOnFocus	: true,
											allowBlank		: true,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													var	grid = me.down('[itemId=prod_wkct]'),
														store = grid.getStore(),
														selection = grid.getSelectionModel().getSelection()[0]
														row = store.indexOf(selection);
														grid.plugins[0].startEdit(row+1, 1);
													}
												}
											}
										}
									}
								],
								listeners: {
									validateedit : function (editor, context, eOpts ) {
										var me = this;
										var field = context.field;
										var value = context.value;

										return true;
									},

									edit: function(editor, context) {
										var me = this;
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
										var me = this,
											grid = me.down('[itemId=prod_wkct]')
										;
										new Ext.util.KeyMap({
											target: me.getEl().dom,
											binding: [
												{	ctrl:true, key: 46,
													fn: function(key,e){
														var records = grid.getSelectionModel().getSelection();
														Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
															fn : function (button) {
																if (button==='yes') {
																	grid.getStore().remove (records);
																}
															}
														});
													}
												}
											]
										});
									}
								},
							}
						]
					},{	title	: '원단투입',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype		: 'grid-panel',
								region		: 'center',
								style		: Const.borderLine.top,
								store		: Ext.create( 'lookup.popup.store.ProdPopupFabc' ),
								itemId		: 'prod_fabc',
								columnLines	: true,
								selModel	: {selType:'cellmodel' },
								features	: [{ftype :'grid-summary'}],
								plugins 	: {ptype  :'cellediting-directinput', clicksToEdit: 1 },
								paging	: {
									xtype	: 'grid-paging',
									items	: [
										'->' ,
										{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
											listeners: {
						 			 			click:function(self,e){
													me.FabclineInsert({});
												}
											}
										},
										'-',
										{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
											listeners: {
												click:function(self,e){
													me.FabclineDelete({});
												}
											}
										}
									]
								},
								columns: [
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
														resource.loadPopup({
															select	: 'SINGLE',
															widget	: 'lookup-fabc-popup',
															params:{
															},
															result	: function(records) {
																var	parent = records[0];
																var	grid = me.down('[itemId=prod_fabc]'),
																	store = grid.getStore(),
																	selection = grid.getSelectionModel().getSelection()[0]
																	row = store.indexOf(selection)
																;
																record.set('fabc_name',parent.data.fabc_name);
																record.set('fabc_idcd',parent.data.fabc_idcd);
																record.set('ppln_dvcd',parent.data.ppln_dvcd);
																grid.plugins[0].startEdit(row, 2);
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
													var grid = me.down('[itemId=prod_fabc]'),
														store = grid.getStore(),
														selection = grid.getSelectionModel().getSelection()[0],
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
													var grid = me.down('[itemId=prod_fabc]'),
														store = grid.getStore(),
														selection = grid.getSelectionModel().getSelection()[0],
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
													var grid = me.down('[itemId=prod_fabc]'),
														store = grid.getStore(),
														selection = grid.getSelectionModel().getSelection()[0],
														row = store.indexOf(selection);
														grid.plugins[0].startEdit(row, 5);
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
													var grid = me.down('[itemId=prod_fabc]'),
														store = grid.getStore(),
														selection = grid.getSelectionModel().getSelection()[0],
														row = store.indexOf(selection);
														grid.plugins[0].startEdit(row,6);
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
													var grid = me.down('[itemId=prod_fabc]'),
														store = grid.getStore(),
														selection = grid.getSelectionModel().getSelection()[0],
														row = store.indexOf(selection);
														grid.plugins[0].startEdit(row, 7);
													}
												}
											}
										}
									},{	dataIndex:	'item_fxqt'	, width: 60, align : 'right'    , text: Language.get( 'item_fxqt'	, '절수'	), xtype: 'numericcolumn',
										tdCls		: 'editingcolumn',
										editor		: {
											selectOnFocus	: true,
											allowBlank		: true,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													var grid = me.down('[itemId=prod_fabc]'),
														store = grid.getStore(),
														selection = grid.getSelectionModel().getSelection()[0],
														row = store.indexOf(selection);
														grid.plugins[0].startEdit(row, 8);
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
													var grid = me.down('[itemId=prod_fabc]'),
														store = grid.getStore(),
														selection = grid.getSelectionModel().getSelection()[0],
														row = store.indexOf(selection);
														grid.plugins[0].startEdit(row, 9);
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
													var grid = me.down('[itemId=prod_fabc]'),
														store = grid.getStore(),
														selection = grid.getSelectionModel().getSelection()[0],
														row = store.indexOf(selection);
														grid.plugins[0].startEdit(row,10);
													}
												}
											}
										}
									},{	dataIndex	:	'pqty_pric2'		, width:  80, align : 'right'    , text: Language.get( 'pqty_pric2'	, '단가/개'		), xtype: 'numericcolumn',
										tdCls		: 'editingcolumn',
										editor		: {
											selectOnFocus	: true,
											allowBlank		: true,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													var grid = me.down('[itemId=prod_fabc]'),
														store = grid.getStore(),
														selection = grid.getSelectionModel().getSelection()[0],
														row = store.indexOf(selection);
														grid.plugins[0].startEdit(row+1, 1);
													}
												}
											}
										}
									}
								]
							}
						],
						listeners: {
							validateedit : function (editor, context, eOpts ) {
								var me = this;
								var field = context.field;
								var value = context.value;

								return true;
							},

							edit: function(editor, context) {
								var me = this;
								me.cellEditAfter(editor, context);
							},

							render: function(){
								var	me = this,
									grid = me.down('[itemId=prod_fabc]')
								;
								new Ext.util.KeyMap({
									target: me.getEl().dom,
									binding: [
										{	ctrl:true, key: 46,
											fn: function(key,e){
												var records = grid.getSelectionModel().getSelection();
												Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
													fn : function (button) {
														if (button==='yes') {
															grid.getStore().remove (records);
														}
													}
												});
											}
										}
									]
								});
							}
						},
					}
				]
			}
	return tab;
	},
	WkctlineInsert : function (config) {
		var me			= this,
			grid		= me.down('[itemId=prod_wkct]'),
			store		= grid.getStore(),
			record		= undefined,
			uper_seqn	= 0
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
			prod_idcd		: me.popup.params.prod_idcd,
		});
		store.add(record);
	},
	/**
	 * 선택한 라인을 삭제처리 한다.
	 */
	WkctlineDelete : function (config) {
		var	me		= this,
			grid	= me.down('[itemId=prod_wkct]')
		;
		var records = grid.getSelectionModel().getSelection();
		if(records[0]){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						grid.getStore().remove (records);
					}
				}
			});
		}else{
			Ext.Msg.alert('알림','삭제가능한 작업공정이 없습니다.');
		}
	},
	FabclineInsert : function (config) {
		var me			= this,
			record		= undefined,
			grid		= me.down('[itemId=prod_fabc]'),
			store		= grid.getStore(),
			uper_seqn	= 0
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
			prod_idcd		: me.popup.params.prod_idcd,
		});
		store.add(record);
	},
	/**
	 * 선택한 라인을 삭제처리 한다.
	 */
	FabclineDelete : function (config) {
		var	me		= this,
			grid	= me.down('[itemId=prod_fabc]'),
			store	= grid.getStore(),
			records = grid.getSelectionModel().getSelection()
		;
		if(records[0]){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						grid.getStore().remove (records);
					}
				}
			});
		}else{
			Ext.Msg.alert('알림','삭제가능한 원단이 없습니다.');
		}
	},

	/**
	 * 확인 버튼 이벤트
	 */

	finishAction: function(){
		var me			 = this,
			baseform	= me.down('form'),
			subform		= me.down('[itemId=subForm]'),
			values		= baseform.getValues(),
			fabcgrid	= me.down('[itemId=prod_fabc]'),
			wkctgrid	= me.down('[itemId=prod_wkct]'),
			invc		= ""
		;
		if(values.prod_code==''||values.prod_code==null){
			Ext.Msg.alert("알림","제품 코드를 반드시  입력해주십시오.");
			return;
		};
		var records = JSON.stringify({
			bxty_idcd		: values.bxty_idcd,
			bxty_name		: values.bxty_name,
			crny_dvcd		: values.crny_dvcd,
			cstm_idcd		: values.cstm_idcd,
			cstm_name		: values.cstm_name,
			line_stat		: values.line_stat,
			mxm2_pric		: values.mxm2_pric,
			pcod_numb		: values.pcod_numb,
			pqty_mxm2		: values.pqty_mxm2,
			pqty_pric		: values.pqty_pric,
			prod_code		: values.prod_code,
			prod_hght		: values.prod_hght,
			prod_idcd		: values.prod_idcd,
			prod_leng		: values.prod_leng,
			prod_name		: values.prod_name,
			prod_widh		: values.prod_widh,
			scre_dvcd		: values.scre_dvcd,
			scre_spec		: values.scre_spec,
			scre_spec_frml	: values.scre_spec_frml,
			cpst_numb		: values.cpst_numb,
			inkk_colr_name	: values.inkk_colr_name,
			user_memo		: values.user_memo,
			wmld_idcd		: values.wmld_idcd,
			wmld_numb		: values.wmld_numb,
			wmld_size		: values.wmld_size,
			line_stat		: '0',
			acct_bacd		: '4000',
			_set			: 'insert'
		});
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		Ext.Ajax.request({
			url		: _global.api_host_info + "/system/custom/iypkg/item/productmast/set/record.do",
			params	: {
				token : _global.token_id,
				param :JSON.stringify({
					records : [records]
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					fabcgrid.getStore().sync();
					wkctgrid.getStore().sync();
					me.setResponse( {success : true , values :  values });
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				mask.hide();
			}
		});
	}
});
