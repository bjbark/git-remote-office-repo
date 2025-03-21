Ext.define('module.custom.aone.prod.order.sorderworkentry.view.SorderWorkEntryLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-sorderworkentry-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-sorderworkentry-search'}),
		me.items = [
			{xtype	: 'tab-panel',
			itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('work_list','작업리스트'),
						xtype : 'module-sorderworkentry-lister-master'
					}
				]
			}
		];
		me.callParent(arguments);
		}
	});
