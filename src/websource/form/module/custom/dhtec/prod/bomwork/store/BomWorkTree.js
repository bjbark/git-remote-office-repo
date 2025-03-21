Ext.define('module.custom.dhtec.prod.bomwork.store.BomWorkTree', { extend:'Axt.data.TreeStore',
	model : 'module.custom.dhtec.prod.bomwork.model.BomWorkTree',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/dhtec/prod/bomwork/get/search.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});