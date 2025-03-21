Ext.define('module.cust.cstmmast.view.CstmMastBankLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-cstmmast-bank-lister',
	store		: 'module.cust.cstmmast.store.CstmMastBank',
	border		: 0,
	columnLines	: true,
	selModel: {selType:'cellmodel'},
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
				items	: [
					{	dataIndex:	'line_seqn'		, width:  60 , text: Language.get( 'line_seqn'	, '순번'	), xtype:'numericcolumn'
					},{	dataIndex:	'bank_name'		, width:  100, align : 'left'   , text: Language.get( 'bank_name'	, '은행명'	),
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'acct_nmbr'		, width: 160, align : 'left'   , text: Language.get( 'acct_nmbr'	, '계좌번호'		),
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'rpst_acct_yorn'		, width:  80, align : 'left'   , text: Language.get( 'rpst_acct_yorn'	, '대표계좌'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
						editor	: {
							xtype			: 'lookupfield',
							lookupValue		: resource.lookup('yorn'),
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'addr_name'		, width: 200, align : 'left'   , text: Language.get( ''	, '은행주소'	),
						editor	: {
							xtype			: 'textfield',
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'user_memo_bank'		, flex: 1, align : 'left'   , text: Language.get( 'user_memo'	, '비고'	),
						editor	: {
							xtype			: 'textfield',
							selectOnFocus	: true,
							allowBlank		: true
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
			var me = this;
			var field = context.field;
			var value = context.value;
		},

		edit: function(editor, context) {
			var me = this;
			Ext.ComponentQuery.query('module-cstmmast-editor')[0].down('[name=change]').setValue('Y');
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
			mlister		= Ext.ComponentQuery.query('module-cstmmast-lister')[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0],
			editor		= Ext.ComponentQuery.query('module-cstmmast-editor')[0],
			new_invc_numb
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
			cstm_idcd		: editor.getValues().cstm_idcd,
		});
		Ext.ComponentQuery.query('module-cstmmast-editor')[0].down('[name=change]').setValue('Y');
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
		Ext.ComponentQuery.query('module-cstmmast-editor')[0].down('[name=change]').setValue('Y');
	},

 });





