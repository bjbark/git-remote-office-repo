Ext.define('module.custom.sjflv.prod.prodmtrlcost.store.ProdMtrlCost', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.prod.prodmtrlcost.model.ProdMtrlCost',
	autoLoad: false,
	pageSize: 99999,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/custom/sjflv/prod/prodmtrlcost/get/list1.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});