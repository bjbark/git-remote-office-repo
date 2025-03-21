Ext.define('module.custom.iypkg.stock.isos.isttwork1.view.IsttWork1WorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-isttwork1-worker-lister',
	store		: 'module.custom.iypkg.stock.isos.isttwork1.store.IsttWork1WorkerLister',

	split		: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var rowIndexNum;
		var me = this;
		me.dockedItems = [{xtype: 'module-isttwork1-worker-search'}, me.createSouth()];
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
				xtype : 'grid-paging',
				items : [
					{	xtype	: 'button',
						iconCls	: 'filterIcon',
						toggleGroup:'master',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'->', '-',
					{	text : '<span class="write-button">전체선택 및 해제</span>'	, handler : me.chkAction	, cls: 'button1-style'	,width:  100} , '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				], pagingButton : true
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
						{	fieldLabel	: Language.get('invc_qntt_edit','입고건수'),
							xtype		: 'numericfield',
							name		: 'invc_qntt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
							value		: 0
						},{	fieldLabel	: Language.get('istt_qntt_edit','입고수량'),
							xtype		: 'numericfield',
							name		: 'istt_qntt_edit',
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
							value		: 0,
							hidden		: true,
						},{	fieldLabel	: Language.get('vatx_amnt_edit','부가세액'),
							xtype		: 'numericfield',
							name		: 'vatx_amnt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
							value		: 0,
							hidden		: true,
						},{	fieldLabel	: Language.get('ttsm_amnt_edit','합계금액'),
							xtype		: 'numericfield',
							name		: 'ttsm_amnt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
							value		: 0,
							hidden		: true,
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
					},{	dataIndex:	'chk'				, width:  35, align : 'center'	, text: Language.get('chk'				, '선택'		), xtype:'checkcolumn',
						listeners:{
							checkchange:function(element, rowindex, bool, rec) {
								var record = me.store.getAt(rowindex);
								var rowIndexNum = rowindex;
								var lister = Ext.ComponentQuery.query('module-isttwork1-worker-lister')[0];
								var search = Ext.ComponentQuery.query('module-isttwork1-worker-search')[0];

								if(bool){
									lister.getSelectionModel().select(rowIndexNum);
									record.set('istt_qntt2',record.get('unistt'));
									me.cellEditAfter(element, record, rowIndexNum);
									checkedRecords.push(record);
								}else{
									lister.getSelectionModel().select(rowIndexNum);
									record.set('istt_qntt2','0');
									me.cellEditAfter(element, record, rowIndexNum);
									var index = checkedRecords.indexOf(record);
								if (index !== -1) {
									checkedRecords.splice(index, 1);
									}
								}
								search.down('[name=count]').setValue(checkedRecords.length);
							},
						}
					},{	dataIndex:	'acpt_numb'			, width: 100, align : 'center'	, text: Language.get( 'acpt_invc_numb'	, '수주번호'	), hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'invc_date'			, width: 100, align : 'center'	, text: Language.get( 'invc_date'	, '발주일자'	)
					},{	dataIndex:	'cstm_name'			, width: 140, align : 'left'	, text: Language.get( 'cstm_name'	, '발주처명'	)
					},{	dataIndex:	'fabc_name'			, width: 170, align : 'left'	, text: Language.get( 'fabc_name'	, '원단명'		)
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
										grid.plugins[0].startEdit(row, grid.columns[6]);
									}
								}
							}
						}
					},{	dataIndex:	'ppln_dvcd'			, width:  80, align : 'center'	, text: Language.get( 'ppln_dvcd'	, '골'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{	dataIndex:	'item_ttln'			, width:  60, align : 'right'	, text: Language.get( 'item_ttln'	, '장'		), xtype : 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.TAB || e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[8]);
									}
								}
							}
						}
					},{	dataIndex:	'item_widh'			, width:  60, align : 'right'	, text: Language.get( 'item_widh'	, '폭'		), xtype : 'numericcolumn'
						, tdCls : 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[14]);
									}
								}
							}
						}
					},{	dataIndex:	'item_fxqt'			, width:  60, align : 'center'	, text: Language.get( 'item_fxqt'	, '절수'		)
					},{	dataIndex:	'scre_spec'			, width: 150, align : 'left'	, text: Language.get( 'scre_spec'	, '재단및스코어'	), hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'offr_qntt'			, width:  80, align : 'right'	, text: Language.get( 'offr_qntt'	, '발주수량'	), xtype: 'numericcolumn'
					},{	dataIndex:	'istt_qntt'			, width:  80, align : 'right'	, text: Language.get( 'istt_qntt'	, '입고한수량'	), xtype: 'numericcolumn', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'unistt'			, width:  80, align : 'right'	, text: Language.get( 'unistt'		, '미입고잔량'	), xtype: 'numericcolumn',
					},{	dataIndex:	'istt_qntt2'		, width:  80, align : 'right'	, text: Language.get( 'istt_qntt2'	, '입고할수량'	), xtype: 'numericcolumn', summaryType: 'sum'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								focus:function(a,b,c,d){
									var grid = this.up('grid');
									var idx = grid.getSelectionModel (). getSelection ()[0];
									rowIndexNum = grid.getStore().indexOf(idx);
								},
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
					},{	dataIndex:	'subt_qntt'			, width:  60, align : 'right'	, text: Language.get( 'subt_qntt'	, '감량'		), xtype: 'numericcolumn'
						, tdCls : 'editingcolumn',
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
										if(_global.hqof_idcd.toUpperCase() == 'N1000IYPKG'){
											grid.plugins[0].startEdit(row, grid.columns[20]);
										}else{
											grid.plugins[0].startEdit(row, grid.columns[18]);
										}
									}
								}
							}
						}
					},{	dataIndex:	'acpt_cstm_name'	, width: 140, align : 'left'	, text: Language.get( 'acpt_cstm_name'	, '수주처명'	)
					},{	dataIndex:	'prod_name'			, width: 230, align : 'left'	, text: Language.get( 'prod_name'		, '품명'		)
						, tdCls	: (_global.hqof_idcd.toUpperCase()=='N1000IYPKG'?'':'editingcolumn'),
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							readOnly	: (_global.hqof_idcd.toUpperCase()=='N1000IYPKG'?true:false),
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[20]);
									}
								}
							}
						}
					},{	dataIndex:	'mxm2_pric'			, width:  80, align : 'right'	, text: Language.get( 'mxm2_pric'		, '단가/m2'	), xtype: 'numericcolumn', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'pqty_pric'			, width:  80, align : 'right'	, text: Language.get( 'pqty_pric'		, '단가/개'	), xtype: 'numericcolumn', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'vatx_incl_yorn'	, width:  80, align : 'center'	, text: Language.get( 'vatx_incl_yorn'	, '자료구분'	), hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',//부가세 포함 여부 (수정가능)
						xtype	: 'lookupcolumn',
						lookupValue : resource.lookup('yorn'),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		: 'lookupfield',
							lookupValue	: resource.lookup('yorn'),
							value		: '1',
							selectOnFocus: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row+1, grid.columns[14]);
									}
								}
							}
						}
					},{	dataIndex:	'istt_amnt'			, width:  80, align : 'right'	, text: Language.get( 'istt_amnt'		, '공급가'		), xtype: 'numericcolumn', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'istt_vatx'			, width:  80, align : 'right'	, text: Language.get( 'istt_vatx'		, '부가세'		), xtype: 'numericcolumn', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'ttsm_amnt'			, width:  80, align : 'right'	, text: Language.get( 'ttsm_amnt'		, '합계'		), xtype: 'numericcolumn', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (editor, context , rowIndexNum) {
		var me = this,
			grid = this,
			rowIndex,
			unistt	,
			qntt	,
			pric	,
			subt	,
			amnt	,
			vatx	,
			ttsm	,
			mxm2	,
			models	,
			select = grid.getSelectionModel().getSelection()[0],
			chk = select.data.chk
		;
		rowIndex	= context.rowIdx!=undefined?context.rowIdx:rowIndexNum;
		unistt		= grid.getStore().getAt(rowIndex).get('unistt');		//미입고잔량
		qntt		= grid.getStore().getAt(rowIndex).get('istt_qntt2');	//입고할수량
		pric		= grid.getStore().getAt(rowIndex).get('pqty_pric');		//개당단가
		subt		= grid.getStore().getAt(rowIndex).get('subt_qntt');		//감량
		mxm2		= grid.getStore().getAt(rowIndex).get('mxm2_pric');		//제곱미터당 단가
		models		= grid.getStore().getRange();
		var field = context.field;

		if(_global.hqof_idcd.toUpperCase() == "N1000DAE-A"){
			if(field == "item_ttln" || field == "item_widh"){
				Ext.Ajax.request({
					url			: _global.location.http() + '/custom/iypkg/stock/isos/isttwork1/get/calc.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id   : _global.stor_id,
							invc_numb : grid.getStore().getAt(rowIndex).get('acpt_numb'),
							line_seqn : grid.getStore().getAt(rowIndex).get('acpt_seqn'),
							prod_leng : grid.getStore().getAt(rowIndex).get('item_ttln'),
							prod_widh : grid.getStore().getAt(rowIndex).get('item_widh')
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if(result.records){
							var	deff   = result.records[0].deff,
								divs    = result.records[0].divs,
								length = result.records[0].length
							;
							var total = (length*grid.getStore().getAt(rowIndex).get('item_ttln')*eval(divs));

							var	mxm2 = (total*0.000001),
								pqty = (total*0.000001) * grid.getStore().getAt(rowIndex).get('mxm2_pric')
							;
							var	mxm2_qntt = mxm2.toFixed(3),
								pqty_pric = pqty.toFixed(3)
							;
							models[rowIndex].set('pqty_pric',pqty_pric);
							models[rowIndex].set('item_fxqt',divs);
							pric = pqty_pric;
						}
					}
				});
			}
		}
		if(_global.hqof_idcd.toUpperCase() == "N1000DAE-A"){
				amnt		= Math.floor(qntt*pric);								//공급가
				vatx		= Math.floor((qntt*pric)*0.1);							//부가세
				ttsm		= amnt+vatx;											//합계
				if(subt){
					qntt = unistt-subt;
					models[rowIndex].set('istt_qntt2',qntt);
				}
				models[rowIndex].set('istt_amnt',amnt);
				models[rowIndex].set('istt_vatx',vatx);
				models[rowIndex].set('ttsm_amnt',ttsm);
		}
		if(_global.hqof_idcd.toUpperCase() != "N1000DAE-A"){
			if(qntt > unistt){
				Ext.Msg.alert("알림", "입고수량을 다시 입력해주십시오.");
				models[rowIndex].set('istt_qntt2',0);
				models[rowIndex].set('subt_qntt',0);
			}else{
				amnt		= Math.floor(qntt*pric);								//공급가
				vatx		= Math.floor((qntt*pric)*0.1);							//부가세
				ttsm		= amnt+vatx;											//합계
				if(subt){
					qntt = unistt-subt;
					models[rowIndex].set('istt_qntt2',qntt);
				}
				models[rowIndex].set('istt_amnt',amnt);
				models[rowIndex].set('istt_vatx',vatx);
				models[rowIndex].set('ttsm_amnt',ttsm);
			}
		}

		/* 합계 내용 */
		var store = grid.getStore();
		var currentValue;
		var invcQnttEditField = parseInt(grid.down('[name=invc_qntt_edit]').getValue()) || 0;

		if (chk) {
			currentValue = invcQnttEditField + 1;
		} else {
			if (invcQnttEditField > 0) {
				currentValue = invcQnttEditField - 1;
			}
		}
		this.down('[name=invc_qntt_edit]').setValue(currentValue);

		var istt = 0;
		store.each(function(findrecord){
			istt += findrecord.get('istt_qntt2');
		});
		this.down('[name=istt_qntt_edit]').setValue(istt);
	},

	chkAction : function() {
		var	me		= this,
			grid	= me.up('grid'),
			store	= grid.getStore(),
			lister = Ext.ComponentQuery.query('module-isttwork1-worker-lister')[0];
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
					lister.getSelectionModel().select(rowIndexNum);
					record.set('istt_qntt2',record.get('unistt'));
				}else{
					lister.getSelectionModel().select(rowIndexNum);
					record.set('istt_qntt2',0);
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
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	}

});
