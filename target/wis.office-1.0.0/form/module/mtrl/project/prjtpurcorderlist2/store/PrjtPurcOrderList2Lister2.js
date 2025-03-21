Ext.define('module.mtrl.project.prjtpurcorderlist2.store.PrjtPurcOrderList2Lister2', { extend:'Axt.data.Store',
	model	: 'module.mtrl.project.prjtpurcorderlist2.model.PrjtPurcOrderList2',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/mtrl/project/prjtpurcorderlist2/get/lister2.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});