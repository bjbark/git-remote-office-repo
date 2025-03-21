Ext.define('module.cost.stndcost.store.StndCostUpload', { extend:'Axt.data.Store',
	model: 'module.cost.stndcost.model.StndCostUpload',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 100,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/cost/stndcost/get/search.do",
			update: _global.api_host_info + "/system/cost/stndcost/excel.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
