Ext.define('module.custom.sjflv.sale.sale.salecolt.store.SaleColtWorkerLister', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.sale.salecolt.model.SaleColtWorkerLister',
	autoLoad: false,
	pageSize: 9999,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/sale/salecolt/get/search.do",
			update: _global.api_host_info + "/system/custom/sjflv/sale/sale/salecolt/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
