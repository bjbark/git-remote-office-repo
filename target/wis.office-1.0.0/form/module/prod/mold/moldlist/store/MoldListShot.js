Ext.define('module.prod.mold.moldlist.store.MoldListShot', { extend:'Axt.data.Store',
	model: 'module.prod.mold.moldlist.model.MoldListShot',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: Const.SELECT.rows,
	proxy		: {
		api		: {
			read	: _global.location.http() + "/prod/mold/moldlist/get/shotsearch.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams	: {
			token	: _global.token_id
		}
	}
});
