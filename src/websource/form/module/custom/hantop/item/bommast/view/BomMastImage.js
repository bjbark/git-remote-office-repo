Ext.define('module.custom.hantop.item.bommast.view.BomMastImage', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-bommast-image',

	initComponent: function () {
		var me = this;
		me.items = [me.imgPanel()];
		me.callParent();
	},


	imgPanel : function(){
		var me = this,
		item =	{
			xtype 	: 'panel',
			layout	: 'vbox',
			border	: 0,
			items	: [
				{	xtype	: 'panel',
					width	: '100%',
					height	: '100%',
					border	: 0,
					items	: [
						{	xtype	: 'image',
							name	: 'imge_1fst',
							src		: '',
							border	: 0,
							width	: 550,
							height	: 300,
							margin	: '5 0 5 90',
							hidden	: false
						}
					]
				}
			]
		};
		return item;
	}

});
