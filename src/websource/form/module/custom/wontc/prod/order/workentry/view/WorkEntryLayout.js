Ext.define('module.custom.wontc.prod.order.workentry.view.WorkEntryLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-wontc-workentry-layout',

	initComponent: function(config){
		var me = this;
		me.dockedItems.push({xtype: 'module-wontc-workentry-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title		: '<span class= "btnTemp"style="font-size:14px; color:#15498b;">작업공정카드</span>',
						layout		: 'border',
						border		: 0,
						items		: [
							{	xtype	: 'module-wontc-workentry-editor',
								height	: 80,
								region	: 'north',
							},{	xtype	: 'module-wontc-workentry-lister',
								flex	: 2,
								region	: 'center',
							},{	xtype	: 'module-wontc-workentry-lister2',
								flex	: 2,
								region	: 'south',
								hidden	: false,
							},{	xtype	: 'module-wontc-workentry-editor2',
								flex	: 1.1,
								region	: 'south',
								hidden	: true
							}
						]
					},{	title		: '<span class= "btnTemp"style="font-size:14px; color:#15498b;">불량이력참고</span>',
						layout		: 'border',
						border		: 0,
						items		: [
							{	xtype	: 'module-wontc-workentry-poor2',
								flex	: 1,
								region	: 'center',
								style	: Const.borderLine.left + Const.borderLine.bottom
							}
						]
					},{	title		: '<span class= "btnTemp"style="font-size:14px; color:#15498b;">작업지시찾기</span>',
						layout		: 'border',
						hidden		: true,
						border		: 0,
						items		: [
							{	xtype	: 'module-wontc-workentry-detail',
								flex	: 1,
								region	: 'center',
								style	: Const.borderLine.left + Const.borderLine.bottom
							}
						]
					}
				]
			}
		];
	me.callParent(arguments);
	}

});