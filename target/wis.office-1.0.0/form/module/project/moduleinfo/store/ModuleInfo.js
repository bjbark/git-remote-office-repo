Ext.define('module.project.moduleinfo.store.ModuleInfo', { extend:'Axt.data.TreeStore',
	model	: 'module.project.moduleinfo.model.ModuleInfo',
	autoLoad: false,
	root	: { expanded: false },
	proxy	: {
		api	: {
			read   : _global.location.http() + "/project/moduleinfo/get/search.do",
		    update : _global.location.http() + "/project/moduleinfo/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});

