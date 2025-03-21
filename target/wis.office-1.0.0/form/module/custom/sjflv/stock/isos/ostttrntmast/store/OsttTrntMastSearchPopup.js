Ext.define('module.custom.sjflv.stock.isos.ostttrntmast.store.OsttTrntMastSearchPopup', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.stock.isos.ostttrntmast.model.OsttTrntMastMaster1',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/sjflv/stock/ostttrntmast/get/search.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});