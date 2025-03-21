Ext.define('module.custom.hantop.item.itemmodel.store.ItemModelDetail1', { extend:'Axt.data.Store',
	model	: 'module.custom.hantop.item.itemmodel.model.ItemModelDetail1',
	pageSize: 200,
	proxy	: {
		api	: {
			 read	: _global.location.http() + "/custom/hantop/item/itemmodel/get/wdgrsearch.do"
//			,update : _global.location.http() + "/custom/hantop/item/itemmodel/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});