Ext.define('module.mtrl.isttcalc.npayinit.store.NpayInit', { extend:'Axt.data.Store',
	model		: 'module.mtrl.isttcalc.npayinit.model.NpayInit',
	pageSize	: 100,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/mtrl/isttcalc/npayinit/get/search.do",
			update	: _global.api_host_info + "/system/mtrl/isttcalc/npayinit/set/record.do"
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

