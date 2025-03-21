Ext.define('module.custom.kortc.prod.workentry.model.WorkEntry',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'				, type: 'string'},		//invoice번호
		{	name: 'orig_invc_numb'			, type: 'string'},		//순번
		{	name: 'man_seqn'				, type: 'float'},		//순번
		{	name: 'line_seqn'				, type: 'float'},		//순번
		{	name: 'seqn'					, type: 'float'},		//순번
		{	name: 'invc_date'				, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	//생산일자
		{	name: 'bzpl_idcd'				, type: 'string'},		//사업장ID
		{	name: 'pdsd_numb'				, type: 'string'},		//생산계획번호
		{	name: 'prod_dept_idcd'			, type: 'string'},		//생산부서ID
		{	name: 'prog_stat_dvcd'			, type: 'string'},		//진행상태
		{	name: 'wkfw_idcd'				, type: 'string' },		//공정흐름ID
		{	name: 'wkct_idcd'				, type: 'string' },		//공정ID
		{	name: 'wkct_name'				, type: 'string' },		//공정명
		{	name: 'cvic_idcd'				, type: 'string' },		//설비ID
		{	name: 'mold_idcd'				, type: 'string' },		//금형ID
		{	name: 'mold_code'				, type: 'string' },		//금형ID
		{	name: 'item_idcd'				, type: 'string' },		//품목ID
		{	name: 'wkct_item_idcd'			, type: 'string' },		//공정품목ID
		{	name: 'pdsd_date'				, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//지시일자
		{	name: 'pref_rank'				, type: 'float'  },		//우선순위
		{	name: 'item_code'				, type: 'string' },		//품목코드
		{	name: 'item_mtrl'				, type: 'string' },		//품목재질
		{	name: 'item_spec'				, type: 'string' },		//품목규격
		{	name: 'item_name'				, type: 'string' },		//품명
		{	name: 'invc_qntt'				, type: 'string' },		//단가
		{	name: 'invc_pric'				, type: 'string' },		//금액
		{	name: 'cvic_name'				, type: 'string' },		//설비명
		{	name: 'cavity'					, type: 'string' },		//cavity
		{	name: 'cycl_time'				, type: 'string' },		//cycle time
		{	name: 'acpt_numb'				, type: 'string' },		//수주번호
		{	name: 'good_prgs'				, type: 'float' },		//양품율
		{	name: 'mtrl_bacd'				, type: 'string' },		//재질분류코드
		{	name: 'mtrl_name'				, type: 'string' },		//재질분류코드
		{	name: 'pckg_cotr_bacd'			, type: 'string' },		//포장용기분류
		{	name: 'pckg_cotr_name'			, type: 'string' },		//포장용기분류
		{	name: 'pdsd_numb'				, type: 'string' },		//생산계획번호
		{	name: 'wkod_numb'				, type: 'string' },		//작업지시번호
		{	name: 'wkod_seqn'				, type: 'float' },		//작업지시순번
		{	name: 'dayn_dvcd'				, type: 'string' },		//주야구분코드
		{	name: 'indn_qntt'				, type: 'float' },		//지시수량
		{	name: 'prod_qntt'				, type: 'float' },		//생산수량
		{	name: 'good_qntt'				, type: 'float' },		//양품수량
		{	name: 'poor_qntt'				, type: 'float' },		//불량수량
		{	name: 'theo_qntt'				, type: 'float' },		//이론수량
		{	name: 'strt_dttm'				, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//작업시작시간
		{	name: 'endd_dttm'				, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//작업종료시간
		{	name: 'work_sttm'				, type: 'string' },		//작업시작시간
		{	name: 'cstm_name'				, type: 'string' },		//
		{	name: 'wker_idcd'				, type: 'string' },		//
		{	name: 'wker_idcd2'				, type: 'string' },		//
		{	name: 'wker_idcd3'				, type: 'string' },		//


		{	name: 'user_memo'			, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'			, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'			, type: 'string' },		//부모ID
		{	name: 'line_levl'			, type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'			, type: 'float' },		//ROW순서
		{	name: 'line_stat'			, type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos'			, type: 'string' },		//ROW마감
		{	name: 'find_name'			, type: 'string' },		//찾기명
		{	name: 'updt_user_name'		, type: 'string' },		//수정사용자명
		{	name: 'updt_ipad'			, type: 'string' },		//수정IP
		{	name: 'updt_dttm'			, type: 'string' },		//수정일시
		{	name: 'updt_idcd'			, type: 'string' },		//수정ID
		{	name: 'updt_urif'			, type: 'string' },		//수정UI
		{	name: 'crte_user_name'		, type: 'string' },		//생성사용자명
		{	name: 'crte_ipad'			, type: 'string' },		//생성IP
		{	name: 'crte_dttm'			, type: 'string' },		//생성일시
		{	name: 'crte_idcd'			, type: 'string' },		//생성ID
		{	name: 'crte_urif'			, type: 'string' },		//생성UI
	]
});
