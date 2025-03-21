Ext.define('module.workshop.print.basic.menumast.view.MenuMastLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-workshop-menu-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), me.createWordCard() ];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ {xtype: 'module-workshop-menu-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '메뉴 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  좌측  */
								{	xtype	: 'module-workshop-menu-lister-master',
									width	:  550 ,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.right
								},{ /*  중앙  */
									layout	: 'border',
									border	: 0 ,
									region	: 'center',
									items	: [
										{	xtype	: 'module-workshop-menu-lister-detail',
											flex	: 2 ,
											region	: 'north',
											split	: true,
											style	: Const.borderLine.bottom
										},{	xtype	: 'module-workshop-menu-lister-image',
											flex	: 1 ,
											region	: 'center',
											style	: Const.borderLine.top
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

	/**
	 *
	 */
	createWordCard : function () {
		var	card = {
			layout	: 'border',
			border	: 0 ,
			items	: [
				{	xtype:'module-workshop-menu-worker-editor', region:'north'
				},{	xtype:'module-workshop-menu-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

