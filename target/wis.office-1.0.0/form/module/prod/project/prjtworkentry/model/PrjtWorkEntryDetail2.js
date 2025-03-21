Ext.define('module.prod.project.prjtworkentry.model.PrjtWorkEntryDetail2',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'pjod_idcd'		,	type: 'string'},		//프로젝트수주id
		{name: 'wkct_idcd'		,	type: 'string'},		//공정ID
		{name: 'invc_date'		,	type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//INVOICE일자
		{name: 'line_seqn'		,	type: 'float' },		//순번
		{name: 'line_seqn2'		,	type: 'float' },		//순번
		{name: 'idcd'			,	type: 'string'},		//id
		{name: 'name'			,	type: 'string'},		//name
		{name: 'progress'		,	type: 'float' },		//progress
		{name: 'wker_idcd_1fst'	,	type: 'string'} ,		//작업자ID1
		{name: 'wker_idcd_2snd'	,	type: 'string'},		//작업자ID2
		{name: 'wker_idcd_3trd'	,	type: 'string'},		//작업자ID3
		{name: 'item_idcd'		,	type: 'string'},		//품목ID
		{name: 'cvic_idcd'		,	type: 'string'},		//설비ID
		{name: 'work_cont'		,	type: 'string'},		//작업내용
		{name: 'indn_qntt'		,	type: 'float' },		//지시수량
		{name: 'prod_qntt'		,	type: 'float' },		//생산수량
		{name: 'good_qntt'		,	type: 'float' },		//양품수량
		{name: 'poor_qntt'		,	type: 'float' },		//불량수량
		{name: 'work_sttm'		,	type: 'string',convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},		//작업시작시간
		{name: 'work_edtm'		,	type: 'string',convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},		//작업종료시간
		{name: 'need_time'		,	type: 'string',convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},		//소요시간
		{name: 'work_mnhr'		,	type: 'float' },		//작업공수
		{name: 'work_pcnt'		,	type: 'float' },		//작업인원
		{name: 'work_cond_1fst'	,	type: 'string'},		//작업조건1
		{name: 'work_cond_2snd'	,	type: 'string'},		//작업조건2
		{name: 'work_cond_3trd'	,	type: 'string'},		//작업조건3
		{name: 'work_cond_5fit'	,	type: 'string'},		//작업조건5
		{name: 'work_cond_6six'	,	type: 'string'},		//작업조건6
		{name: 'work_cond_7svn'	,	type: 'string'},		//작업조건7
		{name: 'work_dvcd'		,	type: 'string'},		//작업구분코드
		{name: 'wkct_insp_yorn'	,	type: 'string'},		//공정검사여부
		{name: 'last_wkct_yorn'	,	type: 'string'},		//최종공정여부
		{name: 'work_para'		,	type: 'string'},		//작업조
		{name: 'mtrl_ivst_yorn'	,	type: 'string'},		//자재투입여부
		{name: 'stat_dvcd'		,	type: 'string'},		//상태구분코드
		{name: 'user_name'		,	type: 'string'},		//상태구분코드
		{name: 'mold_name'		,	type: 'string'},		//상태구분코드
		{name: 'item_name'		,	type: 'string'},		//상태구분코드
		{name: 'prog_stat_dvcd'	,	type: 'string'},		//상태
		{name: 'work_ordr_dvcd'	,	type: 'string'},		//작업오더구분
		{name: 'ordr_degr'		,	type: 'string'},		//
		{name: 'work_cont'		,	type: 'string'},		//
		{name: 'work_endd_date'	,	type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//


		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'float', defaultValue: '0'},		//ROW순서
		{name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},		//ROW마감
		{name: 'find_name',				type: 'string'},		//찾기명
		{name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{name: 'updt_ipad',				type: 'string'},		//수정IP
		{name: 'updt_dttm',				type: 'string'},		//수정일시
		{name: 'updt_idcd',				type: 'string'},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string'},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
