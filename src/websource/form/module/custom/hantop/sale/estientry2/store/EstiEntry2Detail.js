Ext.define('module.custom.hantop.sale.estientry2.store.EstiEntry2Detail', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.sale.estientry2.model.EstiEntry2Detail',
	autoLoad: false,
	pageSize: 200,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/hntop/sale/estientry2/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
