Ext.define('module.custom.sjflv.haccp.docmcheck.view.DocmCheckPanel', { extend: 'Axt.form.Panel',
	alias: 'widget.module-sjflv-docmcheck-panel',
	
	initComponent: function(config){
		var me = this;
		me.items = [];
		me.dockedItems = [ me.createToolBar() ],
		me.callParent(arguments);
	},
	
	createToolBar: function() {
		var me = this,
		toolBar = {
			xtype	: 'toolbar',
			dock	: 'bottom',
			items	: [
				'->',
				{ text: Const.UPDATE.text	, iconCls: Const.UPDATE.icon	, action: Const.UPDATE.action	, cls: 'button-style' },
				'-',
				{ text: Const.CANCEL.text	, iconCls: Const.CANCEL.icon	, action: Const.CANCEL.action	, cls: 'button-style'}
			]
		};
		return toolBar;
	},
});