Ext.define('module.custom.sjflv.haccp.docmcheck.store.DocmCheckStore1', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.haccp.docmcheck.model.DocmCheckModel1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/haccp/docmcheck/get/docmmast.do",
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
