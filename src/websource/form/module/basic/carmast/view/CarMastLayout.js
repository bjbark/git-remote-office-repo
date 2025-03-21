Ext.define('module.basic.carmast.view.CarMastLayout', { extend  : 'Axt.form.Layout',

	alias	: 'widget.module-carmast-layout',
	layout:'card',
	activeItem: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createTab()];
		me.callParent(arguments);
	},

	createTab : function () {
		var item = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-carmast-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '차량코드관리',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-carmast-lister',
									flex	:  1 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						}
					]
				},{	xtype : 'module-carmast-editor', region : 'south'
				}
			]
		};
		return item;
	},

});