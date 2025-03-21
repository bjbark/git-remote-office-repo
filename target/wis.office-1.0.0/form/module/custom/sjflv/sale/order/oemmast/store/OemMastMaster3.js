Ext.define('module.custom.sjflv.sale.order.oemmast.store.OemMastMaster3', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.sale.order.oemmast.model.OemMastMaster3',
	autoLoad: false,
	remoteSort:true,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/sale/order/oemmast/get/search3.do",
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
