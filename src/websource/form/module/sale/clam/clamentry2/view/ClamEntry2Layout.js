Ext.define('module.sale.clam.clamentry2.view.ClamEntry2Layout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-clamentry2-layout',
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
			dockedItems : [ {xtype: 'module-clamentry2-search'} ],
			items :[
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					{	title	: '클레임 리스트',
						layout	: 'border',
						border	: 0,
						items	: [
								{	xtype	: 'module-clamentry2-lister',
									flex	:  2 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						}
					]
				},{	xtype	: 'module-clamentry2-editor',
					region	: 'south'
				}
			]
		};
		return card;
	},

});