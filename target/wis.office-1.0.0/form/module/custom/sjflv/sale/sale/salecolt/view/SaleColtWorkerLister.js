Ext.define('module.custom.sjflv.sale.sale.salecolt.view.SaleColtWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-salecolt-worker-lister',
	store		: 'module.custom.sjflv.sale.sale.salecolt.store.SaleColtWorkerLister',
	split		: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    }],

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-sjflv-salecolt-worker-search'}]
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
									lister = Ext.ComponentQuery.query('module-sjflv-salecolt-worker-lister')[0],
									search = Ext.ComponentQuery.query('module-sjflv-salecolt-worker-search')[0]
								;
								if(bool){
									lister.getSelectionModel().select(rowIndexNum);
									record.set('iomy_amnt', record.get('unpaid') - record.get('rett_unpaid'));
									me.cellEditAfter(element, record);
								}else{
									lister.getSelectionModel().select(rowIndexNum);
									//search.down('[name=total_amnt]').reset();
									record.set('iomy_amnt','0');
									me.cellEditAfter(element, record);
								}
							}
						}
					},{ dataIndex: 'cstm_code'	, text : Language.get('cstm_code'	,'거래처코드'		) , width : 80 , align : 'center'
					},{ dataIndex: 'cstm_name'	, text : Language.get('cstm_name'	,'거래처명'		) , width  : 250
					},{ dataIndex: 'sale_amnt'	, text : Language.get('sale_amnt'	,'공급가'		) , width : 100  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'vatx_amnt'	, text : Language.get('vatx_amnt'	,'부가세'		) , width : 100  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'매출금액'		) , width : 100  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'unpaid'		, text : Language.get('unpaid'		,'미수액'		) , width : 100  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'rett_unpaid', text : Language.get(''			,'반품금액'	) , width : 100  , xtype : 'numericcolumn', summaryType: 'sum'
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
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고'			) , minWidth : 100,flex  : 30
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
		var search	= Ext.ComponentQuery.query('module-sjflv-salecolt-worker-search')[0];
		var ttsm	= 0;

		if(b > c){
			Ext.Msg.alert("알림", "미지급액보다 액수가 큽니다 수금액을 다시 입력해주십시오.");
			models[pos].set('iomy_amnt',0);
			return;
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
