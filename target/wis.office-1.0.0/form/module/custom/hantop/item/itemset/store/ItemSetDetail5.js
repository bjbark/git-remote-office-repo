Ext.define('module.custom.hantop.item.itemset.store.ItemSetDetail5', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.item.itemset.model.ItemSetDetail5',
	pageSize: 200,
	proxy:{
		api:{
			 read	: _global.location.http() + "/custom/hantop/item/itemset/get/detail5.do"
			,update : _global.location.http() + "/custom/hantop/item/itemset/set/detail5.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
