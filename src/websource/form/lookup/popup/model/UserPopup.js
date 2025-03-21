Ext.define('lookup.popup.model.UserPopup',{ extend:'Axt.data.Model',
	fields: [
		{name: 'hqof_idcd'		, type: 'string'  , defaultValue : _global.hq_id }, /* 본사 ID */
		{name: 'stor_grp'		, type: 'string'  , defaultValue : _global.stor_grp }, /* 매장 그룹 */
		{name: 'stor_id'		, type: 'string'  , defaultValue : _global.stor_id }, /* 매장 ID  ( 발주 등록 매장 ) */
		{name: 'stor_nm'		, type: 'string'  },
		{name: 'user_idcd'		, type: 'string'  },
		{name: 'user_code'		, type: 'string'  },
		{name: 'user_name'		, type: 'string'  },
		{name: 'user_dvcd'		, type: 'string'  },
		{name: 'dept_idcd'		, type: 'string'  },
		{name: 'dept_name'		, type: 'string'  },
		{name: 'auth_dvcd'		, type: 'string'  },
		{name: 'logn_idcd'		, type: 'string'  },
		{name: 'logn_pswd'		, type: 'string'  },
		{name: 'join_date'		, type: 'string'  },
		{name: 'hdph_numb'		, type: 'string'  },
		{name: 'mail_addr'		, type: 'string'  },
	]
});
