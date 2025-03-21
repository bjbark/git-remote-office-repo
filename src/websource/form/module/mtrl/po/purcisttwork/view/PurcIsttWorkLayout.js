Ext.define('module.mtrl.po.purcisttwork.view.PurcIsttWorkLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-purcisttwork-layout',

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
			dockedItems : [ {xtype: 'module-purcisttwork-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '입고등록',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-purcisttwork-lister-search',
											height	:  (_global.options.mes_system_type !='Frame'? 120:80),
											split	: false,
											region	: 'north',
											style	: Const.borderLine.bottom
										},{	xtype : 'module-purcisttwork-lister',
											flex	: 1,
											split	: false,
											region	: 'center',
											style	: Const.borderLine.top
										}
									]
								}
							]
						},{	title	: Language.get('istt_list','입고리스트'),
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-purcisttwork-lister-master',
											flex	: 3,
											split	: true,
											region	:  _global.hq_id.toUpperCase()!='N1000SJFLV' ? 'center':'west',
											style	: Const.borderLine.bottom
										},{	xtype	: 'tab-panel',
											itemId	: 'itempanel',
											split	: true,
											region	: 'center',
											flex	: 1 ,//
											hidden	: true,
											items	: [
												{	title	: '입고현황',
													layout	: 'border',
													border	: 0,
													region	: 'center',
													hidden	: true,
													items	: [
														{	xtype	: 'module-purcisttwork-lister-detail',
															region	: 'center',
															style	: Const.borderLine.top
														}
													]
												}
											]
										},{ xtype	: 'tab-panel',
											itemId  : 'isttFileListerTab',
											hidden: _global.hq_id.toUpperCase()!='N1000SJFLV' ? true:false,
											items : [
												{	title	: '입고 서류',
													xtype	: 'module-purcisttwork-lister-detail2',
													flex	: 1 ,
													region	: 'center',
													hidden: _global.hq_id.toUpperCase()!='N1000SJFLV' ? true:false,
													style	: Const.borderLine.bottom
												},{	title	: '선적 서류',
													xtype	: 'module-purcisttwork-lister-detail4',
													flex	: 1 ,
													region	: 'center',
													hidden: _global.hq_id.toUpperCase()!='N1000SJFLV' ? true:false,
													style	: Const.borderLine.bottom
												},{	title	: '송금증',
													xtype	: 'module-purcisttwork-lister-detail3',
													flex	: 1 ,
													region	: 'center',
													hidden: _global.hq_id.toUpperCase()!='N1000SJFLV' ? true:false,
													style	: Const.borderLine.bottom
												}
											]
										}
									]
								},
							]
						},{	title	: Language.get('','유통기한'),
							layout	: 'border',
							border	: 0,
							hidden	: _global.hq_id.toUpperCase() == 'N1000SJFLV'? false : true,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-purcisttwork-expr-master',
											flex	: 2,
											split	: true,
											region	: 'center',
											style	: Const.borderLine.bottom
										},{	xtype	: 'tab-panel',
											itemId	: 'itempanel',
											split	: true,
											region	: 'center',
											flex	: 1 ,//
											hidden	: true,
											items	: [
												{	title	: '입고현황',
													layout	: 'border',
													border	: 0,
													region	: 'center',
													hidden	: true,
													items	: [
														{	xtype	: 'module-purcisttwork-expr-detail',
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
						}
					]
				}
			]
		}
		return card;
	}


});