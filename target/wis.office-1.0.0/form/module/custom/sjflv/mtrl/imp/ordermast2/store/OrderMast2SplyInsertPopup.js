Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.store.OrderMast2SplyInsertPopup', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.imp.ordermast2.model.OrderMast2Detail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/mtrl/imp/ordermast2/get/sply.do",
			update: _global.api_host_info + "/system/custom/sjflv/mtrl/imp/ordermast2/set/sply.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
