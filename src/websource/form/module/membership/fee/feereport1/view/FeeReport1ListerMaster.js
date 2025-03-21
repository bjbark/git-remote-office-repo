Ext.define('module.membership.fee.feereport1.view.FeeReport1ListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-feereport1-lister-master'			,
	store		: 'module.membership.fee.feereport1.store.FeeReport1Master'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
//	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}, { ptype:'filterbar'}],
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		console.log(_global.hq_id);
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
//					{	xtype   : 'button',
//						iconCls : 'filterIcon',
//						toggleGroup:'onoff',
//						listeners:{
//							toggle:function(toggle){
//								var filter = me.filterBar;
//									filter.setVisible(toggle.pressed);
//							}
//						}
//					},
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'acce_date'		, width:  90, align : 'center'	, text: Language.get('resv_time'	, '일자'		)
					},{ dataIndex: 'totl_amnt'		, width:  90, align : 'right'	, text: Language.get('totl_amnt'	, '일계'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'cash_amnt'		, width:  90, align : 'right'	, text: Language.get('cash_amnt'	, '현금'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'card_amnt'		, width:  90, align : 'right'	, text: Language.get('card_amnt'	, '카드'		), xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'bank_amnt'		, width:  90, align : 'right'	, text: Language.get('bank_amnt'	, '계좌이체'	), xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'etcc_amnt'		, width:  90, align : 'right'	, text: Language.get('etcc_amnt'	, '기타'		), xtype : 'numericcolumn', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});
