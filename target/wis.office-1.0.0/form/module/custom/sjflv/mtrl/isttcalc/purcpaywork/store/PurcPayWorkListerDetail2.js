Ext.define('module.custom.sjflv.mtrl.isttcalc.purcpaywork.store.PurcPayWorkListerDetail2', { extend:'Axt.data.Store',
	model    : 'module.custom.sjflv.mtrl.isttcalc.purcpaywork.model.PurcPayWorkListerDetail2',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/sjflv/mtrl/isttcalc/purcpaywork/get/detail2.do",
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

