Ext.define('module.custom.sjflv.prod.order.workbook.view.WorkBookLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-sjflv-workbook-layout',
	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-sjflv-workbook-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '생산일보',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype	: 'module-sjflv-workbook-lister', /*  상단  */
								flex	: 70,
								split	: true,
								region	: 'north',
								style	: Const.borderLine.center
							}
						]
					}
			]
			}
		];
		me.callParent(arguments);
		}
	});