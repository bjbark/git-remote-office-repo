Ext.define('module.custom.aone.sale.order.sordermast.store.SorderMastMaster', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.order.sordermast.model.SorderMastMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	sortField   : 'invc_numb',
	sortDir     : 'DESC',
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/aone/sale/order/sordermast/get/search.do",
			update: _global.api_host_info + "/system/custom/aone/sale/order/sordermast/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
