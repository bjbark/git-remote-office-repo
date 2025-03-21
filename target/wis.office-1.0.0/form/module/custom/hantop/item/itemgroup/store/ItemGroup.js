Ext.define('module.custom.hantop.item.itemgroup.store.ItemGroup', { extend:'Axt.data.Store',
	model : 'module.custom.hantop.item.itemgroup.model.ItemGroup',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/hantop/item/itemgroup/get/search.do"
			,update : _global.location.http() + "/custom/hantop/item/itemgroup/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});