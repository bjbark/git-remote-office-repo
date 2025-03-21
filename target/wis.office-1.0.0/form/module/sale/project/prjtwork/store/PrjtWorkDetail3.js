Ext.define('module.sale.project.prjtwork.store.PrjtWorkDetail3', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtwork.model.PrjtWorkDetail3',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtwork/get/detail3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});