Ext.define('module.notice.noticework.store.NoticeWorkInvoice', { extend:'Axt.data.Store',
	model    : 'module.notice.noticework.model.NoticeWorkInvoice',
	pageSize : 20,
	proxy    : {
		api  : {
			read	: _global.location.http() + "/notice/noticework/get/invoice.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});