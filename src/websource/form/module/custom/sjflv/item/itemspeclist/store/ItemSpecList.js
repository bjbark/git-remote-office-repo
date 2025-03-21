Ext.define('module.custom.sjflv.item.itemspeclist.store.ItemSpecList', { extend:'Axt.data.Store',
	model    : 'module.custom.sjflv.item.itemspeclist.model.ItemSpecList',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/sjflv/item/itemspeclist/get/search.do"
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

