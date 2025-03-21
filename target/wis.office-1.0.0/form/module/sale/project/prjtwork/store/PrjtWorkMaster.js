Ext.define('module.sale.project.prjtwork.store.PrjtWorkMaster', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtwork.model.PrjtWorkMaster',

	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtwork/get/master.do",
			update : _global.location.http() + "/sale/project/prjtwork/set/invoice.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});