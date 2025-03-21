Ext.define('module.sale.project.prjtwork.store.PrjtWorkDetail1', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtwork.model.PrjtWorkDetail1',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtwork/get/detail1.do",
			update : _global.location.http() + "/sale/project/prjtwork/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});