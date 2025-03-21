Ext.define('module.prod.order.prodinput.view.ProdInputLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-prodinput-layout',
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
				dockedItems : [ {xtype: 'module-prodinput-search'} ],
				items : [
					{	xtype	: 'tab-panel',
						itemId	: 'mainpanel',
						items	: [
							{	title	: '투입 및 대기현황',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-prodinput-lister-master', /*  상단  */
										flex	: 1,
										split	: true,
										region	: 'west',
										style	: Const.borderLine.bottom //Const.borderLine.left +
									},{	xtype	: 'module-prodinput-lister-detail',
										region	: 'center',
										style	: Const.borderLine.top
									}
								]
							},
							{	title		: '투입현황',
								layout		: 'border',
								border		: 0,
								items		: [
									{	xtype	: 'module-prodinput-lister-master1',
										flex	: 3,
										split	: true,
										region	: 'west',
										style	: Const.borderLine.bottom // Const.borderLine.bottom
									},{	xtype	: 'module-prodinput-lister-master2',
										flex	: 1,
										region	: 'center',
										style	: Const.borderLine.top //+ Const.borderLine.top
									}
								]
							},{	title		: '대기현황',
								layout		: 'border',
								border		: 0,
								items		: [
									{	xtype	: 'module-prodinput-lister-detail1',
										flex	: 3,
										split	: true,
										region	: 'west',
										style	: Const.borderLine.left + Const.borderLine.bottom
									},{	xtype	: 'module-prodinput-lister-detail2',
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
			return card;
	},
});