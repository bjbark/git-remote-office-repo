Ext.define('module.stock.isos.goodsrettwork.view.GoodsRettWorkWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-goodsrettwork-worker-lister',
	split		: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-goodsrettwork-worker-search'}];
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
					{	dataIndex: 'line_stat'	, text : Language.get('line_stat'		,'상태'		) , width :  50 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'),hidden : true
					},{	dataIndex: 'deli_date'	, text : Language.get('deli_date'		,'납기일자'		) , width :  80 , align : 'center'
					},{	dataIndex: 'cstm_name'	, text : Language.get('cstm_name'		,'거래처명'		) , width : 160 , align : 'left'
					},{	dataIndex: 'cstm_idcd'	, text : Language.get('cstm_idcd'		,'거래처명'		) , width : 250 , align : 'left' , hidden:true
					},{	dataIndex: 'invc_numb'	, text : Language.get('ostt_numb'		,'출고번호'		) , width :  95 , align : 'center'
					},{	dataIndex: 'line_seqn'	, text : Language.get('new_line_seqn'	,'순번'		) , width :  40 , align : 'center'
					},{ dataIndex: 'item_code'	, text : Language.get('item_code'		,'품목코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'		,'품명'		) , flex  :  40 , minWidth : 200
					},{ dataIndex: 'item_spec'	, text : Language.get('item_spec'		,'규격'		) , width : 120
					},{ dataIndex: 'unit_name'	, text : Language.get('unit_name'		,'단위'		) , width :  50
					},{ dataIndex: 'acpt_qntt'	, text : Language.get('acpt_qntt'		,'수주량'		) , width :  65 , xtype : 'numericcolumn', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'qntt'		, text : Language.get('ostt_qntt'		,'납품수량'		) , width :  65 , xtype : 'numericcolumn', summaryType: 'sum', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'unpaid'		, text : Language.get('unpaid'			,'미반품수량'	) , width :  75 , xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
					},{ dataIndex: 'rett_qntt'	, text : Language.get('rett_qntt'		,'반품수량'		) , width :  65 , xtype : 'numericcolumn', format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
						 tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[14]);
									}
								}
							}
						},
						listeners:{
							change:function(){
								var a = this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{ dataIndex	: 'rett_resn_dvcd'	, text : Language.get('rett_resn_dvcd'	,'반품사유'	) , width : 120 , align : 'center',
						tdCls		: 'editingcolumn', xtype : 'lookupcolumn',lookupValue : resource.lookup('rett_resn_dvcd'),
						editor		: {
							xtype	:'lookupfield',
							selectOnFocus: true,
							lookupValue : resource.lookup('rett_resn_dvcd'),
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[15]);
									}
								}
							}
						}
					},
