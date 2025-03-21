Ext.define('module.custom.iypkg.mtrl.purc.purccstmlist1.store.PurcCstmList1Lister2', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.mtrl.purc.purccstmlist1.model.PurcCstmList2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/mtrl/purc/purccstmlist1/get/search2.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
