Ext.define('module.sale.project.prjtprocess.store.PrjtProcessDetail1', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtprocess.model.PrjtProcessDetail1',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtprocess/get/detail1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});