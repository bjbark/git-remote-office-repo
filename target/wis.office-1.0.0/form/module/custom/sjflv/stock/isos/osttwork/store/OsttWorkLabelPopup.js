Ext.define('module.custom.sjflv.stock.isos.osttwork.store.OsttWorkLabelPopup', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.stock.isos.osttwork.model.OsttWorkLabelPopup',
	pageSize : 200,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/sjflv/stock/isos/osttwork/get/label.do"
		},
		actionMethods: { read: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});