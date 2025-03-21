Ext.define('module.custom.sjflv.mtrl.imp.ordermast.store.OrderMastMaster', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.imp.ordermast.model.OrderMastMaster',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/mtrl/imp/ordermast/get/search.do",
			update: _global.api_host_info + "/system/custom/sjflv/mtrl/imp/ordermast/set/deleteMaster.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
