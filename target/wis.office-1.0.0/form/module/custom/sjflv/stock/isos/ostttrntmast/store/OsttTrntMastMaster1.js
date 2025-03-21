Ext.define('module.custom.sjflv.stock.isos.ostttrntmast.store.OsttTrntMastMaster1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.stock.isos.ostttrntmast.model.OsttTrntMastMaster1',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/sjflv/stock/ostttrntmast/get/master1.do",
			update : _global.location.http() + "/custom/sjflv/stock/ostttrntmast/set/deleteMaster.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});