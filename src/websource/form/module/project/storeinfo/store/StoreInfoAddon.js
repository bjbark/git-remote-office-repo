Ext.define('module.project.storeinfo.store.StoreInfoAddon', { extend:'Axt.data.Store',
	model: 'module.project.storeinfo.model.StoreInfoAddon',
	autoLoad: false,
	pageSize: 20,
	proxy:{
		api:{
			read   : _global.location.http()  + "/project/cstoreinfo/get/addon.do"
		   ,update : _global.location.http()  + "/project/cstoreinfo/set/addon.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});