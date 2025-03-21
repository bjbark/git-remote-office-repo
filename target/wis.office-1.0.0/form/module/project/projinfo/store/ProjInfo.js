Ext.define('module.project.projinfo.store.ProjInfo', { extend:'Axt.data.Store',
	model: 'module.project.projinfo.model.ProjInfo',
	pageSize: 20, 
	proxy:{
		api:{
			read   : _global.location.http()  + "/project/projinfo/get/search.do",
			update : _global.location.http()  + "/project/projinfo/set/record.do"
		}, 
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});