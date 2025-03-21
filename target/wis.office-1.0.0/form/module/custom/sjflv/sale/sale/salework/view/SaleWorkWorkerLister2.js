Ext.define('module.custom.sjflv.sale.sale.salework.view.SaleWorkWorkerLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-salework-worker-lister2',

	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary', remote : false }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-sjflv-salework-worker-search2'}];
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
				xtype : 'grid-paging',
				items : [
					'->','-',
					{text : Const.UPDATE.text , iconCls: Const.UPDATE.icon, action : Const.UPDATE.action , cls: 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' },
				], pagingButton : true
			}
		;
		return item ;
	},




	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'chk'		, width:  35, align : 'center'	, text: Language.get('chk'			, '선택'		), xtype:'checkcolumn',
						listeners:{
							checkchange:function(element, rowindex, bool, rec) {
								var	record      = me.store.getAt(rowindex),
									rowIndexNum = rowindex,
									search      = Ext.ComponentQuery.query('module-sjflv-salework-worker-search')[0]
								;
								if(search.down('[name=vatx_dvcd]').getValue()=='' || !search.down('[name=vatx_dvcd]').getValue()){
									Ext.Msg.alert('알림','자료구분을 선택해주세요.');
									record.set('sply',0);
									record.set('chk','');
									return;
								}

								if(bool){
									if(search.down('[name=vatx_dvcd]').getValue() == '1'){
										record.set('sply',record.get('deff_amnt'));
										record.set('amnt',record.get('deff_amnt'));
										record.set('vatx',record.get('deff_amnt')*0.1);
										record.set('ttsm',(record.get('deff_amnt')+record.get('deff_amnt')*0.1));
									}else{
										record.set('sply',record.get('deff_amnt'));
										record.set('amnt',record.get('deff_amnt'));
										record.set('vatx',0);
										record.set('ttsm',record.get('deff_amnt'));
									}
								}else{
									record.set('sply',0);
									record.set('chk','');
									record.set('amnt',0);
									record.set('vatx',0);
									record.set('ttsm',0);
								}

							}
						}
					},{	dataIndex:	'cstm_code'	, width:  90, align : 'center'	, text: Language.get( 'cstm_code'	, '거래처코드'	)
					},{	dataIndex:	'cstm_name'	, width: 120, align : 'left'	, text: Language.get( 'cstm_name'	, '거래처명'		)
					},{	dataIndex:	'deff_amnt'	, width: 100, align : 'right'	, text: Language.get( 'deff_amnt'	, '미발행금액'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'sply'		, width: 100, align : 'right'	, text: Language.get( 'sply'		, '발행금액'		), xtype : 'numericcolumn', summaryType: 'sum'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						},
					},{	dataIndex:	'amnt'			, width: 100, align : 'right'	, text: Language.get( ''	, '공급가'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'vatx'			, width:  90, align : 'right'	, text: Language.get( ''	, '부가세'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'ttsm'			, width:  90, align : 'right'	, text: Language.get( ''	, '합계'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'remk_text'		, minWidth: 200, flex:  1, align : 'left'		, text: Language.get( 'remk_text'	, '비고'		)
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					}
				]
			}
		;
		return item;
	},


	cellEditAfter  : function (editor, context) {
		var	me = this,
			grid		= this,
			rowIndexNum	= context.rowIdx,
			models		= grid.getStore().getRange(),
			search      = Ext.ComponentQuery.query('module-sjflv-salework-worker-search')[0]
		;
		console.log(search.down('[name=vatx_dvcd]').getValue())
		if(search.down('[name=vatx_dvcd]').getValue()=='' || !search.down('[name=vatx_dvcd]').getValue()){
			Ext.Msg.alert('알림','자료구분을 선택해주세요.');
			models[rowIndexNum].set('sply',0);
			return;
		}
		if(context.field == "sply"){
			var store = grid.getStore().getAt(rowIndexNum);
			if(search.down('[name=vatx_dvcd]').getValue() == '1'){
				models[rowIndexNum].set('amnt',(context.value));
				models[rowIndexNum].set('vatx',(context.value*0.1));
				models[rowIndexNum].set('ttsm',(context.value+context.value*0.1));
			}else{
				models[rowIndexNum].set('amnt',(context.value));
				models[rowIndexNum].set('vatx',0);
				models[rowIndexNum].set('ttsm',0);
			}
		}

	},

	listeners: {
		beforeedit:function(obj,editor){
			var	me    = this,
				idx   = editor.rowIdx,
				store = this.getStore()
				at    = store.getAt(idx)
			;
			if (at.get('num')==2)
				return false;
		},
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	}

});
