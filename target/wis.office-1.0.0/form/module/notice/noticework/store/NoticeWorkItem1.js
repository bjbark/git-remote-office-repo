Ext.define('module.notice.noticework.store.NoticeWorkItem1', { extend:'Axt.data.Store',
	model    : 'module.notice.noticework.model.NoticeWorkItem1',
	pageSize : 20,
	proxy    : {
		api  : {
			 read	: _global.location.http() + "/notice/noticework/get/item1.do"
			,update : _global.location.http() + "/notice/noticework/set/item1.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});