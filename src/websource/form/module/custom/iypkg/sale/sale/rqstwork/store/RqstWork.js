Ext.define('module.custom.iypkg.sale.sale.rqstwork.store.RqstWork', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.sale.sale.rqstwork.model.RqstWork',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/sale/sale/rqstwork/get/search.do",
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

