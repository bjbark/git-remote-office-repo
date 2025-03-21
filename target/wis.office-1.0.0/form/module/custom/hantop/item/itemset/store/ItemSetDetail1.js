Ext.define('module.custom.hantop.item.itemset.store.ItemSetDetail1', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.item.itemset.model.ItemSetDetail1',
	pageSize: 200,
	proxy:{
		api:{
			 read	: _global.location.http() + "/custom/hantop/item/itemset/get/detail1.do"
			,update : _global.location.http() + "/custom/hantop/item/itemset/set/detail1.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
