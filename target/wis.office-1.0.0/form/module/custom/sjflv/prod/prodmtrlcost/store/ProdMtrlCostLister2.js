Ext.define('module.custom.sjflv.prod.prodmtrlcost.store.ProdMtrlCostLister2', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.prod.prodmtrlcost.model.ProdMtrlCost',
	pageSize : 200,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/custom/sjflv/prod/prodmtrlcost/get/list2.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});