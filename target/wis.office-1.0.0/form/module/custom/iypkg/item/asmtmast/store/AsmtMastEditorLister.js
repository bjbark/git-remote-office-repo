Ext.define('module.custom.iypkg.item.asmtmast.store.AsmtMastEditorLister', { extend:'Axt.data.Store',
	model		: 'module.custom.iypkg.item.asmtmast.model.AsmtMastPric',
	pageSize	: 100,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/iypkg/item/asmtmast/get/asmtpric.do",
			update	: _global.api_host_info + "/system/custom/iypkg/item/asmtmast/set/asmtpric.do",
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

