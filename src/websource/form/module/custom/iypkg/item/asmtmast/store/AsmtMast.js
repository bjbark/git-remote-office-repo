Ext.define('module.custom.iypkg.item.asmtmast.store.AsmtMast', { extend:'Axt.data.Store',
	model		: 'module.custom.iypkg.item.asmtmast.model.AsmtMast',
	pageSize	: 100,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/iypkg/item/asmtmast/get/search.do",
			update	: _global.api_host_info + "/system/custom/iypkg/item/asmtmast/set/record.do"
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

