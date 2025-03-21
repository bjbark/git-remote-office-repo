Ext.define('module.cost.costlist.store.CostList', { extend:'Axt.data.Store',
	model : 'module.cost.costlist.model.CostList',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/cost/costlist/get/search.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});