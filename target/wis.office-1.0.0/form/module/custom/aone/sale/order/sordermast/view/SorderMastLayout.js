Ext.define('module.custom.aone.sale.order.sordermast.view.SorderMastLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-aone-sordermast-layout',

	/**
	 * 초기화 콤포넌트
	 */

	initComponent: function(config){
		var me = this;
		me.dockedItems.push({xtype: 'module-aone-sordermast-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('acpt_list','입출고리스트'),
						xtype : 'module-aone-sordermast-lister-master'
					}
				]
			},{ xtype : 'module-aone-sordermast-worker-editor', region : 'south', hidden : false
			}
		];
	me.callParent(arguments);
	}
});
