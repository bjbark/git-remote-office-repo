Ext.define('module.custom.sjflv.stock.isos.etcosttwork.store.EtcOsttWorkInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.stock.isos.etcosttwork.model.EtcOsttWorkInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/stock/etcosttwork/get/invoice.do",
			update: _global.api_host_info + "/system/custom/sjflv/stock/etcosttwork/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
