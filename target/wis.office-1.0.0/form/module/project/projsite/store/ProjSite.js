Ext.define('module.project.projsite.store.ProjSite', { extend:'Axt.data.Store',
	model: 'module.project.projsite.model.ProjSite',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.location.http()  + "/project/projsite/get/search.do"
		   ,update : _global.location.http()  + "/project/projsite/set/record.do"
		}, 
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});
