Ext.define('module.custom.dhtec.prod.bomwork.store.BomWorkDetail3', { extend:'Axt.data.Store',
	model : 'module.custom.dhtec.prod.bomwork.model.BomWorkDetail3',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/dhtec/prod/bomwork/get/search3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});