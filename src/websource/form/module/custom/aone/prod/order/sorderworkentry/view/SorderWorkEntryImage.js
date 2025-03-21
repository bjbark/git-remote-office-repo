Ext.define('module.custom.aone.prod.order.sorderworkentry.view.SorderWorkEntryImage', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-sorderworkentry-image',

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
							name	: 'work_enty_imge',
							src		: '',
							border	: 0,
							id		: 'work_enty_imge',
							width	: '100%',
							minHeight	: 250,
							maxHeight	: 300,
							height	: '100%',
							margin	: '12 0 0 0',
							listeners: {
								resize: {
									fn: function(el) {
										var me = this;
										document.getElementById("work_enty_imge").style.height = me.lastBox.height
										document.getElementById("work_enty_imge").style.width = me.lastBox.width
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
