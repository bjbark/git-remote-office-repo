Ext.define('module.custom.iypkg.prod.dailyworklist.store.DailyWorkList', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.dailyworklist.model.DailyWorkList',
	pageSize: 20,
	proxy:{
		api:{
			 read	: _global.location.http() + "/custom/iypkg/prod/dailyworklist/get/search.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});