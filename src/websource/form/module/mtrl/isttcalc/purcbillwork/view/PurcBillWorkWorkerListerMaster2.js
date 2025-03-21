Ext.define('module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkWorkerListerMaster2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcbillwork-worker-lister-master2',
	store		: 'module.mtrl.isttcalc.purcbillwork.store.PurcBillWorkWorkerLister',

	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary', remote : false }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var rowIndexNum;
		var me = this;
//		me.paging	= me.pagingItem();
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
					{	dataIndex:	'chk'			, width: 35, align : 'center'	, text: Language.get('chk'	, '선택'		), xtype:'checkcolumn',
						},{	dataIndex:	''			, width: 90, align : 'center'	, text: Language.get( ''	, '발행일자'	)
						},{	dataIndex:	''			, width: 90, align : 'left'		, text: Language.get( ''	, '사업자등록번호')
						},{	dataIndex:	''			, width: 160, align : 'left'	, text: Language.get( ''	, '거래처명'	)
						},{	dataIndex:	''			, width: 110, align : 'right'	, text: Language.get( ''	, '공급가'		), xtype : 'numericcolumn', summaryType: 'sum',
						},{	dataIndex:	''			, width: 110, align : 'right'	, text: Language.get( ''	, '부가세'		), xtype : 'numericcolumn', summaryType: 'sum',
						},{	dataIndex:	''			, width: 110, align : 'right'	, text: Language.get( ''	, '합계'		), xtype : 'numericcolumn', summaryType: 'sum'
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
