Ext.define('module.custom.iypkg.eis.cvicmonitring.store.CvicMonitringMaster', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.cvicmonitring.model.CvicMonitringMaster',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/eis/cvicmonitring/get/mastersearch.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});