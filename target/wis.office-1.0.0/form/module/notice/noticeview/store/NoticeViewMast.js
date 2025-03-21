Ext.define('module.notice.noticeview.store.NoticeViewMast', { extend:'Axt.data.Store',
	model	: 'module.notice.noticeview.model.NoticeViewMast',
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