Ext.define('module.notice.noticework.store.NoticeWorkMast', { extend:'Axt.data.Store',
	model    : 'module.notice.noticework.model.NoticeWorkMast',
	pageSize : 20,
	proxy    : {
		api  : {
			read	: _global.location.http() + "/notice/noticework/get/mastersearch.do",
			update	: _global.location.http() + "/notice/noticework/set/record.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});