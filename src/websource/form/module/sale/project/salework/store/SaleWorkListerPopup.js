Ext.define('module.sale.project.salework.store.SaleWorkListerPopup', { extend:'Axt.data.Store',
	model : 'module.sale.project.salework.model.SaleWorkListerPopup',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/salework/get/listerpopup.do",
			update : _global.location.http() + "/sale/project/salework/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id,test :{} }
	}
});