Ext.define('module.custom.sjflv.mtrl.isttcalc.purccstmlist1.store.PurcCstmList1', { extend:'Axt.data.Store',
	model		: 'module.custom.sjflv.mtrl.isttcalc.purccstmlist1.model.PurcCstmList1',
	pageSize	: 100,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/sjflv/mtrl/isttcalc/pucrcstmlist1/get/search.do",
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

