Ext.define('module.custom.sjflv.sale.order.oemmast.store.OemMastMaster2', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.sale.order.oemmast.model.OemMastMaster2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/sale/order/oemmast/get/search2.do",
			//update	: _global.api_host_info + "/system/custom/sjflv/item/bommast/set/updateRevs.do"
		},
		actionMethods: {
			read	: 'POST' ,
			update	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});
