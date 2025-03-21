Ext.define('module.custom.hantop.mtrl.po.purcordr.view.PurcOrdrLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-purcordr-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), me.createWordCard(), me.createWordCard2() ];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-purcordr-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '발주 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-purcordr-lister-master',
									flex	:  2 ,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{ /*  하단  */
									xtype	: 'module-purcordr-lister-detail',
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
				{	xtype:'module-purcordr-worker-editor', region:'north'
				},{	xtype:'module-purcordr-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	},

	createWordCard2 : function () {
		var	card = {
			layout	: 'border',
			border	: 0 ,
			items	: [
				{	xtype:'module-purcordr-worker-editor2', region:'north'
				},{	xtype:'module-purcordr-worker-lister2', region:'center' , style : Const.borderLine.top
				}
			]
		};
		return card;
	}
});

