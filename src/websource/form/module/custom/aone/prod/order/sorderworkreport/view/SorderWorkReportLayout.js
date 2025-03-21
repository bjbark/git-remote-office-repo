Ext.define('module.custom.aone.prod.order.sorderworkreport.view.SorderWorkReportLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-sorderworkreport-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-sorderworkreport-search'}),
		me.items = [
			{xtype	: 'tab-panel',
			itemId	: 'mainpanel',
				items	: [
					{	title	: Language.get('work_list','작업리스트'),
						layout	: 'border',
						border	: 0,
						items	: [
							/*  상단 */
							{	xtype	: 'module-sorderworkreport-lister-master',
								height	: 400,
								split	: true,
								region	: 'north',
								style	: Const.borderLine.bottom,
							},{ /*  하단좌측  */
								xtype	: 'module-sorderworkreport-lister-detail',
								width	: 680,
								split	: true,
								region	: 'west',
								style	: Const.borderLine.top
							},{
								xtype	: 'panel',
								layout	: 'hbox',
								flex	: 1,
								split	: true,
								region	: 'center',
								border	: 0,
								margin	: 0,
								padding : 0,
								style	: Const.borderLine.top,
								items	: [
									{	xtype	: 'module-sorderworkreport-file',
										flex	: 1,
										split	: true,
										style	: Const.borderLine.right,
									},{	xtype	: 'module-sorderworkreport-image',
										flex	: 1,
										style	: Const.borderLine.top
									}
								]
							},
						]
					}
				]
			}
		];
		me.callParent(arguments);
		}
	});
