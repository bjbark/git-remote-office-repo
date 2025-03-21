Ext.define('module.custom.sjflv.mtrl.isttcalc.dailypurclist2.store.DailyPurcList2Lister4', { extend:'Axt.data.Store',
	model		: 'module.custom.sjflv.mtrl.isttcalc.dailypurclist2.model.DailyPurcList2',
	pageSize	: 100,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/sjflv/mtrl/isttcalc/dailypurclist2/get/search4.do",
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

