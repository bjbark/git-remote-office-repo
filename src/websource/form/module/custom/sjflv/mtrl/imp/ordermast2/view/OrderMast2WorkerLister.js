Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2WorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-ordermast2-worker-lister',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType:'checkboxmodel', mode : 'MULTI'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-ordermast2-worker-search',hidden:_global.hq_id.toUpperCase() != 'N1000SJUNG'? true : false}];
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon,itemId : 'insert',hidden:_global.hq_id.toUpperCase() == 'N1000SJUNG'? true : false,
						listeners: {
	 			 			click:function(self,e){
								me.lineInsert({});
							}
						}
					},
					'-',
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,itemId : 'delete',
						listeners: {
							click:function(self,e){
								me.lineDelete({});
							}
						}
					},
					'-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					'-',
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' },
				], pagingButton : false
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	xtype:	'rownumberer'		, width: 50 , align : 'center'  , text: Language.get('line_seqn'		, '항번'		)
					},{	dataIndex:	'item_code'		, width: 120, align : 'center'	, text: Language.get('item_code'		, '품목코드'	)
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						tdCls	: 'editingcolumn',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '품목 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-item-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' , acct_bacd : '자재',acct_bacd	: '삼정(구매발주)'},
									result	: function(records) {
										var	parent = records[0];
										var grid = me.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0]
											row = store.indexOf(selection);
											record.set('item_name',parent.data.item_name);
											record.set('item_code',parent.data.item_code);
											record.set('item_spec',parent.data.item_spec);
											record.set('item_idcd',parent.data.item_idcd);
											record.set('unit_idcd',parent.data.unit_idcd);
											record.set('unit_name',parent.data.unit_name);
											Ext.ComponentQuery.query('module-ordermast2-worker-editor')[0].down('[name=change]').setValue('Y');
											me.plugins[0].startEdit(row, 6);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'item_name'		, flex :  10, align : 'left'	, text: Language.get('item_name'		, '품명'		), minWidth : 180
					},{	dataIndex:	'item_spec'		, width: 150, align : 'left'	, text: Language.get('item_spec'		, '규격'		)
					},{	dataIndex:	'item_hscd'		, width: 150, align : 'center'	, text: Language.get('item_hscd'		, 'HS Code'	)
					},{	dataIndex:	'unit_name'		, width:  70, align : 'center'	, text: Language.get('unit_name'		, '단위'		)
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
											record.set('unit_idcd',parent.data.unit_idcd);
											me.plugins[0].startEdit(row, 6);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'each_qntt'		, width:  70, align : 'right'	, text: Language.get('each_qntt'		, 'Each'	), xtype: 'numericcolumn',
						tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[17]);
									}
								}
							}
						}
					},{	dataIndex:	'pckg_size'		, width:  70, align : 'right'	, text: Language.get('pckg_size'		, 'Pack Size'	), xtype: 'numericcolumn',
						tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[17]);
									}
								}
							}
						}
					},{	dataIndex:	'qntt'			, width:  70, align : 'right'	, text: Language.get('qntt'				, '수량'		), xtype: 'numericcolumn', format		: '#,##0.##',
						tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[19]);
									}
								}
							}
						}
					},{	dataIndex:	'exch_pric'	, width:  90, align : 'right'	, text: Language.get('exch_pric', '판매단가'		), xtype: 'numericcolumn' , summaryType: 'sum',
						tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[19]);
									}
								}
							}
						}
					},{	dataIndex:	'exch_amnt'	, width:  120, align : 'right'	, text: Language.get('exch_amnt', '판매금액'		), xtype: 'numericcolumn' , summaryType: 'sum', format		: '#,##0.###',
					},{	dataIndex:	'krwn_pric'	, width:  90 , align : 'right'	, text: Language.get('krwn_pric', '원화단가'		), xtype: 'numericcolumn' , summaryType: 'sum',
					},{	dataIndex:	'krwn_amnt'	, width:  120, align : 'right'	, text: Language.get('krwn_amnt', '원화금액'		), xtype: 'numericcolumn' , summaryType: 'sum',
					},{	dataIndex:	'user_memo'	, flex :  20 , align : 'left'	, text: Language.get('user_memo', '비고'			), minWidth : 160,
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									if (e.keyCode == e.ENTER) {
										grid.plugins[0].startEdit(row+1, grid.columns[6]);
									}else if(e.keyCode == e.TAB){
										grid.plugins[0].startEdit(row, grid.columns[6]);
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

	cellEditAfter : function (editor, context) {
		var	me = this,
			field = context.field,
			index = context.rowIdx,
			grid = context.grid,
			select = grid.getStore().getAt(index),
			ownEditor =  Ext.ComponentQuery.query('module-ordermast2-worker-editor')[0],
			param = ownEditor.getValues()
		;
		var	qntt      = select.get('qntt'),
			exch_pric = select.get('exch_pric'),
			each_qntt = select.get('each_qntt'),
			pckg_size = select.get('pckg_size'),
			krwn_pric = select.get('krwn_pric')
		;
		if(field == 'qntt' || field == 'exch_pric'){
			var exch_amnt = 0;
			if (_global.hq_id.toUpperCase() == 'N1000SJFLV') {
				exch_amnt = (Number(select.get('qntt')) * Number(select.get('exch_pric'))).toFixed(2);
			} else {
				exch_amnt = (Number(select.get('qntt')) * Number(select.get('exch_pric'))).toFixed(3);
			}
			select.set('exch_amnt',exch_amnt);
			select.set('krwn_pric',Math.round(exch_pric*param.exrt));
			select.set('krwn_amnt',Math.round(qntt*select.get('krwn_pric')));
		}
		if(field =='each_qntt' || field == 'pckg_size'){
			select.set('qntt',each_qntt*pckg_size);
			if(each_qntt*pckg_size>0){
				var exch_amnt = 0;
				if (_global.hq_id.toUpperCase() == 'N1000SJFLV') {
					exch_amnt = (Number(select.get('qntt')) * Number(select.get('exch_pric'))).toFixed(2);
				} else {
					exch_amnt = (Number(select.get('qntt')) * Number(select.get('exch_pric'))).toFixed(3);
				}
				select.set('exch_amnt',exch_amnt);
				select.set('krwn_amnt',Math.round(each_qntt*pckg_size*select.get('krwn_pric')));
			}
		}
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			var records = me.getSelectionModel().getSelection();
			//
			if(field === 'qntt' && value > 999999){
				Ext.Msg.show({ title: '수량 확인 요청', msg: '입력한 수량을 점검해 보시기 바랍니다.  계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
					fn : function (button) {
						if (button==='yes') {
							context.record.set(field, context.value);
							me.cellEditAfter(editor, context);
						}
					}
				});
				return false;
			}
			return true;
		},

		edit: function(editor, context) {
			var me = this;
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
					/* Ctrl + Delete */
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
		},
	},

	/**
	 */
	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined,
			uper_seqn	= 0,
			mlister		= Ext.ComponentQuery.query('module-ordermast2-worker-lister')[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0],
			editor		= Ext.ComponentQuery.query('module-ordermast2-worker-editor')[0],
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
			amnd_degr		: param.amnd_degr
		});
		Ext.ComponentQuery.query('module-ordermast2-worker-editor')[0].down('[name=change]').setValue('Y');
		store.add(record);
	},

	lineDelete:function(){
		var	me = this,
			records = me.getSelectionModel().getSelection();
		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					me.getStore().remove (records);
				}
			}
		});
	}
});
