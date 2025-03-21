Ext.define('module.workshop.print.basic.mmbrmast.view.MmbrMastLister3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-mmbrmast-lister3',
	store		: 'module.workshop.print.basic.mmbrmast.store.MmbrMast3',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,
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
					{	text : '<span class="write-button">강제탈퇴</span>'	, action : 'orderAction'	, cls: 'button1-style'	} ,
					{	text : '<span class="write-button">등급조정</span>'	, action : 'Action'	, cls: 'button1-style'	} ,
					'->', '-' ,
					{ text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex : ''		, text : Language.get(''		,'항번'	), width :  50 , align : 'center'
					},{	dataIndex : ''		, text : Language.get(''		,'거래일자'	), width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : ''		, text : Language.get(''		,'품목분류'	), width :  80 , align : 'center'
					},{	dataIndex : ''		, text : Language.get(''		,'품목명'	), flex  :  40 , align : 'left'
					},{	dataIndex : ''		, text : Language.get(''		,'페이지'	), width :  80, xtype : 'numericcolumn', align : 'right'
					},{	dataIndex : ''		, text : Language.get(''		,'권'	), width :  80, xtype : 'numericcolumn', align : 'right'
					},{	dataIndex : ''		, text : Language.get(''		,'단가'	), width :  120, xtype : 'numericcolumn', align : 'right'
					},{	dataIndex : ''		, text : Language.get(''		,'공급가'	), width :  150, xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : ''		, text : Language.get(''		,'부가세'	), width :  150, xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : ''		, text : Language.get(''		,'합계금액'	), width :  200, xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});