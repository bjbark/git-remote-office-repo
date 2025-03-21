Ext.define('module.workshop.sale.sale.salelist.store.SaleListLister2', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.sale.salelist.model.SaleListLister2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/workshop/sale/sale/salelist/get/list2.do",
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});