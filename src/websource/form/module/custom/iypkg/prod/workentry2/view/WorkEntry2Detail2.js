Ext.define('module.custom.iypkg.prod.workentry2.view.WorkEntry2Detail2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-workentry2-detail2',
	store		: 'module.custom.iypkg.prod.workentry2.store.WorkEntry2Detail2',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : false }],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->','-' ,
					{	text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action , button : 'lister' , cls: 'button-style'}
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'		, width: 100, align: 'center', text: Language.get('invc_date'		, '발주일자'	),
					},{	dataIndex: 'invc_numb'		, width: 100, align: 'center', text: Language.get('invc_numb'		, '발주번호'	),
					},{	dataIndex: 'wkct_name'		, width:  80, align: 'center', text: Language.get('wkct_name'		, '공정명'		),
					},{	dataIndex: 'cstm_name'		, width: 150, align: 'left'  , text: Language.get('cstm_name'		, '외주처명'	)
					},{	dataIndex: 'cstm_idcd'		, hidden : true
					},{ dataIndex: 'wkun_dvcd'		, width:  70, align: 'center', text: Language.get('wkun_dvcd'		, '작업단위'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('wkun_dvcd')
					},{ dataIndex: 'offr_qntt'		, width:  60, align: 'right' , text: Language.get('offr_qntt'		, '발주량'		), xtype : 'numericcolumn',
					},{ dataIndex: 'unistt'			, width:  60, align: 'right' , text: Language.get(''				, '미입고'		), xtype : 'numericcolumn',
					},{ dataIndex: 'istt_qntt'		, width:  60, align: 'right' , text: Language.get('istt_qntt'		, '입고량'		), xtype : 'numericcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[9]);
									}
								}
							}
						}
					},{ dataIndex: 'subt_qntt'		, width:  60, align: 'right' , text: Language.get('subt_qntt'		, '감량'		), xtype : 'numericcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[11]);
									}
								}
							}
						}
					},{ dataIndex: 'unit_name'		, width:  70, align: 'center', text: Language.get('unit_name'		, '수량단위'	),
					},{ dataIndex: 'offr_pric'		, width:  80, align: 'right' , text: Language.get('offr_pric'		, '단가'		), xtype : 'numericcolumn',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									if (e.keyCode == e.ENTER) {
										grid.plugins[0].startEdit(row+1, grid.columns[8]);
									}else if (e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row, grid.columns[8]);
									}
								}
							}
						}
					},{ dataIndex: 'vatx_incl_yorn'	, width:  60, align: 'center', text: Language.get(''				, '자료구분'	),
						xtype	:'lookupcolumn',
						lookupValue : resource.lookup('yorn'),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'lookupfield',
							lookupValue	: resource.lookup('yorn'),
							value		: '1',
						}
					},{ dataIndex: 'istt_amnt'		, width: 100, align: 'right' , text: Language.get('istt_amnt'		, '공급가'		), xtype : 'numericcolumn',
					},{ dataIndex: 'istt_vatx'		, width:  80, align: 'right' , text: Language.get('istt_vatx'		, '부가세'		), xtype : 'numericcolumn',
					},{ dataIndex: 'ttsm_amnt'		, width: 100, align: 'right' , text: Language.get('ttsm_amnt'		, '합계금액'	), xtype : 'numericcolumn',
					}
				]
			}
		;
		return item;
	},


	cellEditAfter  : function (editor, context) {
		var me = this;
		var me = this;
		var subt_qntt	= this.getSelectionModel().getSelection()[0].data.subt_qntt;	//감량
		var unistt		= this.getSelectionModel().getSelection()[0].data.unistt;		//미입고잔량
		var qntt		= this.getSelectionModel().getSelection()[0].data.istt_qntt;	//입고할수량
		var pric		= this.getSelectionModel().getSelection()[0].data.offr_pric;	//입고단가

		var amnt		= qntt*pric;					//공급가
		var vatx		= Math.floor((qntt*pric)*0.1);	//부가세
		var ttsm		= amnt+vatx;					//합계


		var qntt2		= subt_qntt + qntt;

		var grid		= this;
		var pos			= this.view.getSelectionModel().getCurrentPosition().row;
		var models		= grid.getStore().getRange();

		if(qntt2 > unistt){
			Ext.Msg.alert("알림", "수량을 다시 입력해주십시오.");
			models[pos].set('istt_qntt',0);
			models[pos].set('subt_qntt',0);
			models[pos].set('istt_amnt',0);
			models[pos].set('istt_vatx',0);
			models[pos].set('ttsm_amnt',0);
		}else if(qntt < 0){
			Ext.Msg.alert("알림", "수량을 다시 입력해주십시오.");
			models[pos].set('istt_qntt',0);
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
	}
});
