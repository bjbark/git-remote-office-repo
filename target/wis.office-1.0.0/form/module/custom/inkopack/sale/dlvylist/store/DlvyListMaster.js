Ext.define('module.custom.inkopack.sale.dlvylist.store.DlvyListMaster', { extend:'Axt.data.Store',
	model: 'module.custom.inkopack.sale.dlvylist.model.DlvyListMaster',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/incopack/sale/dlvylist/get/search.do",
//			update: _global.api_host_info + "/system/sale/order/saleorder/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
