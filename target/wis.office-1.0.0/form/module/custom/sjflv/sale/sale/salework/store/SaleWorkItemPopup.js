Ext.define('module.custom.sjflv.sale.sale.salework.store.SaleWorkItemPopup', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.sale.salework.model.SaleWorkItemPopup',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: false,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/sale/salework/get/item.do",
//			update: _global.api_host_info + "/system/custom/sjflv/sale/sale/salework/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
