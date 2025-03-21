Ext.define('module.project.storeinfo.store.StoreInfoTrader', { extend:'Axt.data.Store',
	model: 'module.project.storeinfo.model.StoreInfoTrader',
	autoLoad: false,
	pageSize: 20,
	proxy:{
		api:{
			read   : _global.location.http()  + "/project/cstoreinfo/get/trader.do"
		   ,update : _global.location.http()  + "/project/cstoreinfo/set/trader.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});