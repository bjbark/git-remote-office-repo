Ext.define('module.prod.cvic.cvicchecktypeitem.store.CvicCheckTypeItemInvoice', { extend:'Axt.data.Store',
	model: 'module.prod.cvic.cvicchecktypeitem.model.CvicCheckTypeItemInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/prod/cvic/cvicchecktypeitem/get/invoice.do",
			update: _global.api_host_info + "/system/prod/cvic/cvicchecktypeitem/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
