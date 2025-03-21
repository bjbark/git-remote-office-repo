Ext.define('module.custom.dhtec.prod.bomwork.store.BomWorkMaster', { extend:'Axt.data.Store',
	model : 'module.custom.dhtec.prod.bomwork.model.BomWorkMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/dhtec/prod/bomwork/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});