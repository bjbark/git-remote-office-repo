Ext.define('module.item.view.itemunit.ItemUnitLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-itemunit-lister',
	store		: 'module.item.itemunit.store.ItemUnit',
	border		: 0 ,
	columnLines: true ,
	selModel	: { selType: 'checkboxmodel'   ,  mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},


	pagingItem : function () {
		var me = this, item =
		{
			xtype : 'grid-paging',
			items :
			[
				'->',
				{xtype: 'tbseparator' , hidden : !_global.contract.isowner() },
				{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, hidden : !_global.contract.isowner() , cls: 'button-style'}, /* 본사인 경우만 동작을 하도록 한다 */
				{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, hidden : !_global.contract.isowner() , cls: 'button-style'},
				{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, hidden : !_global.contract.isowner() , cls: 'button-style'},
				{xtype: 'tbseparator' , hidden : Boolean(_global.stor_grp != '1') },
				{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, hidden : !_global.contract.isowner() , cls: 'button-style'}
			]
		};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this, item =
		{
			defaults: {style: 'text-align:center'},
			items   :
			[
				{ text : '코드'		, dataIndex: 'unt_cd'		, width :  60 } ,
				{ text : '단위명'		, dataIndex: 'unit_name'	, width : 140 } ,
				//{ text : '약칭'		, dataIndex: 'unit_sn		, width : 100 },
				{ text : '메모사항'		, dataIndex: 'user_memo'	, flex  :   1 } ,
				{ text : '숨김'		, dataIndex: 'row_sts'		, width :  45,	xtype: 'lookupcolumn' , lookupValue : resource.lookup('row_sts'), align : 'center' }
				//{ text : '숨김'		, dataIndex: 'row_sts'		, width :  45,	xtype: 'checkcolumn' , processEvent: function () { return false; } }
			]
		};
		return item;
	}
});


