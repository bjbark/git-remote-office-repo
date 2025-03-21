Ext.define('module.custom.iypkg.mtrl.purc.purccstmlist1.store.PurcCstmList1Lister4', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.mtrl.purc.purccstmlist1.model.PurcCstmList1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/mtrl/purc/purccstmlist1/get/search4.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
