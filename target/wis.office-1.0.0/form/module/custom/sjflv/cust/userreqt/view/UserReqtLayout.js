Ext.define('module.custom.sjflv.cust.userreqt.view.UserReqtLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-sjflv-userreqt-layout',
	layout:'card',
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);

	},
	createListCard:function(){
		var me = this,
		card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [{xtype: 'module-sjflv-userreqt-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					items	: [
						{	xtype	: 'panel',
							layout	: 'border',
							region	: 'center',
							title	: '회원가입요청 목록',
							name	: 'firstTab',
							flex	: 1,
							items	: [
								{	xtype	: 'module-sjflv-userreqt-lister1',
									region	: 'center',
									flex	: 1,
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
