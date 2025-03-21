Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-estimast2-worker-lister',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'MULTI'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-estimast2-worker-search'}];
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
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
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
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex:	'item_code'		, width: 120, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	xtype	: 'actioncolumn',
						header	: '',
						tdCls : 'editingcolumn',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-prod-popup',
										params	: {	stor_grp	: _global.stor_grp,
											stor_id		: _global.stor_id,
											line_stat	: '0',
											add			: '1'
										},
										result	: function(records) {
											var	parent = records[0],
												grid = me,
												store = me.getStore(),
												selection = me.getSelectionModel().getSelection()[0],
												row = store.indexOf(selection)
											;
											record.set('item_idcd',parent.data.prod_idcd);
											record.set('item_code',parent.data.prod_code);
											record.set('item_name',parent.data.prod_name);
											record.set('bxty_idcd',parent.data.bxty_idcd);
											record.set('bxty_name',parent.data.bxty_name);
											record.set('mtrl_idcd',parent.data.fabc_idcd);
											record.set('mtrl_name',parent.data.fabc_name);
											record.set('item_line',parent.data.ppln_dvcd);
											record.set('item_leng',parent.data.prod_leng);
											record.set('item_widh',parent.data.prod_widh);
											record.set('item_hght',parent.data.prod_hght);
											record.set('mxm2_qntt',parent.data.pqty_mxm2); // 제곱미터개
											record.set('mxm2_pric',parent.data.mxm2_pric);
											record.set('item_fxqt' ,parent.data.item_fxqt);
											record.set('item_widh2',parent.data.item_widh2);
											record.set('item_leng2',parent.data.item_leng2);
											record.set('pqty_pric' ,parent.data.pqty_pric);
											record.set('sply_amnt' ,Number(parent.data.pqty_pric)*Number(selection.get('esti_qntt')));
											inv_vat = Math.floor((Number(_global.tax_rt) * Number(Number(parent.data.pqty_pric)*Number(selection.get('esti_qntt'))))/1000)*10,
											inv_tot = Number(parent.data.pqty_pric)*Number(selection.get('esti_qntt')) + Number(inv_vat)
											record.set('vatx_amnt' ,inv_vat);
											record.set('ttsm_amnt' ,inv_tot);
										;
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'item_name'		, width: 250, align : 'left'	, text: Language.get('item_name'	, '품명'		), tdCls : 'editingcolumn',
					},{	dataIndex:	'mtrl_name'		, width: 150, align : 'left'	, text: Language.get('mtrl_name'	, '원단명'	)
						, tdCls : 'editingcolumn',
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
										grid.plugins[0].startEdit(row+1, grid.columns[10]);
									}
								}
							}
						}
					},{	dataIndex:	'item_line'		, width:  80, align : 'center'	, text: Language.get('item_line'	, '골'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{	dataIndex:	'bxty_name'		, width: 150, align : 'left'	, text: Language.get('bxty_name'	, '상자형식'	),
					},{	dataIndex:	'item_leng'		, width:  50, align : 'right'	, text: Language.get('item_leng'	, '장'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'item_widh'		, width:  50, align : 'right'	, text: Language.get('item_widh'	, '폭'		), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'item_hght'		, width:  50, align : 'right'	, text: Language.get('item_hght'	, '고'		), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'esti_qntt'		, width:  85, align : 'right'	, text: Language.get('esti_qntt'	, '수량'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								change	: function(self, value) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										editor = Ext.ComponentQuery.query('module-estimast2-worker-editor')[0],
										vatx = editor.down('[name=vatx_dvcd]').value
										row = store.indexOf(selection);
									if(vatx == '2' || vatx == '3'){
											inv_amt = Math.floor((Number(value) * Number(grid.view.getSelectionModel().selected.items[0].get('pqty_pric')))/10)*10,
											inv_tot = Number(inv_amt)
										;
										grid.view.getSelectionModel().selected.items[0].set('sply_amnt',inv_amt);
										grid.view.getSelectionModel().selected.items[0].set('vatx_amnt',0);
										grid.view.getSelectionModel().selected.items[0].set('ttsm_amnt',inv_tot);
									}else{
											inv_amt = Math.floor((Number(value) * Number(grid.view.getSelectionModel().selected.items[0].get('pqty_pric')))/10)*10,
											inv_vat = Math.floor((Number(_global.tax_rt) * Number(inv_amt))/1000)*10,
											inv_tot = Number(inv_amt) + Number(inv_vat)
										;
										grid.view.getSelectionModel().selected.items[0].set('sply_amnt',inv_amt);
										grid.view.getSelectionModel().selected.items[0].set('vatx_amnt',inv_vat);
										grid.view.getSelectionModel().selected.items[0].set('ttsm_amnt',inv_tot);
									}
								},
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection),
											nextRow = row + 1;

										if(_global.hq_id.toUpperCase()=='N1000LIEBE'){
											if (nextRow < store.getCount()) {
												grid.plugins[0].startEdit(nextRow, grid.columns[10]);
											}
										}else{
											grid.plugins[0].startEdit(row, grid.columns[13]);
										}
									}
								}
							}
						}
					},{	dataIndex:	'mxm2_qntt'		, width: 100, align : 'right'	, text: Language.get('mxm2_qntt'	, 'm2/개'	), xtype: 'numericcolumn' , format: '#,##0', summaryType: 'sum',
					},{	dataIndex:	'mxm2_pric'		, width: 100, align : 'right'	, text: Language.get('mxm2_pric'	, '단가/m2'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'pqty_pric'		, width: 100, align : 'right'	, text: Language.get('pqty_pric'	, '단가/개'	), xtype: 'numericcolumn' , format: '#,##0'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								change	: function(self, value) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										editor = Ext.ComponentQuery.query('module-estimast2-worker-editor')[0],
										vatx = editor.down('[name=vatx_dvcd]').value,
										row = store.indexOf(selection);
									if(vatx == '2' || vatx == '3'){
											inv_amt = Math.floor((Number(value) * Number(grid.view.getSelectionModel().selected.items[0].get('esti_qntt')))/10)*10,
											inv_tot = Number(inv_amt)
										;
										grid.view.getSelectionModel().selected.items[0].set('sply_amnt',inv_amt);
										grid.view.getSelectionModel().selected.items[0].set('vatx_amnt',0);
										grid.view.getSelectionModel().selected.items[0].set('ttsm_amnt',inv_tot);
									}else{
											inv_amt = Math.floor((Number(value) * Number(grid.view.getSelectionModel().selected.items[0].get('esti_qntt')))/10)*10,
											inv_vat = Math.floor((Number(_global.tax_rt) * Number(inv_amt))/1000)*10,
											inv_tot = Number(inv_amt) + Number(inv_vat)
										;
										grid.view.getSelectionModel().selected.items[0].set('sply_amnt',inv_amt);
										grid.view.getSelectionModel().selected.items[0].set('vatx_amnt',inv_vat);
										grid.view.getSelectionModel().selected.items[0].set('ttsm_amnt',inv_tot);
									}
								},
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);

										grid.plugins[0].startEdit(row, grid.columns[24]);
									}
								}
							}
						}
					},{	dataIndex:	'sply_amnt'		, width: 100, align : 'right'	, text: Language.get('sply_amnt'	, '공급가액'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
					},{	dataIndex:	'vatx_amnt'		, width: 100, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세액'	), xtype: 'numericcolumn'
					},{	dataIndex:	'ttsm_amnt'		, width: 100, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'item_leng2'	, width:  60, align : 'right'	, text: Language.get('item_leng2'	, '원단장'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'item_widh2'	, width:  60, align : 'right'	, text: Language.get('item_widh2'	, '원단폭'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex:	'item_fxqt'		, width:  60, align : 'left'	, text: Language.get('item_fxqt'	, '절수'		)
					},{	dataIndex:	'fabc_stnd_pric', width: 100, align : 'right'	, text: Language.get('fabc_stnd_pric', '원단표준단가'	), xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'user_memo'		, flex : 1  , align : 'left'	, text: Language.get('user_memo'	, '비고'	), minWidth : 200
						, tdCls : 'editingcolumn',
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

										grid.plugins[0].startEdit(row+1, grid.columns[13]);
									}
								}
							}
						}
					},{	dataIndex:	'ordr_cstm_name'	, width: 100, align : 'right'	, text: Language.get('ordr_cstm_name'	, '매입처명'	)
					},{	dataIndex:	'ordr_mxm2_pric'	, width: 100, align : 'right'	, text: Language.get('ordr_mxm2_pric'	, '매입단가/m2'	), xtype: 'numericcolumn', format: '#,##0'
					},{	dataIndex : 'item_idcd'			, text: Language.get('item_idcd', '품목ID'		), hidden : true
					},{	dataIndex : 'mtrl_idcd'			, text: Language.get('mtrl_idcd', '원단ID'		), hidden : true
					},{	dataIndex : 'bxty_idcd'			, text: Language.get('bxty_idcd', '박스ID'		), hidden : true
					}
				]
			}
		;
		return item;
	},

	cellEditAfter : function (editor, context) {
		var me = this;
//		context.record.recalculation( me.editor.getRecord() );
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			//
			if(field === 'esti_qntt' && value > 999999){
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
			var editor = Ext.ComponentQuery.query('module-estimast2-worker-editor')[0];
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
										editor.down('[name=chk]').setValue('Y');
										me.getStore().remove (records);
									}
								}
							});
						}
					}
				]
			});
		}
	}
});
