Ext.define('module.sale.sale.initstay.view.InitStayLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-initstay-layout',
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
			dockedItems : [ { xtype: 'module-initstay-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '적송품 관리',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{ /*  하단  */
									xtype	: 'module-initstay-lister-master',
									region	: 'center',
									split	: true,
									style	: Const.borderLine.left+ Const.borderLine.bottom
								}
							]
					 	},{	title : '적송품 등록',
							layout	: 'border',
							itemId	: 'tab',
							border	: 0,
							items	: [
								{	xtype	: 'module-initstay-worker-editor',
									height	: 45,
									region	: 'north',
								},{	xtype : 'module-initstay-worker-lister',
									split	: false,
									region	: 'center',
									style	: Const.borderLine.top
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
				{	xtype:'module-initstay-worker-editor', region:'north'
				},{	xtype:'module-initstay-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

