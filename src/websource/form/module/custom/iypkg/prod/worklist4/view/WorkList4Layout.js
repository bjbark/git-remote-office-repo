Ext.define('module.custom.iypkg.prod.worklist4.view.WorkList4Layout', { extend  : 'Axt.form.Layout',

	alias	: 'widget.module-worklist4-layout',

	initComponent: function(config){
		var me  = this
		;
		me.dockedItems.push({xtype: 'module-worklist4-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					{	title : '외주 발주 현황',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype	: 'module-worklist4-lister',
								split	: true,
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},{	title : '외주 입고 현황',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype	: 'module-worklist4-lister2',
								split	: true,
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},{	title : '상품 발주 현황',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype	: 'module-worklist4-lister3',
								split	: true,
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},{	title : '상품 입고 현황',
						layout	: 'border',
						border	: 0,
						items	: [
							,{	xtype	: 'module-worklist4-lister4',
								split	: true,
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					}
				]
			}
		];
		me.callParent(arguments);
	}
});