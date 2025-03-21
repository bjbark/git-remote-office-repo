Ext.define('module.custom.hantop.item.itemtype.view.ItemTypeMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemtype-master',
	store		: 'module.custom.hantop.item.itemtype.store.ItemTypeMaster',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
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
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' } , '-' ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
		item = {
			defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_stat'	, text : Language.get('line_stat'		,'상태'		) , width :  50 , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'wdtp_code'	, text : Language.get('wdtp_code'		,'형태 코드'	) , width : 100 , align : 'center'
					},{ dataIndex: 'wdtp_name'	, text : Language.get('wdtp_name'		,'형태명'		) , width : 250 , align : 'left'
					},{ dataIndex: ''			, text : Language.get(''				,'고유번호'	) , width : 120 , align : 'center'
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'		,'비고'		) , flex  :   1 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});