Ext.define('module.custom.aone.prod.order.sorderworkreport.view.SorderWorkReportImage', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-sorderworkreport-image',

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
							name	: 'list1_imge_1fst',
							src		: '',
							border	: 0,
							id		: 'list1_imge_1fst',
							width	: '100%',
							minHeight	: 250,
							height	: '100%',
							margin	: '12 0 0 0',
							listeners: {
								resize: {
									fn: function(el) {
										var me = this;
										document.getElementById("list1_imge_1fst").style.height = me.lastBox.height
										document.getElementById("list1_imge_1fst").style.width = me.lastBox.width
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
