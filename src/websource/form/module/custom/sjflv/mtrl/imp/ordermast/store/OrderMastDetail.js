Ext.define('module.custom.sjflv.mtrl.imp.ordermast.store.OrderMastDetail', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.imp.ordermast.model.OrderMastDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/mtrl/imp/ordermast/get/detail.do",
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
