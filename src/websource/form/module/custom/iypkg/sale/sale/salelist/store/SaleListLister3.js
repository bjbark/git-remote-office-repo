Ext.define('module.custom.iypkg.sale.sale.salelist.store.SaleListLister3', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.sale.sale.salelist.model.SaleList',
	autoLoad: false,
	pageSize	: 99999,
	remoteSort	: false,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/sale/sale/salelist/get/list3.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
