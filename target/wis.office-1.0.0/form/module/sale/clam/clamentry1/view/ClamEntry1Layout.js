Ext.define('module.sale.clam.clamentry1.view.ClamEntry1Layout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-clamentry1-layout',
	layout:'card',
	activeItem: 0,

	/**
	* 콤포넌트 초기화 이벤트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), ]; //me.createWordCard()
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ {xtype: 'module-clamentry1-search'} ],
			items :[
				{	xtype  : 'tab-panel',
					itemId : 'mainpanel',
					items  : [
						{	title	: '클레임 리스트',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype	: 'module-clamentry1-lister',
									flex	:  2 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						}
					]
				},{	xtype  : 'module-clamentry1-editor', region : 'south'
				}
			]
		};
		return card;
	},

});