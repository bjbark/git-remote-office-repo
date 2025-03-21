Ext.define('module.sale.sale.newitemsale.store.NewItemSale2', { extend:'Axt.data.Store',
	model : 'module.sale.sale.newitemsale.model.NewItemSale',
	pageSize : 200,
	proxy : {
		api : {
			 read	: _global.location.http() + "/sale/sale/newitemsale/get/list2.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});