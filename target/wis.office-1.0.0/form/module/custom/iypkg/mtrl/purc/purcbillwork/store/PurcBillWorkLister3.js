Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkLister3', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.mtrl.purc.purcbillwork.model.PurcBillWork',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			update: _global.api_host_info + "/system/custom/iypkg/mtrl/purc/purcbillwork/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
