Ext.define('module.custom.sjflv.mtrl.po.purcordrndqt.view.PurcOrdrNdqtLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-sjflv-purcordrndqt-layout',

	initComponent: function(config){
		var me = this;
//		 me.dockedItems.push( {xtype: 'module-sjflv-purcordrndqt-search'});
		// 화면내용
		me.items = [
			{	xtype	: 'panel',
				layout	: 'border',
				region	: 'center',
				flex	: 1,
				items	: [
					{	xtype	: 'module-sjflv-purcordrndqt-lister1',
						width	: 780,
						margin	: '0 1 0 0'	,
						style	: Const.borderLine.right ,
						split	:true,
						region	: 'west'
					},{xtype	: 'module-sjflv-purcordrndqt-lister2'	,
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
