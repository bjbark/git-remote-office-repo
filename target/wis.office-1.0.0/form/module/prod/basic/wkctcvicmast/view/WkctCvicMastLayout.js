Ext.define('module.prod.basic.wkctcvicmast.view.WkctCvicMastLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-wkctcvicmast-layout',
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
			dockedItems : [ {xtype: 'module-wkctcvicmast-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '공정목록',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-wkctcvicmast-lister-master',
											flex	: 2,
											split	: true,
											region	: 'north',
											style	: Const.borderLine.bottom
										},{	xtype	: 'tab-panel',
											itemId	: 'itempanel',
											split	: true,
											region	: 'center',
											flex	: 1 ,
											items	: [
												{	title	: '공정별 설비 현황',
													layout	: 'border',
													border	: 0,
													region	: 'center',
													items	: [
														{	xtype	: 'module-wkctcvicmast-lister-detail',
															region	: 'center',
															style	: Const.borderLine.top
														}
													]
												}
											]
										}
									]
								},
							]
						},{	title		: '공정별설비등록',
							layout		: 'border',
							border		: 0,
							dockedItems	: [ {xtype: 'module-wkctcvicmast-lister-item'} ],
							items		: [
								{	xtype	: 'module-wkctcvicmast-lister-item1',
									flex	: 2,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'panel',
									region	: 'west',
									width	: 100,
									border	: 0,
									layout	: {
										type	: 'vbox',
										align	: 'center',
										pack	: 'center'
									},
									items	: [
										{	xtype	: 'button',
											action	: 'oneenrollment',
											text	: '<span class="btnTemp"><</span>',
											cls		: 'button-style',
											margin	: '50 0 0 0',
											width	: 100,
											height	: 50,
											width	: 80,
										},{	xtype	: 'button',
											action	: 'oneremove',
											text	: '<span class="btnTemp">></span>',
											cls		: 'button-style',
											margin	: '20 0 0 0',
											width	: 100,
											height	: 50,
											width	: 80
										}
									]
								},{	xtype	: 'module-wkctcvicmast-lister-item2',
									flex   : 2,
									region : 'center',
									style  : Const.borderLine.left + Const.borderLine.top
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