Ext.define('module.membership.basic.memberlist.view.MemberListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-memberlist-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-memberlist-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{	title	: '회원 명단',
					layout	: 'border',
					border	: 0,
					items	: [
						{	region	: 'center',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype	: 'module-memberlist-lister', /*  상단  */
									itemId	: 'master',
									flex	: 60,
									split	: false,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype	: 'module-memberlist-editor',
//									height	: 405,
									region	: 'north',
									hidden	: false
								},{	xtype	: 'tab-panel',
									itemId	: 'detail',
									split	: true,
									region	: 'south',
									flex	: 40,
									items	: [
										{	title	: '상담 내역',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-memberlist-memolister',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '수납 현황',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-memberlist-crct-lister',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '레슨 현황',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-memberlist-inot-lister',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '가입 경력',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-memberlist-memolister',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '첨부파일',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-prjtwork-editorlister',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										}
									]
								}
							]
						}
					]
				}
			]
		}
//
//				{title: Language.get('unit_list','회원 현황'), xtype : 'module-memberlist-lister' }
//			]
//		},{ xtype : 'module-memberlist-editor', region : 'south',  hidden : false
//		}
	];
	me.callParent(arguments);
	}
});