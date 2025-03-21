Ext.define('module.custom.iypkg.sale.sale.rqstwork.store.RqstWorkLister2', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.sale.sale.rqstwork.model.RqstWorkLister2',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/sale/sale/rqstwork/get/search2.do",
		},
		actionMethods: {
			read   : 'POST',
			update : 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});

