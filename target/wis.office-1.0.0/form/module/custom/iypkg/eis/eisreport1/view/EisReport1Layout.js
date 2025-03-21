Ext.define('module.custom.iypkg.eis.eisreport1.view.EisReport1Layout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-eisreport1-layout',
	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-eisreport1-search'}),
			me.items = [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '원가분석',
							layout	: 'border',
							border	: 0,
							items	: [
							{	region	: 'north',
								layout	: 'border',
								border	: 0,
								flex	: 22,
								split	: true,
								items	: [
									{	layout	: 'border',
										border	: 0,
										region	: 'center',
										flex	: 40,
										items	: [
											{	xtype	: 'panel',
												region	: 'center',
												layout	: 'border',
												border	: 0,
												flex	: 20,
												style	: Const.borderLine.top,
												items	: [
													{	xtype	: 'module-eisreport1-master', /*  상단  */
														flex	: 20,
														split	: true,
														region	: 'west',
														style	: Const.borderLine.right
													},{	xtype	: 'module-eisreport1-editor', /*  상단  */
														flex	: 20,
														split	: true,
														region	: 'center',
														style	: Const.borderLine.left
													}
												]
											}
										]
									}
								]
							},{	region	: 'north',
									layout	: 'border',
									border	: 0,
									flex	: 30,
									split	: true,
									items	: [
											{	layout	: 'border',
												border	: 0,
												region	: 'center',
												flex	: 40,
												items	: [
												{	xtype	: 'module-eisreport1-detail3',
													region	: 'center',
													style	: Const.borderLine.bottom
												}
											]
										}
									]
								},
								{	xtype   : 'tab-panel',
									flex	: 40,
									items: [
								        {	title: '수주내역',
											layout : 'border',
											border : 0,
											items  : [
												{   region : 'west',
					                                layout : 'border',
					                                border : 0,
					                                flex	: 100,
					                                items  : [
					                                    /*  좌측 상단  */
					                                    {   xtype  : 'module-eisreport1-detail4',
					                                        flex	: 100,
					                                        region : 'center',
					                                        style  : Const.borderLine.left + Const.borderLine.bottom
					                                    },
					                                ]
												},
											]
								        }
							        ]
					            },{	xtype   : 'tab-panel',
									region  : 'east',
									flex	: 40,
									items: [
								        {	title: '원가내역',
											layout : 'border',
											border : 0,
											flex	: 40,
											items  : [
												{   xtype  : 'module-eisreport1-detail5',
													flex   : 1,
													region : 'center',
													style  : Const.borderLine.left + Const.borderLine.top
}
											]
								        }
							        ]
					            },
							]
						},

					]
				},

			]
		me.callParent(arguments);
		}
	});