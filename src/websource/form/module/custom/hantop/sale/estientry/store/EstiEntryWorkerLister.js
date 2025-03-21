Ext.define('module.custom.hantop.sale.estientry.store.EstiEntryWorkerLister', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.sale.estientry.model.EstiEntryDetail',
	autoLoad: false,
	pageSize: 200,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/hntop/sale/estientry/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
