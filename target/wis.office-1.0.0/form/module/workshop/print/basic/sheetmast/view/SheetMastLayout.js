Ext.define('module.workshop.print.basic.sheetmast.view.SheetMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-sheetmast-layout',
	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
			me.dockedItems.push({xtype: 'module-sheetmast-search'}),
			me.items = [ me.createListCard()],
			me.callParent(arguments)
		;
	},

	createListCard : function () {
		var card = {
			layout		: 'border',
			border		: 0 ,
			items : [
				// 상단
				{	xtype	: 'tab-panel',
					layout	: 'border',
					border	: 0,
					items	: [
						{	title: Language.get('clss_list','용지분류'),
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region : 'center',
									layout : 'border',
									border : 0,
									items  : [
										{	xtype : 'module-sheetmast-lclslister',
											flex	: 1,
											region	: 'west',
											split	: true,
											style	: Const.borderLine.right+ Const.borderLine.bottom
										},{	xtype : 'module-sheetmast-mclslister',
											flex	: 1,
											region	: 'west',
											split	: true,
											style	: Const.borderLine.right+ Const.borderLine.bottom
										},{	xtype : 'module-sheetmast-sclslister',
											flex	: 1,
											region	: 'west',
											split	: true,
											style	: Const.borderLine.right+ Const.borderLine.bottom
										},{	xtype	: 'module-sheetmast-lister',
											region	: 'center',
											flex	: 5,
											border	:0,
										}
									]
								}
							]
						}
					]
				// 하단
				},{	layout	: 'border',
					region	: 'south',
					flex	: 1.5,
					border	:0,
					split	: true,
					items	:[
						{	xtype	: 'tab-panel',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							flex	: 1,
							split	: true,
							items	: [
								{	title: Language.get('unit_list','용지코드 목록'),
									xtype	: 'module-sheetmast-detail',
									region	: 'center',
									border	:0,
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