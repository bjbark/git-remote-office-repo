Ext.define('module.custom.dhtec.sale.etc.smplmast.store.SmplMast', { extend:'Axt.data.Store',
	 model: 'module.custom.dhtec.sale.etc.smplmast.model.SmplMast',
	pageSize: 20,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/dhtec/sale/etc/smplmast/get/search.do",
			update : _global.location.http() + "/custom/dhtec/sale/etc/smplmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});