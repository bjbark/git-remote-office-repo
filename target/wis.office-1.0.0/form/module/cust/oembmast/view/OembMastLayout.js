Ext.define('module.cust.oembmast.view.OembMastLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-oembmast-layout',

	initComponent: function(config){
		var me = this;
		me.dockedItems.push({xtype: 'module-oembmast-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: Language.get('','OEM코드'),
						layout	: 'border',
						items	: [
							{	xtype	: 'module-oembmast-lister',
								flex	: 3,
								split	: true,
								region	: 'west',
								style	: Const.borderLine.left + Const.borderLine.bottom
							},{	xtype	: 'panel',
								region	: 'west',
								width	: 50,
							},{	xtype	: 'module-oembmast-lister-item1',
								flex	: 2,
								split	: true,
								region	: 'west',
								style	: Const.borderLine.left + Const.borderLine.bottom
							},{	xtype	: 'panel',
								region	: 'west',
								width	: 100,
								border	: 0,
								layout	: {
									type	: 'vbox',
									align	: 'center',
									pack	: 'center'
								},
								items	: [
									{	xtype	: 'button',
										action	: 'enrollment',
										text	: '<span class="btnTemp"><</span>',
										cls		: 'button-style',
										margin	: '20 0 0 0',
										width	: 100,
										height	: 50,
										width	: 80,
									},{	xtype	: 'button',
										action	: 'enrollmentAll',
										text	: '<span class="btnTemp"><<</span>',
										cls		: 'button-style',
										margin	: '20 0 0 0',
										width	: 100,
										height	: 50,
										width	: 80,
									},{	xtype	: 'button',
										action	: 'remove',
										text	: '<span class="btnTemp">></span>',
										cls		: 'button-style',
										margin	: '50 0 0 0',
										width	: 100,
										height	: 50,
										width	: 80
									},{	xtype	: 'button',
										action	: 'removeAll',
										text	: '<span class="btnTemp">>></span>',
										cls		: 'button-style',
										margin	: '20 0 0 0',
										width	: 100,
										height	: 50,
										width	: 80
									}
								]
							},{	xtype	: 'module-oembmast-lister-item2',
								flex	: 2,
								region	: 'center',
								style	: Const.borderLine.left + Const.borderLine.top
							}
						]
					}
				]
			},{	title	: Language.get('','OEM코드정보'),
				xtype  : 'module-oembmast-editor',
				region : 'south',
				hidden : false,
			}
		];
		me.callParent(arguments);
	}
});