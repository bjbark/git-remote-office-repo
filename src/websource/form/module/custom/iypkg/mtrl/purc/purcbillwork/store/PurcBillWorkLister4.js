Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkLister4', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.mtrl.purc.purcbillwork.model.PurcBillWork4',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/mtrl/purc/purcbillwork/get/bill.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
