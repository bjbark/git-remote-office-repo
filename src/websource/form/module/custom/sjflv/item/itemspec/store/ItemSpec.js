Ext.define('module.custom.sjflv.item.itemspec.store.ItemSpec', { extend:'Axt.data.Store',
	model    : 'module.custom.sjflv.item.itemspec.model.ItemSpec',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/sjflv/item/itemspec/get/search.do",
			update : _global.api_host_info + "/system/custom/sjflv/item/itemspec/set/record.do"
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

