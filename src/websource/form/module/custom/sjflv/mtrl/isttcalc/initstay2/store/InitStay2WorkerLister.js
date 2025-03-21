Ext.define('module.custom.sjflv.mtrl.isttcalc.initstay2.store.InitStay2WorkerLister', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.isttcalc.initstay2.model.InitStay2Master',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/sjflv/mtrl/isttcalc/initstay2/get/search2.do",
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
