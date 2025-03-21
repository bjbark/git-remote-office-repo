Ext.define('module.mtrl.isttcalc.npaysumlist.store.NpaySumList', { extend:'Axt.data.Store',
	model		: 'module.mtrl.isttcalc.npaysumlist.model.NpaySumList',
	pageSize	: 100,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/mtrl/isttcalc/npaysumlist/get/search.do",
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

