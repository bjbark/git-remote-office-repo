Ext.define('module.custom.sjflv.mtrl.isttcalc.purcrettmast.store.PurcRettMastDetail', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.mtrl.isttcalc.purcrettmast.model.PurcRettMastDetail',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/sjflv/mtrl/isttcalc/purcrettmast/get/detail.do",
			update	: _global.location.http() + "/custom/sjflv/mtrl/isttcalc/purcrettmast/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});