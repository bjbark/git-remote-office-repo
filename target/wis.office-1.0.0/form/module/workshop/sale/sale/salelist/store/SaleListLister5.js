Ext.define('module.workshop.sale.sale.salelist.store.SaleListLister5', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.sale.salelist.model.SaleListLister5',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/workshop/sale/sale/salelist/get/list5.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});