Ext.define('module.mtrl.project.prjtpurcorderlist.store.PrjtPurcOrderListMaster', { extend:'Axt.data.Store',
	model	: 'module.mtrl.project.prjtpurcorderlist.model.PrjtPurcOrderList',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/mtrl/project/prjtpurcorderlist/get/master.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});