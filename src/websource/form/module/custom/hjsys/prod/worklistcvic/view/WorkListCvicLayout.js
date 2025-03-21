Ext.define('module.custom.hjsys.prod.worklistcvic.view.WorkListCvicLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-worklistcvic-layout',
	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-worklistcvic-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '생산설비 가동현황',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype	: 'module-worklistcvic-lister',
								region	: 'center',
								flex	: 1,
								border	: 0,
							}
						]
					}
			]
			}
		];
		me.callParent(arguments);
		}
	});