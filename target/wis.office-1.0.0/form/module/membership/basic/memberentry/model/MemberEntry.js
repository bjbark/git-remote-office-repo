Ext.define('module.membership.basic.memberentry.model.MemberEntry', { extend:'Axt.data.Model',
	fields: [
		{	name: 'mmbr_idcd'		, type: 'string' },
		{	name: 'mmbr_code'		, type: 'string' },
		{	name: 'mmbr_name'		, type: 'string' },
		{	name: 'alis_name'		, type: 'string' },
		{	name: 'gndr_dvcd'		, type: 'string' },
		{	name: 'mmbr_phot'		, type: 'string' },
		{	name: 'hght'			, type: 'float' },
		{	name: 'wght'			, type: 'float' },
		{	name: 'brth_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },
		{	name: 'pass_idcd'		, type: 'string' },
		{	name: 'entr_dvcd'		, type: 'string' , defaultValue : '1'},
		{	name: 'enps_dvcd'		, type: 'string' , defaultValue : '1'},
		{	name: 'etcc_enps'		, type: 'string' },
		{	name: 'carr_dvcd'		, type: 'string' , defaultValue : '1'},
		{	name: 'etcc_carr'		, type: 'string' , defaultValue : '1'},
		{	name: 'enpp_dvcd'		, type: 'string' , defaultValue : '1'},
		{	name: 'etcc_enpp'		, type: 'string' },
		{	name: 'entr_date'		, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },
		{	name: 'scsn_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },
		{	name: 'hdph_numb'		, type: 'string' },
		{	name: 'post_code'		, type: 'string' },
		{	name: 'addr_1fst'		, type: 'string' },
		{	name: 'addr_2snd'		, type: 'string' },
		{	name: 'grad_dvcd'		, type: 'string' },
		{	name: 'paid_dvcd'		, type: 'string' },
		{	name: 'cont_pric'		, type: 'float'  , defaultValue : 0},
		{	name: 'mmbr_stat_dvcd'	, type: 'string' , defaultValue : '1'},
		{	name: 'annc_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },
		{	name: 'paid_bank_idcd'	, type: 'string' },
		{	name: 'paid_acct_nmbr'	, type: 'string' },
		{	name: 'lssn_type_dvcd'	, type: 'string' },
		{	name: 'lssn_ccle_dvcd'	, type: 'string' },
		{	name: 'lssn_stdt'		, type: 'string' },
		{	name: 'amtm_yorn'		, type: 'string' },
		{	name: 'amtm_sttm'		, type: 'string' , convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},		//작업시작시간
		{	name: 'amtm_edtm'		, type: 'string' },
		{	name: 'amtm_sttm_hh'	, type: 'string' , defaultValue : '00'},
		{	name: 'amtm_sttm_mm'	, type: 'string' , defaultValue : '00'},
		{	name: 'amtm_edtm_hh'	, type: 'string' , defaultValue : '00'},
		{	name: 'amtm_edtm_mm'	, type: 'string' , defaultValue : '00'},
		{	name: 'amtm_term'		, type: 'string' },
		{	name: 'pmtm_yorn'		, type: 'string' },
		{	name: 'pmtm_sttm'		, type: 'string' , convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},		//작업시작시간
		{	name: 'pmtm_edtm'		, type: 'string' },
		{	name: 'pmtm_sttm_hh'	, type: 'string' , defaultValue : '00'},
		{	name: 'pmtm_sttm_mm'	, type: 'string' , defaultValue : '00'},
		{	name: 'pmtm_edtm_hh'	, type: 'string' , defaultValue : '00'},
		{	name: 'pmtm_edtm_mm'	, type: 'string' , defaultValue : '00'},
		{	name: 'pmtm_term'		, type: 'string' },
		{	name: 'mond_yorn'		, type: 'string' , defaultValue : '0'},
		{	name: 'tued_yorn'		, type: 'string' , defaultValue : '0'},
		{	name: 'wedd_yorn'		, type: 'string' , defaultValue : '0'},
		{	name: 'thud_yorn'		, type: 'string' , defaultValue : '0'},
		{	name: 'frid_yorn'		, type: 'string' , defaultValue : '0'},
		{	name: 'satd_yorn'		, type: 'string' , defaultValue : '0'},
		{	name: 'sund_yorn'		, type: 'string' , defaultValue : '0'},
		{	name: 'mond_time_dvcd'	, type: 'string' },
		{	name: 'tued_time_dvcd'	, type: 'string' },
		{	name: 'wedd_time_dvcd'	, type: 'string' },
		{	name: 'thud_time_dvcd'	, type: 'string' },
		{	name: 'frid_time_dvcd'	, type: 'string' },
		{	name: 'satd_time_dvcd'	, type: 'string' },
		{	name: 'sund_time_dvcd'	, type: 'string' },
		{	name: 'mond_time'		, type: 'string' , convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},
		{	name: 'tued_time'		, type: 'string' , convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},
		{	name: 'wedd_time'		, type: 'string' , convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},
		{	name: 'thud_time'		, type: 'string' , convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},
		{	name: 'frid_time'		, type: 'string' , convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},
		{	name: 'satd_time'		, type: 'string' , convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},
		{	name: 'sund_time'		, type: 'string' , convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},
		{	name: 'utli_strt_time'	, type: 'string' },
		{	name: 'utli_endd_time'	, type: 'string' },
		{	name: 'drtr_idcd'		, type: 'string' },
		{	name: 'drtr_name'		, type: 'string' },
		{	name: 'rcom_idcd'		, type: 'string' },
		{	name: 'conn_mmbr_idcd'	, type: 'string' },
		{	name: 'cars_numb'		, type: 'string' },
		{	name: 'cars_dvcd'		, type: 'string' },
		{	name: 'user_memo'		, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'		, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'		, type: 'string' },		//부모ID
		{	name: 'line_levl'		, type: 'float'   , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'		, type: 'string' },		//ROW순서
		{	name: 'line_stat'		, type: 'string'  , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos'		, type: 'string' },		//ROW마감
		{	name: 'find_name'		, type: 'string' },		//찾기명
		{	name: 'updt_user_name'	, type: 'string' },		//수정사용자명
		{	name: 'updt_ipad'		, type: 'string' },		//수정IP
		{	name: 'updt_dttm'		, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//수정일시
		{	name: 'updt_idcd'		, type: 'string' },		//수정ID
		{	name: 'updt_urif'		, type: 'string' },		//수정UI
		{	name: 'crte_user_name'	, type: 'string' },		//생성사용자명
		{	name: 'crte_ipad'		, type: 'string' },		//생성IP
		{	name: 'crte_dttm'		, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//생성일시
		{	name: 'crte_idcd'		, type: 'string' },		//생성ID
		{	name: 'crte_urif'		, type: 'string' },		//생성UI
	]
});

