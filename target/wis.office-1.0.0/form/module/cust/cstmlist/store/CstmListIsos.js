Ext.define('module.cust.cstmlist.store.CstmListIsos', { extend:'Axt.data.Store',
	model	: 'module.cust.cstmlist.model.CstmListIsos',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/cust/cstmmast/get/isos.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});