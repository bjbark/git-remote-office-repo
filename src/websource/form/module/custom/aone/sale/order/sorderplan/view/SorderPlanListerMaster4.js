Ext.define('module.custom.aone.sale.order.sorderplan.view.SorderPlanListerMaster4', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-aone-sorderplan-lister-master4',
	store		: 'module.custom.aone.sale.order.sorderplan.store.SorderPlanMaster4'	,

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,
	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-aone-sorderplan-editor'}];
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style', itemId : 'detail'}
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'user_name'		, width: 126 , align : 'center'	, text: Language.get('sale_drtr_name'	, '엔지니어'		),
						pair		: 'prod_drtr_idcd',
					},{	dataIndex:	''				, text: Language.get(''				, '구분'				), width: 80 , align : 'center', hidden : true,
						renderer:function(v){
							if(v=='실적'){
								return '<span style="color:green">'+v+'</span>'
							}else if (v=='계획'){
								return '<span style="color:blue">'+v+'</span>'
							}
							return;
						}
					},{	dataIndex: '1_day'		, text : Language.get(''	,'1일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '2_day'		, text : Language.get(''	,'2일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '3_day'		, text : Language.get(''	,'3일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '4_day'		, text : Language.get(''	,'4일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '5_day'		, text : Language.get(''	,'5일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '6_day'		, text : Language.get(''	,'6일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '7_day'		, text : Language.get(''	,'7일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '8_day'		, text : Language.get(''	,'8일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '9_day'		, text : Language.get(''	,'9일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '10_day'		, text : Language.get(''	,'10일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '11_day'		, text : Language.get(''	,'11일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '12_day'		, text : Language.get(''	,'12일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '13_day'		, text : Language.get(''	,'13일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '14_day'		, text : Language.get(''	,'14일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '15_day'		, text : Language.get(''	,'15일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '16_day'		, text : Language.get(''	,'16일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '17_day'		, text : Language.get(''	,'17일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '18_day'		, text : Language.get(''	,'18일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '19_day'		, text : Language.get(''	,'19일'		) , width : 75 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '20_day'		, text : Language.get(''	,'20일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '21_day'		, text : Language.get(''	,'21일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '22_day'		, text : Language.get(''	,'22일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '23_day'		, text : Language.get(''	,'23일'		) , width : 75 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '24_day'		, text : Language.get(''	,'24일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '25_day'		, text : Language.get(''	,'25일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '26_day'		, text : Language.get(''	,'26일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '27_day'		, text : Language.get(''	,'27일'		) , width : 75 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '28_day'		, text : Language.get(''	,'28일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '29_day'		, text : Language.get(''	,'29일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '30_day'		, text : Language.get(''	,'30일'		) , width : 65 , align : 'right', xtype : 'numericcolumn'
					},{	dataIndex: '31_day'		, text : Language.get(''	,'31일'		) , width : 75 , align : 'right', xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	}
});