Ext.define('module.mtrl.project.prjtpurcorder.store.PrjtPurcOrderLister', { extend:'Axt.data.Store',
	model: 'module.mtrl.project.prjtpurcorder.model.PrjtPurcOrderLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/mtrl/project/prjtpurcorder/get/lister.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
