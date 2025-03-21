Ext.define('module.custom.sjflv.stock.isos.osttwork.view.OsttWorkLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-osttwork-lister'			,
	store		: 'module.custom.sjflv.stock.isos.osttwork.store.OsttWork'	,
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
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' , hidden	 : true,} ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{   dataIndex: 'cstm_code'		, text : Language.get('cstm_code'			,'거래처코드')	, width : 90  , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'			,'거래처명')	, width : 200 , align : 'left'
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'			,'품목코드')	, width : 90  , align : 'left'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'			,'품명')		, width : 280 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'			,'품목규격')	, width : 250 , align : 'left'
					},{ dataIndex: 'ostt_work_cont' , text : Language.get('ostt_work_cont'		,'출고작업내용')	, width : 500 , align : 'left'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'			,'담당자')		, width : 110 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});
