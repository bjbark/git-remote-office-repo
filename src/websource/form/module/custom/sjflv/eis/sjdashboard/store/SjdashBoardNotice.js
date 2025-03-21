Ext.define('module.custom.sjflv.eis.sjdashboard.store.SjdashBoardNotice', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.eis.sjdashboard.model.SjdashBoardNotice',
	pageSize: 20,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/notice/noticeview/get/mastersearch.do",
			update : _global.location.http() + "/notice/noticeview/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});