Ext.define('module.custom.aone.sale.order.sorderplan.view.SorderPlanImage', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-aone-sorderplan-image',

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
							name	: 'aone_plan_imge',
							src		: '',
							border	: 0,
							id		: 'aone_plan_imge',
							width	: '100%',
							minHeight	: 250,
							maxHeight	: 300,
							height	: '100%',
							margin	: '12 0 0 0',
							listeners: {
								resize: {
									fn: function(el) {
										var me = this;
										document.getElementById("aone_plan_imge").style.height = me.lastBox.height
										document.getElementById("aone_plan_imge").style.width = me.lastBox.width
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
