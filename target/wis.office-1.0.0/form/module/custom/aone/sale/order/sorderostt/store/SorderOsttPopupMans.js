Ext.define('module.custom.aone.sale.order.sorderostt.store.SorderOsttPopupMans', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.order.sorderostt.model.SorderOsttPopupMans',
	pageSize: Const.SELECT.rows,
	remoteSort	: false,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/aone/prod/order/sorderworkentry/get/workBookMans.do",
			update: _global.api_host_info + "/system/custom/aone/prod/order/sorderworkentry/set/popupMans.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
