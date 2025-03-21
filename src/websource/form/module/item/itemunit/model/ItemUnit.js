Ext.define('module.item.itemunit.model.ItemUnit',{extend:'Axt.data.Model',
	fields:
	[
		{name: 'hq_id',			type: 'string'   , defaultValue : _global.hq_id },
		{name: 'stor_grp',		type: 'string'   , defaultValue : _global.stor_grp },
		{name: 'shr_yn',		type: 'string'   , defaultValue : '1'              },
		{name: 'unit_idcd',		type: 'string'  },
		{name: 'unt_cd',		type: 'string'  },
		{name: 'unit_name',		type: 'string'  },
		{name: 'unit_sn',		type: 'string'  },
		{name: 'user_memo',		type: 'string'  },
		{name: 'row_sts',		type: 'string'   , defaultValue: '0' },
		//        {name: 'row_sts',		type: 'boolean'  , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'upt_id',		type: 'string'   , defaultValue : _global.login_pk }, /* 데이터 수정자 명 */
		{name: 'crt_id',		type: 'string'   , defaultValue : _global.login_pk } /* 데이터 생성자 명 */
	]
});
