Ext.define('module.custom.aone.sale.esti.estimast.view.EstiMastListerDetail6', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-estimast-lister-detail6',
	store: 'module.custom.aone.sale.esti.estimast.store.EstiMastDetail6',

	selModel 	: { selType: 'rowmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' } ],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon, itemId: 'itemInsertRow', hidden : true,
						listeners: {
	 			 			click:function(self,e){
								me.lineInsert({});
							}
						}
					},
					'-',
					{	text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon, itemId: 'itemDeleteRow', hidden : true,
						listeners: {
							click:function(self,e){
								me.lineDelete({});
							}
						}
					},
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon, action : Const.UPDATE.action ,cls : 'button-style', itemId : 'btnItemUpdate', hidden : true },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon, action : Const.CANCEL.action ,cls : 'button-style', itemId : 'btnItemCancel', hidden : true },
//					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
				],
				pagingButton : false
			}
		;
		return item;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'line_seqn'		, width : 50 , align : 'center'	, text: Language.get(''	, '항번'	),
					},{	dataIndex:	'invc_numb'		, width : 150, align : 'center'	, text: Language.get(''	, 'invc'	), hidden : true
					},{	dataIndex:	'item_idcd'		, width : 150, align : 'center'	, text: Language.get(''	, 'item_idcd'	), hidden : true
					},{	dataIndex:	'item_name'		, width : 150, align : 'left'	, text: Language.get(''	, '자재 품목명'	),
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[2]);
									}
								}
							}
						},
					},{	dataIndex:	'item_spec'		, width : 120, align : 'left'	, text: Language.get(''	, '규격'	),
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
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
						},
					},{	dataIndex:	'qntt'		, width : 100, align : 'right'	, text: Language.get('qntt'	, '소요량'		), xtype: 'numericcolumn' , format	: '#,##0.##',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
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
					},{	dataIndex:	'pric'		, width : 100, align : 'right'	, text: Language.get('pric'	, '단가'		), xtype: 'numericcolumn' ,
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[5]);
									}
								}
							}
						}
					},{	dataIndex:	'amnt'		, width:  150, align : 'right'	, text: Language.get('amnt'	, '금액'		), xtype: 'numericcolumn'
					}
				]
			};
		return item;
	},

	cellEditAfter : function (editor, context) {
		var	me = this,
			field  = context.field,
			index  = context.rowIdx,
			grid   = context.grid,
			select = grid.getStore().getAt(index)
		;
		var	qntt = select.get('qntt'),
			pric = select.get('pric'),
			amnt = Math.round((Number(qntt) * Number(pric)) * 100) /100.0
		;
		if(field == 'qntt' || field == 'pric'){
			select.set('amnt',amnt);
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
	},


	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined,
			uper_seqn	= 0,
			mlister		= Ext.ComponentQuery.query('module-estimast-lister-master')[0],
			mlister2	= Ext.ComponentQuery.query('module-estimast-lister-master2')[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0],
			mrecord2	= record ? record[0] : mlister2.getSelectionModel().getSelection()[0]
		;

		if(mrecord){
		store.each(function(record){
			uper_seqn  = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = 0;
		}
		var seq = uper_seqn + 1;
		var dsp = uper_seqn + 1;

		record = Ext.create( store.model.modelName , {
			invc_numb		: mrecord.get('invc_numb'),
			amnd_degr		: mrecord.get('amnd_degr'),
			line_seqn		: mrecord2.get('line_seqn'),
			assi_seqn		: seq,
			modify			: 'Y',
		});
		store.add(record);
		}else{
			Ext.Msg.alert("알림", "자재소요를 추가할 견적을 선택하여 주시기 바랍니다.");
		}
	},

	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		if(records.length != 0){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove(records);
					}
				}
			});
		}else {
			Ext.Msg.alert("알림", "삭제할 자재소요를 선택하여 주시기 바랍니다.");
		}
	},

});
