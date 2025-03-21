Ext.define('module.custom.sjflv.mtrl.imp.invoicemast.view.InvoiceMastWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-invoicemast-worker-lister',
	store		: 'module.custom.sjflv.mtrl.imp.invoicemast.store.InvoiceMastWorkerLister',

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


					{	text : '<span class="write-button">Invoice 등록</span>'	, action : 'InsertAction'		, cls: 'button1-style' ,width:  90,	} ,
					'-','-',
					{	text : '<span class="write-button">지급 등록</span>'		, action : 'PayAction'		, cls: 'button1-style' ,width:  70,	} ,
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
					{	dataIndex:	''			, width: 40, align : 'center'	, text: Language.get( ''	, '선택'		)
					},{	dataIndex:	''			, width: 40, align : 'left'		, text: Language.get( ''	, '상태'		)
					},{	dataIndex:	''			, width: 150, align : 'left'	, text: Language.get( ''	, '사업장'		)
					},{	dataIndex:	''			, width: 80, align : 'center'	, text: Language.get( ''	, 'Order No')
					},{	dataIndex:	''			, width: 50, align : 'left'		, text: Language.get( ''	, 'AMD'		)
					},{	dataIndex:	''			, width: 100, align : 'left'	, text: Language.get( ''	, '수입구분'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{	dataIndex:	''			, width: 120, align : 'center'	, text: Language.get( ''	, '관리번호'	)
					},{	dataIndex:	''			, width: 100, align : 'right'	, text: Language.get( ''	, '대표품목'	)
					},{	dataIndex:	''			, width:  90, align : 'right'	, text: Language.get( ''	, 'PO Date'	)
					},{	dataIndex:	''			, width: 100, align : 'right'	, text: Language.get( ''	, 'Ship Via')
					},{	dataIndex:	''			, width: 120, align : 'left'	, text: Language.get( ''	, 'Vendor'	)
					},{	dataIndex:	''			, width: 120, align : 'right'	, text: Language.get( ''	, '중개인'		)
					},{	dataIndex:	''			, width:  80, align : 'right'	, text: Language.get( ''	, '담당자'		)
					},{	dataIndex:	''			, width:  80, align : 'right'	, text: Language.get( ''	, '가격조건'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex:	''			, width:  80, align : 'right'	, text: Language.get( ''	, '결제방법'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('')
					},{	dataIndex:	''			, width:  80, align : 'right'	, text: Language.get( ''	, '결제시기'	)
					},{	dataIndex:	''			, width:  80, align : 'right'	, text: Language.get( ''	, '결제기한'	)
					},{	dataIndex:	''			, width:  110, align : 'right'	, text: Language.get( ''	, '통화'		), xtype: 'numericcolumn'
					},{	dataIndex:	''			, width:  110, align : 'right'	, text: Language.get( ''	, '적용환율'	), xtype: 'numericcolumn'
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
