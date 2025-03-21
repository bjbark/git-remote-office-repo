Ext.define('module.custom.komec.item.bommast.view.BomMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-komec-bommast-layout',

	initComponent: function(config){
		var me = this;
		 me.dockedItems.push( {xtype: 'module-komec-bommast-search'});
		// 화면내용
		me.items = [
			{	xtype	: 'panel',
				layout	: 'border',
				region	: 'center',
				flex	: 1,
				items	: [
					{	xtype	: 'module-komec-bommast-lister1',
						width	: 500,
						margin	: '0 1 0 0'	,
						style	: Const.borderLine.right ,
						split	:true,
						region	: 'west'
					},{	xtype	: 'module-komec-bommast-lister2',
						width	: 450,
						margin	: '0 1 0 0'	,
						style	: Const.borderLine.left    + Const.borderLine.right  ,
						split	:true,
						region : 'west',
					} ,{xtype	: 'module-komec-bommast-lister3'	,
						flex	: 1,
						margin	: '0 1 0 0'	,
						style	: Const.borderLine.left    + Const.borderLine.right  ,
						region	: 'center',
						split	:true,
					} ,
				]
			}
		];
		me.callParent(arguments);
	}
});
