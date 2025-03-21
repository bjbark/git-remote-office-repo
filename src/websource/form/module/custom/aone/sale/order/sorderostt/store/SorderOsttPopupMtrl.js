Ext.define('module.custom.aone.sale.order.sorderostt.store.SorderOsttPopupMtrl', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.order.sorderostt.model.SorderOsttPopupMtrl',
	pageSize: Const.SELECT.rows,
	remoteSort	: false,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/aone/prod/order/sorderworkentry/get/workBookMtrl.do",
			update: _global.api_host_info + "/system/custom/aone/prod/order/sorderworkentry/set/popupMtrl.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
