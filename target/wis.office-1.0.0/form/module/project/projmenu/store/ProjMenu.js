Ext.define('module.project.projmenu.store.ProjMenu', { extend:'Axt.data.TreeStore',
	model: 'module.project.projmenu.model.ProjMenu',
	autoLoad: false,
	root: { expanded: false },
	proxy:{
		api:{
			read   : _global.location.http() + "/project/projmenu/get/search.do"
		   ,update : _global.location.http() + "/project/projmenu/set/record.do"
		}, 
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});

