Ext.define('module.custom.sjflv.mtrl.isttcalc.initstay2.store.InitStay2Master', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.isttcalc.initstay2.model.InitStay2Master',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/mtrl/isttcalc/initstay2/get/search.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
