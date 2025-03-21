Ext.define('module.sale.spts.sptsmast.store.SptsMastWorkInvoice', { extend:'Axt.data.Store',
	model: 'module.sale.spts.sptsmast.model.SptsMastWorkInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/spts/sptsmast/get/invoice2.do",
			update: _global.api_host_info + "/system/sale/spts/sptsmast/set/invoice2.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
