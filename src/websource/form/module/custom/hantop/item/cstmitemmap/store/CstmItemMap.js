Ext.define('module.custom.hantop.item.cstmitemmap.store.CstmItemMap', { extend:'Axt.data.Store',
	model	: 'module.custom.hantop.item.cstmitemmap.model.CstmItemMap',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/custom/hntop/item/cstmitemmap/get/search.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});