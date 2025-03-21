Ext.define('module.custom.dhtec.prod.bomwork.store.BomWorkStore2', { extend:'Axt.data.Store',
	model: 'module.custom.dhtec.prod.bomwork.model.BomWorkModel2',
	proxy: {
		api: {
			read  : _global.location.http() + "/custom/dhtec/prod/bomwork/get/bommast.do",
			update: _global.location.http() + "/custom/dhtec/prod/bomwork/set/bommast.do"
		},
		actionMethods: {
			read  : 'POST',
			update: 'POST' },
		extraParams: {
			token : _global.token_id
		}
	}
});