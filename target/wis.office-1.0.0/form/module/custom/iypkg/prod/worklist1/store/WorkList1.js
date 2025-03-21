Ext.define('module.custom.iypkg.prod.worklist1.store.WorkList1', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.prod.worklist1.model.WorkList1',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/prod/worklist1/get/search.do",
//			update : _global.api_host_info + "/system/custom/iypkg/sale/order/slorlist2/set/record.do"
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

