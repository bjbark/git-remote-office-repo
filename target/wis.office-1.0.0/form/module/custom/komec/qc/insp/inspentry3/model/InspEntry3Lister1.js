Ext.define('module.custom.komec.qc.insp.inspentry3.model.InspEntry3Lister1',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'insp_dvcd'			, type: 'string' , defaultValue: '0'},    //검사구분코드
		{	name: 'invc_numb'			, type: 'string' },		//INVOICE번호
		{	name: 'line_seqn'			, type: 'float'  },		//순번
		{	name: 'wkct_insp_dvcd'		, type: 'string' },		//공정검사구분코드
		{	name: 'invc_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },    //INVOICE일자
		{	name: 'cstm_idcd'			, type: 'string' },		//거래처ID
		{	name: 'item_idcd'			, type: 'string' },		//품목ID
		{	name: 'wkct_idcd'			, type: 'string' },		//공정ID
		{	name: 'wkct_item_idcd'		, type: 'string' },		//공정품목ID
		{	name: 'acpt_numb'			, type: 'string' },		//수주번호
		{	name: 'acpt_seqn'			, type: 'float'  },		//수주순번
		{	name: 'pdsd_numb'			, type: 'string' },		//생산계획번호
		{	name: 'wkod_numb'			, type: 'string' },		//작업지시번호
		{	name: 'orig_invc_numb'		, type: 'string' },		//작업지시번호
		{	name: 'orig_seqn'			, type: 'float ' },		//작업지시번호
		{	name: 'lott_numb'			, type: 'string' },		//LOT번호
		{	name: 'sral_strt_numb'		, type: 'string' },		//시리얼시작번호
		{	name: 'dlvy_idcd'			, type: 'string' },		//납품ID
		{	name: 'dlvy_seqn'			, type: 'float'  },		//납품순번
		{	name: 'cnfm_dept_idcd'		, type: 'string' },		//확인부서ID
		{	name: 'cnfm_drtr_idcd'		, type: 'string' },		//확인담당자ID
		{	name: 'insp_mthd_dvcd'		, type: 'string' },		//검사방법구분코드
		{	name: 'indn_qntt'			, type: 'float'  },		//지시수량
		{	name: 'prod_qntt'			, type: 'float'  },		//생산수량
		{	name: 'msmt_valu'			, type: 'string' },		//측정값
		{	name: 'msmt_valu2'			, type: 'string' },		//측정값2
		{	name: 'msmt_valu3'			, type: 'string' },		//측정값3
		{	name: 'msmt_valu4'			, type: 'string' },		//측정값4
		{	name: 'msmt_valu5'			, type: 'string' },		//측정값5
		{	name: 'insp_qntt'			, type: 'float'  },		//검사수량
		{	name: 'good_qntt'			, type: 'float'  },		//양품수량
		{	name: 'poor_qntt'			, type: 'float'  },		//불량수량
		{	name: 'pass_qntt'			, type: 'float'  },		//합격수량
		{	name: 'poor_caus_bacd'		, type: 'string' },		//불량원인분류코드
		{	name: 'poor_caus_name'		, type: 'string' },		//불량원인명
		{	name: 'poor_type_bacd'		, type: 'string' },		//불량유형분류코드
		{	name: 'poor_type_name'		, type: 'string' },		//불량유형명
		{	name: 'insp_scre_numb'		, type: 'string' },		//검사성적번호
		{	name: 'smpl_numb'			, type: 'string' },		//샘플링번호
		{	name: 'istt_yorn'			, type: 'string' },		//입고여부
		{	name: 'uper_seqn'			, type: 'float' },		//상위순번
		{	name: 'disp_seqn'			, type: 'float' },		//표시순번
		{	name: 'wkct_code'			, type: 'string' },		//공정코드
		{	name: 'wkct_name'			, type: 'string' },		//공정명
		{	name: 'insp_dvcd'			, type: 'string' },		//
		{	name: 'user_name'			, type: 'string' },		//
		{	name: 'judt_dvcd'			, type: 'string' },		//판정
		{	name: 'insp_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},    //검사일자
		{	name: 'smli_dvcd'			, type: 'string' },		//
		{	name: 'insp_strt_time'		, type: 'string' , convert : Ext.util.Format.strToTime},		//검사시작시간
		{	name: 'insp_cvic_idcd'		, type: 'string' },		//검사장비ID
		{	name: 'cvic_name'			, type: 'string' },		//검사장비
		{	name: 'insp_sbsc_dvcd'		, type: 'string' },		//검사항목ID
		{	name: 'base_name'			, type: 'string' },		//
		{	name: 'base_code'			, type: 'string' },		//
		{	name: 'insp_type_idcd'		, type: 'string' },		//검사유형ID
		{	name: 'insp_sbsc_name'		, type: 'string' },		//검사유형명
		{	name: 'insp_cond'			, type: 'string' },		//검사조건


		{	name: 'user_memo'			, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'			, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'			, type: 'string' },		//부모ID
		{	name: 'line_levl'			, type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'			, type: 'string' },		//ROW순서
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
