Ext.define('module.custom.aone.prod.order.sorderworkreport.store.SorderWorkReportMaster', { extend:'Axt.data.Store',
	model: 'module.custom.aone.prod.order.sorderworkreport.model.SorderWorkReportMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/aone/prod/order/sorderworkreport/get/search.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
