Ext.define('module.mtrl.po.purctrstwork.store.PurcTrstWorkInvoice', { extend:'Axt.data.Store',
	model: 'module.mtrl.po.purctrstwork.model.PurcTrstWorkInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/mtrl/po/purctrstwork/get/invoice.do",
			update: _global.api_host_info + "/system/mtrl/po/purctrstwork/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});

