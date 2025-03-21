Ext.define('module.custom.komec.stock.isos.goodsosttwork.view.GoodsOsttWorkBrcdLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-goodsosttwork-brcd-lister',
//	store		: 'module.custom.komec.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster2',

	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary'},
	],
	plugins		: [	{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' },
	],

	/**
	*
	*/
	initComponent: function () {
		var me = this;
//		me.dockedItems = [{xtype: 'module-goodsosttwork-brcd-search'}];
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},


	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'-', '->', '-',
					{	text : '<span class="write-button">출고</span>'		, action : 'ReleaseAction'		, cls: 'button1-style'	,width:  60} , '-',
					{	text : '<span class="write-button">출고취소</span>'		, action : 'ReleaseCancelAction', cls: 'button1-style'	,width:  80} , '-',

				]
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
					},{	dataIndex: 'stok_qntt'		, text : Language.get('stok_qntt'		,'상태'		) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('stok_qntt'),hidden : true
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
					},{ dataIndex: 'trst_qntt'		, text : Language.get('trst_qntt'		,'의뢰수량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ostt_qntt'		, text : Language.get(''				,'납품수량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'unpaid'			, text : Language.get('unpaid'			,'미납잔량'		) , width : 80  , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'ostt_qntt'		, text : Language.get('ostt_qntt2'		,'출고수량'		) , width : 80  , xtype : 'numericcolumn'
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
									if(record.get('ostt_qntt2')>0){
//										console.log(record.get('ostt_qntt2'));
										resource.loadPopup({
											select	: 'MULTI',
											widget	: 'lookup-lott-popup',
											title	: 'Batch No 찾기',
											params : { stor_grp : _global.stor_grp , line_stat : '0' ,item_idcd : record.get('item_idcd'),stok_type_dvcd : '1' ,dvcd : '1',qntt:record.get('ostt_qntt2')},
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
					},{ dataIndex: 'sale_amnt'		, text : Language.get('sale_amnt'		,'금액'		) , width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'vatx_amnt'		, text : Language.get('vatx_amnt'		,'부가세'		) , width : 80  , xtype : 'numericcolumn'
					},{ dataIndex: 'vatx_incl_yorn'		, text : Language.get('vatx_incl_yorn'	,'부가세포함여부'		) , width : 80  , xtype : 'numericcolumn', hidden: true, xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
					},{ dataIndex: 'dlvy_cstm_idcd'		, text : Language.get('dlvy_cstm_idcd'	,'납품처명id'	) , width : 80  , hidden: true
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
		a	,
		b	,
		c	,
		d	,
		e	,
		f 	,
		g	,
		i	,
		h	,
		va
		;
		rowIndex = context.rowIdx!=undefined?context.rowIdx:rowIndexNum;
		a =  grid.getStore().getAt(rowIndex).get('trst_qntt');		//수주량
		b =  grid.getStore().getAt(rowIndex).get('ostt_qntt');		//납품수량
		c =  grid.getStore().getAt(rowIndex).get('unpaid');			//미납잔량
		d =  grid.getStore().getAt(rowIndex).get('ostt_qntt2');		//출고수량
		e =  grid.getStore().getAt(rowIndex).get('qntt');			//차이수량
		f =  grid.getStore().getAt(rowIndex).get('unpaid2');		//미납2
		h =  grid.getStore().getAt(rowIndex).get('stok_qntt');		//미납2
		l =  grid.getStore().getAt(rowIndex).get('lott_numb');		//미납2

		g =  grid.getStore().getAt(rowIndex).get('sale_pric');		//단가
		i =  grid.getStore().getAt(rowIndex).get('new_vatx_amnt');		//부가세
		va =  grid.getStore().getAt(rowIndex).get('vatx_incl_yorn');		//부가세포함여부
		var amnt = Math.floor(g*d/10)*10;	//금액
		var v = Math.floor(amnt*Number(_global.tax_rt)/1000)*10;				//부가세
		var grid = this;
		var models = grid.getStore().getRange();

		console.log(l);
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
			models[rowIndex].set('stok_qntt',0);
//			models[rowIndex].set('lott_numb',"");
		}else{
			if(editor.down('[name=vatx_dvcd]').getValue() == '2'){
				if(a>d || d<0 || c>d){
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
				if(a>d || d<0 || c>d){
					Ext.Msg.alert("알림", "출고수량을 다시 입력해주십시오.");
					models[rowIndex].set('ostt_qntt2',0);
					return;
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
	},

//	loadpopup:function(record){
//		resource.loadPopup({
//			select	: 'SINGLE',
//			widget	: 'lookup-item-popup-dehansol',
//			params:{
//				cstm_idcd : record.get('cstm_idcd')
//			},
//			result	: function(records) {
//				var	parent = records[0];
//				var qntt = record.get('invc_qntt');
//				record.set('rpst_item_idcd',parent.data.item_code);
//				record.set('invc_pric',parent.data.shpm_pric_1fst);
//				record.set('sply_amnt',qntt * parent.data.shpm_pric_1fst);
//				Ext.Ajax.request({
//					url		: _global.location.http() + '/custom/dahansol/sale/saleorder/set/rpst_item.do',
//					params	: {
//						token : _global.token_id,
//						param : JSON.stringify(record.data)
//					},
//					async	: false,
//					method	: 'POST',
//					success	: function(response, request) {
//						var result = Ext.decode(response.responseText);
//						if	(!result.success ){
//							Ext.Msg.error(result.message );
//							return;
//						} else {
//						}
//					},
//					failure : function(result, request) {
//					},
//					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//					}
//				});
//
//			}
//		})
//	}
});
