Ext.define('module.project.projsite.model.ProjSite',{ extend:'Axt.data.Model',
	fields	:[
		{name: 'own_stor_id',		type: 'string',		defaultValue : '0'},
		{name: 'corp_id',			type: 'string'},

		{name: 'hq_grp',			type: 'string'},
		{name: 'hq_id',				type: 'string'},
		{name: 'hq_nm',				type: 'string'},
		{name: 'hq_gb',				type: 'string',		defaultValue : 'N'  },
		{name: 'hq_reg_dt',			type: 'string',		defaultValue : Ext.Date.format(new Date(),'Ymd') , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr }, // 매입 일자

		{name: 'ctrl_id',			type: 'string'},
		{name: 'ctrl_nm',			type: 'string'},
		{name: 'stor_grp',			type: 'string'},
		{name: 'stor_id',			type: 'string'},
		{name: 'login_id',			type: 'string'},
		{name: 'pjt_id',			type: 'string',		defaultValue: 'common'},
		{name: 'pjt_nm',			type: 'string',		defaultValue: '공통프로젝트'},

		{name: 'itm_typl_nm',		type: 'string',		defaultValue : '#{item_name}'  },
		{name: 'itm_find_nm',		type: 'string',		defaultValue : '#{item_name}/#{item_spec}'  },
		{name: 'clnt_find_nm',		type: 'string',		defaultValue : '#{cust_nm}'  },
		{name: 'vndr_find_nm',		type: 'string',		defaultValue : '#{vend_nm}'  },

		{name: 'srvr_inization_yn',	type: 'string',		defaultValue : '0' },
		{name: 'del_yn',			type: 'string',		defaultValue : '0' },

		{name: 'reinitial',			type: 'string'},
		{name: 'hq_sts',			type: 'string',		defaultValue : '1000' },
		{name: 'hq_ver',			type: 'string',		defaultValue : 'N' },
		{name: 'row_lvl',			type: 'string',		defaultValue : 0 },

		{name: 'epo_ddns',			type: 'string'},

		{name: 'pos_host',			type: 'string'},
		{name: 'pos_hostname',		type: 'string'},
		{name: 'pos_provider',		type: 'string'},
		{name: 'pos_hostport',		type: 'integer'},
		{name: 'pos_hostpath',		type: 'string'},
		{name: 'pos_hostuser',		type: 'string'},
		{name: 'pos_hostpswd',		type: 'string'},
		{name: 'pos_pooltime',		type: 'string',		defaultValue : 3600 },
		{name: 'pos_maxcount',		type: 'integer',	defaultValue : 5  },

		{name: 'web_host',			type: 'string'},
		{name: 'web_hostname',		type: 'string'},
		{name: 'web_provider',		type: 'string'},
		{name: 'web_hostport',		type: 'integer'},
		{name: 'web_hostpath',		type: 'string'},
		{name: 'web_hostuser',		type: 'string'},
		{name: 'web_hostpswd',		type: 'string'},
		{name: 'web_pooltime',		type: 'string',		defaultValue : 3600 },
		{name: 'web_maxcount',		type: 'integer',	defaultValue : 5  },

		{name: 'img_host',			type: 'string'},
		{name: 'img_http',			type: 'string'},
		{name: 'img_hostname',		type: 'string'},
		{name: 'img_provider',		type: 'string'},
		{name: 'img_protocol',		type: 'string'},
		{name: 'img_hostport',		type: 'integer',	defaultValue : 22 },
		{name: 'img_hostpath',		type: 'string'},
		{name: 'img_hostuser',		type: 'string'},
		{name: 'img_hostpswd',		type: 'string'},

		{name: 'pgm_updat_path',	type: 'string'},

		{name: 'usr_memo',			type: 'string'},
		{name: 'row_sts',			type: 'string',		defaultValue : '0' } ,  //, defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt }
		{name: 'reinitial',			type: 'string',		defaultValue : '0' } ,  /* 본사 정보를 재 설정 하는 경우 1로 처리해서 올리면 된다. */

		{name: 'upt_ui',			type: 'string',		defaultValue: '0000014938'   },
		{name: 'crt_ui',			type: 'string',		defaultValue: '0000014938'   },

		{name: 'upt_id',			type: 'string',		defaultValue : _global.login_pk }, /* 데이터 수정자 명 */
		{name: 'crt_id',			type: 'string',		defaultValue : _global.login_pk } /* 데이터 생성자 명 */
	]
});
