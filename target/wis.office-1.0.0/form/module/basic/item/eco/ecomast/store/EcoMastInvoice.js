Ext.define('module.basic.item.eco.ecomast.store.EcoMastInvoice', { extend:'Axt.data.Store',
	model: 'module.basic.item.eco.ecomast.model.EcoMastInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/basic/item/eco/get/invoice.do",
			update: _global.api_host_info + "/system/basic/item/eco/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
