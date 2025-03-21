Ext.define('module.custom.iypkg.sale.order.slorlist3.view.SlorList3Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-slorlist3-layout',


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
			dockedItems	: [ {xtype: 'module-slorlist3-search'} ],
			items	: [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					flex	:1,
					layout	: 'border',
					border	:0,
					items	: [
						{	title	: '수주 대비 생산현황',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							hidden	: true,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-slorlist3-lister-master1',
											flex	: 1,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										}
									]
								}
							]
						},{	title	: '수주 대비 납기현황',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							hidden	: true,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-slorlist3-lister-master2',
											flex	: 1,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										}
									]
								}
							]
						},{	title	: '일자별 수주현황',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-slorlist3-lister-master3',
											flex	: 1,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										}
									]
								}
							]
						},{	title	: '거래처별 수주현황',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-slorlist3-lister-master4',
											flex	: 1,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										}
									]
								}
							]
						},{	title	: '담당자별 수주현황',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-slorlist3-lister-master5',
											flex	: 1,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										}
									]
								}
							]
						},{	title	: '품목별 수주현황',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-slorlist3-lister-master6',
											flex	: 1,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
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