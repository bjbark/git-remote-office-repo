Ext.define('module.custom.hantop.item.cstmitemmap.view.CstmItemMapLayout', { extend: 'Axt.form.Layout',

	alias : 'widget.module-cstmitemmap-layout',

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
			dockedItems : [ {xtype: 'module-cstmitemmap-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '자재리스트',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	xtype	: 'module-cstmitemmap-lister1',
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
						},{	title		: '자재 메핑',
							layout		: 'border',
							border		: 0,
//							dockedItems	: [ {xtype: 'module-cstmitemmap-lister-item'} ],
							items		: [
								{	xtype	: 'module-cstmitemmap-lister-item1',
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
											action	: 'remove',
											text	: '<span class="btnTemp">></span>',
											cls		: 'button-style',
											margin	: '20 0 0 0',
											width	: 100,
											height	: 50,
											width	: 80
										}
									]
								},{	xtype	: 'module-cstmitemmap-lister-item2',
									flex   : 2,
									region : 'center',
									split	: true,
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