Ext.define('module.membership.inout.lssnschdtoday.view.LssnSchdTodayLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-lssnschdtoday-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-lssnschdtoday-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{	title	: '레슨 Schdule',
					layout	: 'border',
					border	: 0,
					items	: [
						{	region	: 'center',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype	: 'module-lssnschdtoday-lister', /*  상단  */
									itemId	: 'master',
									flex	: 60,
									split	: false,
									region	: 'north',
									style	: Const.borderLine.bottom
								}
							]
						}
					]
				}
			]
		}
//
//				{title: Language.get('unit_list','회원 현황'), xtype : 'module-lssnschdtoday-lister' }
//			]
//		},{ xtype : 'module-lssnschdtoday-editor', region : 'south',  hidden : false
//		}
	];
	me.callParent(arguments);
	}
});