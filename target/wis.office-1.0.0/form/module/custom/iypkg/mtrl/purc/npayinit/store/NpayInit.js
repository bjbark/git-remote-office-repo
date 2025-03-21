Ext.define('module.custom.iypkg.mtrl.purc.npayinit.store.NpayInit', { extend:'Axt.data.Store',
	model		: 'module.custom.iypkg.mtrl.purc.npayinit.model.NpayInit',
	pageSize	: 100,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/iypkg/mtrl/purc/npayinit/get/search.do",
			update	: _global.api_host_info + "/system/custom/iypkg/mtrl/purc/npayinit/set/record.do"
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

