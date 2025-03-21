Ext.define('module.sale.project.salecolt.store.SaleColtMaster', { extend:'Axt.data.Store',
	model : 'module.sale.project.salecolt.model.SaleColtMaster',

	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/salecolt/get/master.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});