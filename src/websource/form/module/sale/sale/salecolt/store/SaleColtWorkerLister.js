Ext.define('module.sale.sale.salecolt.store.SaleColtWorkerLister', { extend:'Axt.data.Store',
	model: 'module.sale.sale.salecolt.model.SaleColtWorkerLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/sale/salecolt/get/search.do",
			update: _global.api_host_info + "/system/sale/sale/salecolt/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
