Ext.define('module.sale.project.prjtchangelist.store.PrjtChangeList', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtchangelist.model.PrjtChangeList',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtchangelist/get/lister.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});