Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkLister', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-purcbillwork-lister',
	store	: 'module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkLister',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-purcbillwork-worker-search'}];
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : '<span class="write-button">매입계산서 발행</span>', action : 'txblAction'	, cls: 'button1-style', style : 'width : 100px'	}
				]
			}
		;
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'invc_date'		, width: 100, align : 'center'	, text: '입고일자'
					},{	dataIndex:	'cstm_name'		, width: 150, align : 'left'	, text: '입고처명'
					},{	dataIndex:	'item_name'		, width: 230, align : 'left'	, text: '품명'
					},{	dataIndex:	'item_spec'		, width: 100, align : 'left'	, text: '규격'
					},{	dataIndex:	'istt_qntt'		, width:  80, align : 'right'	, text: '입고수량'		, xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'txbl_qntt'		, width:  80, align : 'right'	, text: '발행한 수량'	, xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'unissued'		, width:  80, align : 'right'	, text: '미발행 수량'	, xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'qntt'			, width:  80, align : 'right'	, text: '발행할 수량'	, xtype: 'numericcolumn' , summaryType: 'sum',
						tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row+1, grid.columns[7]);
									}
								}
							}
						},
					},{	dataIndex:	'istt_pric'		, width:  70, align : 'right'	, text : '단가'		, xtype: 'numericcolumn' , format: '#,##0'
					},{	dataIndex:	'offr_path_dvcd', width:  80, align : 'center'	, text : '자료구분'		, xtype: 'lookupcolumn'  , lookupValue	: [['1','원단'],['2','부자재'],['3','상품'],['4','원지']],
					},{	dataIndex:	'istt_amnt'		, width: 100, align : 'right'	, text : '공급가액'		, xtype: 'numericcolumn' , format: '#,##0', summaryType: 'sum',
					},{	dataIndex:	'istt_vatx'		, width: 100, align : 'right'	, text : '부가세'		, xtype: 'numericcolumn' , format: '#,##0', summaryType: 'sum',
					},{	dataIndex:	'ttsm_amnt'		, width: 100, align : 'right'	, text : '합계금액'		, xtype: 'numericcolumn' , format: '#,##0', summaryType: 'sum',
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (editor, context) {
		var me = this;
		var qntt		= this.getSelectionModel().getSelection()[0].data.qntt;			//발행할수량
		var unissued	= this.getSelectionModel().getSelection()[0].data.unissued;		//미발행수량
		var istt_pric	= this.getSelectionModel().getSelection()[0].data.istt_pric;	//개당단가
		var istt_amnt	= this.getSelectionModel().getSelection()[0].data.istt_amnt;	//공급가액
		var istt_vatx	= this.getSelectionModel().getSelection()[0].data.istt_vatx;	//부가세액
		var ttsm_amnt	= this.getSelectionModel().getSelection()[0].data.ttsm_amnt;	//합계금액

		var amnt		= qntt*istt_pric;		//공급가
		var vatx		= (amnt)*0.1;			//부가세
		var ttsm		= amnt+vatx;			//합계

		var grid		= this;
		var pos			= this.view.getSelectionModel().getCurrentPosition().row;
		var models		= grid.getStore().getRange();

		if(qntt > unissued){
			Ext.Msg.alert("알림", "발행할 수량을 다시 입력해주십시오.");
			models[pos].set('qntt',0);
			models[pos].set('istt_amnt',0);
			models[pos].set('istt_vatx',0);
			models[pos].set('ttsm_amnt',0);
		}else if(qntt < 0){
			Ext.Msg.alert("알림", "발행할 수량을 다시 입력해주십시오.");
			models[pos].set('qntt',0);
			models[pos].set('istt_amnt',0);
			models[pos].set('istt_vatx',0);
			models[pos].set('ttsm_amnt',0);
		}else{
			models[pos].set('istt_amnt',amnt);
			models[pos].set('istt_vatx',vatx);
			models[pos].set('ttsm_amnt',ttsm);
		}
	},

	listeners: {
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	},

});
