Ext.define('module.sale.project.prjtwork.store.PrjtWorkDetail4', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtwork.model.PrjtWorkDetail4',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtwork/get/detail4.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});