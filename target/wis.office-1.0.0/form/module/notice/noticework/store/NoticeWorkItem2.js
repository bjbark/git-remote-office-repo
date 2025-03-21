Ext.define('module.notice.noticework.store.NoticeWorkItem2', { extend:'Axt.data.Store',
	model    : 'module.notice.noticework.model.NoticeWorkItem2',
	pageSize : 9999,
	proxy    : {
		api  : {
			read	: _global.location.http() + "/notice/noticework/get/item2.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});