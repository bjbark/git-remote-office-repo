Ext.define('module.custom.sjflv.prod.prodbomlist.store.ProdBomListLister3', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.prod.prodbomlist.model.ProdBomListLister3',
	autoLoad: false,
	remoteSort:true,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/prod/prodbomlist/get/search3.do",
		},
		actionMethods: {
			read	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});
