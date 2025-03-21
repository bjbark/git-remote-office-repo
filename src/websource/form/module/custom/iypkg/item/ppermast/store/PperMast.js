Ext.define('module.custom.iypkg.item.ppermast.store.PperMast', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.item.ppermast.model.PperMast',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/item/ppermast/get/search.do",
			update : _global.api_host_info + "/system/custom/iypkg/item/ppermast/set/record.do"
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

