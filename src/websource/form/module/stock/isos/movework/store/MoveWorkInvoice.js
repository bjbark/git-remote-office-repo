Ext.define('module.stock.isos.movework.store.MoveWorkInvoice', { extend:'Axt.data.Store',
	model: 'module.stock.isos.movework.model.MoveWorkInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/stock/movework/get/invoice.do",
			update: _global.api_host_info + "/system/stock/movework/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
