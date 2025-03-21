Ext.define('module.custom.sjflv.haccp.docmmast.store.DocmDetailStore1', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.haccp.docmmast.model.DocmDetailModel1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/haccp/docmmast/get/apvlmast.do",
			update	: _global.api_host_info + "/system/custom/sjflv/prod/prodplan/set/docmmast.do",
		},
		actionMethods: {
			read	: 'POST' ,
			update	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});
