Ext.define('module.custom.sjflv.stock.isos.osttwork.store.OsttWork', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.stock.isos.osttwork.model.OsttWork',
	pageSize : 200,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/sjflv/stock/isos/osttwork/get/search.do"
			,update : _global.location.http() + "/custom/sjflv/stock/isos/osttwork/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});