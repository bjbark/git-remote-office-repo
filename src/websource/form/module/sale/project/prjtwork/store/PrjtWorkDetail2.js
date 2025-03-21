Ext.define('module.sale.project.prjtwork.store.PrjtWorkDetail2', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtwork.model.PrjtWorkDetail2',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtwork/get/detail2.do",
			update : _global.location.http() + "/sale/project/prjtwork/set/detail2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});