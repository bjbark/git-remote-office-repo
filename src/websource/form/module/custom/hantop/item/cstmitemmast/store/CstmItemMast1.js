Ext.define('module.custom.hantop.item.cstmitemmast.store.CstmItemMast1', { extend:'Axt.data.Store',
	model	: 'module.custom.hantop.item.cstmitemmast.model.CstmItemMast',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/hantop/item/cstmitemmast/get/search.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});