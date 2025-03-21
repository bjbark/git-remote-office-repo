Ext.define('module.custom.sjflv.sale.sale.salework.store.SaleWorkModifyPopup', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.sale.salework.model.SaleWorkModifiyPopup',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: false,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/sale/salework/get/popup.do",
			update: _global.api_host_info + "/system/custom/sjflv/sale/sale/salework/set/popup.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
