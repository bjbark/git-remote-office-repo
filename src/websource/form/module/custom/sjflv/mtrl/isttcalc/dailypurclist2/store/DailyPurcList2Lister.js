Ext.define('module.custom.sjflv.mtrl.isttcalc.dailypurclist2.store.DailyPurcList2Lister', { extend:'Axt.data.Store',
	model		: 'module.custom.sjflv.mtrl.isttcalc.dailypurclist2.model.DailyPurcList2',
	pageSize	: 100,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/sjflv/mtrl/isttcalc/dailypurclist2/get/search.do",
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

