Ext.define('module.project.hostinfo.store.HostInfo', { extend:'Axt.data.Store',
	model: 'module.project.hostinfo.model.HostInfo',
	autoLoad   : false,
	remoteSort : true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.location.http()  + "/project/hostinfo/get/search.do",
			update : _global.location.http()  + "/project/hostinfo/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});