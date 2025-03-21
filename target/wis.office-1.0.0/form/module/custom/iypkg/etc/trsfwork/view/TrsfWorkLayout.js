Ext.define('module.custom.iypkg.etc.trsfwork.view.TrsfWorkLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-trsfwork-layout',

	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout		: 'border',
			border		: 0 ,
			dockedItems : [ {xtype: 'module-trsfwork-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '차량별 리스트',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype	: 'module-trsfwork-lister1',
									flex	:  1 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								},
							]
						},{	title	: '업체별 리스트',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-trsfwork-lister2',
											flex	: 1,
											split	: true,
											region	: 'center',
											style	: Const.borderLine.bottom
										}
									]
								}
							]
						},{	title	: '운송비 등록',
							layout	: 'border',
							itemId	: 'tab',
							border	: 0,
							items	: [
								{	xtype	: 'module-trsfwork-worker-search',
									height	: 45,
									region	: 'north',
								},{	xtype : 'module-trsfwork-worker-editor',
									height	: 75,
									region	: 'north',
									style	: Const.borderLine.top
								},{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-trsfwork-worker-lister1',
											region	: 'west',
											flex	: 100,
										},{	xtype	: 'module-trsfwork-worker-lister2',
											region	: 'center',
											flex	: 100,
										}
									]
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