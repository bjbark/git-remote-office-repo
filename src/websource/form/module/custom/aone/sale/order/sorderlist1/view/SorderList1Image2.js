Ext.define('module.custom.aone.sale.order.sorderlist1.view.SorderList1Image2', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-aone-sorderlist1-image2',

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
							name	: 'list1_imge_2',
							src		: '',
							border	: 0,
							id		: 'list1_imge_2',
							width	: '100%',
							minHeight	: 250,
							maxHeight	: 300,
							height	: '100%',
							margin	: '12 0 0 0',
							listeners: {
								resize: {
									fn: function(el) {
										var me = this;
										document.getElementById("list1_imge_2").style.height = me.lastBox.height
										document.getElementById("list1_imge_2").style.width = me.lastBox.width
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
