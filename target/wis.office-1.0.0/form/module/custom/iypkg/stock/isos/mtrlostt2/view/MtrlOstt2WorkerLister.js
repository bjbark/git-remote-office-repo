Ext.define('module.custom.iypkg.stock.isos.mtrlostt2.view.MtrlOstt2WorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-mtrlostt2-lister-master',
	store		: 'module.custom.iypkg.stock.isos.mtrlostt2.store.MtrlOstt2Worker',

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
					'->','-' ,
					{	text : Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style' },
					{	text : Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style' }, '-'
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'		, text : Language.get(''		,'입고일자'		) , width : 120 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get(''		,'입고처'		) , width : 170 , align : 'left'
					},{ dataIndex: 'asmt_name'		, text : Language.get(''		,'부자재명'		) , width : 230 , align : 'left'
					},{ dataIndex: 'asmt_dvcd'		, text : Language.get(''		,'구분'		) , width :  80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('asmt_dvcd')
					},{ dataIndex: 'istt_qntt'		, text : Language.get(''		,'입고수량'		) , width : 100 , align : 'right' , xtype: 'numericcolumn'
					},{ dataIndex: 'ostt_qntt'		, text : Language.get(''		,'사용한 수량'	) , width : 100 , align : 'right' , xtype: 'numericcolumn'
					},{ dataIndex: 'unused'			, text : Language.get(''		,'미사용 수량'	) , width : 100 , align : 'right' , xtype: 'numericcolumn'
					},{ dataIndex: 'ostt_qntt2'		, text : Language.get(''		,'사용할 수량'	) , width : 100 , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum'
						, tdCls	: 'editingcolumn',
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
						}
					},{ dataIndex: 'unit_name'		, text : Language.get(''		,'단위'		) , width :  80 , align : 'center'
					},{ dataIndex: 'unit_idcd'		, hidden : true
					},{ dataIndex: 'remk_text'		, text : Language.get(''		,'비고'		) , width : 200 , align : 'left'
					}
				]
			}
		;
		return item;
	},


	cellEditAfter  : function (editor, context) {
		var me = this;
		var unused		= this.getSelectionModel().getSelection()[0].data.unused;		//미사용수량
		var ostt_qntt	= this.getSelectionModel().getSelection()[0].data.ostt_qntt2;	//출고할수량
		var istt_pric	= this.getSelectionModel().getSelection()[0].data.istt_pric;	//개당단가

		console.log(istt_pric);
		var amnt		= ostt_qntt*istt_pric;		//공급가
		var vatx		= amnt*0.1;	//부가세
		var ttsm		= amnt+vatx;		//합계

		var grid		= this;
		var pos			= this.view.getSelectionModel().getCurrentPosition().row;
		var models		= grid.getStore().getRange();

		if(ostt_qntt > unused){
			Ext.Msg.alert("알림", "출고수량을 다시 입력해주십시오.");
			models[pos].set('ostt_qntt2',0);
		}else if(ostt_qntt < 0){
			Ext.Msg.alert("알림", "출고수량을 다시 입력해주십시오.");
			models[pos].set('ostt_qntt2',0);
		}else{
			models[pos].set('amnt',amnt);
			models[pos].set('vatx_amnt',vatx);
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