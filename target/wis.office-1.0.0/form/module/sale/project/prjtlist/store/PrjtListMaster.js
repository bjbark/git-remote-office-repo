Ext.define('module.sale.project.prjtlist.store.PrjtListMaster', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtlist.model.PrjtListMaster',

	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtlist/get/master.do",
			update : _global.location.http() + "/sale/project/prjtlist/set/invoice.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});