Ext.define('module.workshop.prod.workentry.store.WorkEntry', { extend:'Axt.data.Store',
	model: 'module.workshop.prod.workentry.model.WorkEntry',
	pageSize: 20,
	proxy:{
		api:{
//			 read	: _global.location.http() + "/basic/deptmast/get/search.do"
//			,update : _global.location.http() + "/basic/deptmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});