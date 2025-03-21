Ext.define('module.custom.sjflv.mtrl.imp.blmast.view.BlMastWorkerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-blmast-worker-detail',
	store		: 'module.custom.sjflv.mtrl.imp.blmast.store.BlMastListerDetail',

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
					{	dataIndex: ''	, text : Language.get(''	,'항번'		) , width : 50 ,  align : 'center'
					},{	dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'		) , width : 70 , align : 'left'
					},{	dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		) , width : 200 , align : 'left'
					},{	dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		) , width : 150 , align : 'left'
					},{	dataIndex: 'item_hscd'	, text : Language.get('item_hscd'	,'HS Code'	) , width : 120 , align : 'left'
					},{	dataIndex: ''	, text : Language.get(''	,'단위'		) , width :  50 , xtype : 'numericcolumn'
					},{	dataIndex: ''	, text : Language.get(''	,'수량'		) , width : 80 , xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: ''	, text : Language.get(''	,'단가'		) , width :  90 , xtype : 'numericcolumn'
					},{	dataIndex: ''	, text : Language.get(''	,'금액'		) , width :  110 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: ''	, text : Language.get(''	,'원화단가'		) , width :  90 , xtype : 'numericcolumn'
					},{	dataIndex: ''	, text : Language.get(''	,'원화금액'		) , width :  110 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: ''	, text : Language.get(''	,'Maker'		) , width :  110
					},{	dataIndex: ''	, text : Language.get(''	,'선적예정일'	) , width : 100 ,  align : 'center', xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'	) , flex : 1 ,  align : 'left',
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
