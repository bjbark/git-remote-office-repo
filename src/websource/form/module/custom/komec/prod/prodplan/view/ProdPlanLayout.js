Ext.define('module.custom.komec.prod.prodplan.view.ProdPlanLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-prodplan-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard() ];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-prodplan-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '주문 리스트',
							layout	: 'border' ,
							border	: 0,
							items	: [
							     	   /*상단*/
								{	xtype	: 'module-prodplan-lister-master',
									itemId	: 'master1',
									width	: 735,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.right
								},{	xtype	: 'module-prodplan-lister-master2', /*  상단  */
									itemId	: 'master2',
									flex	: 50,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.left
								}
							]
					 	},{	title	: '생산지시 리스트	',
					 		layout	: 'border',
					 		border	: 0,
					 		items	: [
					 		     	/*상단*/
					 		    {	xtype	: 'module-prodplan-lister-master3',
					 		    	itemId	: 'master3',
									flex	: 50,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.top
									/*하단*/
					 			},{	xtype	: 'module-prodplan-lister-master4',
					 		    	itemId	: 'master4',
									flex	: 50,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
					 			}
					 		]
					 	}
					]
				}
			]
		};
		return card;
	}
});

