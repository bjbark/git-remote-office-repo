Ext.define('module.custom.komec.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-goodsosttwork-worker-lister',

	split		: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary'  }],
	plugins     : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	store       : 'module.custom.komec.stock.isos.goodsosttwork.store.GoodsOsttWorkInvoice',
	initComponent: function () {
		var me = this;
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
					{	text : '<span class="write-button">전체선택 및 해제</span>'	, handler : me.chkAction		, cls: 'button1-style'	,width:  100} , '-',
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
					{	dataIndex:	'chked'			, text: Language.get('chk'			, '선택'		), width :  35 , align : 'center',xtype:'checkcolumn',
						listeners:{
							checkchange:function(element, rowindex, bool, rec) {
								var record = me.store.getAt(rowindex)
								;
								if(bool){
									var qntt = record.get('unpaid');
									var pric = record.get('sale_pric');
									record.set('qntt',qntt);
									record.set('sale_amnt',qntt*pric);
									record.set('vatx_amnt',(qntt*pric)*0.1);
									record.set('ttsm_amnt',(qntt*pric)*1.1);

								}else{
									record.set('qntt',0);
									record.set('sale_amnt',0);
									record.set('vatx_amnt',0);
									record.set('ttsm_amnt',0);
								}
							}
						}
					},{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'생산구분'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('prog_stat_dvcd')
					},{	dataIndex: 'acpt_date'		, text : Language.get('acpt_date'		,'수주일자'		) , width : 80  , align : 'center'
					},{	dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		) , width : 80  , align : 'center',
					},{	dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'		,'수주번호'		) , width : 90  , align : 'center'
					},{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 120 , align : 'center'
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , minWidth : 150, flex  : 70
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 100
					},{ dataIndex: 'trst_qntt'		, text : Language.get('trst_qntt'		,'의뢰수량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ostt_qntt'		, text : Language.get('ostt_qntt'		,'납품수량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'unpaid'			, text : Language.get('unpaid'			,'미납잔량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'qntt'			, text : Language.get('qntt'			,'출고수량'		) , width : 80  , xtype : 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
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
										grid.plugins[0].startEdit(row, grid.columns[17]);
									}
								},
							}
						}
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'lot번호'	) , width : 150
					},{ xtype	: 'actioncolumn',
						tdCls	: 'editingcolumn',
//						header	: '',
						editable	: true,
						enableKeyEvents : true,
						width	: 20,
						name	: 'lott_numb',
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									if(record.get('qntt')>0){
										resource.loadPopup({
											select	: 'MULTI',
											widget	: 'lookup-lott-popup',
											title	: 'LOT 번호 찾기',
											params : { stor_grp : _global.stor_grp , line_stat : '0' ,item_idcd : record.get('item_idcd'),stok_type_dvcd : '1' ,dvcd : '1',qntt:record.get('qntt')},
											result : function(records) {
												var	parent = records[0];
												var rtnLottNumb = "" ;
												record.set('lott_numb',parent.data.lott_numb);
												Ext.each(records, function(record) {
													if (rtnLottNumb.length > 0) {
														rtnLottNumb += ",";
													}
													rtnLottNumb += record.get("lott_numb");
												});
												record.set('lott_numb',rtnLottNumb);
											}
										})
									}else{
										Ext.Msg.alert('알림','출고수량이 없습니다.');
									}
								},
								scope : me
							}
						]
					},{	dataIndex:	'dely_cstm_name'		, width:  150, align : 'left'   , text: Language.get( ''	, '납품처명'	), tdCls		: 'editingcolumn',
					},{	dataIndex:	'dlvy_addr_1fst'		, width:  180, align : 'left'   , text: Language.get( ''	, '납품처'		), tdCls		: 'editingcolumn',
					},{	xtype	: 'actioncolumn',
						tdCls	: 'editingcolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									var searchForm = Ext.ComponentQuery.query('module-goodsosttwork-worker-editor')[0];
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-cstm-deli-popup',
										title	: '납품처 찾기',
										params : { stor_grp : _global.stor_grp , line_stat : '0' , cstm_idcd : record.get('cstm_idcd') },
										result	: function(records) {
											var	parent = records[0];
											record.set('dlvy_addr_1fst',parent.data.dlvy_addr_1fst);
											record.set('dlvy_cstm_idcd',parent.data.dlvy_cstm_idcd);
											record.set('dely_cstm_name',parent.data.dely_cstm_name);
										},
									})
								},
								scope : me
							}
						]
					},{ dataIndex: 'sale_pric'		, text : Language.get('sale_pric'		,'단가'		) , width : 80  , xtype : 'numericcolumn'
						, tdCls : 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[21]);
									}
								}
							}
						}
					},{ dataIndex: 'sale_amnt'		, text : Language.get('sale_amnt'		,'금액'		) , width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'vatx_amnt'		, text : Language.get('vatx_amnt'		,'부가세'		) , width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'		) , width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		) , flex  : 30
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									if (e.keyCode == e.ENTER) {
										grid.plugins[0].startEdit(row+1, grid.columns[15]);
									}else if(e.keyCode == e.TAB){
										grid.plugins[0].startEdit(row, grid.columns[15]);
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

	cellEditAfter  : function (editor, context, rowIndexNum) {
		var	me			= this,
		grid		= this,
		rowIndex,
		editor = Ext.ComponentQuery.query('module-goodsosttwork-worker-editor')[0],
		rowIndex = context.rowIdx!=undefined?context.rowIdx:rowIndexNum;
		trst_qntt =  grid.getStore().getAt(rowIndex).get('trst_qntt');			//의뢰수량
		ostt_qntt =  grid.getStore().getAt(rowIndex).get('ostt_qntt');			//납품수량
		unpaid =  grid.getStore().getAt(rowIndex).get('unpaid');				//미납잔량
		qntt =  grid.getStore().getAt(rowIndex).get('qntt');					//출고수량
		lott_numb =  grid.getStore().getAt(rowIndex).get('lott_numb');			//lot
		sale_pric =  grid.getStore().getAt(rowIndex).get('sale_pric');			//단가

		var amnt = Math.floor(qntt*sale_pric/10)*10;	//금액
		var v = Math.floor(amnt*Number(_global.tax_rt)/1000)*10;				//부가세
		var grid = this;
		var models = grid.getStore().getRange();

		if(qntt == 0){
			models[rowIndex].set('qntt',0);
			models[rowIndex].set('sale_amnt',0);
			models[rowIndex].set('vatx_amnt',0);
			models[rowIndex].set('ttsm_amnt',0);
		}else{
			if(qntt>unpaid || qntt<0){
				Ext.Msg.alert("알림", "출고수량을 다시 입력해주십시오.");
				models[rowIndex].set('qntt',0);
				return;
			}else{
				models[rowIndex].set('qntt',qntt);
				models[rowIndex].set('sale_amnt',amnt);
				models[rowIndex].set('vatx_amnt',v);
				models[rowIndex].set('ttsm_amnt',amnt+v);
			}
		}

	},

	chkAction : function() {
		var	me		= this,
			grid	= me.up('grid'),
			store	= grid.getStore()
		;

		msg = '선택해제 중입니다.';
		var chk = store.find('chked',true);
		var boolean = false;
		if(chk == -1){
			boolean = true;
			msg = '전체선택 중입니다.';
		}
		var mask = new Ext.LoadMask(grid, {msg: msg});
		mask.show();

		var i = 0;
		var count = store.getCount();
		setTimeout(function(){		// each 실행이 너무 빨라서 mask가 발동되지않음.
			store.each(function(record){

				var rowIndexNum = store.indexOf(record);
				record.set('chked',boolean);
				if(boolean){
					var qntt = record.get('unpaid');
					var pric = record.get('sale_pric');
					record.set('qntt',qntt);
					record.set('sale_amnt',qntt*pric);
					record.set('vatx_amnt',(qntt*pric)*0.1);
					record.set('ttsm_amnt',(qntt*pric)*1.1);

				}else{
					record.set('qntt',0);
					record.set('sale_amnt',0);
					record.set('vatx_amnt',0);
					record.set('ttsm_amnt',0);
				}
				if(i == count-1){
					mask.hide();
				}
				i++;

			})
		}, 100)
		if(count == 0){
			mask.hide();
		}
	},

	listeners: {
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	}
});
