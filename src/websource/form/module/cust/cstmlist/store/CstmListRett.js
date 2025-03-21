Ext.define('module.cust.cstmlist.store.CstmListRett', { extend:'Axt.data.Store',
	model	: 'module.cust.cstmlist.model.CstmListRett',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/cust/cstmmast/get/rett.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});