Ext.define('module.custom.sjflv.prod.order.prodorder.view.ProdOrderLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-prodorder-lister2',
	store		: 'module.custom.sjflv.prod.order.prodorder.store.ProdOrder2',
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					'->',
					{	text : '<span class="write-button">작업지시서</span>'			, action : 'writeAction'		, cls: 'button1-style', width : 100		},
					'->', '-' ,
					{	text : Const.DELETE.text , iconCls: Const.DELETE.icon , action : Const.DELETE.action ,cls: 'button-style' },
					{	text : Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action, cls: 'button-style'	}
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'생산실행'	) , width : 60  , align : 'center', xtype : 'lookupcolumn' ,lookupValue:resource.lookup('prog_stat_dvcd')
					},{	dataIndex: ''		, text : Language.get(''	,'확정'		) , width : 60  , align : 'center', xtype : 'lookupcolumn' ,lookupValue:resource.lookup('yorn'), hidden :true,
					},{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'	,'지시번호'		) , width : 100 , align : 'center'
					},{	dataIndex: 'pdsd_numb'		, text : Language.get('pdsd_numb'	,'계획번호'		) , width : 100 , align : 'center'
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'	,'제품코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'	,'품명'		) , width : 200 , align : 'center'
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'	,'Batch No'	) , width : 100 , align : 'center'
					},{ dataIndex: 'plan_qntt'		, text : Language.get('plan_qntt'	,'계획수량'		) , width : 80  , align : 'right', xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.##9',
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'	,'지시수량'		) , width : 80  , align : 'right', xtype : 'numericcolumn', summaryType: 'sum' , format	: '#,##0.##9',
					},{ dataIndex: 'yorn'			, text : Language.get('yorn'		,'분할'		) , width : 70  , align : 'center', xtype : 'lookupcolumn' ,lookupValue:resource.lookup('yorn')
					},{ dataIndex: 'stok_used_qntt'	, text : Language.get('stok_used_qntt','재고사용'	) , width : 70  , align : 'right'
					},{ dataIndex: 'plan_strt_dttm'	, text : Language.get('plan_strt_dttm','시작일시'	) , width : 120 , align : 'center'
					},{ dataIndex: 'plan_endd_dttm'	, text : Language.get('plan_endd_dttm','종료일시'	) , width : 120 , align : 'center'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'	,'작업자'		) , width : 100 , align : 'center'
					},{	dataIndex: 'cvic_name'		, text : Language.get('cvic_name'	,'설비번호'		) , width : 100 , align : 'center'
					},{ dataIndex: 'pckg_unit'		, text : Language.get('pckg_unit'	,'포장단위'		) , width : 80  , align : 'center'
					},{ dataIndex: 'labl_qntt'		, text : Language.get('labl_qntt'	,'라벨수량'		) , width : 60  , align : 'center'
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'	,'특이사항'		) , flex  : 1   , align : 'center'
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
