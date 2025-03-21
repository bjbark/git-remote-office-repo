Ext.define('module.custom.kortc.prod.order.prodinput.view.ProdInputLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-prodinput-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = me.createListCard() ;
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-prodinput-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '생산 투입 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
							{	region	: 'north',
								layout	: 'border',
								border	: 0,
								flex : 60,
								items	: [
									{	xtype	: 'module-prodinput-lister', /*  상단  */
										itemId	: 'lister',
										flex	: 50,
										split	: true,
										region	: 'center',
										style	: Const.borderLine.left
									}
								]
							}
							]
					 	}
					]
				}
			]
		};
		return card;
	},
});

