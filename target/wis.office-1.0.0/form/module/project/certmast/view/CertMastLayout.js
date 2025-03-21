Ext.define('module.project.certmast.view.CertMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-certmast-layout',

	layout     : 'card',
	activeItem : 0,

	/**
	 *
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()]; // , me.createWorkCard()
		me.callParent(arguments);
	},

	createListCard : function () {
		var me = this
			,buttons = {
				items: [
				{	xtype: 'tbfill'
				}
			]
		};
		card = {
			layout		: 'border',
			border		: 0 ,
			dockedItems	: [ {	xtype : 'module-certmast-search'} ],
			items		: [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel' ,
					tabBar	: buttons ,
					items	: [
						{	title: '설치 리스트' ,
							xtype : 'module-certmast-lister'
						}
					]
				},{	title: '설치 정보' ,
					xtype: 'module-certmast-editor' ,region : 'south'
				}
			]
		};
		return card;
	}

});


