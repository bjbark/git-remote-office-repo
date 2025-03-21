Ext.define('module.custom.sjflv.sale.etc.smplostt.store.SmplOstt', { extend:'Axt.data.Store',
	 model: 'module.custom.sjflv.sale.etc.smplostt.model.SmplOstt',
	pageSize: 20,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/sjflv/sale/etc/smplostt/get/search.do",
			update : _global.location.http() + "/custom/sjflv/sale/etc/smplostt/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});