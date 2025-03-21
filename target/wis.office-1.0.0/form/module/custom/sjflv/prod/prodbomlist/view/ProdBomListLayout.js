Ext.define('module.custom.sjflv.prod.prodbomlist.view.ProdBomListLayout', { extend: 'Axt.form.Layout',
	alias: 'widget.module-sjflv-prodbomlist-layout',

	layout		:'card',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout		: 'border',
			border		: 0 ,
			dockedItems : [ {xtype: 'module-sjflv-prodbomlist-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items : [
						{	title	: '생산배합비',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-sjflv-prodbomlist-lister1',
											width	: 800,
											margin	: '0 1 0 0'	,
											style	: Const.borderLine.right ,
											split	:true,
											region	: 'west'
										},{	xtype	: 'module-sjflv-prodbomlist-lister2',
											width	: 130,
											margin	: '0 1 0 0'	,
											style	: Const.borderLine.left    + Const.borderLine.right  ,
											split	:true,
											region : 'west',
										} ,{xtype	: 'module-sjflv-prodbomlist-lister3'	,
											flex	: 1,
											margin	: '0 1 0 0'	,
											style	: Const.borderLine.left    + Const.borderLine.right  ,
											region	: 'center',
											split	:true,
										}
									]
								}
							]
						},{	title	: '생산원료조회',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	xtype	: 'module-sjflv-prodbomlist-lister4',
									width	: 838,
									margin	: '0 1 0 0'	,
									style	: Const.borderLine.right ,
									split	:true,
									region	: 'west'
								},{ xtype	: 'module-sjflv-prodbomlist-lister5',
									flex	: 1,
									margin	: '0 1 0 0'	,
									style	: Const.borderLine.left    + Const.borderLine.right  ,
									region	: 'center',
									split	:true,
								}
							]
						},{	title	: '생산원료조회(물류)',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	xtype	: 'module-sjflv-prodbomlist-lister6',
									width	: 838,
									margin	: '0 1 0 0'	,
									style	: Const.borderLine.right ,
									split	:true,
									region	: 'west'
								},{ xtype	: 'module-sjflv-prodbomlist-lister7',
									flex	: 1,
									margin	: '0 1 0 0'	,
									style	: Const.borderLine.left    + Const.borderLine.right  ,
									region	: 'center',
									split	:true,
								}
							]
						}
					]
				}
			]
		}
		return card;
	}
});