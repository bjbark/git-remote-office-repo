Ext.define('module.custom.iypkg.item.ppermast.view.PperMastPricLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-ppermast-pric-lister',
	store		: 'module.custom.iypkg.item.ppermast.store.PperMastPric',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel'},
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
					{	dataIndex:	'cstm_name'			, width:  200, align : 'left'   , text: Language.get( 'cstm_name'	, '거래처명'		), tdCls		: 'editingcolumn'
					},{	xtype	: 'actioncolumn',
							header	: '',
							width	: 20,
							align	: 'center',
							tdCls	: 'editingcolumn',
							items	: [
								{	iconCls	: Const.SELECT.icon,
									tooltip	: '거래처 찾기',
									handler	: function (grid, rowIndex, colIndex, item, e, record) {
										resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-cstm-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0',  puch_cstm_yorn : '1'},
										result	: function(records) {
											var	parent    = records[0];
												grid      = me,
												store     = me.getStore()
												selection = grid.view.getSelectionModel().getSelection()[0],
												row       = store.indexOf(selection);
												index     = store.indexOf(selection)
											;

												record.set('cstm_name',parent.data.cstm_name);
												record.set('cstm_idcd',parent.data.cstm_idcd);
												record.set('cstm_code',parent.data.cstm_code);
												Ext.ComponentQuery.query('module-ppermast-editor')[0].down('[name=change]').setValue('Y');
												grid.plugins[0].startEdit(row, grid.columns[2]);

												Ext.Ajax.request({
													url		: _global.location.http() + '/custom/iypkg/item/ppermast/get/cstmpric.do',
													params	: {
														token : _global.token_id,
														param : JSON.stringify({
															cstm_idcd	: parent.data.cstm_idcd,
															pper_idcd	: me.getStore().data.items[0].data.pper_idcd
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
																 record.set('befr_kgrm_pric',0);
																 record.set('befr_tons_pric',0);
															 }else{
																 record.set('befr_kgrm_pric',pric.kgrm_pric);
																 record.set('befr_tons_pric',pric.tons_pric);
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
					},{	dataIndex	:	'kgrm_pric2'		, width:  80, align : 'right'    , text: Language.get( 'kgrm_pric'	, '단가/Kg'			), xtype : 'numericcolumn',
						tdCls		: 'editingcolumn',
						editor		: {
							maxLength		: 20,
							selectOnFocus	: true,
							allowBlank		: false,
							enableKeyEvents : true,
							listeners:{
								change : function(){
									var grid      = this.up('grid'),
										store     = me.getStore(),
										selection = grid.view.getSelectionModel().getSelection()[0],
										index     = store.indexOf(selection)
									;
									if(isNaN(this.getValue())!=true){ // 숫자체크
										if(this.getValue() > 0){
											grid.view.getSelectionModel().selected.items[0].set('tons_pric2',this.getValue()*1000);
										}
									}else{
										this.reset();
										grid.view.getSelectionModel().selected.items[0].set('tons_pric2',0);
									}
								},
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
					},{	dataIndex	:	'tons_pric2'		, width:  80, align : 'right'    , text: Language.get( 'tons_pric'	, '단가/Ton'		), xtype : 'numericcolumn',
						tdCls		: 'editingcolumn',
						editor		: {
							maxLength		: 20,
							selectOnFocus	: true,
							allowBlank		: false,
							enableKeyEvents : true,
							listeners:{
								change : function(){
									if(isNaN(this.getValue())==true){
										this.reset();
									}
								},
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
					},{	dataIndex	: 'adpt_date'			, width: 100, align : 'center'   , text: Language.get( 'adpt_date'	, '적용일자'		) ,
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
					},{	dataIndex:	'befr_kgrm_pric'	, width: 90, align : 'right'    , text: Language.get( 'kgrm_pric2'	, '이전단가/Kg'	), xtype : 'numericcolumn'
					},{	dataIndex:	'befr_tons_pric'	, width: 90, align : 'right'    , text: Language.get( 'tons_pric2'	, '이전단가/Ton'	), xtype : 'numericcolumn'
					},{	dataIndex:	'chag_date'			, width:100, align : 'center'   , text: Language.get( 'updt_dttm'	, '변경일자'		), xtype : 'datecolumn',
						renderer : Ext.util.Format.dateRenderer('Y-m-d'),
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
			editor		= Ext.ComponentQuery.query('module-ppermast-editor')[0]
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
			uper_seqn		: uper_seqn,
			disp_seqn		: dsp,
			befr_kgrm_pric	: 0,
			befr_kgrm_pric	: 0,
			adpt_date		: new Date(),
			chag_date		: new Date(),
			pper_idcd		: editor.getValues().pper_idcd,
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





