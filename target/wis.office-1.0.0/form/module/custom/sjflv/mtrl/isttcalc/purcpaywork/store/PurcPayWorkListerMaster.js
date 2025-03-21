Ext.define('module.custom.sjflv.mtrl.isttcalc.purcpaywork.store.PurcPayWorkListerMaster', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.isttcalc.purcpaywork.model.PurcPayWorkListerMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/mtrl/isttcalc/purcpaywork/get/search.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
