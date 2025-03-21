Ext.define('module.project.storeinfo.store.StoreInfo', { extend:'Axt.data.Store',
	model: 'module.project.storeinfo.model.StoreInfo',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.location.http()  + "/project/cstoreinfo/get/search.do"
		   ,update : _global.location.http()  + "/project/cstoreinfo/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});