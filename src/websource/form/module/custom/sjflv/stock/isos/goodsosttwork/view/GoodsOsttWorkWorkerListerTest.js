Ext.define('module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerListerTest', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-goodsosttwork-worker-lister-test',

	split		: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary'  , remote : false }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-goodsosttwork-worker-search-test'}];
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
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
					{	dataIndex:	'chk'			, text: Language.get('chk'			, '선택'		), width :  35 , align : 'center',xtype:'checkcolumn',
						listeners:{
							beforecheckchange:function(element, rowindex, bool){
								var record = me.store.getAt(rowindex);
								if(record.get('prnt_idcd')!=''){
									return false;
								}
							},
							checkchange:function(element, rowindex, bool, rec) {
								var record = me.store.getAt(rowindex),
									rowIndexNum = rowindex
									invc_numb = record.get('invc_numb')
								;
								if(record.get('prnt_idcd')==''
										&& me.store.find('prnt_idcd',record.get('item_idcd'))>0){
									me.store.each(function(rec){
										if(rec.get('prnt_idcd')==record.get('item_idcd') && rec.get('acpt_numb')==record.get('acpt_numb')){
											var index = me.store.indexOf(rec);
											rec.set('chk',bool);
											if(bool){
												rec.set('ostt_qntt2',rec.get('unpaid'));
											}else{
												rec.set('ostt_qntt2',rec.get(0));
											}
											setTimeout(function(){
												me.cellEditAfter('', rec, index);
											}, 50);
										}
									})
								}
								if(bool){
									record.set('ostt_qntt2',record.get('unpaid'));
									me.cellEditAfter(element, record, rowIndexNum);
								}else{
									record.set('ostt_qntt2','0');
									me.cellEditAfter(element, record , rowIndexNum);
								}
							}
						}
					},{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'),hidden : true
					},{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'번호'		) , width : 100 , align : 'center', hidden: true
					},{	dataIndex: 'new_invc_numb'	, text : Language.get('new_invc_numb'	,'번호'		) , width : 100 , align : 'center', hidden: true
					},{	dataIndex: 'new_line_seqn'	, text : Language.get('new_line_seqn'	,'순번'		) , width : 100 , align : 'center', hidden: true
					},{	dataIndex: 'prod_trst_dvcd'	, text : Language.get(''				,'생산구분'		) , width : 80  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('prod_trst_dvcd')
					},{	dataIndex: 'acpt_date'		, text : Language.get('acpt_date'		,'수주일자'		) , width : 80  , align : 'center'
					},{	dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		) , width : 80  , align : 'center',
					},{	dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'		,'수주번호'		) , width : 90  , align : 'center'
					},{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 120 , align : 'center'
					},{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		) , width : 50  , align : 'center', hidden: true
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , minWidth : 150, flex  : 70
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 100
					},{ dataIndex: 'trst_qntt'		, text : Language.get('trst_qntt'		,'의뢰수량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum',format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.##9',
					},{ dataIndex: 'ostt_qntt'		, text : Language.get(''				,'납품수량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum',format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.##9',
					},{ dataIndex: 'unpaid'			, text : Language.get('unpaid'			,'미납잔량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum',format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.##9',
					},{ dataIndex: 'ostt_qntt2'		, text : Language.get('ostt_qntt2'		,'출고수량'		) , width : 80  , xtype : 'numericcolumn',format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.###':'#,##0.##9'
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
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'lot번호'	) , width : 100
					},{	xtype	: 'actioncolumn',
						tdCls	: 'editingcolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									if(record.get('ostt_qntt2')>0){
										resource.loadPopup({
											select	: 'SINGLE',
											widget	: 'lookup-lott-popup-test',
											title	: 'Batch No 찾기',
											params : { stor_grp : _global.stor_grp , line_stat : '0' ,item_idcd : record.get('item_idcd'),stok_type_dvcd : '1' ,dvcd : '1',qntt:record.get('ostt_qntt2'),acct_bacd:record.get('acct_bacd')},
											result	: function(records) {
												var	parent = records[0];
													record.set('ostt_qntt2'		, parent.data.ostt_qntt);
													record.set('lott_numb' 		, parent.data.lott_numb);
													record.set('lott_numb_sum'	, parent.data.lott_numb_sum);

													me.cellEditAfter(grid, record, rowIndex);
											},
										})
									}else{
										Ext.Msg.alert('알림','출고수량이 없습니다.');
									}
								},
								scope : me
							},
						]
					},{ dataIndex: 'lott_numb_sum'	, text : Language.get('lott_numb'	,'lot번호') , width : 100,hidden: true,
//						listeners:{
//							checkchange:function(element, rowindex, bool, rec) {
//								me.cellEditAfter(element, record, rowIndexNum);
//							}
//						}
					},{ dataIndex: 'wrhs_name'		, text : Language.get('wrhs_name'	,'창고명' 	) , width : 70
					},{ dataIndex: 'wrhs_idcd'		, text : Language.get('wrhs_idcd'	,'창고id' ) , width : 80  , hidden: true
					},{	xtype	: 'actioncolumn',
						tdCls	: 'editingcolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-wrhs-popup',
										title	: 'Batch No 찾기',
										params : { stor_grp : _global.stor_grp , line_stat : '0'},
										result	: function(records) {
											var	parent = records[0];
											record.set('wrhs_idcd',parent.data.wrhs_idcd);
											record.set('wrhs_name',parent.data.wrhs_name);
										},
									})
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
					},{ dataIndex: 'unpaid2'		, text : Language.get('unpaid2'			,'미납잔량2'	) , width : 80  , xtype : 'numericcolumn', hidden: true
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
					},{ dataIndex: 'new_sale_amnt'		, text : Language.get('sale_amnt'		,'금액'		) , width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'new_vatx_amnt'		, text : Language.get('vatx_amnt'		,'부가세'		) , width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'vatx_incl_yorn'		, text : Language.get('vatx_incl_yorn'	,'부가세포함여부'		) , width : 80  , xtype : 'numericcolumn', hidden: true, xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
					},{ dataIndex: 'dlvy_cstm_idcd'		, text : Language.get('dlvy_cstm_idcd'	,'납품처명id'	) , width : 80  , hidden: true
					},{ dataIndex: 'new_ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'		) , width : 80  , xtype : 'numericcolumn'
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
		a	,
		b	,
		c	,
		d	,
		e	,
		f 	,
		g	,
		i	,
		va
		;
		rowIndex = context.rowIdx!=undefined?context.rowIdx:rowIndexNum;
		a =  grid.getStore().getAt(rowIndex).get('trst_qntt');		//수주량
		b =  grid.getStore().getAt(rowIndex).get('ostt_qntt');		//납품수량
		c =  grid.getStore().getAt(rowIndex).get('unpaid');			//미납잔량
		d =  grid.getStore().getAt(rowIndex).get('ostt_qntt2');		//출고수량
		e =  grid.getStore().getAt(rowIndex).get('qntt');			//차이수량
		f =  grid.getStore().getAt(rowIndex).get('unpaid2');		//미납2

		g =  grid.getStore().getAt(rowIndex).get('sale_pric');		//단가
		i =  grid.getStore().getAt(rowIndex).get('new_vatx_amnt');		//부가세
		va =  grid.getStore().getAt(rowIndex).get('vatx_incl_yorn');		//부가세포함여부
