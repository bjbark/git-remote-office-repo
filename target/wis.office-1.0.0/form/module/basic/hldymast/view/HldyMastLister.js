Ext.define('module.basic.hldymast.view.HldyMastLister', {extend  : 'Axt.grid.Panel',
	alias		: 'widget.module-hldymast-lister',
	store		: 'module.basic.hldymast.store.HldyMast',
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
					{	text : '<span class="write-button">법정공휴일등록</span>'	, action : 'hldyAction'		, cls: 'button1-style'	} , '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items	: [
					{	text : '사업장명'	, dataIndex: 'bzpl_name'		, width : 120	, summaryType : 'count'
					},{	text : '휴무일'		, dataIndex: 'hldy_date'		, width : 100
					},{	text : '요일'		, dataIndex: 'dywk_dvcd'		, width : 100	,align:'center', xtype : 'lookupcolumn', lookupValue  : resource.lookup('dywk_dvcd')
					},{	text : '휴무명'		, dataIndex: 'hldy_name'		, width : 120	,align:'left'
					},{	text : '법정공휴일'	, dataIndex: 'stnd_hldy_yorn'	, width :  85	,align:'center', xtype : 'lookupcolumn', lookupValue  : resource.lookup('yorn')
					},{	text : '메모'		, dataIndex: 'user_memo'		, flex  :   1
//					},{ text : '휴무명'		, dataIndex: 'hldy_name'		, width :  85  ,align:'center', xtype : 'lookupcolumn', lookupValue  : [['0','근무'],['1','휴일' , 'red' ]]
					}
				]
			};
		return item;
	}
});






