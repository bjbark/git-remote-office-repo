Ext.define('module.prod.basic.bopwork.store.BopWorkDetail3', { extend:'Axt.data.Store',
	model : 'module.prod.basic.bopwork.model.BopWorkDetail3',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/basic/bopwork/get/search3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});