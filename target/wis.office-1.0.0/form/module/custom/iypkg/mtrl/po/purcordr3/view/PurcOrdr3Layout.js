Ext.define('module.custom.iypkg.mtrl.po.purcordr3.view.PurcOrdr3Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-purcordr3-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), ]; //me.createWordCard()
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ {xtype: 'module-purcordr3-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '발주등록',
							layout	: 'border',
							itemId	: 'tab',
							border	: 0,
							items	: [
								{	xtype	: 'module-purcordr3-worker-editor',
									height	: 70,
									region	: 'north',
								},{	xtype	: 'module-purcordr3-worker-search',
									height	: 45,
									region	: 'north',
								},{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-purcordr3-worker-master',
											flex	: 2,
											split	: true,
											region	: 'north',
											style	: Const.borderLine.bottom
										},{	xtype	: 'module-purcordr3-worker-detail',
											region	: 'center',
											flex	: 1
										}
									]
								}
							]
						},{	title	: '발주리스트',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-purcordr3-lister',
											flex	: 2,
											split	: true,
											region	: 'center',
											style	: Const.borderLine.bottom
										}
									]
								},
							]
						}
					]
				}
			]
		};
		return card;
	},

});

