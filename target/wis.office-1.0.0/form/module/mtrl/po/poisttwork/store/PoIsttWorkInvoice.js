Ext.define('module.mtrl.po.poisttwork.store.PoIsttWorkInvoice', { extend:'Axt.data.Store',
	model: 'module.mtrl.po.poisttwork.model.PoIsttWorkInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/mtrl/po/poisttwork/get/invoice.do",
			update: _global.api_host_info + "/system/mtrl/po/poisttwork/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
