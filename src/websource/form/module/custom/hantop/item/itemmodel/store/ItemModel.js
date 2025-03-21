Ext.define('module.custom.hantop.item.itemmodel.store.ItemModel', { extend:'Axt.data.Store',
	model	: 'module.custom.hantop.item.itemmodel.model.ItemModel',
	pageSize: 200,
	proxy	: {
		api	: {
			 read	: _global.location.http() + "/custom/hantop/item/itemmodel/get/brand.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});