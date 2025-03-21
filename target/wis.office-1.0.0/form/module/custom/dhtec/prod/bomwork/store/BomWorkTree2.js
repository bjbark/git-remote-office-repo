Ext.define('module.custom.dhtec.prod.bomwork.store.BomWorkTree2', { extend:'Axt.data.Store',
	model : 'module.custom.dhtec.prod.bomwork.model.BomWorkTree2',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/dhtec/prod/bomwork/get/search2.do",
			update	: _global.location.http() + "/custom/dhtec/prod/bomwork/set/qntt.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});