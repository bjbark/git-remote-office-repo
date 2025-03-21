Ext.define('module.custom.sjflv.sale.export.exptpayment.store.ExptPaymentWorkerDetail', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.exptpayment.model.ExptPaymentWorkerDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/export/exptpayment/get/workerdetail.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
