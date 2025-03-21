Ext.define('module.stock.lot.lottracking.view.LotTrackingLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-lottracking-layout',

	initComponent: function(config){
		var me = this;
		me.items = [
			{	xtype : 'module-lottracking-editor',
				region : 'west',
				width : 350,
				split			: true ,
				style			: Const.borderLine.right ,

			},{	region	: 'center',
				layout	: 'border',
				flex	: 1,
				items	: [
					{	region 	: 'north',
						flex	: 1,
						layout	: 'border',
						split	: true ,
						style	: Const.borderLine.top,
						items	: [
						     {	xtype	: 'tab-panel',
						    	region 	: 'west',
								flex	: 1,
								layout	: 'fit',
								split	: true ,
								itemId	: 'topLeftPanel',
								style	: Const.borderLine.top,
								items	: [
								     { title:'수주', xtype : 'module-lottracking-acpt-lister', flex : 1	},
								     { title:'발주',	xtype : 'module-lottracking-ordr-lister', flex : 1	,hidden : true},
								]
							},{	xtype	: 'tab-panel',
						    	region 	: 'center',
								flex	: 1,
								layout	: 'fit',
								split	: true ,
								style	: Const.borderLine.top,
								itemId	: 'topRightPanel',
								items	: [
								     {  title:'공정',xtype : 'module-lottracking-pror-lister', flex : 1	},
								     {	title:'입고',xtype : 'module-lottracking-istt-lister', flex : 1	,hidden : true},
								]
							},
						]
					},{	xtype		: 'tab-panel',
				    	region 		: 'center',
						flex		: 1,
						layout		: 'fit',
						itemId		: 'bottomPanel',
						items		: [
						     {  title:'투입자재',xtype : 'module-lottracking-workmtrl-lister', flex : 1	},
						     {	title:'사용품목',xtype : 'module-lottracking-prod-lister', flex : 1	,hidden : true},
						]
					}
				]
			},
		];
		me.callParent(arguments);
	}
});