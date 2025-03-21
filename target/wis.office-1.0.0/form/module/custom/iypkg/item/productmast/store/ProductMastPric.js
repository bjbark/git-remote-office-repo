Ext.define('module.custom.iypkg.item.productmast.store.ProductMastPric', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.item.productmast.model.ProductMastPric',
	pageSize : _global.hqof_idcd.toUpperCase()=="N1000LIEBE"?99999:100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/item/productmast/get/pricSearch.do",
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

