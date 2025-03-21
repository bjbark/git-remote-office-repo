Ext.define('module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcbillwork-worker-lister',
	store		: 'module.mtrl.isttcalc.purcbillwork.store.PurcBillWorkWorkerLister',

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
					'-', '->', '-',
					{	text : '<span class="write-button">전체 발행</span>'	, action : 'InsertAction'		, cls: 'button1-style' ,width:  90,	} ,
					'->','-',
					{text : Const.UPDATE.text , iconCls: Const.UPDATE.icon, action : Const.UPDATE.action , cls: 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' },
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
					{	dataIndex:	'chk'			, width:  35, align : 'center'	, text: Language.get('chk'	, '선택'		), xtype:'checkcolumn',
						},{	dataIndex:	''			, width: 90, align : 'left'		, text: Language.get( ''	, '입고일자'	)
						},{	dataIndex:	''			, width: 80, align : 'left'		, text: Language.get( ''	, '입고번호'	)
						},{	dataIndex:	''			, width: 50, align : 'center'	, text: Language.get( ''	, '항번'		)
						},{	dataIndex:	''			, width: 90, align : 'left'		, text: Language.get( ''	, '품목코드'	)
						},{	dataIndex:	''			, width: 200, align : 'left'	, text: Language.get( ''	, '품명'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
						},{	dataIndex:	''			, width: 140, align : 'center'	, text: Language.get( ''	, '규격'		)
						},{	dataIndex:	''			, width:  80, align : 'right'	, text: Language.get( ''	, '단위'		)
						},{	dataIndex:	''			, width:  90, align : 'right'	, text: Language.get( ''	, '입고수량'	), xtype : 'numericcolumn', summaryType: 'sum',
						},{	dataIndex:	''			, width: 80, align : 'right'	, text: Language.get( ''	, '발행수량'	), xtype : 'numericcolumn', summaryType: 'sum',
						},{	dataIndex:	''			, width: 80, align : 'left'	, text: Language.get( ''	, '대기수량'	), xtype : 'numericcolumn', summaryType: 'sum',
						},{	dataIndex:	''			, width: 80, align : 'right'	, text: Language.get( ''	, '발행할 수량'	)
							, tdCls	: 'editingcolumn',
							editor	: {
								xtype		:'textfield',
								selectOnFocus: true,
								allowBlank	: false
							}
						},{	dataIndex:	''			, width:  80, align : 'right'	, text: Language.get( ''	, '단가'		)
						},{	dataIndex:	''			, width: 110, align : 'right'	, text: Language.get( ''	, '공급가'		), xtype : 'numericcolumn', summaryType: 'sum'
							, tdCls	: 'editingcolumn',
							editor	: {
								xtype		:'textfield',
								selectOnFocus: true,
								allowBlank	: false
							}
						},{	dataIndex:	''			, width: 110, align : 'right'	, text: Language.get( ''	, '부가세'		), xtype : 'numericcolumn', summaryType: 'sum'
							, tdCls	: 'editingcolumn',
							editor	: {
								xtype		:'textfield',
								selectOnFocus: true,
								allowBlank	: false
							}
						},{	dataIndex:	''			, width:  130, align : 'right'	, text: Language.get( ''	, '합계금액'	), xtype : 'numericcolumn', summaryType: 'sum',
						},{	dataIndex: ''			, flex:  1, align : 'left'		, text: Language.get( ''	, '비고'	)
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
