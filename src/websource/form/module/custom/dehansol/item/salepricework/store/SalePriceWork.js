Ext.define('module.custom.dehansol.item.salepricework.store.SalePriceWork', { extend:'Axt.data.Store',
	model : 'module.custom.dehansol.item.salepricework.model.SalePriceWork',
	pageSize : 100,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/dehansol/item/salepricework/get/search.do"
			,update : _global.location.http() + "/custom/dehansol/item/salepricework/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});