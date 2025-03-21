Ext.define('module.notice.dailyreport.store.DailyReport', { extend:'Axt.data.Store',
	model    : 'module.notice.dailyreport.model.DailyReport',
	pageSize : 20,
	proxy    : {
		api  : {
			read	: _global.location.http() + "/notice/dailyreport/get/search.do",
			udpate	: _global.location.http() + "/notice/dailyreport/set/record.do"
		},
		actionMethods : { read : 'POST', udpate : 'POST' },
		extraParams : { token : _global.token_id }
	}
});
