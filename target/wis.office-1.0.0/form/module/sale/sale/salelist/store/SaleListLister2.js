Ext.define('module.sale.sale.salelist.store.SaleListLister2', { extend:'Axt.data.Store',
	model: 'module.sale.sale.salelist.model.SaleListLister2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/sale/sale/salelist/get/list2.do",
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});