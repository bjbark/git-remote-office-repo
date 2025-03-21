Ext.define('module.project.sscdmast.store.SscdMast', {extend:'Axt.data.Store',
	model: 'module.project.sscdmast.model.SscdMast',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.location.http() + "/project/sscdmast/get/search.do"
		   ,update : _global.location.http() + "/project/sscdmast/set/master.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});