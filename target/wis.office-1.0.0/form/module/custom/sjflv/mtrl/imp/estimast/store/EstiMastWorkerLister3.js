Ext.define('module.custom.sjflv.mtrl.imp.estimast.store.EstiMastWorkerLister3', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.imp.estimast.model.EstiMastLister3',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/mtrl/imp/estimast/get/lister3.do",
			update: _global.api_host_info + "/system/custom/sjflv/mtrl/imp/estimast/set/lister3.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
