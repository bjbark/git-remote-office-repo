Ext.define('module.custom.iypkg.sale.order.sptsmast.store.SptsMast', { extend:'Axt.data.Store',

	model: 'module.custom.iypkg.sale.order.sptsmast.model.SptsMast',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: false,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/sale/order/sptsmast/get/search.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
