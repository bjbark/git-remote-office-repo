Ext.define('module.custom.sjflv.mtrl.po.purcordrndqt.store.PurcOrdrNdqtLister1', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.mtrl.po.purcordrndqt.model.PurcOrdrNdqtLister1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/mtrl/po/purcordrndqt/set/record.do",
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
