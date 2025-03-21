Ext.define('module.mtrl.project.prjtpurcorderlist2.store.PrjtPurcOrderList2ListerDetail', { extend:'Axt.data.Store',
	model : 'module.mtrl.project.prjtpurcorderlist2.model.PrjtPurcOrderList2',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/mtrl/project/prjtpurcorderlist2/get/detail.do",
			update	: _global.location.http() + "/mtrl/project/prjtpurcorderlist2/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});