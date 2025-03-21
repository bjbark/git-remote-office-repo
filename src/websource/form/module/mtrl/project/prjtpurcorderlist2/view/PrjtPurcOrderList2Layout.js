Ext.define('module.mtrl.project.prjtpurcorderlist2.view.PrjtPurcOrderList2Layout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-prjtpurcorderlist2-layout',

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
			dockedItems : [ {xtype: 'module-prjtpurcorderlist2-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					region	: 'center',
					flex	:2,
					items	: [
						{	title	: Language.get('acpt_case_name', '금형명')+'별',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-prjtpurcorderlist2-lister-master',
											flex	: 2,
											split	: true,
											region	: 'center',
											style	: Const.borderLine.bottom
										},
									]
								},
							]
						},{	title	: '거래처별',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype : 'module-prjtpurcorderlist2-lister2',
											flex	: 1,
											split	: false,
											region	: 'center',
											style	: Const.borderLine.top
										}
									]
								}
							]
						},{	title		: '품목별',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-prjtpurcorderlist2-lister3',
									flex	: 2,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom // Const.borderLine.bottom
								}
							]
						}
					]
				},{ /*  하단  */
					xtype	: 'module-prjtpurcorderlist2-lister-detail',
					flex	: 1 ,
					region	: 'south',
					style	: Const.borderLine.top
				}
			]
		}
		return card;
	}
});