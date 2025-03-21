Ext.define('module.custom.sjflv.stock.isos.hdlidlvymast.store.HdliDlvyMast', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.stock.isos.hdlidlvymast.model.HdliDlvyMast',
	pageSize : 100,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/sjflv/stock/isos/hdlidlvymast/get/search.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});