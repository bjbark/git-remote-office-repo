Ext.define('module.sale.order.slorlist2.view.SlorList2Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-slorlist2-layout',


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
			dockedItems : [ {xtype: 'module-slorlist2-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId  : 'mainpanel',
					flex	:1,
					layout	: 'border',
					border	:0,
					activeTab : _global.hq_id != 'N1000nbolt' ? 1 : 0,
					items	: [
						{	title	: '주문현황',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							hidden	: _global.hq_id != 'N1000nbolt',
							items	: [
								{	region	: 'center',
									layout	: 'border',
									hidden	: _global.hq_id != 'N1000nbolt',
									border	: 0,
									items	: [
										{	xtype  : 'module-slorlist2-lister-master4',
											flex   : 1,
											region : 'center',
											hidden	: _global.hq_id != 'N1000nbolt',
											style  : Const.borderLine.left + Const.borderLine.top
										}
									]
								}
							]
						},{	title	: '날짜별',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region : 'center',
									layout : 'border',
									border : 0,
									items  : [
										{   xtype  : 'module-slorlist2-lister-master1',
											flex   : 1,
											region : 'center',
											style  : Const.borderLine.left + Const.borderLine.top
										},{	xtype	: 'tab-panel',
											region	: 'south',
											flex	:1,
											border	:0,
											split	: true,
											items	:[
												{	title	: '상세내역',
													xtype	: 'module-slorlist2-lister-detail',
													region	: 'south',
													border	:0,
													split	: true
												}
											]
										}
									]
								}
							]
						},{	title	: '거래처별',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region : 'center',
									layout : 'border',
									border : 0,
									items  : [
										{	xtype  : 'module-slorlist2-lister-master2',
											flex   : 1,
											region : 'center',
											style  : Const.borderLine.left + Const.borderLine.top
										},{	xtype	: 'tab-panel',
											region	: 'south',
											flex	:1,
											border	:0,
											split	: true,
											items	:[
												{	title	: '상세내역',
													xtype	: 'module-slorlist2-lister-detail',
													region	: 'south',
													border	:0,
													split	: true
												}
											]
										}
									]
								}
							]
						},{	title	: '품목별',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype  : 'module-slorlist2-lister-master3',
											flex   : 1,
											region : 'center',
											style  : Const.borderLine.left + Const.borderLine.top
										},{	xtype	: 'tab-panel',
											region	: 'south',
											flex	:1,
											border	:0,
											split	: true,
											items	:[
												{	title	: '상세내역',
													xtype	: 'module-slorlist2-lister-detail',
													region	: 'south',
													border	:0,
													split	: true
												}
											]
										}
									]
								}
							]
						},{	title	: '납기일별',
							layout	: 'border',
							hidden	: _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : _global.hq_id.toUpperCase()!= 'N1000KOMEC' ? false : true,
							border	: 0,
							region	: 'center',
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype  : 'module-slorlist2-lister-master5',
											flex   : 1,
											region : 'center',
											style  : Const.borderLine.left + Const.borderLine.top
										}
									]
								}
							]
						},{	title	: '납기일별(수주/OEM)',
							layout	: 'border',
							hidden	: _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : _global.hq_id.toUpperCase()!= 'N1000KOMEC' ? false : true,
							border	: 0,
							region	: 'center',
							items	: [
								{	xtype	: 'tab-panel',
									itemId  : 'subpanel',
									flex	:1,
									layout	: 'border',
									border	:0,
									items	: [
										{	title	: '수주',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	region	: 'center',
													layout	: 'border',
													border	: 0,
													items	: [
														{	xtype  : 'module-slorlist2-lister-master6',
															flex   : 1,
															region : 'center',
															style  : Const.borderLine.left + Const.borderLine.top
														}
													]
												}
											]
										},{	title	: 'OEM',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	region	: 'center',
													layout	: 'border',
													border	: 0,
													items	: [
														{	xtype  : 'module-slorlist2-lister-master6',
															flex   : 1,
															region : 'center',
															style  : Const.borderLine.left + Const.borderLine.top
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
			]
		}
		return card;
	}
});