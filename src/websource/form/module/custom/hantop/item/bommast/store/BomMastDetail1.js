Ext.define('module.custom.hantop.item.bommast.store.BomMastDetail1', { extend:'Axt.data.Store',
	model	: 'module.custom.hantop.item.bommast.model.BomMastDetail1',
	pageSize: 200,
	proxy	: {
		api	: {
			 read	: _global.location.http() + "/custom/hantop/item/bommast/get/wdgrsearch.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});