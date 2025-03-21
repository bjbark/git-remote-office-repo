Ext.define('module.cost.costlist.view.CostListLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-costlist-layout',
	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-costlist-search'}),
		me.items = [
			{xtype	: 'tab-panel',
			itemId	: 'mainpanel',
				items	: [
					{title: Language.get('stnd_cost','품목별 원가 조회'), xtype : 'module-costlist-lister' }
				]
			}
		];
		me.callParent(arguments);
		}
	});