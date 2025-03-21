Ext.define('module.custom.hantop.item.itemset.store.ItemSetDetail2', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.item.itemset.model.ItemSetDetail2',
	autoLoad: false,
	pageSize: 200,
	remoteSort	: true,
	proxy:{
		api:{
			 read	: _global.location.http() + "/custom/hantop/item/itemset/get/detail2.do"
			,update : _global.location.http() + "/custom/hantop/item/itemset/set/detail2.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
