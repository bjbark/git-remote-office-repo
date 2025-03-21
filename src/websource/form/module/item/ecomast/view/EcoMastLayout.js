Ext.define('module.item.ecomast.view.EcoMastLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-ecomast-layout',
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
			dockedItems : [ { xtype: 'module-ecomast-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: 'ECO List',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype	: 'module-ecomast-lister-master' ,
									region	: 'north',
									itemId	: 'authmaster',
									style	: Const.borderLine.bottom ,
									flex	: 1,
									split	: true ,
								},{ region	: 'center',
									style	: Const.borderLine.top,
									xtype	: 'module-ecomast-lister-detail' ,
										region : 'center',
										flex : 1,
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
				{	xtype:'module-ecomast-worker-editor', region:'north'
				},{	xtype:'module-ecomast-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

