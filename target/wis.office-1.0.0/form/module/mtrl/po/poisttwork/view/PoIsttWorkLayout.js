Ext.define('module.mtrl.po.poisttwork.view.PoIsttWorkLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-poisttwork-layout',
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
			dockedItems : [ {xtype: 'module-poisttwork-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '입고 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-poisttwork-lister-master',
									flex	:  2 ,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{ /*  하단  */
									xtype	: 'module-poisttwork-lister-detail',
									flex	: 1 ,
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
				{	xtype:'module-poisttwork-worker-editor', region:'north'
				},{	xtype:'module-poisttwork-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

