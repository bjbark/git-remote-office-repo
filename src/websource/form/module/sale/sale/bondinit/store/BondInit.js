Ext.define('module.sale.sale.bondinit.store.BondInit', { extend:'Axt.data.Store',
	model		: 'module.sale.sale.bondinit.model.BondInit',
	pageSize	: 100,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/sale/sale/bondinit/get/search.do",
			update  : _global.api_host_info + "/system/sale/sale/bondinit/set/record.do"
		},
		actionMethods: {
			read	: 'POST',
			update	: 'POST'
		},
		extraParams:{
			token	: _global.token_id
		}
	}
});

