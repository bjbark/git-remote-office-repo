Ext.define('module.mtrl.project.prjtpurcorder.store.PrjtPurcOrderInvoice', { extend:'Axt.data.Store',
	model: 'module.mtrl.project.prjtpurcorder.model.PrjtPurcOrderInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/mtrl/project/prjtpurcorder/get/invoice.do",
			update: _global.api_host_info + "/system/mtrl/project/prjtpurcorder/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
