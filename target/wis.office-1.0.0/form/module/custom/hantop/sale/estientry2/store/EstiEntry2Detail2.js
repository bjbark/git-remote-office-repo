Ext.define('module.custom.hantop.sale.estientry2.store.EstiEntry2Detail2', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.sale.estientry2.model.EstiEntry2Detail2',
	autoLoad: false,
	pageSize: 200,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/hntop/sale/estientry2/get/detail2.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
