Ext.define('module.custom.sjflv.stock.isos.osttwork.store.OsttWork2', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.stock.isos.osttwork.model.OsttWork2',
	pageSize : 200,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/sjflv/stock/isos/osttwork/get/search2.do"
		},
		actionMethods: { read: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});