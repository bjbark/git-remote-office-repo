Ext.define('module.custom.hantop.item.itemset.store.ItemSet', { extend:'Axt.data.Store',
	model : 'module.custom.hantop.item.itemset.model.ItemSet',
	pageSize : 100,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/hantop/item/itemset/get/search.do"
			,update : _global.location.http() + "/custom/hantop/item/itemset/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});