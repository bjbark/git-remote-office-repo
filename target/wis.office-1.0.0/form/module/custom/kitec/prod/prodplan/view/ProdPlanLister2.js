Ext.define('module.custom.kitec.prod.prodplan.view.ProdPlanLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodplan-lister2',
	store		: 'module.custom.kitec.prod.prodplan.store.ProdPlan2',
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE'},
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ptype  :'cellediting-directinput', clicksToEdit: 1 }, { ptype:'filterbar'}],

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
					{	xtype	: 'button',
						iconCls	: 'filterIcon',
						toggleGroup:'onoff',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'->', '-' ,
					{	text: Const.MODIFY.text , iconCls: Const.MODIFY.icon , action : Const.MODIFY.action ,cls: 'button-style' },
					{	text: Const.DELETE.text , iconCls: Const.DELETE.icon , action : Const.DELETE.action ,cls: 'button-style' },
					{	text: Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action ,cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'cvic_name'		, text : Language.get(''		,'호기'		) , width : 100 , align : 'center'
					},{	dataIndex: 'prod_trst_dvcd'	, text : Language.get(''		,'생산구분'		) , width :  80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('prod_trst_dvcd')
					},{	dataIndex: 'plan_sttm'		, text : Language.get(''		,'시작일자'		) , width : 100 , align : 'center'
					},{	dataIndex: 'plan_edtm'		, text : Language.get(''		,'종료일자'		) , width : 100 , align : 'center'
					},{	dataIndex: 'lott_numb'		, text : Language.get(''		,'Lot 번호'	) , width : 120 , align : 'left', hidden : true
					},{	dataIndex: 'item_name'		, text : Language.get(''		,'품명'		) , width : 230 , align : 'left'
					},{	dataIndex: 'plan_qntt'		, text : Language.get(''		,'계획수량(L)'	) , width :  80 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: 'plan_qntt_1fst'	, text : Language.get(''		,'계획수량(R)'	) , width :  80 , align : 'right', xtype : 'numericcolumn'
					}
				]
			}
		return item;
	}

});
