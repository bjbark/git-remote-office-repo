Ext.define('lookup.popup.model.MmbrPopup',{ extend:'Axt.data.Model',
	fields: [
 		{	name: 'mmbr_idcd'			, type: 'string' },
		{	name: 'mmbr_name'			, type: 'string' },
		{	name: 'regi_dvcd'			, type: 'string' },
		{	name: 'entr_dvcd'			, type: 'string' },
		{	name: 'mmbr_dvcd'			, type: 'string' },
		{	name: 'lgin_pswd'			, type: 'string' },
		{	name: 'entr_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},
		{	name: 'scsn_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},
		{	name: 'scsn_resn_dvcd'		, type: 'string' },
		{	name: 'scsn_resn'			, type: 'string' },
		{	name: 'mmbr_grad'			, type: 'string' },
		{	name: 'tele_numb'			, type: 'string' },
		{	name: 'mmbr_stat_dvcd'		, type: 'string' },
		{	name: 'hdph_numb'			, type: 'string' },
		{	name: 'faxi_numb'			, type: 'string' },
		{	name: 'post_code'			, type: 'string' },
		{	name: 'addr_1fst'			, type: 'string' },
		{	name: 'addr_2snd'			, type: 'string' },
		{	name: 'wker_name'			, type: 'string' },
		{	name: 'wker_hdph'			, type: 'string' },
		{	name: 'wker_mail'			, type: 'string' },
		{	name: 'boss_name'			, type: 'string' },
		{	name: 'buss_numb'			, type: 'string' },
		{	name: 'bzpl_zpcd'			, type: 'string' },
		{	name: 'bzpl_addr_1fst'		, type: 'string' },
		{	name: 'bzpl_addr_2snd'		, type: 'string' },
		{	name: 'buss_type'			, type: 'string' },
		{	name: 'buss_item'			, type: 'string' },
		{	name: 'mail_addr'			, type: 'string' },
		{	name: 'intr_mmbr_idcd'		, type: 'string' },
		{	name: 'asgn_mmbr_idcd'		, type: 'string' },
		{	name: 'asgn_mmbr_name'		, type: 'string' },

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
