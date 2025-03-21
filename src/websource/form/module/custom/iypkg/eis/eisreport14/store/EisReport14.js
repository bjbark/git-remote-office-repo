Ext.define('module.custom.iypkg.eis.eisreport14.store.EisReport14', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport14.model.EisReport14',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/order/prodrealtime/get/search1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});