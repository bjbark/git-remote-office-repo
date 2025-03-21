Ext.define('module.custom.iypkg.item.productmast.store.ProductMastFabcEditor', { extend:'Axt.data.Store',
	model		: 'module.custom.iypkg.item.productmast.model.ProductMastFabc',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: Const.SELECT.rows,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/iypkg/item/productmast/get/fabcsearch.do",
			update	: _global.api_host_info + "/system/custom/iypkg/item/productmast/set/prodfabc.do"
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

