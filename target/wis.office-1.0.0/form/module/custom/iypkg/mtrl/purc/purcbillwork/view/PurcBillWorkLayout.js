Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-purcbillwork-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard() ];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var me = this,
		card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-purcbillwork-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '매입계산서 등록',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-purcbillwork-lister', region:'center' , style : Const.borderLine.top
								}
							]
						},{	title	: '매입계산서 발행내역',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	region	: 'west',
									layout	: 'border',
									border	: 0,
									width	: 700,
									items	: [
										{	xtype	: 'module-purcbillwork-lister2-master',
											split	: true,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.bottom
										}
									]
								},{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-purcbillwork-lister2-detail',
											split	: true,
											flex	: 2,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.bottom
										}
									]
								}
							]
						},{	title	: '기타매입계산서 등록',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-purcbillwork-lister3', region:'center' , style : Const.borderLine.top
								}
							]
						},{	title	: '외주매입계산서 등록',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-purcbillwork-lister5', region:'center' , style : Const.borderLine.top
								}
							]
						},{	title	: '매입계산서 집계표',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-purcbillwork-lister4', region:'center' , style : Const.borderLine.top
								}
							]
						}
					]
				}
			]
		};
		return card;
	}

});

