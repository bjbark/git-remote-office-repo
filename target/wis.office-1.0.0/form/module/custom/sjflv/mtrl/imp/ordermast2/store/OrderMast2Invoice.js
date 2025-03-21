Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.store.OrderMast2Invoice', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.imp.ordermast2.model.OrderMast2Invoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/mtrl/imp/ordermast2/get/invoice.do",
			update: _global.api_host_info + "/system/custom/sjflv/mtrl/imp/ordermast2/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});

