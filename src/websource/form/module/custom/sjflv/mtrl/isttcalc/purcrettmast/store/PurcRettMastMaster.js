Ext.define('module.custom.sjflv.mtrl.isttcalc.purcrettmast.store.PurcRettMastMaster', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.mtrl.isttcalc.purcrettmast.model.PurcRettMastMaster',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/sjflv/mtrl/isttcalc/purcrettmast/get/master.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});