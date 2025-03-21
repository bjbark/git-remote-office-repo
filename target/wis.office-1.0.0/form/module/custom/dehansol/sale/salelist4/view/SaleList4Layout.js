Ext.define('module.custom.dehansol.sale.salelist4.view.SaleList4Layout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-salelist4-layout',
	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-salelist4-search'}),
		me.items = [
			{xtype	: 'tab-panel',
			itemId	: 'mainpanel',
				items	: [
					{title: Language.get('','매출일보'), xtype : 'module-salelist4-lister' }
				]
			}
		];
		me.callParent(arguments);
		}
	});