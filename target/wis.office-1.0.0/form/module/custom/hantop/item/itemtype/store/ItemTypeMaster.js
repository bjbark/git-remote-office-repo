Ext.define('module.custom.hantop.item.itemtype.store.ItemTypeMaster', { extend:'Axt.data.Store',
	model : 'module.custom.hantop.item.itemtype.model.ItemTypeMaster',
	pageSize : 100,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/hantop/item/itemtype/get/search.do"
			,update : _global.location.http() + "/custom/hantop/item/itemtype/set/record.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});