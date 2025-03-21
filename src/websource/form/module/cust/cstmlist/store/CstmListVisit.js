Ext.define('module.cust.cstmlist.store.CstmListVisit', { extend:'Axt.data.Store',
	model	: 'module.cust.cstmlist.model.CstmListVisit',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.api_host_info + "/system/cust/cstmvist/get/detailsearch.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});