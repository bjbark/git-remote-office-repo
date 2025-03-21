Ext.define('module.sale.saleplan.view.SalePlanLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-saleplan-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-saleplan-search'}),
	me.items = [
		{	xtype   : 'tab-panel',
			itemId  : 'mainpanel',
			region  : 'center',
			flex    : 1,
			items   : [
				{	title  : Language.get('user_list','영업목표 리스트'),
					layout : 'border',
					border : 0,
					items  : [
						{	xtype  : 'module-saleplan-lister' ,
							region : 'west',
							itemId : 'authmaster',
							style  : Const.borderLine.right ,
							width  : 530,
							split  : true ,
						},{	xtype  : 'module-saleplan-chart' ,
							region : 'center' ,
							style  : Const.borderLine.left  ,
							flex : 1
						}
					]
				}
			]
		},{ xtype : 'module-saleplan-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});