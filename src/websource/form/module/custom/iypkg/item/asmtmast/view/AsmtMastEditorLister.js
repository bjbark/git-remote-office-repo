Ext.define('module.custom.iypkg.item.asmtmast.view.AsmtMastEditorLister', { extend: 'Axt.grid.Panel',

	alias	: 'widget.module-asmtmast-editor-lister',
	store	: 'module.custom.iypkg.item.asmtmast.store.AsmtMastEditorLister',

	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI'},
	features	: [{ftype :'grid-summary'}],
	plugins 	: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

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
					{	dataIndex:	'cstm_name'		, width:  200, align : 'left'   , text: Language.get( ''	, '거래처명'	)
					, summaryType: 'count', tdCls		: 'editingcolumn',
					},{	xtype	: 'actioncolumn',
						tdCls	: 'editingcolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '거래처명',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-cstm-popup',
										title	: '거래처명 찾기',
										params : { stor_grp : _global.stor_grp , puch_cstm_yorn : '1', line_stat : '0' },
										result	: function(records) {
											var	parent = records[0];
												grid      = me,
												store     = me.getStore()
												selection = grid.view.getSelectionModel().getSelection()[0],
												row       = store.indexOf(selection)
											;
											record.set('cstm_idcd',parent.data.cstm_idcd);
											record.set('cstm_name',parent.data.cstm_name);
											Ext.ComponentQuery.query('module-asmtmast-editor')[0].down('[name=change]').setValue('Y');
											grid.plugins[0].startEdit(row, grid.columns[2]);

											Ext.Ajax.request({
												url		: _global.location.http() + '/custom/iypkg/item/asmtmast/get/cstmpric.do',
												params	: {
													token : _global.token_id,
													param : JSON.stringify({
														cstm_idcd	: parent.data.cstm_idcd,
														asmt_idcd	: me.getStore().data.items[0].data.asmt_idcd
													})
												},
												async	: false,
												method	: 'POST',
												success	: function(response, request) {
													var result = Ext.decode(response.responseText);
													if	(!result.success ){
														return;
													} else {
														var pric = result.records[0];
														if(typeof pric == "undefined"){
															record.set('befr_pric',0);
														 }else{
															 record.set('befr_pric',pric.puch_pric);
														 }
													}
												},
												failure : function(result, request) {
												},
												callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
												}
											});

										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'puch_pric'		, width:   80, align : 'right'   , text: Language.get( ''	, '매입단가'	), xtype : 'numericcolumn'
						, tdCls		: 'editingcolumn'
						, editor		: {
								tdCls			: 'editingcolumn',
								selectOnFocus	: true,
								allowBlank		: true,
								enableKeyEvents : true,
								listeners:{
									change : function(){
										if(isNaN(this.getValue())==true){
											this.reset();
										}
									},
								}
							}
					},{	dataIndex:	'unit_name'		, width:  60, align : 'left'   , text: Language.get( ''	, '단위'		), tdCls		: 'editingcolumn',
					},{	xtype	: 'actioncolumn',
						tdCls	: 'editingcolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '단위',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-unit-popup',
										title	: '단위 찾기',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result	: function(records) {
											var	parent = records[0];
											record.set('unit_idcd',parent.data.unit_idcd);
											record.set('unit_name',parent.data.unit_name);
											Ext.ComponentQuery.query('module-asmtmast-editor')[0].down('[name=change]').setValue('Y');
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'adpt_date'		, width:   80, align : 'center'   , text: Language.get( ''	, '적용일자'	),
						tdCls		: 'editingcolumn',
						editor		: {
							xtype			:'datefield',
							format			: Const.DATE_FORMAT_YMD_BAR,
							submitFormat	: Const.DATE_FORMAT_YMD,
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
						},
						renderer:function(val){
							a =Ext.util.Format.strToDate(val);
							return a;
						}
					},{	dataIndex:	'befr_pric'		, width:   80, align : 'right'  , text: Language.get( ''	, '이전단가'	), xtype : 'numericcolumn',
						readOnly : true
					},{	dataIndex:	'updt_dttm'		, width:   80, align : 'center'   , text: Language.get( ''	, '변경일자'	),
						renderer : Ext.util.Format.dateRenderer('Y-m-d')
					}
				]
			};
		return item;
	},

	cellEditAfter : function (editor, context) {
		var grid = this;
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var models = grid.getStore().getRange();

		if(context.field == 'adpt_date'){
			if(context.value == null){
				console.log(context.originalValue,'orig');
				models[pos].set('adpt_date',context.originalValue);
			}
		}
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;

			return true;
		},

		edit: function(editor, context) {
			var me = this;
			Ext.ComponentQuery.query('module-asmtmast-editor')[0].down('[name=change]').setValue('Y');
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
							Ext.ComponentQuery.query('module-asmtmast-editor')[0].down('[name=change]').setValue('Y');
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
			editor = Ext.ComponentQuery.query('module-asmtmast-editor')[0]
			asmt_idcd	= editor.down('[name=asmt_idcd]').getValue(),
			unit_idcd	= editor.down('[name=unit_idcd]').getValue(),
			unit_name	= editor.down('[name=unit_name]').getValue(),
			updt_dttm	= new Date(),
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
			adpt_date		: new Date(),
			updt_dttm		: Ext.util.Format.date(new Date(),'Ymd'),
			asmt_idcd		: asmt_idcd,
			line_seqn		: seq,
			uper_seqn		: uper_seqn,
			disp_seqn		: dsp,
			unit_idcd		: unit_idcd,
			unit_name		: unit_name

		});

		// ROW 추가
		Ext.ComponentQuery.query('module-asmtmast-editor')[0].down('[name=change]').setValue('Y');
		store.add(record);
	},
	/**
	 * 선택한 라인을 삭제처리 한다.
	 */
	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		// 삭제 버튼을 눌럿을떄 값이 있다면 아래로 안되면 Msg보여주기
		if(records=='' || records == null){
			Ext.Msg.alert('삭제 확인 요청', '삭제할 자료가 없습니다.');
		}else{
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove (records);
					}
				}
			});
		}
		Ext.ComponentQuery.query('module-asmtmast-editor')[0].down('[name=change]').setValue('Y');
	},
 });

