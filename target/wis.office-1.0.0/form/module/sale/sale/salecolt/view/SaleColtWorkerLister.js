Ext.define('module.sale.sale.salecolt.view.SaleColtWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salecolt-worker-lister',
	store		: 'module.sale.sale.salecolt.store.SaleColtWorkerLister',
	split		: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-salecolt-worker-search'}]
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'chk'			, text: Language.get('chk'			, '선택'		), width :  35 , align : 'center',xtype:'checkcolumn', filter : 'disabled',
						listeners:{
							checkchange:function(element, rowindex, bool, rec) {
								var record = me.store.getAt(rowindex),
									rowIndexNum = rowindex,
									lister = Ext.ComponentQuery.query('module-salecolt-worker-lister')[0],
									search = Ext.ComponentQuery.query('module-salecolt-worker-search')[0]
								;
								if(bool){
									lister.getSelectionModel().select(rowIndexNum);
									record.set('iomy_amnt',record.get('ttsm_amnt'));
									me.cellEditAfter(element, record);
								}else{
									lister.getSelectionModel().select(rowIndexNum);
									search.down('[name=total_amnt]').reset();
									record.set('iomy_amnt','0');
									me.cellEditAfter(element, record);
								}
							}
						}
					},{	dataIndex: 'invc_numb'	, text : Language.get('invc_numb'	,'매출번호'		) , width : 70 , align : 'center'
					},{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'항번'		) , width : 40 , align : 'center'
					},{ dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'		) , width : 80 , align : 'center'
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width  : 250
					},{ dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 200
					},{ dataIndex: 'unit_name'	, text : Language.get('unit_name'	,'단위'		) , width : 60
					},{ dataIndex: 'sale_qntt'	, text : Language.get('sale_qntt'	,'수량'		) , width : 60 , xtype : 'numericcolumn' , align : 'right', summaryType: 'sum'
					},{ dataIndex: 'sale_pric'	, text : Language.get('sale_pric'	,'단가'		) , width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'sale_amnt'	, text : Language.get('sale_amnt'	,'공급가'		) , width : 100  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'	, text : Language.get('vatx_amnt'	,'부가세'		) , width : 100  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'매출금액'		) , width : 100  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'unpaid'		, text : Language.get('unpaid'		,'미수액'		) , width : 100  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'iomy_amnt'	, text : Language.get('iomy_amnt'	,'수금액'		) , width : 100 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									if (e.keyCode == e.ENTER) {
										grid.plugins[0].startEdit(row+1, grid.columns[15]);
									}else if(e.keyCode == e.TAB){
										grid.plugins[0].startEdit(row, grid.columns[15]);
									}
								}
							}
						}
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'			) , minWidth : 100,flex  : 30
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									if (e.keyCode == e.ENTER) {
										grid.plugins[0].startEdit(row+1, grid.columns[15]);
									}else if(e.keyCode == e.TAB){
										grid.plugins[0].startEdit(row, grid.columns[15]);
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

	cellEditAfter  : function (editor, context) {
		var me = this;
		var a = this.getSelectionModel().getSelection()[0].data.sale_amnt;	//공급가
		var b = this.getSelectionModel().getSelection()[0].data.iomy_amnt;	//지급액(입력)
		var c = this.getSelectionModel().getSelection()[0].data.unpaid;		//미지급액
		var grid = this;
		var models = grid.getStore().getRange();
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var store = grid.getStore();
		var search	= Ext.ComponentQuery.query('module-salecolt-worker-search')[0];
		var ttsm	= 0;

		if(b > c){
			Ext.Msg.alert("알림", "미지급액보다 액수가 큽니다 수금액을 다시 입력해주십시오.");
			models[pos].set('iomy_amnt',0);
			return;
		}

		if(a>=b){
			store.each(function(findrecord){
				ttsm += findrecord.get('iomy_amnt');
			});
			search.down('[name=total_amnt]').setValue(ttsm);
		}
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	}
});
