Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkDetail', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.mtrl.purc.purcbillwork.model.PurcBillWork2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/mtrl/purc/purcbillwork/get/detail.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
