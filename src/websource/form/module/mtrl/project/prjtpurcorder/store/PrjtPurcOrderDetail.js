Ext.define('module.mtrl.project.prjtpurcorder.store.PrjtPurcOrderDetail', { extend:'Axt.data.Store',
	model: 'module.mtrl.project.prjtpurcorder.model.PrjtPurcOrderDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/mtrl/project/prjtpurcorder/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
