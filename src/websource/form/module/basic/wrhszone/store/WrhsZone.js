Ext.define('module.basic.wrhszone.store.WrhsZone', { extend:'Axt.data.Store',
	model: 'module.basic.wrhszone.model.WrhsZone',
	pageSize: 100,
	proxy:{
		api:{
			 read	: _global.location.http() + "/basic/wrhszone/get/search.do"
			,update : _global.location.http() + "/basic/wrhszone/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});