Ext.define('module.sale.salework.store.SaleWorkDetail', { extend:'Axt.data.Store',
	model    : 'module.sale.salework.model.SaleWorkDetail',
	autoLoad : false,
	pageSize : Const.SELECT.rows,
	proxy    : {
		api  : {
		   read : _global.api_host_info + "/system/sale/salework/get/detail.do"
		},
		actionMethods : { read : 'POST' },
		extraParams : {
			token : _global.token_id
		}
	}
});