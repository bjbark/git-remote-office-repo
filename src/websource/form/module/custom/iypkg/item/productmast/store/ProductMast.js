Ext.define('module.custom.iypkg.item.productmast.store.ProductMast', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.item.productmast.model.ProductMast',
	pageSize : 99999,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/item/productmast/get/search.do",
			update : _global.api_host_info + "/system/custom/iypkg/item/productmast/set/record.do"
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

