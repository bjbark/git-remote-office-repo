Ext.define('module.custom.sjflv.sale.export.blmast.store.BlMastDetail1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.blmast.model.BlMastDetail1',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/sjflv/sale/export/blmast/get/detail1.do",
//			update	: _global.location.http() + "/.custom.sjflv.sale.export.blmast/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});