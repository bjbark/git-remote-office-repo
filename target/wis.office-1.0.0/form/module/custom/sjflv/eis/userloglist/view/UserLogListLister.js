Ext.define('module.custom.sjflv.eis.userloglist.view.UserLogListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-userloglist-lister'			,
	store		: 'module.custom.sjflv.eis.userloglist.store.UserLogList'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					{	xtype: 'rownumberer'		, width:  40, text: '순번', align : 'center'
					},{	dataIndex: 'log_time'		, text : Language.get(''	,'사용일시'	)	, width : 140	, align : 'center'
					},{	dataIndex: 'user_name'		, text : Language.get(''	,'사용자명'	)	, width : 100	, align : 'left'
					},{ dataIndex: 'menu_name'		, text : Language.get(''	,'메뉴명'		)	, width :  150	, align : 'left'
					},{	dataIndex: 'log_dvcd'		, text : Language.get(''	, '진행상태'	)	, width:  80	, align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup('log_dvcd')
					},{ dataIndex: 'log_name'		, text : Language.get(''	,'작업구분 상세')	, width : 300	, align : 'left'
					}
				]
			}
		;
		return item;
	}
});