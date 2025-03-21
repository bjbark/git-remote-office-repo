Ext.define('module.custom.sjflv.mtrl.imp.estimast.store.EstiMastDetail', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.imp.estimast.model.EstiMastDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/sjflv/mtrl/imp/estimast/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
