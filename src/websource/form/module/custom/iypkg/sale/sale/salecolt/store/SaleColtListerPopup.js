Ext.define('module.custom.iypkg.sale.sale.salecolt.store.SaleColtListerPopup', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.sale.sale.salecolt.model.SaleColtListerPopup',
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