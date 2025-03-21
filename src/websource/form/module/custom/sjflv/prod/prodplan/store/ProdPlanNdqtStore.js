Ext.define('module.custom.sjflv.prod.prodplan.store.ProdPlanNdqtStore', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.prod.prodplan.model.ProdPlanNdqtModel',
	autoLoad: false,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/prod/prodplan/get/prodplanndqt.do"
		},
		actionMethods: {
			read	: 'POST' 
		},
		extraParams:{
			token : _global.token_id
		}
	},
});