//					{ dataIndex	: 'rett_proc_dvcd'	, text : Language.get('rett_proc_dvcd'	,'반품처리'	) , width : 120 , align : 'center',
//						tdCls		: 'editingcolumn', xtype : 'lookupcolumn',lookupValue : resource.lookup('rett_proc_dvcd'),
//						editor		: {
//							xtype	:'lookupfield',
//							selectOnFocus: true,
//							lookupValue : resource.lookup('rett_proc_dvcd'),
//							allowBlank	: true,
//							enableKeyEvents : true,
//							listeners:{
//								keydown : function(self, e) {
//									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//										var grid = self.up('grid'),
//											store = me.getStore(),
//											selection = me.getSelectionModel().getSelection()[0],
//											row = store.indexOf(selection);
//										grid.plugins[0].startEdit(row, grid.columns[14]);
//									}
//								}
//							}
//						}
//					}
					{ dataIndex	: 'rett_memo'		, text : Language.get('rett_memo'		,'반품메모'	) , width : 200,
						tdCls		: 'editingcolumn',
						editor		: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[16]);
									}
								}
							}
						}
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'lot번호'	) , width : 100
//						, tdCls	: 'editingcolumn',
//						editor	: {
//							xtype		:'textfield',
//							selectOnFocus: true,
//							allowBlank	: true,
//							enableKeyEvents : true,
//							listeners:{
//								keydown : function(self, e) {
//									var index = self.up('grid').view.getSelectionModel().getCurrentPosition().row;
//									if(e.keyCode == e.ENTER){
//										self.up("grid").plugins[0].startEdit(index+1 , 11);
//									}else if(e.keyCode == e.TAB){
//										var selection = self.up('grid').view.getSelectionModel().getCurrentPosition();
//											if(index == (me.getStore().data.length-1) && selection.column == 15){
//												selection = me.getSelectionModel().getSelection()[0],
//												self.blur();
//											}else{
//												self.up("grid").plugins[0].startEdit(index , 11);
//											}
//									}
//								}
//							}
//						}
					},{ dataIndex: 'sale_pric'		, text : Language.get('sale_pric'		,'단가'	   	) , width : 80  , xtype : 'numericcolumn', hidden: false,
						 tdCls	: 'editingcolumn',
							editor	: {
								xtype		:'textfield',
								selectOnFocus: true,
								allowBlank	: true,
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											var grid = self.up('grid'),
												store = me.getStore(),
												selection = me.getSelectionModel().getSelection()[0],
												row = store.indexOf(selection);
										}
									}
								}
							},
							listeners:{
								change:function(){
									var a = this.view.getSelectionModel().getCurrentPosition();
								}
							}
					},{ dataIndex: 'new_sply_amnt'	, text : Language.get('new_sply_amnt'	,'금액'		) , width : 80  , xtype : 'numericcolumn', hidden: false
					},{ dataIndex: 'new_vatx_amnt'	, text : Language.get('new_vatx_amnt'	,'부가세'		) , width : 80  , xtype : 'numericcolumn', hidden: false
					},{ dataIndex: 'new_ttsm_amnt'	, text : Language.get('new_ttsm_amnt'	,'합계금액'		) , width : 80  , xtype : 'numericcolumn', hidden: false
					},{ dataIndex: 'vatx_incl_yorn'	, text : Language.get('vatx_incl_yorn'	,'부가세포함'	) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex: 'dlvy_cstm_name'	, text : Language.get('cstm_idcd'		,'납품처명'		) , width : 250 , align : 'left'
					},{	dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'		,'수주번호'		) , width : 70 , align : 'center'
					},{	dataIndex: 'acpt_dvcd'		, text : Language.get('acpt_dvcd'		,'수주구분'		) , width : 70 , align : 'center', width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('acpt_dvcd'),
					},{	dataIndex: 'prod_trst_dvcd'	, text : Language.get('prod_trst_dvcd'	,'생산구분'		) , width : 70 , align : 'center', width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('prod_trst_dvcd'),
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (editor, context,rowIndexNum) {
		var me				= this,
			ostt_qntt		= me.getSelectionModel().getSelection()[0].data.ostt_qntt,		//납품수량
			rett_qntt		= me.getSelectionModel().getSelection()[0].data.rett_qntt,		//반품수량
			acpt_dvcd		= me.getSelectionModel().getSelection()[0].data.acpt_dvcd,		//구분
			pos				= me.view.getSelectionModel().getCurrentPosition().row,
			models			= me.getStore().getRange(),
			record			= context.record,
			newValue		= record.get('sale_pric'),
			field			= context.field,
			value			= context.value,
			originalValue	= context.originalValue,
			qntt,pric,vatx,vatx_incl_yorn
		;

		if(ostt_qntt<rett_qntt || rett_qntt<0){
			Ext.Msg.alert("알림", "반품수량을 다시 입력해주십시오.");
			models[pos].set('rett_qntt',0);
			return;
		}

		if (acpt_dvcd == '1000'&& field === 'sale_pric' && newValue !== originalValue) {
			record.set(field, originalValue);
			Ext.Msg.alert("알림", "단가수정은 OEM수주만 가능합니다.");
			return;
		}else{
				rowIndex = context.rowIdx!=undefined?context.rowIdx:rowIndexNum;
				qntt		= me.getStore().getAt(rowIndex).get('rett_qntt');		//발주량
				pric		= me.getStore().getAt(rowIndex).get('sale_pric');		//개당단가
				vatx		= me.getStore().getAt(rowIndex).get('new_vatx_amnt');		//부가세액
				vatx_incl_yorn = me.getStore().getAt(rowIndex).get('vatx_incl_yorn');

			if(field=='rett_qntt' || field=='sale_pric'){
				models[rowIndex].set('new_sply_amnt',Math.round(qntt * pric));
				models[rowIndex].set('new_vatx_amnt',Math.round((qntt * pric)/Number(_global.tax_rt)));
				models[rowIndex].set('new_ttsm_amnt',Math.round((qntt * pric)/Number(_global.tax_rt))+Math.round(qntt * pric));
			}

			if(vatx_incl_yorn == 0 ){
				models[rowIndex].set('new_vatx_amnt',Math.round(0));
				models[rowIndex].set('new_ttsm_amnt',Math.round((qntt * pric)));
			}else{
				models[rowIndex].set('new_vatx_amnt',Math.round((qntt * pric)/Number(_global.tax_rt)));
				models[rowIndex].set('new_ttsm_amnt',Math.round((qntt * pric)/Number(_global.tax_rt))+Math.round(qntt * pric));
			}

			if(field=='new_vatx_amnt'){
				models[rowIndex].set('new_ttsm_amnt',Math.round(vatx)+Math.round(qntt * pric));
			}
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
