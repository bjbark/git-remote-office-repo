Ext.define('module.custom.sjflv.mtrl.isttcalc.purcrettmast.store.PurcRettMastInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.isttcalc.purcrettmast.model.PurcRettMastInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/mtrl/isttcalc/purcrettmast/get/invoice.do",
			update: _global.api_host_info + "/system/custom/sjflv/mtrl/isttcalc/purcrettmast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
