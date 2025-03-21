Ext.define('module.cost.stndcost.store.StndCost', { extend:'Axt.data.Store',
	model : 'module.cost.stndcost.model.StndCost',
	autoLoad : false,
	pageSize : 100,
	remoteSort : true,
	proxy : {
		api : {
			read	: _global.api_host_info + "/system/cost/stndcost/get/search.do",
			update	: _global.api_host_info + "/system/cost/stndcost/set/record.do"
		},
		actionMethods: { read: 'POST' ,update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});