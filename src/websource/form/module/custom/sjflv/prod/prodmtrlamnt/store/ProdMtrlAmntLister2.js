Ext.define('module.custom.sjflv.prod.prodmtrlamnt.store.ProdMtrlAmntLister2', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.prod.prodmtrlamnt.model.ProdMtrlAmnt',
	pageSize : 200,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/custom/sjflv/prod/prodmtrlamnt/get/list2.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});