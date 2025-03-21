Ext.define('module.custom.aone.sale.order.sorderostt.view.SorderOsttPopupMtrl', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-sorderostt-popup-mtrl',
	store: 'module.custom.aone.sale.order.sorderostt.store.SorderOsttPopupMtrl',

	selModel 	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' } ],
	plugins 	: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent : function() {
		var me = this;
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
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				listeners:{
					afterrender : function(){
						me.search();
					},
				},
				items : [
					{	xtype: 'rownumberer'	    , text : '항번', width : 40       , align : 'center', hidden : false,
					},{	dataIndex:	'work_invc_numb', width : 150, align : 'center'	, text: Language.get(''	, 'work_invc_numb'	), hidden : true,
					},{	dataIndex:	'acpt_stat_dvcd', width : 150, align : 'center'	, text: Language.get(''	, 'acpt_stat_dvcd'	), hidden : true,
					},{	dataIndex:	'line_seqn'     , width : 150, align : 'center'	, text: Language.get(''	, '순번'			), hidden : true,
					},{	dataIndex:	'item_idcd'     , width : 150, align : 'center'	, text: Language.get(''	, '부품ID'			), hidden : true,
					},{	dataIndex:	'item_code',
						width	: 100,
						align	: 'left',
						text	: Language.get(''	, '부품코드'),
						editor	: {
							xtype		:'textfield',
							readOnly: true,
							selectOnFocus: true,
							allowBlank	: false,
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
							readOnly: true,
							selectOnFocus: true,
							allowBlank	: false,
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
							readOnly: true,
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									}
								}
							}
						}
					},{	dataIndex:	'stok_qntt'	, text: Language.get( 'stok_qntt', '재고')	, width : 50 , align : 'right', name : 'stok_qntt'
					},{	dataIndex:	'qntt'		, text: Language.get( 'qntt'	, '소요량'	)	, width : 100, align : 'right', xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									}
								}
							}
						}
					},{	dataIndex:	'pric'		, width : 80, align : 'right'	, text: Language.get('pric'	, '단가'),
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									}
								}
							}
						}
					},{	dataIndex:	'amnt'		, width:  100 , align : 'right'	, text: Language.get('amnt'	, '금액'), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0',
					},{	dataIndex:	'modify'	, value: ''   , text: Language.get('modify', '수정여부') , hidden : true,
					},
				]
			}
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

	cellEditAfter2 : function (editor, context) {
		var	me = this,
			field  = context.field,
			index  = context.rowIdx,
			grid   = context.grid,
			select = grid.getStore().getAt(index)
		;
		var	stok = select.get('stok_qntt'),
			qntt = select.get('qntt')
		;
//		if(stok < qntt){
//			Ext.Msg.alert("알람", "재고수량보다 많게 선택하셨습니다.");
//			select.set('qntt', '0');
//			me.cellEditAfter(editor, context);
//		}
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
		},
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
			me.cellEditAfter2(editor, context);
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
			popup		= me.ownerCt.ownerCt.ownerCt
		;
		store.each(function(record){
			uper_seqn = record.get('line_seqn');
			invc_numb = popup.params.work_invc_numb;
		})

		if (uper_seqn == undefined) {
			uper_seqn = 0;
		}

		var seq = uper_seqn + 1;
		var dsp = uper_seqn + 1;
		record = Ext.create( store.model.modelName , {
			line_seqn			: seq,
			work_invc_numb		: popup.params.work_invc_numb,
		});
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
		}else{
			Ext.Msg.alert('알림','삭제가능한 작업공정이 없습니다.');
		}
	},
	search : function(){
		var	me		= this,
			popup	= me.ownerCt.ownerCt.ownerCt
		;
		me.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
			}, scope:me
		}, Ext.merge({work_invc_numb : popup.params.work_invc_numb}) );
	}
});
