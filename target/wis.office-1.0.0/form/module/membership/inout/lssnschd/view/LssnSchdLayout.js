Ext.define('module.membership.inout.lssnschd.view.LssnSchdLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-lssnschd-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-lssnschd-search'}),
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
								{	xtype	: 'module-lssnschd-lister', /*  상단  */
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
//				{title: Language.get('unit_list','회원 현황'), xtype : 'module-lssnschd-lister' }
//			]
//		},{ xtype : 'module-lssnschd-editor', region : 'south',  hidden : false
//		}
	];
	me.callParent(arguments);
	}
});