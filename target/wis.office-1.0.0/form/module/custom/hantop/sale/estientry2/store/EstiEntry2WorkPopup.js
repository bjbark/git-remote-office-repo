Ext.define('module.custom.hantop.sale.estientry2.store.EstiEntry2WorkPopup', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.sale.estientry2.model.EstiEntry2WorkPopup',
	autoLoad: false,
	pageSize: 200,
	remoteSort	: true,
	proxy:{
		api:{
			update : _global.api_host_info + "/system/custom/hntop/sale/estientry2/set/main.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
