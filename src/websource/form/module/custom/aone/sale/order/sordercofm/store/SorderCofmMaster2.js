Ext.define('module.custom.aone.sale.order.sordercofm.store.SorderCofmMaster2', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.order.sordercofm.model.SorderCofmDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/aone/sale/order/sordercofm/get/detail.do",

		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
