Ext.define('module.custom.iypkg.stock.isos.osttwaitlist.store.OsttWaitListLister2', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.stock.isos.osttwaitlist.model.OsttWaitList2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/stock/isos/osttwaitlist/get/search2.do",
//			update: _global.api_host_info + "/system/sale/order/estimast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
