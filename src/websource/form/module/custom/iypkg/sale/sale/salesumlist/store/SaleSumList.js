Ext.define('module.custom.iypkg.sale.sale.salesumlist.store.SaleSumList', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.sale.sale.salesumlist.model.SaleSumList',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/sale/salesumlist/get/search.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
