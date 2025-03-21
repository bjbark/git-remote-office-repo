Ext.define('module.custom.symct.prod.workentry.model.WorkCvicPopup',{ extend:'Axt.data.Model',
	fields: [
		{name: 'wkct_idcd'				, type: 'string' },		//공정ID
		{name: 'wkct_code'				, type: 'string' },		//공정ID
		{name: 'line_seqn'				, type: 'string' },		//순번
		{name: 'cvic_idcd'				, type: 'string' },		//설비ID
		{name: 'cvic_name'				, type: 'string' },		//설비명
		{name: 'abty_calc_yorn'			, type: 'string' },		//능력산정여부
		{name: 'cvic_stat_dvcd'			, type: 'string' },		//설비상태구분코드
		{name: 'cvic_spec'				, type: 'string' },		//설비규격
		{name: 'cvic_stat_dvcd'			, type: 'string' },		//설비상태
		{name: 'puch_date'				, type: 'string'  , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//구매일자
		{name: 'puch_cstm_name'			, type: 'string' },		//구매처명
		{name: 'vend_tele_numb'			, type: 'string' },		//구매처전화번호
		{name: 'afsv_tele_numb'			, type: 'string' },		//AS전화번호
		{name: 'mchn_numb'				, type: 'string' },		//기기번호
		{name: 'make_cmpy_name'			, type: 'string' },		//제조사명
		{name: 'user_memo'				, type: 'string' },		//사용자메모
		{name: 'sysm_memo'				, type: 'string' },		//시스템메모
		{name: 'prnt_idcd'				, type: 'string' },		//부모ID
		{name: 'line_levl'				, type: 'float'   , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr'				, type: 'string' },		//ROW순서
		{name: 'line_stat'				, type: 'string'  , defaultValue: '0'},		//ROW상태
		{name: 'line_clos'				, type: 'string' },		//ROW마감
		{name: 'find_name'				, type: 'string' },		//찾기명
		{name: 'updt_user_name'			, type: 'string' },		//수정사용자명
		{name: 'updt_ipad'				, type: 'string' },		//수정IP
		{name: 'updt_dttm'				, type: 'string' },		//수정일시
		{name: 'updt_idcd'				, type: 'string' },		//수정ID
		{name: 'updt_urif'				, type: 'string' },		//수정UI
		{name: 'crte_user_name'			, type: 'string' },		//생성사용자명
		{name: 'crte_ipad'				, type: 'string' },		//생성IP
		{name: 'crte_dttm'				, type: 'string' },		//생성일시
		{name: 'crte_idcd'				, type: 'string' },		//생성ID
		{name: 'crte_urif'				, type: 'string' },		//생성UI
	]
});
