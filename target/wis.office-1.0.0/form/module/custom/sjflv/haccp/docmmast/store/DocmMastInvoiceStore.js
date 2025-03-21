Ext.define('module.custom.sjflv.haccp.docmmast.store.DocmMastInvoiceStore', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.haccp.docmmast.model.DocmMastInvoiceModel',
	autoLoad: false,
	remoteSort	: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/haccp/docmmast/get/invoice.do",
			update	: _global.api_host_info + "/system/custom/sjflv/haccp/docmmast/set/invoice.do",
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
