Ext.define('module.custom.iypkg.item.productmast.view.ProductMastWkctEditorLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-productmast-editor-wkctlister',
	store		: 'module.custom.iypkg.item.productmast.store.ProductMastWkctEditor',
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
											select	: 'MULTI',
											widget	: 'lookup-wkct-popup',
											params:{
											},
											result	: function(records) {
												var grid       = me.up('grid'),
													store      = me.getStore(),
													selection  = me.getSelectionModel().getSelection()[0]
													row        = store.indexOf(selection),
													max        = 0,
													editor     = Ext.ComponentQuery.query('module-productmast-editor')[0]
												;
												store.each(function(records){
													if(max < records.get('line_seqn')){
														max = records.get('line_seqn');
													}
												});
												max = max+1;
												for (var i = 0; i < records.length; i++) {
													if(i==0){
														record.set('wkct_name',records[i].data.wkct_name);
														record.set('wkct_idcd',records[i].data.wkct_idcd);
													}else{
														model = Ext.create( store.model.modelName , {
															line_seqn		: max,
															prod_idcd		: editor.getValues().prod_idcd,
															stnd_pric		: 0,
															wkct_name		: records[i].data.wkct_name,
															wkct_idcd		: records[i].data.wkct_idcd
														});
														store.add(model);
														var kep = store.getAt(max-1);
														console.log(kep)
														kep.set('_set','insert');
														max++;
													}
												}
												editor.down('[name=change]').setValue('Yes');
												me.plugins[0].startEdit(row, 2);
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
									var grid = self.up('grid'),
									store = me.getStore(),
									selection = me.getSelectionModel().getSelection()[0],
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
										var grid = me.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										row = store.indexOf(selection);
											record.set('unit_name',parent.data.unit_name);
											record.set('qntt_unit_idcd',parent.data.unit_idcd);
											Ext.ComponentQuery.query('module-productmast-editor')[0].down('[name=change]').setValue('Y');
											me.plugins[0].startEdit(row, 5);
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
									var grid = self.up('grid'),
									store = me.getStore(),
									selection = me.getSelectionModel().getSelection()[0],
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
										var grid = me.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										row = store.indexOf(selection);
											record.set('cstm_name',parent.data.cstm_name);
											record.set('otod_cstm_idcd',parent.data.cstm_idcd);
											record.set('otod_yorn','1');
											Ext.ComponentQuery.query('module-productmast-editor')[0].down('[name=change]').setValue('Y');
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
									var grid = self.up('grid'),
									store = me.getStore(),
									selection = me.getSelectionModel().getSelection()[0],
									row = store.indexOf(selection);
										grid.plugins[0].startEdit(row+1, 1);
									}
								}
							}
						}
					},{	dataIndex:	'rep_chek'			, text: Language.get('rep_chek'			, '최종공정'		), width : 60 , align : 'center',xtype:'checkcolumn',
						listeners:{
							checkchange:function(element, rowindex, bool, rec) {
								var record = me.store.getAt(rowindex),
									rowIndexNum = rowindex
								;
								var i = 0;
								if(bool){
									me.store.each(function(records){
										if(i != rowIndexNum){
											records.set('rep_chek',!bool);
										}
										i++;
									})
								}
							}
						}
					},
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
			stnd_pric		: 0
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
			Ext.Msg.alert('알림','삭제가능한 작업공정이 없습니다.');
		}
	},

 });





