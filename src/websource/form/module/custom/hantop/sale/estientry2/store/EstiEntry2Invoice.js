Ext.define('module.custom.hantop.sale.estientry2.store.EstiEntry2Invoice', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.sale.estientry2.model.EstiEntry2Invoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/hntop/sale/estientry2/get/invoice.do",
			update: _global.api_host_info + "/system/custom/hntop/sale/estientry2/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
