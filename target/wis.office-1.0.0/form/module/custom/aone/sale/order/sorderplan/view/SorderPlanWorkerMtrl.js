Ext.define('module.custom.aone.sale.order.sorderplan.view.SorderPlanWorkerMtrl', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-aone-sorderplan-worker-mtrl',
	store: 'module.custom.aone.sale.order.sorderplan.store.SorderPlanMtrl',

	selModel 	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' } ],
	plugins 	: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

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
					{	text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon, itemId: 'itemInsertRow',
						listeners: {
	 			 			click:function(self,e){
								me.lineInsert({});
							}
						}
					},
					'-',
					{	text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon, itemId: 'itemDeleteRow',
						listeners: {
							click:function(self,e){
								me.lineDelete({});
							}
						}
					},
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
					{	xtype: 'rownumberer'	    , text : '항번', width : 40    , align : 'center'
					},{	dataIndex:	'line_seqn'		, width : 50 , align : 'center'	, text: Language.get(''	, '항번'			), hidden : true,
					},{	dataIndex:	'assi_seqn'		, width : 50 , align : 'center'	, text: Language.get(''	, '보조순번'		), hidden : true,
					},{	dataIndex:	'invc_numb'		, width : 150, align : 'center'	, text: Language.get(''	, 'invc'		), hidden : true
					},{	dataIndex:	'amnd_degr'		, width : 150, align : 'center'	, text: Language.get(''	, '차수'			), hidden : true
					},{	dataIndex:	'item_idcd'		, width : 150, align : 'center'	, text: Language.get(''	, '부품ID'		), hidden : true,
					},{	dataIndex:	'item_code',
						width	: 150,
						align	: 'left',
						text	: Language.get(''	, '부품코드'),
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									}
								}
							}
						}
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '품목찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-item-popup-aone',
									params:{
										line_stat : '0',
										acct_bacd : '부품',
									},
									result	: function(records) {
										var	parent = records[0];
										var grid = me.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										row = store.indexOf(selection);
											record.set('item_idcd',parent.data.item_idcd);
											record.set('item_name',parent.data.item_name);
											record.set('item_spec',parent.data.item_spec);
											record.set('item_code',parent.data.item_code);
											record.set('stok_qntt',parent.data.stok_qntt);
											record.set('pric',parent.data.max_pric);
											me.plugins[0].startEdit(row, 1);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'item_name',
						width	: 150,
						align	: 'left',
						text	: Language.get(''	, '부품명'	),
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									}
								}
							}
						}
					},{	dataIndex:	'item_spec',
						width	: 120,
						align	: 'left',
						text	: Language.get(''	, '규격'),
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									}
								}
							}
						},
					},{	dataIndex:	'stok_qntt'	, text: Language.get( 'stok_qntt', '재고')	, width : 50 , align : 'right', name : 'stok_qntt'
					},{	dataIndex:	'qntt'		, text: Language.get( 'qntt'	, '소요량'	)	, width : 100, align : 'right', xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									}
								}
							}
						}
					},{	dataIndex:	'pric'		, width : 80, align : 'right'	, text: Language.get('pric'	, '단가'), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									}
								}
							}
						}
					},{	dataIndex:	'amnt'		, width:  100, align : 'right'	, text: Language.get('amnt'	, '금액'), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0',
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
			store  = grid.getStore(),
			select = grid.getStore().getAt(index),
			slct = select.length
		;
		var	qntt = select.get('qntt'),
			pric = select.get('pric'),
			amnt = Math.round((Number(qntt) * Number(pric)) * 100) /100.0
		;
		if(field == 'qntt' || field == 'pric'){
			select.set('amnt',amnt);
			store.each(function(findrecord){
					max_seq = findrecord.set('rownumberer');
			});
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
			mlister		= Ext.ComponentQuery.query('module-aone-sorderplan-lister-master')[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0]
		;

		if(mrecord){
		store.each(function(record){
			uper_seqn  = record.get('assi_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = 0;
		}
		var seq = uper_seqn + 1;
		var dsp = uper_seqn + 1;

		record = Ext.create( store.model.modelName , {
			invc_numb		: mrecord.get('invc_numb'),
			amnd_degr		: mrecord.get('amnd_degr'),
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
