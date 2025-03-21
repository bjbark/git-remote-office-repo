Ext.define('module.membership.fee.feereport1.view.FeeReport1Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-feereport1-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-feereport1-search'}),
	me.items = [
        {	xtype   : 'tab-panel',
			itemId  : 'mainpanel',
			region  : 'center',
			flex    : 1,
			items: [
		        {	title: '수입 현황',
					layout : 'border',
					border : 0,
					items  : [
			            {	xtype  : 'module-feereport1-lister-master' ,
							region : 'west'   ,
							itemId : 'authmaster',
							style  : Const.borderLine.right ,
							width  : 580,
							split  : true ,
			            },{ xtype  : 'module-feereport1-lister-detail' ,
							region : 'center' ,
							style  : Const.borderLine.left  ,
							flex : 1
			            }
		            ]
		        }
	        ]
        }
    ];
	me.callParent(arguments);

	}
});