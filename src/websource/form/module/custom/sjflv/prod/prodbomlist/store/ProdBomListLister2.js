Ext.define('module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister2', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.prod.prodbomlist.model.ProdBomListLister2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/prod/prodbomlist/get/search2.do",
		},
		actionMethods: {
			read	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});
