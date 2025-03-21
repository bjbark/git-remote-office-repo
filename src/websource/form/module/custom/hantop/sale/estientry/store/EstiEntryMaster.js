Ext.define('module.custom.hantop.sale.estientry.store.EstiEntryMaster', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.sale.estientry.model.EstiEntryMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/hntop/sale/estientry/get/search.do",
//			update: _global.api_host_info + "/system/custom/iypkg/sale/order/estimast1/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
