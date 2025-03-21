Ext.define('module.custom.kitec.mtrl.po.purcisttwork1.view.PurcIsttWork1Lister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcisttwork1-lister',
	store		: 'module.custom.kitec.mtrl.po.purcisttwork1.store.PurcIsttWork1',
	split		: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
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
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : 'bundlePopup', cls: 'button-style'	},
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{ dataIndex: 'invc_date'		, text : Language.get('istt_date'		,'입고일자'	) , width : 80  , align : 'center'
					},{ dataIndex: 'istt_wrhs_name'	, text : Language.get('istt_wrhs_name'	,'입고창고'	) , width : 130 , align : 'left'
					},{ dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드'	) , width : 100 , align : 'center', hidden : true
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	) , width : 130 , align : 'left'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'입고담당'	) , width : 100 , align : 'left'
					},{	dataIndex: 'istt_numb'		, text : Language.get('istt_numb'		,'입고번호'	) , width : 150 , align : 'center', hidden : true
					},{	dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'lot번호'	) , width : 150 , align : 'left'
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'	) , width : 150 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 180 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 100 , align : 'left'
					},{ dataIndex: 'modl_name'		, text : Language.get('modl_name'		,'모델명'	) , width : 100 , align : 'left'
					},{ dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'단위'		) , width : 60  , align : 'left'
					},{ dataIndex: 'make_cmpy_name'	, text : Language.get('make_cmpy_name'	,'제조회사명'	) , width : 100 , align : 'left',	hidden	: (_global.options.haccp_item_yorn == 0),
					},{ dataIndex: 'make_date'		, text : Language.get('make_date'		,'제조일자'	) , width : 80  , align : 'center',	hidden	: (_global.options.haccp_item_yorn == 0),
					},{ dataIndex: 'rtil_ddln'		, text : Language.get('rtil_ddln'		,'유통기한'	) , width : 80  , align : 'left',	hidden	: (_global.options.haccp_item_yorn == 0),
					},{ dataIndex: 'not_dlvy_qntt'	, text : Language.get('not_dlvy_qntt'	,'미납잔량'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum', hidden : true
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'입고수량'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
						, tdCls	: 'editingcolumn'
						, editor	: {
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
										grid.plugins[0].startEdit(row, grid.columns[22]);
									}
								}
							}
						},
					},{ dataIndex: 'istt_pric'		, text : Language.get('offr_pric'		,'단가'		) , width :  80 , xtype : 'numericcolumn', align : 'right',
					},{ dataIndex: 'istt_amnt'		, text : Language.get('istt_amnt'		,'금액'		) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'istt_vatx'		, text : Language.get('istt_vatx'		,'부가세'		) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'ttsm_amnt'		, text : Language.get('ttsm_amnt'		,'합계금액'	) , width :  80 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'invc_numb'		, text : Language.get('offr_numb'		,'발주번호'	) , width : 120 , align : 'center'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고'		) , width :  80 , align : 'left'
						, tdCls	: 'editingcolumn'
						, editor	: {
							xtype		:'textfield',
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
										grid.plugins[0].startEdit(row+1, grid.columns[16]);
									}
								}
							}
						},
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (editor, context) {
		var me = this;
		var grid = this;
		var a = grid.getStore().getAt(rowIndexNum).get('qntt'); // 미납
		var b = grid.getStore().getAt(rowIndexNum).get('istt_qntt');
		var c = grid.getStore().getAt(rowIndexNum).get('dlvy_qntt');
		var p = grid.getStore().getAt(rowIndexNum).get('istt_pric');
		var amnt = b*p;							//금액
		var v = Math.floor(amnt/100)*10;		//부가세
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var models = grid.getStore().getRange();

		if(a<b){
			Ext.Msg.alert("알림", "입고수량을 다시 입력해주십시오.");
			models[rowIndexNum].set('istt_qntt',0);
			models[rowIndexNum].set('istt_amnt',0);
			models[rowIndexNum].set('istt_vatx',0);
			models[rowIndexNum].set('ttsm_amnt',0);
		}else if(a>b){
			models[rowIndexNum].set('diff_qntt',a-b);
			models[rowIndexNum].set('new_dlvy_qntt',b+c);
			models[rowIndexNum].set('istt_amnt',amnt);
			models[rowIndexNum].set('istt_vatx',v);
			models[rowIndexNum].set('ttsm_amnt',amnt+v);
			models[rowIndexNum].set('istt_amnt',b*p );
			models[rowIndexNum].set('istt_vatx',(b*p)*0.1);
		}else if(a=b){
			models[rowIndexNum].set('diff_qntt',0);
			models[rowIndexNum].set('new_dlvy_qntt',b+c);
			models[rowIndexNum].set('istt_amnt',amnt);
			models[rowIndexNum].set('istt_vatx',v);
			models[rowIndexNum].set('ttsm_amnt',amnt+v);
			models[rowIndexNum].set('istt_amnt',b*p );
			models[rowIndexNum].set('istt_vatx',(b*p)*0.1);
		}
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	}
});
