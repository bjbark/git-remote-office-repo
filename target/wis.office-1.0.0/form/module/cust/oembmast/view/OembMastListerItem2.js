Ext.define('module.cust.oembmast.view.OembMastListerItem2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-oembmast-lister-item2',
	store		: 'module.cust.oembmast.store.OembMastItem2',
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

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
				pagingButton : true
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{ 	dataIndex: 'cstm_code'	, text : Language.get('cstm_code'	,'코드'	) , width :80  , align : 'center'
					},{ dataIndex: 'cstm_name'	, text : Language.get('cstm_name'	,'거래처명'	) , flex  :1,
							renderer: function(value, metaData, record, rowIndex, colIndex, view) {
								metaData.style = "white-space: normal;text-overflow: ellipsis;";
								return value;
							}
					}
				]
			}
		;
		return item;
	}
});