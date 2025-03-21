Ext.define('module.custom.kortc.prod.workentry.model.WorkEntryDetail2',{ extend:'Axt.data.Model',
	fields: [
		{name: 'invc_numb',				type: 'string'},		//invoice번호
		{name: 'invc_date',				type: 'string'},		//일자
		{name: 'bzpl_idcd',				type: 'string'},		//사업장ID
		{name: 'prod_dept_idcd',		type: 'string'},		//생산부서
		{name: 'wkfw_idcd',				type: 'string'},		//공정흐름
		{name: 'wkct_idcd',				type: 'string'},		//공정
		{name: 'cvic_idcd',				type: 'string'},		//설비
		{name: 'mold_idcd',				type: 'string'},		//금형
		{name: 'item_idcd',				type: 'string'},		//품목ID
		{name: 'item_code',				type: 'string'},		//품목코드
		{name: 'item_name',				type: 'string'},		//품명
		{name: 'item_imge',				type: 'string'},		//품목이미지
		{name: 'cavity',				type: 'string'},		//cavity
		{name: 'shot_cont',				type: 'string'},		//shot
		{name: 'acpt_numb',				type: 'string'},		//수주번호
		{name: 'mtrl_bacd',				type: 'string'},		//재질분류코드
		{name: 'pdsd_numb',				type: 'string'},		//생산계획번호
		{name: 'wkod_numb',				type: 'string'},		//작업지시번호
		{name: 'wkod_seqn',				type: 'float' },		//작업지시순번
		{name: 'seqn',					type: 'float' },		//순번
		{name: 'mtrl_name',				type: 'string'},		//재질명
		{name: 'remk_text',				type: 'string'},		//비고사항
		{name: 'dayn_dvcd',				type: 'string'},		//주야구분코드
		{name: 'indn_qntt',				type: 'float' },		//지시수량
		{name: 'acum_qntt',				type: 'float' },		//누적수량
		{name: 'prod_qntt',				type: 'float' },		//생산수량
		{name: 'good_qntt',				type: 'float' },		//양품수량
		{name: 'poor_qntt',				type: 'float' },		//불량수량
		{name: 'theo_qntt',				type: 'float' },		//이론수량
		{name: 'work_strt_dttm',		type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//작업시작시간
		{name: 'work_endd_dttm',		type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//작업시작시간
		{name: 'work_sttm',				type: 'string', convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},		//작업시작시간
		{name: 'work_edtm',				type: 'string', convert : Ext.util.Format.strToTime, serialize: Ext.util.Format.timeToStr},		//작업종료시간
		{name: 'need_time',				type: 'string'},		//소요시간
		{name: 'work_mnhr',				type: 'float' },		//작업공수
		{name: 'wker_idcd',				type: 'string'},		//작업자
		{name: 'wker_name',				type: 'string'},		//작업자명
		{name: 'work_pcnt',				type: 'float' },		//작업인원
		{name: 'lott_numb',				type: 'string'},		//LOT번호
		{name: 'rewd_objt_qntt',		type: 'float' },		//재생대상수량
		{name: 'work_cond_1fst',		type: 'string'},		//작업조건1
		{name: 'work_cond_2snd',		type: 'string'},		//작업조건2
		{name: 'work_cond_3trd',		type: 'string'},		//작업조건3
		{name: 'stun_prod_qntt',		type: 'float' },		//기준단위생산수량
		{name: 'stun_good_qntt',		type: 'float' },		//기준단위양품수량
		{name: 'stun_poor_qntt',		type: 'float' },		//기준단위불량수량
		{name: 'work_dvcd',				type: 'string'},		//작업구분
		{name: 'wkct_insp_yorn',		type: 'string'},		//공정검사여부
		{name: 'last_wkct_yorn',		type: 'string'},		//최종공정여부
		{name: 'work_para',				type: 'string'},		//작업조
		{name: 'mtrl_ivst_yorn',		type: 'string'},		//자재투입여부
		{name: 'prog_stat_dvcd',		type: 'string'},		//진행여부
		{name: 'work_strt',				type: 'string' },		//작업시작시간
		{name: 'work_endd',				type: 'string' },		//작업종료시간
		{name: 'mold_code',				type: 'string' },		//금형코드
		{name: 'cvic_name',				type: 'string' },		//설비명
		{name: 'cvic_code',				type: 'string' },		//설비코드
		{name: 'cycl_time',				type: 'float' },		//일지C/T
		{name: 'cvic_drtr_name',		type: 'string' },		//설비담당자
		{name: 'work_cavity',			type: 'string' },		//생산CAVITY
		{name: 'mold_repa'				, type: 'string' },		//금형수리


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
