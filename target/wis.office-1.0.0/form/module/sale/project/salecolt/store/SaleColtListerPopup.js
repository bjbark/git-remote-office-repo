Ext.define('module.sale.project.salecolt.store.SaleColtListerPopup', { extend:'Axt.data.Store',
	model : 'module.sale.project.salecolt.model.SaleColtListerPopup',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/salecolt/get/listerpopup.do",
			update : _global.location.http() + "/sale/project/salecolt/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});