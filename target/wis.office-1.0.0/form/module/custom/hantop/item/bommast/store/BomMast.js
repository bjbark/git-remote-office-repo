Ext.define('module.custom.hantop.item.bommast.store.BomMast', { extend:'Axt.data.Store',
	model	: 'module.custom.hantop.item.bommast.model.BomMast',
	pageSize: 200,
	proxy	: {
		api	: {
			 read	: _global.location.http() + "/custom/hantop/item/bommast/get/brand.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});