Ext.define('module.custom.hantop.sale.estientry.store.EstiEntryDetail2', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.sale.estientry.model.EstiEntryDetail2',
	autoLoad: false,
	pageSize: 200,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/hntop/sale/estientry/get/detail2.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
