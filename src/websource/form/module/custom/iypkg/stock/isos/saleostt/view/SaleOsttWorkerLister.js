Ext.define('module.custom.iypkg.stock.isos.saleostt.view.SaleOsttWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-saleostt-worker-lister',
	store		: 'module.custom.iypkg.stock.isos.saleostt.store.SaleOsttWorkerLister',

	split		: true,
	columnLines	: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' , remote : false }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-saleostt-worker-search'}, me.createSouth() ];
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	viewConfig: {
		listeners: {
			refresh: function(view) {
			// get all grid view nodes
				var nodes = view.getNodes();
				for (var i = 0; i < nodes.length; i++) {
					var node = nodes[i];
					var record = view.getRecord(node);
					var cells = Ext.get(node).query('td');
					var tr = Ext.get(node).query('tr');
				for(var j = 0; j < cells.length; j++) {
//						if(record.get('acpt_dvcd')=='2000'){ //계획
//							Ext.fly(cells[j]).setStyle('background-color', '#99ccff');
//							Ext.fly(cells[j]).setStyle('color', 'Green');
//						}else if(record.get('acpt_dvcd')=='3000'){ //생산
//							Ext.fly(cells[j]).setStyle('background-color', '#d9ffcc');
//						}else if(record.get('acpt_dvcd')=='4000'){ //상품
//							Ext.fly(cells[j]).setStyle('background-color', '#ffe6ff');
//						}else if(record.get('acpt_dvcd')=='5000'){ //재고수주
//							Ext.fly(cells[j]).setStyle('background-color', 'Yellow');
//						}
						if(record.get('prog_stat_dvcd')=='0'){ //생산대기
							Ext.fly(cells[j]).setStyle('background-color', 'Grey');
							Ext.fly(cells[j]).setStyle('color', 'Green');
						}else if(record.get('prog_stat_dvcd')=='1'){ //생산중
							Ext.fly(cells[j]).setStyle('background-color', '#99ccff');
						}else if(record.get('prog_stat_dvcd')=='3'){ //생산완료
							Ext.fly(cells[j]).setStyle('background-color', 'd9ffcc');
						}else if(record.get('prog_stat_dvcd')=='9'){ //생산입고
							Ext.fly(cells[j]).setStyle('background-color', 'Red');
						}
					}
				}
			}
		}
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid(), me.createGrid() ]
			}
		;
		return form;
	},

	pagingItem : function () {
		var me = this,
			item = {
			xtype : 'grid-paging',
//			pagingButton : false,,
			items : [
					'->', '-',
					{	text: Const.ROWINSERT.text , iconCls: Const.UPDATE.icon , action : Const.INSERT.action ,cls: 'button-style' },
					'-',
					{	text: _global.hqof_idcd.toUpperCase() == 'N1000LIEBE' ? '<span style="font-size:50px; color:#ffffff;">처 리</span>' : Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				]
			}
		;
		return item ;
	},

	createSouth : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			dock		: 'bottom',
			border		: 1,
			bodyStyle	: 'border-width: 0 1 1 1',
			fieldDefaults: { width : 161, labelWidth : 61, labelSeparator : '' },
			items		: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border : 0, margin : '7 0 7 0',
					items	: [
						{	fieldLabel	: Language.get('invc_qntt_edit','출고건수'),
							xtype		: 'numericfield',
							name		: 'invc_qntt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
							value		: 0
						},{	fieldLabel	: Language.get('ostt_qntt_edit','출고수량'),
							xtype		: 'numericfield',
							name		: 'ostt_qntt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
							value		: 0
						},{	fieldLabel	: Language.get('sply_amnt_edit','공급가액'),
							xtype		: 'numericfield',
							name		: 'sply_amnt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
							value		: 0
						},{	fieldLabel	: Language.get('vatx_amnt_edit','부가세액'),
							xtype		: 'numericfield',
							name		: 'vatx_amnt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
							value		: 0
						},{	fieldLabel	: Language.get('ttsm_amnt_edit','합계금액'),
							xtype		: 'numericfield',
							name		: 'ttsm_amnt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
							value		: 0
						},
					]
				}
			]
		};
		return item;
	},

	columnItem : function () {
		var checkedRecords = [];
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	xtype: 'rownumberer'		, width:35 , hidden : false, align: 'center'
					},{	dataIndex:	'chk'			, text: Language.get('chk'			, '선택'		), width :  35 , align : 'center',xtype:'checkcolumn',
						listeners:{
							checkchange:function(element, rowindex, bool, rec) {
								var record = me.store.getAt(rowindex),
									rowIndexNum = rowindex,
									pqty_pric = record.get('pqty_pric'),
									rowIndexNum = rowindex,
									lister = Ext.ComponentQuery.query('module-saleostt-worker-lister')[0],
									search = Ext.ComponentQuery.query('module-saleostt-worker-search')[0]
								;
								if(bool){
									lister.getSelectionModel().select(rowIndexNum);
									record.set('ostt_qntt2', record.get('unpaid'));
									me.cellEditAfter(element, record);
									me.check(element, record);
								}else{
									lister.getSelectionModel().select(rowIndexNum);
									record.set('ostt_qntt2','0');
									me.cellEditAfter(element, record);
									me.check(element, record);
								}
							}
						}
					},{	dataIndex:	'invc_numb'			, width: 100, align : 'center'	, text: Language.get( 'invc_numb'		, '번호'			), hidden: true
					},{	dataIndex:	'invc_date'			, width:  80, align : 'center'	, text: Language.get( 'invc_date'		, '수주일자'		)
					},{	dataIndex:	'new_invc_numb'		, width: 100, align : 'center'	, text: Language.get( 'new_invc_numb'	, '번호'			), hidden: true
					},{	dataIndex:	'acpt_numb'			, width: 124, align : 'center'	, text: Language.get( 'acpt_numb'		, '수주번호'		), hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'cstm_idcd'			, width: 100, align : 'left'	, text: Language.get( 'cstm_name'		, '거래ID'		), hidden: true
					},{	dataIndex:	'cstm_name'			, width: 150, align : 'left'	, text: Language.get( 'cstm_name'		, '거래처명'		)
					},{	dataIndex:	'prod_name'			, width: 250, align : 'left'	, text: Language.get( 'prod_name'		, '품명'			), summaryType : 'count',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var	grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row, grid.columns[20]);
									}else if(e.keyCode == 38){
										grid.plugins[0].startEdit(row-1, grid.columns[20]);
									}else if(e.keyCode == 40){
										grid.plugins[0].startEdit(row+1, grid.columns[20]);
									}
								}
							}
						}
					},{	dataIndex:	'prod_code'			, width: 160, align : 'left'	, text: Language.get( 'prod_code'		, '제품코드'		), hidden: true
					},{	dataIndex:	'prod_leng'			, width:  45, align : 'right'	, text: Language.get( 'prod_leng'		, '장'			), xtype: 'numericcolumn'
					},{	dataIndex:	'prod_widh'			, width:  45, align : 'right'	, text: Language.get( 'prod_widh'		, '폭'			), xtype: 'numericcolumn'
					},{	dataIndex:	'prod_hght'			, width:  45, align : 'right'	, text: Language.get( 'prod_hght'		, '고'			), xtype: 'numericcolumn'
					},{	dataIndex:	'acpt_qntt'			, width:  80, align : 'right'	, text: Language.get( 'acpt_qntt'		, '수주수량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'plan_qntt'			, width:  80, align : 'right'	, text: Language.get( 'plan_qntt'		, '계획수량'		), xtype: 'numericcolumn', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'prod_qntt'			, width:  80, align : 'right'	, text: Language.get( 'prod_qntt'		, '생산수량'		), xtype: 'numericcolumn', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'subt_qntt'			, width:  50, align : 'right'	, text: Language.get( 'subt_qntt'		, '감량'			), xtype: 'numericcolumn', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'stok_qntt'			, width:  80, align : 'right'	, text: Language.get( 'stok_qntt'		, '현재고'			), xtype: 'numericcolumn', hidden: (_global.hqof_idcd.toUpperCase()== 'N1000DAE-A' || _global.hqof_idcd.toUpperCase()== 'N1000LIEBE') ? true : false ,
					},{	dataIndex:	'ostt_qntt'			, width:  80, align : 'right'	, text: Language.get( 'ostt_qntt'		, '기납품수량'		), xtype: 'numericcolumn', hidden: (_global.hqof_idcd.toUpperCase()== 'N1000DAE-A' || _global.hqof_idcd.toUpperCase()== 'N1000LIEBE') ? true : false ,
					},{	dataIndex:	'unpaid'			, width:  80, align : 'right'	, text: Language.get( 'unpaid'			, '미출고잔량'		), xtype: 'numericcolumn', hidden: _global.hqof_idcd.toUpperCase()== 'N1000LIEBE' ? true : false ,
					},{	dataIndex:	'deli_date'			, width:  80, align : 'center'	, text: Language.get( 'deli_date'		, '납기일자'		), hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'ostt_qntt2'		, width:  80, align : 'right'	, text: Language.get( 'ostt_qntt'		, '출고수량'		), xtype: 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var	grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row, grid.columns[22]);
									}else if(e.keyCode == 38){
										grid.plugins[0].startEdit(row-1, grid.columns[21]);
									}else if(e.keyCode == 40){
										grid.plugins[0].startEdit(row+1, grid.columns[21]);
									}
								},
							}
						}
					},{	dataIndex:	'porm_qntt'			, width:  50, align : 'right'	, text: Language.get( 'porm_qntt'		, '가감'			), xtype: 'numericcolumn'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var	grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row, grid.columns[22]);
									}else if(e.keyCode == 38){
										grid.plugins[0].startEdit(row-1, grid.columns[22]);
									}else if(e.keyCode == 40){
										grid.plugins[0].startEdit(row+1, grid.columns[22]);
									}
								}
							}
						},
					},{	dataIndex:	'pqty_pric'			, width:  80, align : 'right'	, text: Language.get( 'pqty_pric'		, '단가/개'		), xtype: 'numericcolumn'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var	grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row, grid.columns[23]);
									}else if(e.keyCode == 38){
										grid.plugins[0].startEdit(row-1, grid.columns[23]);
									}else if(e.keyCode == 40){
										grid.plugins[0].startEdit(row+1, grid.columns[23]);
									}
								}
							}
						},
					},{	dataIndex:	'vatx_incl_yorn'	, width:  60, align : 'center'	, text: Language.get( 'vatx_incl_yorn'	, '자료구분'		), hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
						xtype	: 'lookupcolumn',
						lookupValue : resource.lookup('yorn'),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		: 'lookupfield',
							lookupValue	: resource.lookup('yorn'),
							value		: '1',
							editable	: false,
							selectOnFocus: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var	grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row, grid.columns[26]);
									}else if(e.keyCode == 38){
										grid.plugins[0].startEdit(row-1, grid.columns[22]);
									}else if(e.keyCode == 40){
										grid.plugins[0].startEdit(row+1, grid.columns[22]);
									}
								}
							}
						}
					},{	dataIndex:	'sale_amnt'			, width:  90, align : 'right'	, text: Language.get( 'sply_amnt'		, '공급가액'		), xtype: 'numericcolumn'
					},{	dataIndex:	'vatx_amnt'			, width:  90, align : 'right'	, text: Language.get( 'vatx_amnt'		, '부가세액'		), xtype: 'numericcolumn'
					},{	dataIndex:	'ttsm_amnt'			, width: 100, align : 'right'	, text: Language.get( 'ttsm_amnt'		, '합계금액'		), xtype: 'numericcolumn'
					},{ dataIndex:	'user_memo'			, flex :  30, align : 'left'	, text : Language.get('user_memo'		,'비고'		), hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var	grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row+1, grid.columns[6]);
									}else if(e.keyCode == 38){
										grid.plugins[0].startEdit(row-1, grid.columns[26]);
									}else if(e.keyCode == 40){
										grid.plugins[0].startEdit(row+1, grid.columns[26]);
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

	cellEditAfter  : function (editor, context) {
		var me = this;
		var a = this.getSelectionModel().getSelection()[0].data.acpt_qntt;		//수주량
		var b = this.getSelectionModel().getSelection()[0].data.ostt_qntt;		//기납품수량
		var c = this.getSelectionModel().getSelection()[0].data.unpaid;			//미출고잔량
		var d = this.getSelectionModel().getSelection()[0].data.ostt_qntt2;		//출고수량(입력)
		var e = this.getSelectionModel().getSelection()[0].data.qntt;			//차이수량
		var g = this.getSelectionModel().getSelection()[0].data.pqty_pric;		//단가
		var p = this.getSelectionModel().getSelection()[0].data.porm_qntt;		//가감
		var i = this.getSelectionModel().getSelection()[0].data.new_vatx_amnt;	//부가세
		var l = this.getSelectionModel().getSelection()[0].data.plan_qntt;	//부가세
		var name = this.getSelectionModel().getSelection()[0].data.cstm_name;	//거래처명
		var idcd = this.getSelectionModel().getSelection()[0].data.cstm_idcd;	//거래처ID
		var chk = this.getSelectionModel().getSelection()[0].data.chk;			//체크
		var amnt = Math.floor(g*d/10)*10;	//금액
		var v = Math.floor(amnt*Number(_global.tax_rt)/1000)*10;		//부가세
		var grid = this;
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var models = grid.getStore().getRange();
		var store = grid.getStore();
		var lister = Ext.ComponentQuery.query('module-saleostt-worker-lister');
		var search = Ext.ComponentQuery.query('module-saleostt-worker-search')[0];
		var ostt = 0;var sale = 0;var vatx = 0;var ttsm = 0;
		var select = grid.getSelectionModel().getSelection()[0];
		var chk = select.data.chk;		//체크

//		if(a<d || d<0 || c<d || isNaN(d) == true){
// 2024.03.04 임수찬 대아(임시로 출고수량을 넘기게 넣을수도이 있어서 유효성 처리 주석
//			Ext.Msg.alert("알림", "출고수량을 다시 입력해주십시오.");
//			models[pos].set('ostt_qntt2',0);
//			return;
		if(a<d || d<0 || isNaN(d) == true){
		}else{
			if(p!=''){ //가감계산
				models[pos].set('porm_rate',((d-p)/d)*100);
				if(l-p>=0){
					models[pos].set('ostt_qntt2',(l-p))
				}else{
					Ext.Msg.alert('알림','가감수량을 확인해주세요.');
					models[pos].set('porm_qntt',0)
					return;
				}
			}
			if(a>=d){	//수주량이 출고수량보다 크거나 같으면
				models[pos].set('sale_amnt',amnt);
				models[pos].set('vatx_amnt',v);
				models[pos].set('ttsm_amnt',amnt+v);
				store.each(function(findrecord){
					ostt += findrecord.get('ostt_qntt2');
					sale += findrecord.get('sale_amnt');
					vatx += findrecord.get('vatx_amnt');;
					ttsm += findrecord.get('ttsm_amnt');;
				});
				this.down('[name=ostt_qntt_edit]').setValue(ostt);
				this.down('[name=sply_amnt_edit]').setValue(sale);
				this.down('[name=vatx_amnt_edit]').setValue(vatx);
				this.down('[name=ttsm_amnt_edit]').setValue(ttsm);
			}
		}

		if (chk) {
			search.down('[name=cstm_name]').setValue(name);
			search.down('[name=cstm_idcd]').setValue(idcd);
		} else {
			search.down('[name=cstm_name]').setValue(null);
			search.down('[name=cstm_idcd]').setValue(null);
		}

	},


	check:function(editor, context){
		var me = this;
		var grid = this;
		var select = grid.getSelectionModel().getSelection()[0];
		var chk = select.data.chk;

		var currentValue;

		/* 합계 내용 */
		var invcQnttEditField = parseInt(grid.down('[name=invc_qntt_edit]').getValue()) || 0;

		if(chk){
			currentValue = invcQnttEditField + 1;
		}else{
			if (invcQnttEditField > 0) {
				currentValue = invcQnttEditField - 1;
			}
		}

		this.down('[name=invc_qntt_edit]').setValue(currentValue);
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
