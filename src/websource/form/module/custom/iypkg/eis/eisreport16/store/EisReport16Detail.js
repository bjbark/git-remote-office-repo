Ext.define('module.custom.iypkg.eis.eisreport16.store.EisReport16Detail', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport16.model.EisReport16',
	pageSize : 200,
	proxy : {
		api : {
//			read	: _global.location.http() + "/prod/order/prodrealtime/get/search3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});