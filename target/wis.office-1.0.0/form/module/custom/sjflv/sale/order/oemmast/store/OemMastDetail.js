Ext.define('module.custom.sjflv.sale.order.oemmast.store.OemMastDetail', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.sale.order.oemmast.model.OemMastDetail',
	autoLoad: false,
	remoteSort:true,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/order/oemmast/get/detail.do",
			//update	: _global.api_host_info + "/system/custom/sjflv/item/bommast/set/recordBom.do"
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
