Ext.define('module.custom.dehansol.prod.workbook.view.WorkBookLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-dehansol-workbook-layout',
	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-dehansol-workbook-search'}),
		me.items = [
			{xtype	: 'tab-panel',
			itemId	: 'mainpanel',
				items	: [
					{title: Language.get('','생산일보'), xtype : 'module-dehansol-workbook-lister' }
				]
			}
		];
		me.callParent(arguments);
		}
	});