Ext.define('module.sale.project.prjtlist.store.PrjtListDetail4', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtlist.model.PrjtListDetail4',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtlist/get/detail4.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});