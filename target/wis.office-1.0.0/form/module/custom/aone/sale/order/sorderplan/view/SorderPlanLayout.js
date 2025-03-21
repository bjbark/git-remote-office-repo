Ext.define('module.custom.aone.sale.order.sorderplan.view.SorderPlanLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-aone-sorderplan-layout',

	/**
	 * 초기화 콤포넌트
	 */

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-aone-sorderplan-search'}),
		me.items = [
			{xtype	: 'tab-panel',
			itemId	: 'mainpanel',
				items	: [
					{	title	: Language.get('ordr_list','입고 리스트'),
						xtype	: 'module-aone-sorderplan-lister-master',
					},{	title	: '엔지니어 일정 조회',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-aone-sorderplan-lister-master3',
								flex	: 0.8,
								region	: 'west',
								split	: true,
								style	: Const.borderLine.right+ Const.borderLine.bottom
							},{ /*  하단  */
								xtype	: 'module-aone-sorderplan-lister-master3_1',
								flex	: 10,
								region	: 'center',
								split	: true,
								style	: Const.borderLine.left+ Const.borderLine.bottom
							}
						]
					},{	title	: '월간 일정표',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	region : 'center',
								layout : 'border',
								border : 0,
								items  : [
									{	xtype  : 'module-aone-sorderplan-lister-master4',
										flex   : 1,
										region : 'center',
										style  : Const.borderLine.left + Const.borderLine.top
									}
								]
							}
						]
					}
				]
			},{ xtype 	: 'module-aone-sorderplan-worker-editor', region : 'south',  hidden : true , itemId : 'planEdit'
			}
		];
	me.callParent(arguments);
	}
});
