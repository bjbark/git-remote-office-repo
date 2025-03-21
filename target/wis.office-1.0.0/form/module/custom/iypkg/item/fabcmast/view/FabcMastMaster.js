Ext.define('module.custom.iypkg.item.fabcmast.view.FabcMastMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-fabcmast-master',
	store		: 'module.custom.iypkg.item.fabcmast.store.FabcMast',
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
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
					{	dataIndex: 'fabc_code'	, text : Language.get('fabc_code'	,'원단코드'		) , width : 100 , align : 'center'
					},{ dataIndex: 'fabc_name'	, text : Language.get('fabc_name'	,'원단명'		) , flex  :   1 , align : 'left'
					},{ dataIndex: 'ppln_dvcd'	, text : Language.get('ppln_dvcd'	,'지골'		) , width : 80  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{ dataIndex: 'ppkd_dvcd'	, text : Language.get('ppkd_dvcd'	,'지종'		) , width : 70  , xtype : 'lookupcolumn', lookupValue : resource.lookup('ppkd_dvcd')
					},{ dataIndex: 'ppsg_dvcd'	, text : Language.get('ppsg_dvcd'	,'단종'		) , width : 70  , xtype : 'lookupcolumn', lookupValue : resource.lookup('ppsg_dvcd')
					},{ dataIndex: 'stnd_pric'	, text : Language.get('stnd_pric'	,'표준단가/m2'	) , width : 90  , align : 'right'
					}
				]
			}
		;
		return item;
	}
});