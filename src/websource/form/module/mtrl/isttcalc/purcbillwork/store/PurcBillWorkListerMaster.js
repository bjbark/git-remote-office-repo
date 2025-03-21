Ext.define('module.mtrl.isttcalc.purcbillwork.store.PurcBillWorkListerMaster', { extend:'Axt.data.Store',
	model    : 'module.mtrl.isttcalc.purcbillwork.model.PurcBillWorkListerMaster',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/mtrl/isttcalc/purcbillwork/get/master1.do",
		},
		actionMethods: {
			read   : 'POST',
			update : 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});

