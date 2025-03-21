Ext.define('module.custom.sjflv.item.bomprint.view.BomPrintLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-sjflv-bomprint-layout',

	initComponent: function(config){
		var me = this;
		 me.dockedItems.push( {xtype: 'module-sjflv-bomprint-search'});
		// 화면내용
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				split  : true ,
				items	: [
						{	xtype	: 'panel',
							layout	: 'border',
							title	: '배합표',
							region	: 'center',
							flex	: 1,
							items	: [
								{	xtype	: 'module-sjflv-bomprint-lister1',
									width	: 500,
									margin	: '0 1 0 0'	,
									style	: Const.borderLine.right ,
									split	:true,
									region	: 'west'
								},{xtype	: 'module-sjflv-bomprint-lister2'	,
									width	: 500,
									margin	: '0 1 0 0'	,
									style	: Const.borderLine.left    + Const.borderLine.right  ,
									region	: 'west',
									split	:true,
								},{xtype	: 'module-sjflv-bomprint-lister3'	,
									flex	: 1,
									margin	: '0 1 0 0'	,
									style	: Const.borderLine.left    + Const.borderLine.right  ,
									region	: 'center',
									split	:true,
								}
							]
						}
					]
				}
			];
		me.callParent(arguments);
	}
});
