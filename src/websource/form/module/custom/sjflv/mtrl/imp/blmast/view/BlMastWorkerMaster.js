Ext.define('module.custom.sjflv.mtrl.imp.blmast.view.BlMastWorkerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-blmast-worker-master',
	store		: 'module.custom.sjflv.mtrl.imp.blmast.store.BlMastWorkerMaster',

	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary', remote : false }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var rowIndexNum;
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
				xtype : 'grid-paging',
				items : [


					{	text : '<span class="write-button">B/L 등록</span>'	, action : 'InsertAction'		, cls: 'button1-style' ,width:  70,	} ,
					'-','-',
					'->','-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				], pagingButton : true
			}
		;
		return item ;
	},




	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	''			, width: 50, align : 'left'	, text: Language.get( ''	, '선택'		)
					},{	dataIndex:	''			, width: 60, align : 'center'	, text: Language.get( ''	, '상태'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex:	''			, width: 90, align : 'center'	, text: Language.get( ''	, '사업장'		)
					},{	dataIndex:	''			, width: 120, align : 'center'	, text: Language.get( ''	, 'Order No')
					},{	dataIndex:	''			, width: 60, align : 'center'	, text: Language.get( ''	, 'AMD'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex:	''			, width: 90, align : 'center'	, text: Language.get( ''	, '수입구분'	)
					},{	dataIndex:	''			, width:  110, align : 'left'	, text: Language.get( ''	, '관리번호'	)
					},{	dataIndex:	''			, width:  100, align : 'left'	, text: Language.get( ''	, '대표품목'	)
					},{	dataIndex:	''			, width:  80, align : 'left'	, text: Language.get( ''	, 'PO Date'	)
					},{	dataIndex:	''			, width:  70, align : 'center'	, text: Language.get( ''	, 'Ship Via'), xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex:	''			, width: 130, align : 'left'	, text: Language.get( ''	, 'Vendor'	)
					},{	dataIndex:	''			, width: 100, align : 'right'	, text: Language.get( ''	, '중개인'		), xtype: 'numericcolumn'
					},{	dataIndex:	''			, width:  80, align : 'right'	, text: Language.get( ''	, '담당자'		), xtype: 'numericcolumn'
					},{	dataIndex:	''			, width:  80, align : 'center'	, text: Language.get( ''	, '가격조건'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex:	''			, width:  80, align : 'center'	, text: Language.get( ''	, '결제방법'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex:	''			, width:  80, align : 'right'	, text: Language.get( ''	, '결제시기'	)
					},{	dataIndex:	''			, width:  80, align : 'right'	, text: Language.get( ''	, '결제기한'	)
					},{	dataIndex:	''			, width:  80, align : 'right'	, text: Language.get( ''	, '통화'		), xtype: 'numericcolumn',
					},{	dataIndex:	''			, width:  80, align : 'right'	, text: Language.get( ''	, '적용환율'	), xtype: 'numericcolumn',
//					},{	dataIndex:	'subt_qntt'			, width:  60, align : 'right'	, text: Language.get( 'subt_qntt'	, '감량'		), xtype: 'numericcolumn', summaryType: 'sum'
//						, tdCls	: 'editingcolumn',
//						editor	: {
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
//										grid.plugins[0].startEdit(row+1, grid.columns[15]);
//									}
//								}
//							}
//						}
//					},{	dataIndex:	'mxm2_pric'			, width:  80, align : 'right'	, text: Language.get( 'mxm2_pric'		, '단가/m2'	), xtype: 'numericcolumn'
//					},{	dataIndex:	'vatx_incl_yorn'	, width:  80, align : 'center'	, text: Language.get( 'vatx_incl_yorn'	, '자료구분'	),	//부가세 포함 여부 (수정가능)
//						xtype	: 'lookupcolumn',
//						lookupValue : resource.lookup('yorn'),
//						tdCls	: 'editingcolumn',
//						editor	: {
//							xtype		: 'lookupfield',
//							lookupValue	: resource.lookup('yorn'),
//							value		: '1',
//							selectOnFocus: true,
//							enableKeyEvents : true,
//							listeners:{
//								keydown : function(self, e) {
//									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//										var grid = self.up('grid'),
//											store = me.getStore(),
//											selection = me.getSelectionModel().getSelection()[0],
//											row = store.indexOf(selection);
//										grid.plugins[0].startEdit(row+1, grid.columns[10]);
//									}
//								}
//							}
//						}
//					},{	dataIndex:	'istt_amnt'			, width:  80, align : 'right'	, text: Language.get( 'istt_amnt'		, '공급가'		), xtype: 'numericcolumn'
					}
				]
			}
		;
		return item;
	},


	cellEditAfter  : function (editor, context) {
		var me = this;
		var grid		= this;
		var unistt		= grid.getStore().getAt(rowIndexNum).get('unistt');		//미입고잔량
		var qntt		= grid.getStore().getAt(rowIndexNum).get('istt_qntt2');	//입고할수량
		var pric		= grid.getStore().getAt(rowIndexNum).get('pqty_pric');	//개당단가

		var amnt		= Math.floor(qntt*pric);		//공급가
		var vatx		= Math.floor((qntt*pric)*0.1);	//부가세
		var ttsm		= amnt+vatx;					//합계

		var models		= grid.getStore().getRange();

		if(qntt > unistt){
			Ext.Msg.alert("알림", "입고수량을 다시 입력해주십시오.");
			models[rowIndexNum].set('istt_qntt2',0);
		}else if(qntt < 0){
			Ext.Msg.alert("알림", "입고수량을 다시 입력해주십시오.");
			models[rowIndexNum].set('istt_qntt2',0);
		}else{
			models[rowIndexNum].set('istt_amnt',amnt);
			models[rowIndexNum].set('istt_vatx',vatx);
			models[rowIndexNum].set('ttsm_amnt',ttsm);
		}

	},

	listeners: {
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	}

});
