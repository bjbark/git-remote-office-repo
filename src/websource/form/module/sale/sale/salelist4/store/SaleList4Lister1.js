Ext.define('module.sale.sale.salelist4.store.SaleList4Lister1', { extend:'Axt.data.Store',
	model: 'module.sale.sale.salelist4.model.SaleList4Lister1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/sale/salelist4/get/list1.do",
		},
		actionMethods: { read : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});