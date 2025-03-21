Ext.define('module.prod.basic.bopwork.store.BopWorkMaster', { extend:'Axt.data.Store',
	model : 'module.prod.basic.bopwork.model.BopWorkMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/basic/bopwork/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});