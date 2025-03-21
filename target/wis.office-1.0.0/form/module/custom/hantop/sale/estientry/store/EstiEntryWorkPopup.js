Ext.define('module.custom.hantop.sale.estientry.store.EstiEntryWorkPopup', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.sale.estientry.model.EstiEntryWorkPopup',
	autoLoad: false,
	pageSize: 200,
	remoteSort	: true,
	proxy:{
		api:{
			update : _global.api_host_info + "/system/custom/hntop/sale/estientry/set/main.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
