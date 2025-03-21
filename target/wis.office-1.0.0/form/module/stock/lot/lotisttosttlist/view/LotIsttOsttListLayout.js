Ext.define('module.stock.lot.lotisttosttlist.view.LotIsttOsttListLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-lotisttosttlist-layout',
	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-lotisttosttlist-search'}),
		me.items = [
			{xtype	: 'tab-panel',
			itemId	: 'mainpanel',
				items	: [
					{title: Language.get('unit_list','LOT수불대장'), xtype : 'module-lotisttosttlist-lister' }
				]
			},{ xtype : 'module-itemlist-editor', region : 'south',  hidden : false
			}
		];
		me.callParent(arguments);
		}
	});