Ext.define('module.workshop.sale.order.ordermast.view.OrderMastImage', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-ordermast-image',

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
					layout	: 'fit',
					border	: 0,
					items	: [
						{	xtype	: 'image',
							name	: 'imge_1fst',
							src		: '',
							border	: 0,
							id		: 'imge_1fst',
							width	: '100%',
							height	: 400,
							margin	: '12 0 0 0',
							listeners: {
								resize: {
									fn: function(el) {
										var me = this;
										document.getElementById("imge_1fst").style.height = me.lastBox.height
										document.getElementById("imge_1fst").style.width = me.lastBox.width
									}
								}
							},
						}
					]
				}
			]
		};
		return item;
	}

});
