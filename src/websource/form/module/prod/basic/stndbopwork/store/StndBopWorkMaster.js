Ext.define('module.prod.basic.stndbopwork.store.StndBopWorkMaster', { extend:'Axt.data.Store',
	model : 'module.prod.basic.stndbopwork.model.StndBopWorkMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/basic/stndbopwork/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});