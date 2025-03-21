Ext.define('module.custom.iypkg.stock.isos.isttwork1.view.IsttWork1Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-isttwork1-lister',
	store		: 'module.custom.iypkg.stock.isos.isttwork1.store.IsttWork1Lister',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'cellmodel'},
	plugins		: [{ ptype:'cellediting-directinput'  } , { ptype:'gridcolumnconfig'  } ],

	initComponent: function () {
		var me     = this;
		me.dockedItems = me.createSouth();
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('invc_date') == '합계' || record.get('invc_date').length < 8){
				return 'text-warn';
			}else if(record.get('fabc_name') == '일계'){
				return 'text-blue';
			}else if(record.get('rnum') == '2'){
				return 'text-green';
			}
		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					{	text : '<span class="write-button">LOT표 발행</span>'	, action : 'printAction'	, cls: 'button1-style'	} ,
					'-',
					{text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action ,cls: 'button-style' },
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style'},
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				xtype : 'grid-paging',
				itemId	: 'invc',
				defaults: {style: 'text-align:center'},
				items   : [
					{	xtype: 'rownumberer'			, width :  35, align : 'center'	, hidden : false
					},{	dataIndex:	'chk'				, width :  35, align : 'center'	, text: Language.get('chk'			, '선택'			),xtype:'checkcolumn',
						listeners:{
							checkchange:function(element, rowindex, bool, rec) {
								var record = me.store.getAt(rowindex),
									rowIndexNum = rowindex,
									pqty_pric = record.get('pqty_pric'),
									rowIndexNum = rowindex,
									lister = Ext.ComponentQuery.query('module-isttwork1-lister')[0]
								;
								if(bool){
									lister.getSelectionModel().select(rowIndexNum);
									me.cellEditAfter(element, record);
								}else{
									lister.getSelectionModel().select(rowIndexNum);
									me.cellEditAfter(element, record);
								}
							}
						}
					},{	dataIndex:	'invc_date'			, width: 100, align : 'center'	, text: Language.get( 'invc_date'		, '입고일자'	)
					},{	dataIndex:	'cstm_name'			, width: 160, align : 'left'	, text: Language.get( 'cstm_name'		, '입고처명'	)
					},{	dataIndex:	'invc_numb'			, width: 160, align : 'left'	, text: Language.get( 'acpt_numb'		, '수주번호'	), hidden : false,
					},{	dataIndex:	'fabc_name'			, width: 230, align : 'left'	, text: Language.get( 'cstm_name'		, '원단명'	)
					},{	dataIndex:	'ppln_dvcd'			, width:  60, align : 'center'	, text: Language.get( 'ppln_dvcd'		, '골'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{	dataIndex:	'item_leng'			, width:  60, align : 'right'	, text: Language.get( 'item_leng'		, '장'		), xtype : 'numericcolumn'
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
										grid.plugins[0].startEdit(row, grid.columns[6]);
									}
								},
							},
						},
					},{	dataIndex:	'item_widh'			, width:  60, align : 'right'	, text: Language.get( 'item_widh'		, '폭'		), xtype : 'numericcolumn'
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
										grid.plugins[0].startEdit(row, grid.columns[7]);
									}
								}
							}
						}
					},{	dataIndex:	'item_fxqt'			, width:  60, align : 'center'	, text: Language.get( 'item_fxqt'		, '절수'		)
					},{	dataIndex:	'fdat_spec'			, width: 100, align : 'left'	, text: Language.get( 'fdat_spec'		, '재단규격'	), hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'istt_qntt'			, width:  60, align : 'right'	, text: Language.get( 'istt_qntt'		, '입고량'	), xtype : 'numericcolumn'
					},{	dataIndex:	'subt_qntt'			, width:  60, align : 'right'	, text: Language.get( 'subt_qntt'		, '감량'		), xtype : 'numericcolumn'
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
					},{	dataIndex:	'mxm2_pric'			, width:  80, align : 'right'	, text: Language.get( 'mxm2_pric'		, '단가/m2'	), xtype : 'numericcolumn', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'pqty_pric'			, width:  80, align : 'right'	, text: Language.get( 'pqty_pric'		, '단가/개'	), xtype : 'numericcolumn', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'istt_amnt'			, width:  80, align : 'right'	, text: Language.get( 'istt_amnt'		, '공급가액'	), xtype : 'numericcolumn', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'istt_vatx'			, width:  80, align : 'right'	, text: Language.get( 'istt_vatx'		, '부가세'		), xtype : 'numericcolumn', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'ttsm_amnt'			, width:  80, align : 'right'	, text: Language.get( 'ttsm_amnt'		, '합계금액'	), xtype : 'numericcolumn', hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'acpt_cstm_name'	, width: 160, align : 'left'	, text: Language.get( 'acpt_cstm_name'	, '수주처명'	), hidden: _global.hqof_idcd.toUpperCase()== 'N1000DAE-A',
					},{	dataIndex:	'prod_name'			, width: 200, align : 'left'	, text: Language.get( 'prod_name'		, '품명'		)
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
						{	fieldLabel	: Language.get('invc_qntt_edit','입고건수 '),
							xtype		: 'numericfield',
							name		: 'invc_qntt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
						},{	fieldLabel	: Language.get('istt_qntt_edit','입고수량'),
							xtype		: 'numericfield',
							name		: 'istt_qntt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
						},{	fieldLabel	: Language.get('sply_amnt_edit','공급가액'),
							xtype		: 'numericfield',
							name		: 'sply_amnt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
							hidden		: true,
						},{	fieldLabel	: Language.get('vatx_amnt_edit','부가세액'),
							xtype		: 'numericfield',
							name		: 'vatx_amnt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
							hidden		: true,
						},{	fieldLabel	: Language.get('ttsm_amnt_edit','합계금액'),
							xtype		: 'numericfield',
							name		: 'ttsm_amnt_edit',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							style		: 'text-align:right;',
							hidden		: true,
						},
					]
				}
			]
		};
		return item;
	},

	cellEditAfter  : function (editor, context , rowIndexNum) {
		var me = this,
		grid = this,
		rowIndex,
		field = context.field
		;
		rowIndex = context.rowIdx!=undefined?context.rowIdx:rowIndexNum;

		var models		= grid.getStore().getRange();
//		var invc  = grid.getStore().getAt(rowIndex).get('invc_date');		//발주일자
//		var istt  = grid.getStore().getAt(rowIndex).get('istt_qntt');
//		var subt  = grid.getStore().getAt(rowIndex).get('subt_qntt');
//		var istt2 = grid.getStore().getAt(rowIndex).get('istt_qntt2');
//		var pric  = grid.getStore().getAt(rowIndex).get('pqty_pric');

		var invc  = grid.getStore().data.items[0].data.invc_date;
		var istt  = grid.getStore().data.items[0].data.istt_qntt;
		var subt  =	grid.getStore().data.items[0].data.subt_qntt;
		var istt2 =	grid.getStore().data.items[0].data.istt_qntt2;
		var pric  =	grid.getStore().data.items[0].data.pqty_pric;

		if(invc == '합계' || istt == '입고량'){
			Ext.Msg.alert("알림", "합계, 소계 일 땐 수정이 불가능합니다.");
			models[rowIndex].set('item_leng',null);
			models[rowIndex].set('item_widh',null);
		}else{
			if(istt-subt < 0){
				Ext.Msg.alert('알림','입고, 감량 수량을 확인해주세요.');
				models[rowIndex].set('subt_qntt',0);
				models[rowIndex].set('istt_qntt',istt2);
				return;
			}

//			if(_global.hqof_idcd.toUpperCase() == "N1000DAE-A"){
//				if(field == "item_leng" || field == "item_widh"){
//					Ext.Ajax.request({
//						url			: _global.location.http() + '/custom/iypkg/stock/isos/isttwork1/get/calc.do',
//						params		: {
//							token	: _global.token_id ,
//							param	: JSON.stringify({
//								stor_id   : _global.stor_id,
//								invc_numb : grid.getStore().getAt(rowIndex).get('acpt_numb'),
//								line_seqn : grid.getStore().getAt(rowIndex).get('acpt_seqn'),
//								prod_leng : grid.getStore().getAt(rowIndex).get('item_leng'),
//								prod_widh : grid.getStore().getAt(rowIndex).get('item_widh')
//							})
//						},
//						async	: false,
//						method	: 'POST',
//						success	: function(response, request) {
//							var result = Ext.decode(response.responseText);
//							if(result.records){
//								var	deff   = result.records[0].deff,
//									divs    = result.records[0].divs,
//									length = result.records[0].length
//								;
//								var total = (length*grid.getStore().getAt(rowIndex).get('item_ttln')*eval(divs));
//
//								var	mxm2 = (total*0.000001),
//									pqty = (total*0.000001) * grid.getStore().getAt(rowIndex).get('mxm2_pric')
//								;
//								var	mxm2_qntt = mxm2.toFixed(3),
//									pqty_pric = pqty.toFixed(3)
//								;
//								models[rowIndex].set('pqty_pric',pqty_pric);
//								models[rowIndex].set('item_fxqt',divs);
//								pric = pqty_pric;
//							}
//						}
//					});
//				}
//				if(subt <= 0){
//					console.log(models[rowIndex]);
//					istt = models[rowIndex].get('istt_qntt2');
//				}
//				models[rowIndex].set('istt_qntt',(istt-subt));
//				models[rowIndex].set('istt_amnt',(istt-subt)*pric);
//				models[rowIndex].set('istt_vatx',(istt-subt)*pric*0.01);
//				models[rowIndex].set('ttsm_amnt',((istt-subt)*pric)+((istt-subt)*pric*0.01));
//			}

			var select = grid.getSelectionModel().getSelection()[0];
			var models = grid.getStore().getRange();
			var store = grid.getStore();

			var invcQnttEditField = parseInt(grid.down('[name=invc_qntt_edit]').getValue()) || 0;
			var istt = parseInt(grid.down('[name=istt_qntt_edit]').getValue()) || 0;
			var chk = select.data.chk;		//체크

			var currentValue;
			var currentIsttValue;

			var a = parseInt(select.data.istt_qntt);	//수주량

			if (chk) {
				currentValue = invcQnttEditField + 1;
				currentIsttValue = istt + a;
			} else {
				if (invcQnttEditField > 0) {
					currentValue = invcQnttEditField - 1;
					currentIsttValue = istt - a;
				}
			}

			this.down('[name=invc_qntt_edit]').setValue(currentValue);
			this.down('[name=istt_qntt_edit]').setValue(currentIsttValue);

		}

	},

	listeners: {
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	}

 });