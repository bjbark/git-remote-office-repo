Ext.define('module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister4', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.prod.prodbomlist.model.ProdBomListLister1',
	autoLoad: false,
	pageSize: 99999,

	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/prod/prodbomlist/get/search4.do",
		},
		actionMethods: {
			read	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});
