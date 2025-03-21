Ext.define('module.mtrl.po.purcordr.view.PurcOrdrWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-purcordr-worker-lister',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'MULTI'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-purcordr-worker-search'}];
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
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' , itemId: 'update' },
					{	text: Const.DELETE.text , iconCls: Const.DELETE.icon , action : Const.DELETE.action ,cls: 'button-style' , itemId: 'delete'},
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
					},{	dataIndex:	'item_code'		, width: 150, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},{	dataIndex:	'item_name'		, width: 200, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, width: 120, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'	, '단위'		)
					},{	dataIndex:	'offr_qntt'		, width:  80, align : 'right'	, text: Language.get('offr_qntt'	, '수량'		), xtype: 'numericcolumn', summaryType: 'sum' ,format		: '#,##0.###'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[6]);
									}
								}
							}
						}
					},{	dataIndex:	'offr_pric'		, width:  80, align : 'right'	, text: Language.get('offr_pric'	, '단가'		), xtype: 'numericcolumn', format		: '#,##0.##'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[8]);
									}
								}
							}
						}
					},{	dataIndex:	'offr_amnt'		, width:  80, align : 'right'	, text: Language.get('offr_amnt'	, '금액'		), xtype: 'numericcolumn' , summaryType: 'sum' , format		: '#,##0.##'
					},{	dataIndex:	'offr_vatx'		, width:  80, align : 'right'	, text: Language.get('offr_vatx'	, '부가세'		), xtype: 'numericcolumn' , summaryType: 'sum' , format		: '#,##0.##'
//						, tdCls : 'editingcolumn',
//						,editor	: {
//							xtype		:'numericfield',
//							selectOnFocus: true,
//							allowBlank	: false,
//							enableKeyEvents : true,
//							listeners:{
//								keydown : function(self, e) {
//									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//										var grid = self.up('grid'),
//											store = me.getStore(),
//											selection = me.getSelectionModel().getSelection()[0],
//											row = store.indexOf(selection);
//										grid.plugins[0].startEdit(row, grid.columns[10]);
//									}
//								}
//							}
//						}
					},{	dataIndex:	'ttsm_amnt'		, width:  80, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum' , format		: '#,##0.##'
					},{	dataIndex:	'vatx_incl_yorn'	, width:  70, align : 'center'	, text: Language.get('vatx_incl_yorn', '부가세포함'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),hidden : _global.options.mes_system_type.toUpperCase() != 'SJFLV',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype			: 'lookupfield',
							lookupValue		: resource.lookup('yorn'),
							editable		: false,
							selectOnFocus	: true,
							enableKeyEvents : true,
							hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
							listeners:{
								/*change	: function(self, value) {
									var val = this.getValue(),
										panel = self.up('grid')
									if(val == 0){
										inv_vatx = 0
									}else{
										inv_vatx = Math.trunc( Number(panel.down('[name=sply_amnt]').getValue())/(Number(_global.tax_rt)))
									}
									panel.down('[name=vatx_amnt]').setValue(inv_vatx);
									;
								},*/
								keydown : function(self, e) {
									var	grid = self.up('grid'),
										store = me.getStore(),
										selection = grid.view.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[12]);
									;
								}
							}
						}
					},{	dataIndex:	'deli_date2'	, width: 110, align : 'center'	, text: Language.get('deli_date2'	, '납기일자'	),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
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
										var val = this.getValue()
										var a = "";
										if(val != null){
											if((typeof val) == "object"){
												var date1 = new Date(val);
												date2 = Ext.Date.format(date1,'Y-m-d'),
												a = date2;
											}else{
												if(val.match(/[0-9]/)){
													a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
												}
											}
										}
										if(a!="" && a != null){
											this.setValue(a);
										}else{
											this.setValue(val);
										}
										grid.plugins[0].startEdit(row,  grid.columns[11]);
									}
								}
							}
						},
						renderer:function(val){
							var a = null;
							if(val){
								if(val.match(/[^0-9]/)){
									var date1 = new Date(val);
									date2 = Ext.Date.format(date1,'Y-m-d'),
									a = date2
									;
								}else{
									a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
						return a;
						},
					},{	dataIndex:	'user_memo'		, flex :  20, align : 'left'	, text: Language.get('user_memo', '메모'		)
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);

//										grid.plugins[0].startEdit(row+1, grid.columns[5]);
									} else if(editor.down('[name=vatx_dvcd]').value != '1' ){
										if (_global.hq_id.toUpperCase() == 'N1000SJUGN') {
											offr_vatx = 0;
										} else {
											offr_vatx = 0;
										}

//										row.set('offr_vatx'	, offr_vatx);
										console.log(offr_vatx);
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
		var me = this,
			models	= me.getStore().getRange(),
			field = context.field,
			value = context.value,
			qntt,pric,vatx,rowIndex
			context.record.recalculation( me.editor.getRecord(),context)

			;
			rowIndex = context.rowIdx!=undefined?context.rowIdx:rowIndexNum;
			//
			if(field === 'ostt_qntt' && value > 999999){
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
			qntt		= me.getStore().getAt(rowIndex).get('offr_qntt');		//발주량
			pric		= me.getStore().getAt(rowIndex).get('offr_pric');		//개당단가
			vatx		= me.getStore().getAt(rowIndex).get('offr_vatx');		//부가세액
			vatx_incl_yorn = me.getStore().getAt(rowIndex).get('vatx_incl_yorn');

			if(field=='offr_qntt' || field=='offr_pric'){
				models[rowIndex].set('offr_amnt',Math.round(qntt * pric));
				models[rowIndex].set('offr_vatx',Math.round((qntt * pric)/Number(_global.tax_rt)));
				models[rowIndex].set('ttsm_amnt',Math.round((qntt * pric)/Number(_global.tax_rt))+Math.round(qntt * pric));
			}

			if(vatx_incl_yorn == 0 ){
				models[rowIndex].set('offr_vatx',Math.round(0));
				models[rowIndex].set('ttsm_amnt',Math.round((qntt * pric)));
			}else{
				models[rowIndex].set('offr_vatx',Math.round((qntt * pric)/Number(_global.tax_rt)));
				models[rowIndex].set('ttsm_amnt',Math.round((qntt * pric)/Number(_global.tax_rt))+Math.round(qntt * pric));
			}

			if(field=='offr_vatx'){
				models[rowIndex].set('ttsm_amnt',Math.round(vatx)+Math.round(qntt * pric));
			}

	},
	listeners: {
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
										Ext.ComponentQuery.query('module-purcordr-worker-editor')[0].down('[name = change]').setValue('Y');
									}
								}
							});
						}
					}
				]
			});
		}
	}
//}
});
