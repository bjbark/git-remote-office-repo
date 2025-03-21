Ext.define('module.custom.aone.sale.order.sorderostt.view.SorderOsttLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-sorderostt-layout',

	/**
	 * 초기화 콤포넌트
	 */

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-sorderostt-search'}),
		me.items = [
			{xtype	: 'tab-panel',
			itemId	: 'mainpanel',
				items	: [
					{	title	: '출고등록',
						layout	: 'border',
						itemId	: 'tab',
						border	: 0,
						items	: [
							{	xtype	: 'module-sorderostt-lister-editor',
								height	: 44,
								region	: 'north',
							},{	xtype	: 'module-sorderostt-lister-master2',
								split	: false,
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},
				]
//			},{xtype	: 'module-sorderostt-worker-editor', region : 'south', itemId : 'osttEdit'
			}
		];
		me.callParent(arguments);
		}
	});
