Ext.define('module.custom.sjflv.stock.isos.ostttrntmast.store.OsttTrntMastDetail1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.stock.isos.ostttrntmast.model.OsttTrntMastDetail1',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/sjflv/stock/ostttrntmast/get/detail1.do",
			update	: _global.location.http() + "/custom/sjflv/stock/ostttrntmast/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});