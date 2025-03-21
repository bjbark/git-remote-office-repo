Ext.define('module.prod.order.prodorderv2.view.ProdOrderV2Lister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodorderv2-lister2',
	store		: 'module.prod.order.prodorderv2.store.ProdOrderV22',
	split		: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
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
					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width :  50 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					},{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 150 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 120 , align : 'left'
					},{ dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'단위'		) , width :  50 , align : 'left'
					},{ dataIndex: 'mold_code'		, text : Language.get('acpt_numb'		,'금형코드'		) , width :  90 , align : 'center', hidden:true
					},{ dataIndex: 'mtrl_name'		, text : Language.get('mtrl_name'		,'재질'		) , width :  80 , align : 'center', hidden:true
					},{ dataIndex: 'plan_qntt'		, text : Language.get('plan_qntt'		,'계획수량'		) , width :  70 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		,'지시완료'		) , width :  70 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'stok_qntt'		, text : Language.get('stok_qntt'		,'지시대기'		) , width :  70 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'		) , width :  70 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						},
						listeners:{
							change:function(){
								this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{ dataIndex: 'qntt'			, text : Language.get('qntt'			,'수량'		) , width : 70 , align : 'right' , xtype : 'numericcolumn', hidden : true
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'호기'		) , width : 70 , align : 'center', hidden:true
					},{ dataIndex: 'prod_line_name'	, text : Language.get('prod_line_name'	,'생산라인'		) , width : 100  , align : 'center'
					},{ dataIndex: 'insp_wkct_yorn'	, text : Language.get('insp_wkct_yorn'	,'검사여부'		) , width : 70 , align : 'center'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true
						},
						listeners:{
							change:function(){
								this.view.getSelectionModel().getCurrentPosition();
							}
						}
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'지시사항'		) , width : 80 , align : 'left'
					},{ dataIndex: 'pdod_date'		, text : Language.get('pdod_date'		,'지시일자'		) , width : 80 , align : 'center', hidden: true
					},{ dataIndex: 'new_invc_numb'	, text : Language.get('new_invc_numb'	,'수주번호'		) , width : 80 , align : 'center', hidden: true
					},{ dataIndex: 'trst_qntt'		, text : Language.get('trst_qntt'		,'의뢰수량'		) , width : 80 , align : 'center', hidden: true
					},{ dataIndex: 'new_trst_qntt'	, text : Language.get('new_trst_qntt'	,'새로운의뢰수량'	) , width : 80 , align : 'center', hidden: true
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (lister2, context) {
		var me = this;
		var a = this.getSelectionModel().getSelection()[0].data.stok_qntt;
		var b = this.getSelectionModel().getSelection()[0].data.indn_qntt;
		var c = this.getSelectionModel().getSelection()[0].data.trst_qntt;
		var grid = this;
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var models = grid.getStore().getRange();
		if(a<b){
			Ext.Msg.alert("알림", "지시수량을 다시 입력해주십시오.");
			models[pos].set('indn_qntt',0);
		}else if(a>b){
			models[pos].set('qntt',a-b);
			models[pos].set('new_trst_qntt',b+c);
		}else if(a=b){
			models[pos].set('qntt',0);
			models[pos].set('new_trst_qntt',b+c);
		}
		lister2.grid.view.getSelectionModel().onKeyDown();
	},

	listeners: {
		validateedit : function (lister2, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit : function(lister2, context) {
			var me = this;
			me.cellEditAfter(lister2, context);
		}
	}
});
