Ext.define('module.custom.sjflv.sale.export.ordermast2.store.OrderMast2NegoPopup', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2NegoPopup',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/sjflv/sale/export/ordermast2/get/nego.do",
			update : _global.api_host_info + "/system/custom/sjflv/sale/export/ordermast2/set/nego.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
