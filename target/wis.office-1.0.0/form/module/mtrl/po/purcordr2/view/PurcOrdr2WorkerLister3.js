Ext.define('module.mtrl.po.purcordr2.view.PurcOrdr2WorkerLister3', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-purcordr2-worker-lister3',
	store	: 'module.mtrl.po.purcordr2.store.PurcOrdr2WorkerLister3',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'SINGLE'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},
	pagingItem : function () {
		var me = this,
			item = {
					xtype : 'grid-paging',
					items : [
						'->', '-',
					{	text : '<span class="write-button">신규품목지정</span>', action :  'itemAction'          , cls: 'button-style' } , '-',
					{	text : '<span class="write-button">기존품목지정</span>', action :  'itemupdateAction'    , cls: 'button-style' } , '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style' } ,
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style' } , '-'
				], pagingButton : false
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'line_seqn'		, width: 50 , align : 'center'	, text: Language.get('line_seqn'	, '항번'		)
					},{	dataIndex:	'item_code'		, width: 150, align : 'center'	, text: Language.get('item_code'	, '품목코드'	)
					},
//					{	xtype	: 'actioncolumn',
//						header	: '',
//						width	: 20,
//						align	: 'center',
//						items	: [
//							{	iconCls	: Const.SELECT.icon,
//								tooltip	: '색상 찾기',
//								handler	: function (grid, rowIndex, colIndex, item, e, record) {
//									resource.loadPopup({
//									select	: 'SINGLE',
//									widget	: 'lookup-item-popup-aone',
//									params:{
//										prnt_idcd : '3105'
//									},
//									result	: function(records) {
//										var	parent = records[0];
//										var grid = me.up('grid'),
//										store = me.getStore(),
//										selection = me.getSelectionModel().getSelection()[0]
//										row = store.indexOf(selection);
//											record.set('item_code',parent.data.item_code);
//											record.set('item_name',parent.data.item_name);
//											record.set('item_spec',parent.data.item_spec);
//											record.set('unit_name',parent.data.unit_name);
//											me.plugins[0].startEdit(row, 1);
//										},
//									})
//								},
//								scope : me
//							}
//						]
//					}
					{	dataIndex:	'item_name'		, width: 200, align : 'left'	, text: Language.get('item_name'	, '품명'		)
					},{	dataIndex:	'item_spec'		, width: 120, align : 'left'	, text: Language.get('item_spec'	, '규격'		)
					},{	dataIndex:	'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'	, '단위'		)
					},{	dataIndex:	'usge_dvcd'		, width: 100, align : 'center'	, text: Language.get('usge_dvcd'	, '용도'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('usge_dvcd'), hidden: _global.hqof_idcd.toUpperCase()== 'N1000A-ONE',
					},{	dataIndex:	'reqt_qntt'		, width: 100, align : 'right'	, text: Language.get('reqt_qntt'	, '요청수량'	), xtype: 'numericcolumn', summaryType: 'sum',format	: '#,##0.###'
					},{	dataIndex:	'offr_qntt'		, width: 90,  align : 'right'	, text: Language.get('offr_qntt'	, '발주수량'	), xtype: 'numericcolumn', summaryType: 'sum',format	: '#,##0.###'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[8]);
									}
								}
							}
						}

					},{	dataIndex:	'offr_pric'		, width:  90, align : 'right'	, text: Language.get('offr_pric'	, '단가'		), xtype: 'numericcolumn', format		: '#,##0.###',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							listeners:{
								blur:function(){
									var select = this.up('grid').getSelectionModel().getSelection()[0],
										value  = this.getValue()
//										offr_pric = select?value *select.get('offr_qntt'):select.get('offr_pric')
									;
//									select.set('offr_pric',offr_pric)
								}
							}
						}
					},{	dataIndex:	'offr_amnt'		, width: 120, align : 'right'	, text: Language.get('offr_amnt'	, '금액'		), xtype: 'numericcolumn' , summaryType: 'sum' , format	: '#,##0.###'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[12]);
									}
								}
							}
						}
					},{	dataIndex:	'offr_vatx'			, width: 100, align : 'right'	, text: Language.get( 'offr_vatx'	, '부가세'		), xtype : 'numericcolumn', summaryType: 'sum',hidden : false
					},{	dataIndex:	'ttsm_amnt'			, width: 130, align : 'right'	, text: Language.get( 'ttsm_amnt'	, '합계금액'	), xtype : 'numericcolumn', summaryType: 'sum',hidden : true
					},{	dataIndex:	'user_memo'			, flex :  20, align : 'left'	, text: Language.get( 'user_memo'	, '비고'		)
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);

										grid.plugins[0].startEdit(row+1, grid.columns[5]);
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

	cellEditAfter  : function (editor, context,rowIndexNum) {
		var	me			= this,
			grid		= this,
			reqt_qntt = this.getSelectionModel().getSelection()[0].data.reqt_qntt,
			offr_qntt = this.getSelectionModel().getSelection()[0].data.offr_qntt,
			pos = this.view.getSelectionModel().getCurrentPosition().row,
			search = Ext.ComponentQuery.query('module-purcordr2-worker-search2')[0],
			rowIndex,
			qntt	,
			pric	,
			amnt	,
			vatx	,
			ttsm	,
			models
		;

		rowIndex = context.rowIdx!=undefined?context.rowIdx:rowIndexNum;
		qntt	 = grid.getStore().getAt(rowIndex).get('offr_qntt');		//발주량
		pric	 = grid.getStore().getAt(rowIndex).get('offr_pric');		//단가

		var resId = _global.options.mes_system_type?_global.options.mes_system_type.toUpperCase():_global.hq_id.toUpperCase();
		if(resId == 'SJFLV') {
			if (_global.hq_id.toUpperCase() == 'N1000SJFLV') {
				amnt = (qntt * pric).toFixed(2);
			} else {
				amnt = (qntt * pric).toFixed(3);
			}

			if (search.down('[name=supl_dvcd]').value == '6000'){
				vatx = 0;
			} else {
				vatx = Math.trunc(amnt / Number(_global.tax_rt));
			}
		} else {
			amnt = (qntt * pric).toFixed(2);
			if (search.down('[name=supl_dvcd]').value == '6000'){
				vatx = 0;
			} else {
				vatx = Math.trunc(amnt / Number(_global.tax_rt));
			}
		}

		ttsm	= amnt + vatx;									//합계
		models	= grid.getStore().getRange();

		models[rowIndex].set('offr_amnt',amnt);
		models[rowIndex].set('offr_vatx',vatx);
		models[rowIndex].set('ttsm_amnt',ttsm);

//		if(offr_qntt > reqt_qntt){
//			Ext.Msg.alert("알림", "요청수량보다  발주수량이 더 많습니다. 다시 입력해주십시오.");
//			models[pos].set('offr_qntt',0);
//			return;
//		}
	},

	listeners: {
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	}
});