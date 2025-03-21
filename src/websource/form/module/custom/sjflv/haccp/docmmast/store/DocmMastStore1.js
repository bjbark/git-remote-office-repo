Ext.define('module.custom.sjflv.haccp.docmmast.store.DocmMastStore1', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.haccp.docmmast.model.DocmMastModel1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/haccp/docmmast/get/docmmast.do",
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
