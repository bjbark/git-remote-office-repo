Ext.define('module.project.daemoninfo.store.DaemonInfo', { extend:'Axt.data.Store',
	model: 'module.project.daemoninfo.model.DaemonInfo',
	autoLoad: false,
	remoteSort: true,
	pageSize: 20,
	proxy:{
		api:{
			read   : _global.location.http()  + "/project/daemoninfo/get/search.do"
		   ,update : _global.location.http()  + "/project/daemoninfo/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});