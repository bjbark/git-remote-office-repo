Ext.define('module.custom.dhtec.prod.bomwork.store.BomWorkStore1', { extend:'Axt.data.Store',
	model : 'module.custom.dhtec.prod.bomwork.model.BomWorkModel1',
	pageSize : 40,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/dhtec/prod/bomwork/get/product.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});