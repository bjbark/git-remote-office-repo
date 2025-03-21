Ext.define('module.custom.sjflv.mtrl.imp.estimast.store.EstiMastMaster', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.imp.estimast.model.EstiMastMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/mtrl/imp/estimast/get/search.do",
//			update: _global.api_host_info + "/system/custom/sjflv/mtrl/imp/estimast/set/invoice.do"
			update: _global.api_host_info + "/system/custom/sjflv/mtrl/imp/estimast/set/master.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
