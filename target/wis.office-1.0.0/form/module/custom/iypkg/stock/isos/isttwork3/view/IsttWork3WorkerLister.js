Ext.define('module.custom.iypkg.stock.isos.isttwork3.view.IsttWork3WorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-isttwork3-worker-lister',
	store		: 'module.custom.iypkg.stock.isos.isttwork3.store.IsttWork3WorkerLister',

	split		: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var rowIndexNum;
		var me = this;
		me.dockedItems = [{xtype: 'module-isttwork3-worker-search'}];
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
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
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
					{	dataIndex:	'chk'				, width:  35, align : 'center'	, text: Language.get('chk'				, '선택'		), xtype:'checkcolumn',
						listeners:{
							checkchange:function(element, rowindex, bool, rec) {
								var record = me.store.getAt(rowindex);
								rowIndexNum = rowindex;
								if(bool){
									record.set('istt_qntt2',record.get('unistt'));
									me.cellEditAfter(element, record);
								}else{
									record.set('istt_qntt2','0');
									me.cellEditAfter(element, record);
								}
							}
						}
					},{	dataIndex:	'acpt_numb'			, width: 100, align : 'center'	, text: Language.get( 'acpt_invc_numb'	, '수주번호'	)
					},{	dataIndex:	'acpt_cstm_name'	, width: 140, align : 'left'	, text: Language.get( 'acpt_cstm_name'	, '수주처명'	)
					},{	dataIndex:	'prod_name'			, width: 230, align : 'left'	, text: Language.get( 'prod_name'		, '품명'		)
					},{	dataIndex:	'invc_date'			, width: 100, align : 'center'	, text: Language.get( 'invc_date'	, '발주일자'	)
					},{	dataIndex:	'cstm_name'			, width: 140, align : 'left'	, text: Language.get( 'cstm_name'	, '발주처명'	)
					},{	dataIndex:	'prod_leng'			, width:  60, align : 'right'	, text: Language.get( 'prod_leng'	, '장'		), xtype : 'numericcolumn'
					},{	dataIndex:	'prod_widh'			, width:  60, align : 'right'	, text: Language.get( 'prod_widh'	, '폭'		), xtype : 'numericcolumn'
					},{	dataIndex:	'prod_hght'			, width:  60, align : 'right'	, text: Language.get( 'prod_hght'	, '고'		), xtype : 'numericcolumn'
					},{	dataIndex:	'offr_qntt'			, width:  80, align : 'right'	, text: Language.get( 'offr_qntt'	, '발주수량'	), xtype: 'numericcolumn'
					},{	dataIndex:	'istt_qntt'			, width:  80, align : 'right'	, text: Language.get( 'istt_qntt'	, '입고한수량'	), xtype: 'numericcolumn'
					},{	dataIndex:	'unistt'			, width:  80, align : 'right'	, text: Language.get( 'unistt'		, '미입고잔량'	), xtype: 'numericcolumn'
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
										grid.plugins[0].startEdit(row, grid.columns[13]);
									}
								}
							}
						}
					},{	dataIndex:	'subt_qntt'			, width:  60, align : 'right'	, text: Language.get( 'subt_qntt'	, '감량'		), xtype: 'numericcolumn', summaryType: 'sum'
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
										grid.plugins[0].startEdit(row, grid.columns[14]);
									}
								}
							}
						}
					},{	dataIndex:	'pqty_pric'			, width:  80, align : 'right'	, text: Language.get( 'pqty_pric'		, '단가/개'	), xtype: 'numericcolumn'
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
					},{	dataIndex:	'vatx_incl_yorn'	, width:  80, align : 'center'	, text: Language.get( 'vatx_incl_yorn'	, '자료구분'	),	//부가세 포함 여부 (수정가능)
						xtype	: 'lookupcolumn',
						lookupValue : resource.lookup('vatx_dvcd'),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		: 'lookupfield',
							lookupValue	: resource.lookup('vatx_dvcd'),
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
										grid.plugins[0].startEdit(row+1, grid.columns[10]);
									}
								}
							}
						}
					},{	dataIndex:	'istt_amnt'			, width:  80, align : 'right'	, text: Language.get( 'istt_amnt'		, '공급가'		), xtype: 'numericcolumn'
					},{	dataIndex:	'istt_vatx'			, width:  80, align : 'right'	, text: Language.get( 'istt_vatx'		, '부가세'		), xtype: 'numericcolumn'
					},{	dataIndex:	'ttsm_amnt'			, width:  80, align : 'right'	, text: Language.get( 'ttsm_amnt'		, '합계'		), xtype: 'numericcolumn'
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
