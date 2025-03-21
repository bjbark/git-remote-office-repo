Ext.define('module.custom.sjflv.prod.prodplan.store.ShortMtrlOrdrStore', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.prod.prodplan.model.ShortMtrlOrdrModel',
	autoLoad: false,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/prod/prodplan/get/prntitem.do"
		},
		actionMethods: {
			read	: 'POST' 
		},
		extraParams:{
			token : _global.token_id
		}
	},
});
