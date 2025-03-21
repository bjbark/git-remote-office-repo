Ext.define('module.mtrl.po.poisttwork.store.PoIsttWorkDetail', { extend:'Axt.data.Store',
	model: 'module.mtrl.po.poisttwork.model.PoIsttWorkDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/mtrl/po/poisttwork/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
