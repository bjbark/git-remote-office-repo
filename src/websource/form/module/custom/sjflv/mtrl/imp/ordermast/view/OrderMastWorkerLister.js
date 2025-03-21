Ext.define('module.custom.sjflv.mtrl.imp.ordermast.view.OrderMastWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-ordermast-worker-lister',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType:'cellmodel'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-ordermast-worker-search'}];
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
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon,itemId : 'insert',
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
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get('line_seqn'		, '항번'		)
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
											Ext.ComponentQuery.query('module-ordermast-worker-editor')[0].down('[name=change]').setValue('Y');
											me.plugins[0].startEdit(row, 6);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'item_name'		, flex :  10, align : 'left'	, text: Language.get('item_name'		, '품명'		), minWidth : 180
					},{	dataIndex:	'item_spec'		, width: 150, align : 'center'	, text: Language.get('item_spec'		, '규격'		)
					},{	dataIndex:	'unit_name'		, width:  50, align : 'center'	, text: Language.get('unit_name'		, '단위'		)
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
					},{	dataIndex:	'qntt'		, width:  70, align : 'right'	, text: Language.get('qntt'		, '수량'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
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
					},{	dataIndex:	'exch_pric'	, width:  90, align : 'right'	, text: Language.get('', '판매단가'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
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
					},{	dataIndex:	'exch_amnt'	, width:  120, align : 'right'	, text: Language.get('', '판매금액'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
					},{	dataIndex:	'krwn_pric'	, width:  90, align : 'right'	, text: Language.get('', '원화단가'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
					},{	dataIndex:	'krwn_amnt'	, width:  120, align : 'right'	, text: Language.get('', '원화금액'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0'
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
					},{	dataIndex:	'user_memo'	, flex :  20, align : 'left'	, text: Language.get('', '비고'		), minWidth : 200,
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

	/**
	 */
	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined,
			uper_seqn	= 0,
			mlister		= Ext.ComponentQuery.query('module-ordermast-worker-lister')[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0],
			editor		= Ext.ComponentQuery.query('module-ordermast-worker-editor')[0],
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
			invc_numb		: param.invc_numb
		});
		Ext.ComponentQuery.query('module-ordermast-worker-editor')[0].down('[name=change]').setValue('Y');
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
