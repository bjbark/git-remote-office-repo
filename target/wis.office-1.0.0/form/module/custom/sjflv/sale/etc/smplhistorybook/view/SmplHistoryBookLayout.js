Ext.define('module.custom.sjflv.sale.etc.smplhistorybook.view.SmplHistoryBookLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-sjflv-sale-etc-smplhistorybook-layout',

	initComponent: function(config){
		var me = this;
		 me.dockedItems.push( {xtype: 'module-sjflv-sale-etc-smplhistorybook-search'});
		// 화면내용
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				split  : true ,
				items	: [
					{	xtype	: 'panel',
						layout	: 'border',
						region	: 'center',
						title	: '출고내역',
						flex	: 1,
						items	: [
							{	xtype	: 'module-sjflv-sale-etc-smplhistorybook-lister1',
								width	: 500,
								margin	: '0 1 0 0'	,
								style	: Const.borderLine.right ,
								split	:true,
								region	: 'west'
							},{	xtype	: 'module-sjflv-sale-etc-smplhistorybook-lister2',
								width	: 550,
								margin	: '0 1 0 0'	,
								style	: Const.borderLine.left    + Const.borderLine.right  ,
								split	:true,
								region : 'west',
							} ,{xtype	: 'module-sjflv-sale-etc-smplhistorybook-lister3'	,
								flex	: 1,
								margin	: '0 1 0 0'	,
								style	: Const.borderLine.left    + Const.borderLine.right  ,
								region	: 'center',
								split	:true,
							}
						]
					}
				]
			}
		];
		me.callParent(arguments);
	}
});
