Ext.define('module.custom.iypkg.prod.dailyworklist.view.DailyWorkListDetail1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-dailyworklist-detail1'			,
	store		: 'module.custom.iypkg.prod.dailyworklist.store.DailyWorkListDetail1',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
					'-', '->', '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } //엑셀버튼.
				]
			}
		;
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'poor_bacd'		, text : Language.get('poor_bacd'		,'불량코드'	) , width : 80 , align : 'center'
					},{ dataIndex: 'poor_name'		, text : Language.get('poor_name'		,'불량명칭'	) , flex  : 100 , align :'left'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량'	) , width : 100 , xtype :'numericcolumn', align:'right', summaryType: 'sum',
					},{ dataIndex: 'crte_dttm'		, text : Language.get('crte_dttm'		,'발생시간'	) , width : 130 , align : 'center'
					}
				]
			}
		;
		return item;
	}
});