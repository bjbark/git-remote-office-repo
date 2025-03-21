Ext.define('module.custom.iypkg.mtrl.po.purcordr3.view.PurcOrdr3WorkerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcordr3-worker-master',
	store		: 'module.custom.iypkg.mtrl.po.purcordr3.store.PurcOrdr3WorkerMaster',

	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'cellmodel'},
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
					'-', '->',
					{	text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action, cls: 'button-style'	},
					{	text : Const.CANCEL.text, iconCls: Const.CANCEL.icon, action : Const.CANCEL.action, cls: 'button-style'	}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'chk'			, text: Language.get('chk'			, '선택'		), width :  35 , align : 'center',xtype:'checkcolumn',
						listeners:{
							checkchange:function(element, rowindex, bool, rec) {
								var record = me.store.getAt(rowindex),
									rowIndexNum = rowindex,
									lister = Ext.ComponentQuery.query('module-purcordr3-worker-master')[0]
								;
								if(bool){
									lister.getSelectionModel().select(rowIndexNum);
									record.set('offr_qntt', record.get('unoffr'));
									me.cellEditAfter(element, record);
								}else{
									lister.getSelectionModel().select(rowIndexNum);
									record.set('offr_qntt','0');
									me.cellEditAfter(element, record);
								}
							}
						}
					},{	dataIndex: 'invc_date'	, text : Language.get(''		,'수주일자'		) , width : 100 , align : 'center'
					},{	dataIndex: 'cstm_name'	, text : Language.get(''		,'수주처'		) , width : 150 , align : 'center'
					},{ dataIndex: 'prod_name'	, text : Language.get(''		,'품명'		) , width : 230 , align : 'left'
					},{ dataIndex: 'item_leng'	, text : Language.get(''		,'장'		) , width : 60  , align : 'right', xtype: 'numericcolumn'
					},{ dataIndex: 'item_widh'	, text : Language.get(''		,'폭'		) , width : 60  , align : 'right', xtype: 'numericcolumn'
					},{ dataIndex: 'item_hght'	, text : Language.get(''		,'고'		) , width : 60  , align : 'right', xtype: 'numericcolumn'
					},{ dataIndex: 'acpt_qntt'	, text : Language.get(''		,'수주량'		) , width : 80  , align : 'right', xtype: 'numericcolumn'
					},{ dataIndex: 'deli_date'	, text : Language.get(''		,'납기일자'		) , width : 100 , align : 'center'
					},{ dataIndex: 'prod_qntt'	, text : Language.get(''		,'수주생산'		) , width : 80  , align : 'right', xtype: 'numericcolumn', hidden : true
					},{ dataIndex: 'unoffr'		, text : Language.get(''		,'미발주잔량'	) , width : 80  , align : 'right', xtype: 'numericcolumn'
					},{ dataIndex: 'offr_qntt'	, text : Language.get(''		,'발주량'		) , width : 80  , align : 'right', xtype: 'numericcolumn', summaryType: 'sum'
						, tdCls : 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[12]);
									}
								}
							}
						}
					},{ dataIndex: 'offr_pric'	, text : Language.get(''		,'단가'		) , width : 80  , align : 'right'
						, tdCls : 'editingcolumn',
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

										grid.plugins[0].startEdit(row, grid.columns[13]);
									}
								}
							}
						}
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'		,'비고'		) , flex : 1,minWidth : 230 , align : 'left'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
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
										grid.plugins[0].startEdit(row+1, grid.columns[11]);
									}
								}
							}
						}
					},{ dataIndex: 'acpt_numb'			, hidden : true
					},{ dataIndex: 'offr_amnt'			, hidden : true
					},{ dataIndex: 'offr_vatx'			, hidden : true
					},{ dataIndex: 'ttsm_amnt'			, hidden : true
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (editor, context) {
		var me = this;
		var unoffr		= this.getSelectionModel().getSelection()[0].data.unoffr;			//미발주잔량
		var offr_qntt	= this.getSelectionModel().getSelection()[0].data.offr_qntt;		//발주량
		var offr_pric	= this.getSelectionModel().getSelection()[0].data.offr_pric;		//발주단가
		var grid		= this;
		var pos			= this.view.getSelectionModel().getCurrentPosition().row;
		var models		= grid.getStore().getRange();

		var amnt		= offr_qntt*offr_pric;	//발주금액
		var vatx		= amnt*0.1;				//부가세
		var ttsm		= amnt+vatx;			//합계

		if(offr_qntt > unoffr){
			Ext.Msg.alert("알림", "발주수량을 다시 입력해주십시오.");
			models[pos].set('offr_qntt',0);
		}else if(offr_qntt < 0){
			Ext.Msg.alert("알림", "발주수량을 다시 입력해주십시오.");
			models[pos].set('offr_qntt',0);
		}else{
			models[pos].set('offr_amnt',amnt);
			models[pos].set('offr_vatx',vatx);
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