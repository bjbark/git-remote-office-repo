Ext.define('module.sale.project.salework.store.ModlPopup', { extend:'Axt.data.Store',
	model : 'module.sale.project.salework.model.ModlPopup',

	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/salework/get/modlpopup.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});