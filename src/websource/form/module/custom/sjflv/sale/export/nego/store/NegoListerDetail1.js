Ext.define('module.custom.sjflv.sale.export.nego.store.NegoListerDetail1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.nego.model.NegoListerDetail1',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/sjflv/sale/export/nego/get/listerdetail1.do",
			update	: _global.location.http() + "/.custom.sjflv.sale.export.nego/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});