// 삼정 공급가액, 부가세 계산 변경 (예 1) 9.3 * 1,233 = 11,467 / 1147 2) 2.35*2,500 = 5875 / 588
//		var amnt = Math.floor(g*d/10)*10;	//금액
//		var v = Math.floor(amnt*Number(_global.tax_rt)/1000)*10;				//부가세
		var amnt = Math.round(g*d);	//금액
		var v = Math.round( amnt/(Number(_global.tax_rt)));
		var grid = this;
		var models = grid.getStore().getRange();

		if(va == 0){
			models[rowIndex].set('new_vatx_amnt',0);
			models[rowIndex].set('new_ttsm_amnt',amnt);

		}else{
			models[rowIndex].set('new_vatx_amnt',v);
			models[rowIndex].set('new_ttsm_amnt',amnt+v);
		}

		if(d == 0){
			models[rowIndex].set('ostt_qntt2',0);
			models[rowIndex].set('unpaid2',0);
			models[rowIndex].set('new_sale_amnt',0);
			models[rowIndex].set('new_vatx_amnt',0);
			models[rowIndex].set('new_ttsm_amnt',0);
			models[rowIndex].set('lott_numb',"");
		}else{
			if(editor.down('[name=vatx_dvcd]').getValue() == '2'){
				if(a.toFixed(6)<d.toFixed(6) || d.toFixed(6)<0 || c.toFixed(6)<d.toFixed(6)){
					Ext.Msg.alert("알림", "출고수량을 다시 입력해주십시오.");
					models[rowIndex].set('ostt_qntt2',0);
					return;
				}else if(a>=d){	//의뢰량이 출고수량보다 크거나 같으면
					models[rowIndex].set('unpaid2',Number(b)+Number(d));
					models[rowIndex].set('new_sale_amnt',amnt);
//					models[rowIndex].set('new_vatx_amnt',null);
//					models[rowIndex].set('new_ttsm_amnt',amnt);
				}
			}else{
				if(a<d || d<0 || c<d ){
					if(a.toFixed(6)<d.toFixed(6) || d.toFixed(6)< 0 || c.toFixed(6)<d.toFixed(6)){
						Ext.Msg.alert("알림", "출고수량을 다시 입력해주십시오.");

						models[rowIndex].set('ostt_qntt2',0);
						return;
					}
				}else if(a>=d){	//의뢰량이 출고수량보다 크거나 같으면
					models[rowIndex].set('unpaid2',Number(b)+Number(d));
					models[rowIndex].set('new_sale_amnt',amnt);
//					models[rowIndex].set('new_vatx_amnt',v);
//					models[rowIndex].set('new_ttsm_amnt',amnt+v);
				}
			}
		}

	},

	chkAction : function() {
		var	me		= this,
			grid	= me.up('grid'),
			store	= grid.getStore()
		;

		msg = '선택해제 중입니다.';
		var chk = store.find('chk',true);
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
				record.set('chk',boolean);
				if(boolean){
					record.set('ostt_qntt2',record.get('unpaid'));
				}else{
					record.set('ostt_qntt2',0);
				}
				grid.cellEditAfter('', record, rowIndexNum);
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
