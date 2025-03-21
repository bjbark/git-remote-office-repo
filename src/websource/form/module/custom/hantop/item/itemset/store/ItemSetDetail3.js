Ext.define('module.custom.hantop.item.itemset.store.ItemSetDetail3', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.item.itemset.model.ItemSetDetail3',
	autoLoad: false,
	pageSize: 200,
	remoteSort	: true,
	proxy:{
		api:{
			 read	: _global.location.http() + "/custom/hantop/item/itemset/get/detail3.do"
			,update : _global.location.http() + "/custom/hantop/item/itemset/set/detail3.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
