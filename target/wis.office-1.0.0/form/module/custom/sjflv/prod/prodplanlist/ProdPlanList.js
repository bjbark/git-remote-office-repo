Ext.define( 'module.custom.sjflv.prod.prodplanlist.ProdPlanList', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup',
	],
	models: [
		'module.custom.sjflv.prod.prodplanlist.model.ProdPlanListModel1',
		'module.custom.sjflv.prod.prodplanlist.model.ProdPlanListModel2'
	],
	stores: [
		'module.custom.sjflv.prod.prodplanlist.store.ProdPlanListStore1',
		'module.custom.sjflv.prod.prodplanlist.store.ProdPlanListStore2'
	],
	views : [
		'module.custom.sjflv.prod.prodplanlist.view.ProdPlanListLayout',
		'module.custom.sjflv.prod.prodplanlist.view.ProdPlanListLister1',
		'module.custom.sjflv.prod.prodplanlist.view.ProdPlanListLister2',
		'module.custom.sjflv.prod.prodplanlist.view.ProdPlanListSearch',
		'module.custom.sjflv.prod.prodplanlist.view.ProdPlanListPopup1'
	],
	
	initPermission: function(workspace, permission) {

	},
	
	init: function() {
		var me = this;
		me.control({
			'module-sjflv-prodplanlist-search button[action=selectAction]'			: { click: me.selectAction	}, // 조회
		});
		me.callParent(arguments);
	},
	
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-sjflv-prodplanlist-layout'			)[0] } ,
		search		: function () { return Ext.ComponentQuery.query('module-sjflv-prodplanlist-search'			)[0] } ,
		grid1		: function () { return Ext.ComponentQuery.query('module-sjflv-prodplanlist-lister1'			)[0] } ,
		grid2		: function () { return Ext.ComponentQuery.query('module-sjflv-prodplanlist-lister2'			)[0] } ,
	},
	
	selectAction:function() {
		var me = this,
		layout = me.pocket.layout(),
		search = me.pocket.search(),
		param = search.getValues(),
		grid1 = me.pocket.grid1(),
		grid2 = me.pocket.grid2(),
		activeTab = layout.down('tab-panel').getActiveTab().name;
		
		if (activeTab === 'tab1') {
			grid1.select({
				callback: function(records, operation, success) {
					if (success) {
						
					} else {
						
					}
				},
				scope: me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		} else if (activeTab === 'tab3') {
			grid2.select({
				callback: function(records, operation, success) {
					if (success) {
						
					} else {
						
					}
				},
				scope: me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},
	
	exportAction : function(){
		var me = this;

	}
});
