Ext.define('module.workshop.sale.order.estilist.store.EstiListCnslLister', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.estilist.model.EstiListCnslLister',
	pageSize: 20,
	proxy:{
		api:{
//			read   : _global.api_host_info + "/system/item/itemmast/get/item_memo.do",

			 read	: _global.location.http() + "/workshop/sale/order/estilist/get/cnsl.do"
//			,update : _global.location.http() + "/basic/deptmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});