Ext.define('module.sale.order.saleorder3.view.SaleOrder3WorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-saleorder3-worker-lister',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType:'checkboxmodel' , mode : 'MULTI'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-saleorder3-worker-search'}];
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
					{	text: Const.DELETE.text , iconCls: Const.DELETE.icon , action : Const.DELETE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				], pagingButton : false
			}
		;
		return item ;
	},

	/**
	 *.
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'line_seqn'		, width: 45 , align : 'center'	, text: Language.get('line_seqn'		, '항번'		)
					},{	dataIndex:	'item_clss_bacd_name', width: 100, align : 'left'	, text: Language.get('item_clss_bacd_name'	, '품목군'		) ,tdCls	: 'editingcolumn',
					},{	dataIndex:	'item_code'		, width: 60, align : 'center'	, text: Language.get('item_code'		, '품목코드'	)
					},{	dataIndex:	'item_name'		, flex :  10, align : 'left'	, text: Language.get('item_name'		, '품명'		), minWidth : 180
					},{	dataIndex:	'item_spec'		, width: 90, align : 'center'	, text: Language.get('item_spec'		, '규격'		)
					},{	dataIndex:	'unit_name'		, width:  50, align : 'center'	, text: Language.get('unit_name'		, '단위'		), hidden: true
					}
//					{	xtype	: 'actioncolumn',
//						header	: '',
//						width	: 20,
//						align	: 'center',
//						items	: [
//							{	iconCls	: Const.SELECT.icon,
//								tooltip	: '품목군 찾기',
//								handler	: function (grid, rowIndex, colIndex, item, e, record) {
//									resource.loadPopup({
//										select	: 'SINGLE',
//										widget	: 'lookup-base-popup',
//										params	: { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '8001', tema : ''},
//										result	: function(records) {
//											var	parent = records[0];
//											record.set('item_clss_bacd',parent.data.base_code);
//											record.set('item_clss_bacd_name',parent.data.base_name);
//										}
//									})
//								},
//								scope : me
//							}
//						]
//					}
					,{	dataIndex:	'item_bacd_name'	, width: 80, align : 'left'	, text: Language.get('item_bacd_name'		, '품목구분'		),tdCls	: 'editingcolumn',
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '품목구분 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-base-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '8002', tema : ''},
										result	: function(records) {
											var	parent = records[0];
											record.set('item_bacd',parent.data.base_code);
											record.set('item_bacd_name',parent.data.base_name);
										}
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'make_bacd_name'	, width: 70, align : 'left'	, text: Language.get('make_bacd_name'		, '제조구분'		),tdCls	: 'editingcolumn',
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '제조구분 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-base-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '8003', tema : ''},
										result	: function(records) {
											var	parent = records[0];
											record.set('make_bacd',parent.data.base_code);
											record.set('make_bacd_name',parent.data.base_name);
										}
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'mtrl_bacd_name'	, width: 70, align : 'left'	, text: Language.get('mtrl_bacd_name'		, '재질구분'		),tdCls	: 'editingcolumn',
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '재질구분 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-base-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '3101', tema : ''},
										result	: function(records) {
											var	parent = records[0];
											record.set('mtrl_bacd',parent.data.base_code);
											record.set('mtrl_bacd_name',parent.data.base_name);
										}
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'emgc_yorn'		, width:  55, align : 'left'	, text: Language.get('emgc_yorn'		, '긴급여부'			) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype	: 'lookupfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							lookupValue	: resource.lookup('yorn'),
						}
					},{	dataIndex:	'srfc_proc_yorn', width:  55, align : 'left'	, text: Language.get('srfc_proc_yorn'	, '표면처리여부'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype	: 'lookupfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							lookupValue	: resource.lookup('yorn'),
							listeners	: {
								change : function(rowindex) {
									var grid      = this.up('grid'),
									store     = me.getStore(),
									selection = grid.view.getSelectionModel().getSelection()[0],
									index     = store.indexOf(selection)
									;
									if(this.getValue() == 0){
										deli = Ext.Date.add(new Date(),Ext.Date.DAY,+15)
									}else{
										deli = Ext.Date.add(new Date(),Ext.Date.DAY,+25)
									}
									grid.view.getSelectionModel().selected.items[0].set('deli_date2',deli);
								},
							},
						}
					},{	dataIndex:	'drwg_yorn', width:  55, align : 'left'	, text: Language.get('drwg_yorn'	, '도면확인'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype	: 'lookupfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							lookupValue	: resource.lookup('yorn'),
						}
					},{	dataIndex:	'cstm_lott_numb', width: 90, align : 'center'	, text: Language.get(''	, 'LOT번호'	),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype	: 'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
						}
					},{	dataIndex:	'cstm_prcs_numb', width: 90, align : 'center'	, text: Language.get('cstm_prcs_numb'	, '고객주문번호'	),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype	: 'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
						}
					},{	dataIndex:	'cstm_mold_code', width: 90, align : 'center'	, text: Language.get('cstm_mold_code'	, '고객금형코드'	),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype	: 'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
						}
					},{	dataIndex:	'drwg_numb', width: 90, align : 'center'	, text: Language.get('drwg_numb'	, '도면번호'	),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype	: 'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
						}
					},{	dataIndex:	'item_wigt'	, width: 90, align : 'right'	, text: Language.get('item_wigt'	, '중량'	), xtype: 'numericcolumn'
					},{	dataIndex:	'invc_qntt'		, width:  45, align : 'right'	, text: Language.get('invc_qntt'		, '수량'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
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
					},{	dataIndex:	'stok_qntt'	, width:  80, align : 'right'	, text: Language.get('', '현재고량'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'cont_pric'	, width:  80, align : 'right'	, text: Language.get('cont_pric', '단가'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
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
										grid.plugins[0].startEdit(row, grid.columns[21]);
									}
								}
							}
						}
					},{	dataIndex:	'sply_amnt'	, width:  80, align : 'right'	, text: Language.get('sply_amnt', '금액'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'vatx_amnt'	, width:  80, align : 'right'	, text: Language.get('vatx_amnt', '부가세	'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0', hidden: true
					},{	dataIndex:	'invc_amnt'	, width:  80, align : 'right'	, text: Language.get('invc_amnt', '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0', hidden: true
					},{	dataIndex:	'deli_date2', width:  80, align : 'center'	, text: Language.get('deli_date2', '납기일자'	),
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							selectOnFocus: true,
							allowBlank	: false,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[22]);
									}
								}
							}
						},
						renderer : function(val){
							var value = '';
							var y,m,d;
							if(val){
								if(val.match(/[^0-9]/)){
									y = new Date(val).getFullYear().toString();
									m = (new Date(val).getMonth()+1).toString();
									d = new Date(val).getDate().toString();
									value = y+'-'+(m[1]?m:'0'+m[0])+'-'+(d[1]?d:'0'+d[0]);
								}else{
									value = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
							return value
						}
					},{	dataIndex:	'user_memo'	, flex :  15, align : 'left'	, text: Language.get('user_memo', '메모'		), minWidth : 200,
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
		var me = this;
		context.record.recalculation( me.editor.getRecord() );

//		var a = this.getSelectionModel().getSelection()[0].data.srfc_proc_yorn;		//표면처리여부
//		var b = this.getSelectionModel().getSelection()[0].data.deli_date2;			//납기일자
//
//
//		if(a==0){
//			b = Ext.Date.add(new Date(),Ext.Date.DAY,+15)
//		}else{
//			b = Ext.Date.add(new Date(),Ext.Date.DAY,+25)
//		}
//		store.each(function(findrecord){
//			b += findrecord.get('deli_date2');
//		});

//		if(qty == 0){
//			date = Ext.Date.add(new Date(),Ext.Date.DAY,+15)
//		}else{
//			date = Ext.Date.add(new Date(),Ext.Date.DAY,+25)
//		}
//		panel.down('[name=deli_date2]').setValue(date);

//		var invc_qntt		= this.getSelectionModel().getSelection()[0].data.invc_qntt;		//수량
//		var cont_pric		= this.getSelectionModel().getSelection()[0].data.cont_pric;		//단가
//		var sply_amnt		= this.getSelectionModel().getSelection()[0].data.sply_amnt;		//공급가
//		var vatx_amnt		= this.getSelectionModel().getSelection()[0].data.vatx_amnt;		//부가세
//		var invc_amnt		= this.getSelectionModel().getSelection()[0].data.invc_amnt;		//합계금액
//
//		var amnt		= Math.floor(invc_qntt*cont_pric);			//공급가
//		var vatx		= Math.floor((invc_qntt*cont_pric)*0.1);	//부가세
//		var ttsm		= amnt+vatx;								//합계
//
//		var grid		= this;
//		var pos			= this.view.getSelectionModel().getCurrentPosition().row;
//		var models		= grid.getStore().getRange();
//
//		console.log(vatx,'vatx');
//		if(invc_qntt > 0 && cont_pric > 0){
//			models[pos].set('sply_amnt', amnt);
//			models[pos].set('vatx_amnt', vatx);
//			models[pos].set('invc_amnt', ttsm);
//		}

//		editor.grid.view.getSelectionModel().onKeyDown();
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			var records = me.getSelectionModel().getSelection();
			//
			if(field === 'invc_qntt' && value > 999999){
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
	}
});
