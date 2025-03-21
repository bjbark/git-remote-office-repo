Ext.define( 'module.custom.sjflv.prod.prodplanmtrl.ProdPlanMtrl', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
	],
	models: [
		'module.custom.sjflv.prod.prodplanmtrl.model.ProdPlanMtrlModel1',
	],
	stores: [
		'module.custom.sjflv.prod.prodplanmtrl.store.ProdPlanMtrlStore1',
	],
	views : [
		'module.custom.sjflv.prod.prodplanmtrl.view.ProdPlanMtrlSearch',
		'module.custom.sjflv.prod.prodplanmtrl.view.ProdPlanMtrlLister1',
		'module.custom.sjflv.prod.prodplanmtrl.view.ProdPlanMtrlLayout',
		'module.custom.sjflv.prod.prodplanmtrl.view.ProdPlanMtrlPopup'
	],
	
	initPermission: function(workspace, permission) {

	},
	
	init: function() {
		var me = this;
		me.control({
			'module-sjflv-prodplanmtrl-search button[action=selectAction]'			: { click: me.selectAction	}, // 조회
		});
		me.callParent(arguments);
	},
	
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-sjflv-prodplanmtrl-layout'			)[0] } ,
		search		: function () { return Ext.ComponentQuery.query('module-sjflv-prodplanmtrl-search'			)[0] } ,
		grid1		: function () { return Ext.ComponentQuery.query('module-sjflv-prodplanmtrl-lister1'			)[0] } ,
	},
	
	selectAction:function() {
		var me = this,
		formData = me.pocket.search().getValues(),
		grid = me.pocket.grid1();
		
		grid.select({
			callback: function(records, operation, success) {
				if (success) {
					
				} else {
					
				}
			},
			scope: me
		}, Ext.merge( formData, {stor_id : _global.stor_id}) );
	},
	
	exportAction : function(){
	}
});
