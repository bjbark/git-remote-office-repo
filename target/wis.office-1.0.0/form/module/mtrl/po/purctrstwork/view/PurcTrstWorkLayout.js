Ext.define('module.mtrl.po.purctrstwork.view.PurcTrstWorkLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-purctrstwork-layout',
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
			dockedItems : [ { xtype: 'module-purctrstwork-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '발주요청 List',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-purctrstwork-lister-master',
									flex	: 2.2,
									region	: 'west',
									split	: true,
									style	: Const.borderLine.right+ Const.borderLine.bottom
								},{ /*  하단  */
									xtype	: 'module-purctrstwork-lister-detail',
									flex	: 10,
									region	: 'center',
									split	: true,
									style	: Const.borderLine.left+ Const.borderLine.bottom
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
				{	xtype:'module-purctrstwork-worker-editor', region:'north'
				},{	xtype:'module-purctrstwork-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

