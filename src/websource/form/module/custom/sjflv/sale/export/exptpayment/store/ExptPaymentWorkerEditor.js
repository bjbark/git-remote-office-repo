Ext.define('module.custom.sjflv.sale.export.exptpayment.store.ExptPaymentWorkerEditor', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.exptpayment.model.ExptPaymentWorkerMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/export/exptpayment/get/workereditor.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
