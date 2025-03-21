Ext.define('module.custom.iypkg.sale.order.sptsmast.store.SptsMastWorker', { extend:'Axt.data.Store',

	model: 'module.custom.iypkg.sale.order.sptsmast.model.SptsMastWorker',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: false,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/sale/order/sptsmast/get/search2.do",
			update: _global.api_host_info + "/system/custom/iypkg/sale/order/sptsmast/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
