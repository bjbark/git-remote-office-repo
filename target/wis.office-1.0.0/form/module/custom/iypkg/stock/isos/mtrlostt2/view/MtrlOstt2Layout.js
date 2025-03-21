Ext.define('module.custom.iypkg.stock.isos.mtrlostt2.view.MtrlOstt2Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-mtrlostt2-layout',
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
			dockedItems : [ {xtype: 'module-mtrlostt2-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '부자재 사용등록',
							layout	: 'border',
							itemId	: 'tab',
							border	: 0,
							items	: [
								{	xtype	: 'module-mtrlostt2-worker-search',
									region	: 'north',
								},{	xtype	: 'module-mtrlostt2-lister-master',
									flex	: 1,
									split	: false,
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
						},{	title	: '부자재 사용내역',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-mtrlostt2-lister',
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

