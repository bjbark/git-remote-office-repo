Ext.define('module.prod.order.prodrealtime.view.ProdRealTimeLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodrealtime-lister1',
	store		: 'module.prod.order.prodrealtime.store.ProdRealTime2',
	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'cstm_code'	, text : Language.get('cstm_code'	,'거래처코드'	) , width : 120 , align : 'center'
					},{ dataIndex: 'cstm_name'	, text : Language.get('cstm_name'	,'거래처명'		) , width : 160 , align : 'left'
					},{ dataIndex: 'indn_qntt'	, text : Language.get('indn_qntt'	,'지시수량'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'day_qntt'	, text : Language.get('day_qntt'	,'금일생산수량'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'day_per'	, text : Language.get('day_per'		,'금일%'		) , width : 60  , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'week_qntt'	, text : Language.get('week_qntt'	,'금주생산수량'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'week_per'	, text : Language.get('week_per'	,'금주%'		) , width : 60  , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'month_qntt'	, text : Language.get('month_qntt'	,'당월생산수량'	) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'month_per'	, text : Language.get('month_per'	,'당월%'		) , width : 60  , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'		) , flex  : 100
					}
				]
			}
		;
		return item;
	}
});