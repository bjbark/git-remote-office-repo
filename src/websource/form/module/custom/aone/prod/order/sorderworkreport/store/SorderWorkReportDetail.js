Ext.define('module.custom.aone.prod.order.sorderworkreport.store.SorderWorkReportDetail', { extend:'Axt.data.Store',
	model: 'module.custom.aone.prod.order.sorderworkreport.model.SorderWorkReportDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/aone/prod/order/sorderworkreport/get/detail.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
