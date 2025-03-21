Ext.define('module.custom.hantop.item.itemset.store.ItemSetDetail4', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.item.itemset.model.ItemSetDetail4',
	autoLoad: false,
	pageSize: 200,
	remoteSort	: true,
	proxy:{
		api:{
			 read	: _global.location.http() + "/custom/hantop/item/itemset/get/detail4.do"
			,update : _global.location.http() + "/custom/hantop/item/itemset/set/detail4.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
