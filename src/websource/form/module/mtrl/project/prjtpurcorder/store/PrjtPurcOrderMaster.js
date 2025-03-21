Ext.define('module.mtrl.project.prjtpurcorder.store.PrjtPurcOrderMaster', { extend:'Axt.data.Store',
	model: 'module.mtrl.project.prjtpurcorder.model.PrjtPurcOrderMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/mtrl/project/prjtpurcorder/get/search.do",
			update: _global.api_host_info + "/system/mtrl/project/prjtpurcorder/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
