Ext.define('module.custom.iypkg.item.productmast.store.ProductMastWkctEditor', { extend:'Axt.data.Store',
	model		: 'module.custom.iypkg.item.productmast.model.ProductMastWkct',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: Const.SELECT.rows,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/iypkg/item/productmast/get/wkctsearch.do",
			update	: _global.api_host_info + "/system/custom/iypkg/item/productmast/set/prodwkct.do"
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

