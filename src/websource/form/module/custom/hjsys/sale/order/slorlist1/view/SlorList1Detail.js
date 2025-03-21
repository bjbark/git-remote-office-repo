Ext.define('module.custom.hjsys.sale.order.slorlist1.view.SlorList1Detail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-hjsys-slorlist1-lister-detail',
	store		: 'module.custom.hjsys.sale.order.slorlist1.store.SlorList1Detail'	,

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,
	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-hjsys-slorlist1-editor'}];
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
					{	dataIndex:	'item_name'			, text: Language.get('item_name'		, '품명'				), width: 200 , align : 'left',
					},{	dataIndex:	'indn_qntt'			, text: Language.get('indn_qntt'		, '지시수량'			), width: 80  , xtype: 'numericcolumn'
					},{	dataIndex:	'wkct'				, text: Language.get('wkct'				, '구분'				), width: 80 , align : 'center', hidden : true,
						renderer:function(v){
							if(v=='실적'){
								return '<span style="color:green">'+v+'</span>'
							}else if (v=='계획'){
								return '<span style="color:blue">'+v+'</span>'
							}
							return v
						}
					},{ dataIndex: 'wkct_1'				, text : Language.get('wkct_1','설계'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_2'				, text : Language.get('wkct_2','전개'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_3'				, text : Language.get('wkct_3','CAM'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_4'				, text : Language.get('wkct_4','NCT'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_5'				, text : Language.get('wkct_5','LASER'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_6'				, text : Language.get('wkct_6','TAP'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_7'				, text : Language.get('wkct_7','면취'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_8'				, text : Language.get('wkct_8','홀면취'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_9'				, text : Language.get('wkct_9','장공면취'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_10'			, text : Language.get('wkct_10','버링'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_11'			, text : Language.get('wkct_11','압입1'		) , width : 75  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_12'			, text : Language.get('wkct_12','압입2'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_13'			, text : Language.get('wkct_13','확공'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_14'			, text : Language.get('wkct_14','C/S'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_15'			, text : Language.get('wkct_15','디버링'			) , width : 75  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_16'			, text : Language.get('wkct_16','절곡1'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_17'			, text : Language.get('wkct_17','절곡2'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_18'			, text : Language.get('wkct_18','사상'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_19'			, text : Language.get('wkct_19','용접1'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_20'			, text : Language.get('wkct_20','용접2'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_21'			, text : Language.get('wkct_21','빠우'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_22'			, text : Language.get('wkct_22','외주가공'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_23'			, text : Language.get('wkct_23','조립'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_24'			, text : Language.get('wkct_24','세척'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_25'			, text : Language.get('wkct_25','검사'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_26'			, text : Language.get('wkct_26','후 TAP'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					},{ dataIndex: 'wkct_27'			, text : Language.get('wkct_27','전해연마'			) , width : 70  , align : 'right', sortable:true,
						renderer : function(value, meta) {
							if(parseInt(value) == 1) {
								meta.style = "background-color:yellow;";
							}else if(parseInt(value) == 2) {
								meta.style = "background-color:green;";
							}
						}
					}
				]
			}
		;
		return item;
	}
});