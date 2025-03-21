Ext.define('module.mtrl.isttcalc.dailypurclist.store.DailyPurcList', { extend:'Axt.data.Store',
	model		: 'module.mtrl.isttcalc.dailypurclist.model.DailyPurcList',
	pageSize	: 100,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/mtrl/isttcalc/dailypurclist/get/search.do",
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

