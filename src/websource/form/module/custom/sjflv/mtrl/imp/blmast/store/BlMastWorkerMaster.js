Ext.define('module.custom.sjflv.mtrl.imp.blmast.store.BlMastWorkerMaster', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.imp.blmast.model.BlMastWorkerMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/stock/isos/isttwork1/get/search3.do",
			update: _global.api_host_info + "/system/custom/iypkg/stock/isos/isttwork1/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
