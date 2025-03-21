Ext.define('module.custom.sjflv.mtrl.imp.estimast.store.EstiMastWorkerLister4', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.imp.estimast.model.EstiMastDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
//			read  : _global.api_host_info + "/system/custom/sjflv/mtrl/imp/estimast/get/bom.do",
			update: _global.api_host_info + "/system/custom/sjflv/mtrl/imp/estimast/set/mtrl.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});

