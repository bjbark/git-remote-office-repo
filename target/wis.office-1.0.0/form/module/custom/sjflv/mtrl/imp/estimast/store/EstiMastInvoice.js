Ext.define('module.custom.sjflv.mtrl.imp.estimast.store.EstiMastInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.imp.estimast.model.EstiMastInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/mtrl/imp/estimast/get/invoice.do",
			update: _global.api_host_info + "/system/custom/sjflv/mtrl/imp/estimast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
