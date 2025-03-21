Ext.define('module.prod.basic.stndbopwork.store.StndBopWorkDetail3', { extend:'Axt.data.Store',
	model : 'module.prod.basic.stndbopwork.model.StndBopWorkDetail3',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/basic/stndbopwork/get/search3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});