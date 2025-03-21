Ext.define('module.custom.sjflv.sale.etc.smplmast2.store.SmplMast2Lister5', { extend:'Axt.data.Store',
	 model: 'module.custom.sjflv.sale.etc.smplmast2.model.SmplMast2',
	pageSize: 100,

	proxy:{
		api:{
			read	: _global.location.http() + "/custom/sjflv/sale/etc/smplmast2/get/search.do",
			update : _global.location.http() + "/custom/sjflv/sale/etc/smplmast2/set/record.do"

		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});