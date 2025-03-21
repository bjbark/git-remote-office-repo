Ext.define('module.custom.iypkg.stock.isos.saleostt.view.SaleOsttLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-saleostt-lister',
	store		: 'module.custom.iypkg.stock.isos.saleostt.store.SaleOsttLister',
	requires: [
	   		'lookup.popup.view.IypkgOrdrStatInfo',
	   	],
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{  ftype: 'grid-summary' } ],
	plugins		: [{ ptype  :'cellediting-directinput' , clicksToEdit: 1 },{ ptype: 'gridcolumnconfig'},{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll.
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll.
    }],
	initComponent: function () {
		var me     = this;
		me.dockedItems = me.createSouth();
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		loadMask	: false,
		getRowClass : function ( record , index ) {
			if(record.get('acpt_dvcd')=='2000'){
				return 'line-plan';
			}else if(record.get('acpt_dvcd')=='3000'){
				return 'line-prod2';
			}else if(record.get('acpt_dvcd')=='4000'){
				return 'line-goods2';
			}else if(record.get('acpt_dvcd')=='5000'){
				return 'line-stock';
			}
		}
	},

//	createForm: function(){
//		var me = this,
//			form = {
//				xtype		: 'form-layout',
//				region		: 'center',
//				border		: false,
//				dockedItems : [ me.createLine1() ],
//				items		: [ me.createGrid(), me.createGrid() ]
//			}
//		;
//		return form;
//	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					{	text : '<span class="write-button">거래명세서 출력</span>', width : 100, action : 'printAction'	, cls: 'button1-style'	} , '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.DELETE.text , iconCls: Const.DELETE.icon , action : Const.DELETE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' },
					{	text: Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	xtype: 'rownumberer'		, width:35 , hidden : false, align: 'center'
					},{	dataIndex:	'chk'			, text: Language.get('chk'			, '선택'		), width :  35 , align : 'center',xtype:'checkcolumn',
						listeners:{
							checkchange:function(element, rowindex, bool, rec) {
								var record = me.store.getAt(rowindex),
									rowIndexNum = rowindex,
									pqty_pric = record.get('pqty_pric'),
									rowIndexNum = rowindex,
									lister = Ext.ComponentQuery.query('module-saleostt-lister')[0]
								;

								if (!me.selectedRecords) {
									me.selectedRecords = new Set(); // Set으로 초기화
								}

								if(bool){
									lister.getSelectionModel().select(rowIndexNum);
									me.cellEditAfter(element, record);
									me.selectedRecords.add(record);
								}else{
									lister.getSelectionModel().select(rowIndexNum);
									me.cellEditAfter(element, record);
									me.selectedRecords.delete(record); // 선택된 항목 제거
								}
							}
						}
					},{	dataIndex:	'invc_date'			, width: 100, align : 'center'	, text: Language.get( 'ostt_date'		, '출고일자'	)
					},{	dataIndex:	'invc_numb'			, width:  80, align : 'center'	, text: Language.get( 'invc_numb'		, '출고번호'	), summaryType : 'count', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'cstm_name'			, width: 194, align : 'left'	, text: Language.get( 'cstm_name'		, '거래처명'	)
					},{	dataIndex:	'acpt_numb'			, width: 123, align : 'center'	, text: Language.get( 'acpt_numb'		, '수주번호'	), summaryType : 'count', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'dlvy_drtr_name'	, width: 180, align : 'left'	, text: Language.get( 'dlvy_drtr_name'	, '납품처명'	), hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'prod_name'			, width: 250, align : 'left'	, text: Language.get( 'prod_name'		, '품명'		)
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
										grid.plugins[0].startEdit(row, grid.columns[11]);
									}
								}
							}
						}
					},{	dataIndex:	'prod_leng'			, width:  60, align : 'right'	, text: Language.get( 'prod_leng'		, '장'		), xtype: 'numericcolumn'
					},{	dataIndex:	'prod_widh'			, width:  60, align : 'right'	, text: Language.get( 'prod_widh'		, '폭'		), xtype: 'numericcolumn'
					},{	dataIndex:	'prod_hght'			, width:  60, align : 'right'	, text: Language.get( 'prod_hght'		, '고'		), xtype: 'numericcolumn'
					},{	dataIndex:	'ostt_qntt'			, width: 100, align : 'right'	, text: Language.get( 'ostt_qntt'		, '출고수량'	), xtype: 'numericcolumn'
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
										grid.plugins[0].startEdit(row+1, grid.columns[11]);
									}
								}
							}
						}
					},{	dataIndex:	'porm_qntt'			, width:  50, align : 'right'	, text: Language.get( 'porm_qntt'		, '가감'		), xtype: 'numericcolumn'
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
										grid.plugins[0].startEdit(row+1, grid.columns[11]);
									}
								}
							}
						}
					},{	dataIndex:	'sale_pric'			, width:  80, align : 'right'	, text: Language.get( 'sale_pric'		, '단가/개'	), xtype: 'numericcolumn'
					},{	dataIndex:	'vatx_incl_yorn'	, width:  80, align : 'center'	, text: Language.get( 'vatx_incl_yorn'	, '자료구분'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'sale_amnt'			, width: 100, align : 'right'	, text: Language.get( 'sply_amnt'		, '공급가액'	), xtype: 'numericcolumn', summaryType : 'sum'
					},{	dataIndex:	'vatx_amnt'			, width: 100, align : 'right'	, text: Language.get( 'vatx_amnt'		, '부가세액'	), xtype: 'numericcolumn', summaryType : 'sum'
					},{	dataIndex:	'ttsm_amnt'			, width: 120, align : 'right'	, text: Language.get( 'ttsm_amnt'		, '합계금액'	), xtype: 'numericcolumn', summaryType : 'sum'
					},{	dataIndex:	'drtr_name'			, width:  80, align : 'left'	, text: Language.get( ''	, '담당자명'		), hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'cars_alis'			, width: 100, align : 'left'	, text: Language.get( ''	, '차량명'			), hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'nwek_name'			, width: 100, align : 'left'	, text: Language.get( ''	, '기사명'			), hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'user_memo'			, flex :   1, align : 'left'	, text: Language.get( 'user_memo'		, '비고'		), hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					}
				]
			};
		return item;
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
						{	fieldLabel	: Language.get('invc_qntt','출고건수 '),
							xtype		: 'numericfield',
							name		: 'invc_qntt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
						},{	fieldLabel	: Language.get('ostt_qntt','출고수량'),
							xtype		: 'numericfield',
							name		: 'ostt_qntt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
						},{	fieldLabel	: Language.get('sply_amnt_edit','공급가액'),
							xtype		: 'numericfield',
							name		: 'sply_amnt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
						},{	fieldLabel	: Language.get('vatx_amnt_edit','부가세액'),
							xtype		: 'numericfield',
							name		: 'vatx_amnt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
						},{	fieldLabel	: Language.get('ttsm_amnt_edit','합계금액'),
							xtype		: 'numericfield',
							name		: 'ttsm_amnt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
						},
					]
				}
			]
		};
		return item;
	},


	cellEditAfter: function (editor, context) {
		var grid = this,
			pos = grid.view.getSelectionModel().getCurrentPosition().row,
			select = grid.getSelectionModel().getSelection()[0],
			models = grid.getStore().getRange(),
			store = grid.getStore()
		;

//		var ostt_qntt = this.getSelectionModel().getSelection()[0].data.ostt_qntt;
//		var porm_qntt = this.getSelectionModel().getSelection()[0].data.porm_qntt;	//가감
//		var sale_amnt = this.getSelectionModel().getSelection()[0].data.sale_amnt;	//공급가액
//		var pqty_pric = this.getSelectionModel().getSelection()[0].data.pqty_pric;	//단가
//		var vatx_amnt = this.getSelectionModel().getSelection()[0].data.vatx_amnt;	//부가세
//		var ttsm_amnt = this.getSelectionModel().getSelection()[0].data.ttsm_amnt;	//합계금액

//		if(ostt_qntt){
//			if(porm_qntt !=''){ //가감계산
//				models[pos].set('porm_rate',((ostt_qntt-porm_qntt)/ostt_qntt)*100);
//				if(l-porm_qntt>=0){
//					models[pos].set('ostt_qntt',(l-porm_qntt))
//				}else{
//					Ext.Msg.alert('알림','가감수량을 확인해주세요.');
//					models[pos].set('porm_qntt',0)
//					return;
//				}
//			}
////			if(a>=d){	//수주량이 출고수량보다 크거나 같으면
//				var amnt = ostt_qntt*pqty_pric;
//				var vatx = amnt / 10;
//				var ttsm = amnt + vatx;
//
//				models[pos].set('sale_amnt',amnt);
//				models[pos].set('vatx_amnt',vatx);
//				models[pos].set('ttsm_amnt',ttsm);
//		}

		/*체크한 출고건, 출고수량, 공급가약, 부가세액, 합계 구하기*/
		var a = select.data.acpt_qntt;	//수주량
		var b = select.data.ostt_qntt;	//출고수량
		var c = select.data.sale_amnt;	//공급가액
		var d = select.data.vatx_amnt;	//부가세
		var e = select.data.ttsm_amnt;	//합계금액
		var chk = select.data.chk;		//체크

		var invcQnttEditField = parseInt(grid.down('[name=invc_qntt_edit]').getValue()) || 0;
		var ostt = parseInt(grid.down('[name=ostt_qntt_edit]').getValue()) || 0;
		var splyAmnt = parseInt(grid.down('[name=sply_amnt_edit]').getValue()) || 0;
		var vatxAmnt = parseInt(grid.down('[name=vatx_amnt_edit]').getValue()) || 0;
		var ttsmAmnt = parseInt(grid.down('[name=ttsm_amnt_edit]').getValue()) || 0;

		var currentValue;
		var currentOsttValue;
		var currentAmntValue;
		var currentVatxValue;
		var currentTtsmValue;

		if (chk) {
			currentValue = invcQnttEditField + 1;
			currentOsttValue = ostt + b;
			currentAmntValue = splyAmnt + c;
			currentVatxValue = vatxAmnt + d;
			currentTtsmValue = ttsmAmnt + e;
		} else {
			if (invcQnttEditField > 0) {
				currentValue = invcQnttEditField - 1;
				currentOsttValue = ostt - b;
				currentAmntValue = splyAmnt - c;
				currentVatxValue = vatxAmnt - d;
				currentTtsmValue = ttsmAmnt - e;
			}
		}

		this.down('[name=invc_qntt_edit]').setValue(currentValue);
		this.down('[name=ostt_qntt_edit]').setValue(currentOsttValue);
		this.down('[name=sply_amnt_edit]').setValue(currentAmntValue);
		this.down('[name=vatx_amnt_edit]').setValue(currentVatxValue);
		this.down('[name=ttsm_amnt_edit]').setValue(currentTtsmValue);
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
 });