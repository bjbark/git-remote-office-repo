Ext.define('module.custom.dehansol.sale.salelist4.store.SaleList4', { extend:'Axt.data.Store',
	model : 'module.custom.dehansol.sale.salelist4.model.SaleList4',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/dehansol/sale/salelist4/get/search.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});