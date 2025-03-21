Ext.define('module.custom.komec.item.bomlist.view.BomListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-komec-bomlist-layout',

	initComponent: function(config){
		var me = this;
		 me.dockedItems.push( {xtype: 'module-komec-bomlist-search'});
		// 화면내용
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				split  : true ,
				items	: [
					{	xtype	: 'panel',
						layout	: 'border',
						region	: 'center',
						title	: '배합표',
						flex	: 1,
						items	: [
							{	xtype	: 'module-komec-bomlist-lister1',
								width	: 500,
								margin	: '0 1 0 0'	,
								style	: Const.borderLine.right ,
								split	:true,
								region	: 'west'
							},{	xtype	: 'module-komec-bomlist-lister2',
								width	: 550,
								margin	: '0 1 0 0'	,
								style	: Const.borderLine.left    + Const.borderLine.right  ,
								split	:true,
								region : 'west',
							} ,{xtype	: 'module-komec-bomlist-lister3'	,
								flex	: 1,
								margin	: '0 1 0 0'	,
								style	: Const.borderLine.left    + Const.borderLine.right  ,
								region	: 'center',
								split	:true,
							} ,{xtype	: 'module-komec-bomlist-excel'	,
								flex	: 1,
								margin	: '0 1 0 0'	,
								style	: Const.borderLine.left    + Const.borderLine.right  ,
								split	:true,
								region	: 'east',
								hidden	: true
							} ,
						]
					},{	xtype	: 'panel',
						layout	: 'border',
						region	: 'center',
						hidden	: true,
						title	: '거래처별 배합표',
						flex	: 1,
						items	: [
							{	xtype	: 'module-komec-bomlist-cstm-lister1',
								width	: 190,
								margin	: '0 1 0 0'	,
								style	: Const.borderLine.right ,
								split	:true,
								region	: 'west'
							},{	xtype	: 'module-komec-bomlist-cstm-lister2',
								width	: 290,
								margin	: '0 1 0 0'	,
								style	: Const.borderLine.left    + Const.borderLine.right  ,
								split	:true,
								region : 'west',
							},{xtype	: 'module-komec-bomlist-cstm-lister3'	,
								width	: 550,
								margin	: '0 1 0 0'	,
								style	: Const.borderLine.left    + Const.borderLine.right  ,
								region	: 'west',
								split	:true,
							},{xtype	: 'module-komec-bomlist-cstm-lister4'	,
								flex	: 1,
								margin	: '0 1 0 0'	,
								style	: Const.borderLine.left    + Const.borderLine.right  ,
								region	: 'center',
								split	:true,
							}
						]
					},{	xtype	: 'panel',
						layout	: 'border',
						region	: 'center',
						hidden	: true,
						title	: '투입자재별 배합표',
						flex	: 1,
						items	: [
							{	xtype	: 'module-komec-bomlist-mtrl-lister1',
								width	: 770,
								margin	: '0 1 0 0'	,
								style	: Const.borderLine.right ,
								split	:true,
								region	: 'west'
							},{xtype	: 'module-komec-bomlist-mtrl-lister2'	,
								flex	: 1,
								margin	: '0 1 0 0'	,
								style	: Const.borderLine.left    + Const.borderLine.right  ,
								region	: 'center',
								split	:true,
							} ,
						]
					},{	xtype	: 'panel',
						layout	: 'border',
						region	: 'center',
						hidden	: true,
						title	: 'Specification',
						flex	: 1,
						hidden  : _global.hq_id.toUpperCase() == 'N1000KOMEC' ? true : false,
						items	: [
							{	xtype	: 'module-komec-bomlist-spec-lister',
								width	: 340,
								margin	: '0 1 0 0'	,
								style	: Const.borderLine.right ,
								split	:true,
								region	: 'west'
							},{xtype	: 'module-komec-bomlist-spec-editor'	,
								flex	: 1,
								margin	: '0 1 0 0'	,
								style	: Const.borderLine.left    + Const.borderLine.right  ,
								region	: 'center',
								split	:true,
							} ,
						]
					}
				]
			}
		];
		me.callParent(arguments);
	}
});
