Ext.define('module.qc.basic.iteminspstd.view.ItemInspStdListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-iteminspstd-lister-detail',
	store		: 'module.qc.basic.iteminspstd.store.ItemInspStdDetail'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
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
					{	dataIndex: 'line_stat'	, text : Language.get('line_stat'	,'순번'		)	, width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center'
					},{ dataIndex: 'item_idcd'	, text : Language.get('item_idcd'	,'품목코드'	)	, width : 100 , align : 'left',hidden: true,
					},{ dataIndex: 'item_code'	, text : Language.get('item_code'	,'품목코드'	)	, width : 100 , align : 'left'
					},{ dataIndex: 'item_name'	, text : Language.get('item_name'	,'품명'		)	, width : 300 , align : 'left'
					},{ dataIndex: 'item_spec'	, text : Language.get('item_spec'	,'규격'		)	, flex : 1 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});