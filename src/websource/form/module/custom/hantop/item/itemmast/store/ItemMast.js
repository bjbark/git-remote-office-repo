Ext.define('module.custom.hantop.item.itemmast.store.ItemMast', { extend:'Axt.data.Store',
	model : 'module.custom.hantop.item.itemmast.model.ItemMast',
	pageSize : 100,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/hantop/item/itemmast/get/search.do"
			,update : _global.location.http() + "/custom/hantop/item/itemmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});