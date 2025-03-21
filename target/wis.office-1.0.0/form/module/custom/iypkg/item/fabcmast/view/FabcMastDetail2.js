Ext.define('module.custom.iypkg.item.fabcmast.view.FabcMastDetail2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-fabcmast-detail2',
	store		: 'module.custom.iypkg.item.fabcmast.store.FabcMastDetail2',

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
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style'},
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action , cls: 'button-style'},
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style'},
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'mixx_dvcd'	, text : Language.get('mixx_dvcd'	,'배합구성'		) , width : 150, align : 'center', xtype: 'lookupcolumn' , lookupValue: resource.lookup('mixx_dvcd'),
					},{ dataIndex: 'pper_name'	, text : Language.get('pper_name'	,'원지명'		) , width : 250
					},{ dataIndex: 'pnyg_volm'	, text : Language.get('pnyg_volm'	,'소요량'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'stnd_pric'	, text : Language.get('stnd_pric'	,'표준단가'		) , width : 100 , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					}
				]
			}
		;
		return item;
	}
});