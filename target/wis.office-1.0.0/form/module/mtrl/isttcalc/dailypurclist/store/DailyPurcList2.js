Ext.define('module.mtrl.isttcalc.dailypurclist.store.DailyPurcList2', { extend:'Axt.data.Store',
	model		: 'module.mtrl.isttcalc.dailypurclist.model.DailyPurcList',
	pageSize	: 100,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/mtrl/isttcalc/dailypurclist/get/search2.do",
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

