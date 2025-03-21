Ext.define('module.prod.mold.moldlist.model.MoldList', { extend:'Axt.data.Model',
	fields: [
		{	name: 'mold_idcd'			, type: 'string' },		//금형ID
		{	name: 'mold_code'			, type: 'string' },		//금형코드
		{	name: 'mold_name'			, type: 'string' },		//금형명
		{	name: 'mold_spec'			, type: 'string' },		//금형규격
		{	name: 'used_tons'			, type: 'float'  },		//톤즈
		{	name: 'puch_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//구매일자
		{	name: 'puch_cstm_idcd'		, type: 'string' },		//구매거래처ID
		{	name: 'puch_cstm_name'		, type: 'string' },		//구매거래처명
		{	name: 'mngt_dept_idcd'		, type: 'string' },		//관리부서ID
		{	name: 'mngt_dept_name'		, type: 'string' },		//관리부서명
		{	name: 'vend_tele_numb'		, type: 'string' },		//구매처전화번호
		{	name: 'afsv_tele_numb'		, type: 'string' },		//as전화번호
		{	name: 'make_natn_idcd'		, type: 'string' },		//제조국가id
		{	name: 'make_cmpy_name'		, type: 'string' },		//제조회사명
		{	name: 'puch_amnt'			, type: 'float'  },		//구매금액
		{	name: 'norm_yorn'			, type: 'string' },		//양산여부
		{	name: 'stor_plac'			, type: 'string' },		//보관위치
		{	name: 'owne_riht'			, type: 'string' },		//소유권리
		{	name: 'rcpt_cmpy_name'		, type: 'string' },		//전인수업체
		{	name: 'dsse_resn'			, type: 'string' },		//폐기사유
		{	name: 'dsse_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//폐기일자
		{	name: 'make_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//제작일자
		{	name: 'ejac_mchn'			, type: 'string' },		//사출기기

		{	name: 'cavity'				, type: 'string' },		//cavity
		{	name: 'mold_edtn_numb'		, type: 'float'  },		//금형판개수
		{	name: 'dsig_shot'			, type: 'float'  },		//설계shot
		{	name: 'init_shot'			, type: 'float'  },		//초기shot
		{	name: 'work_shot'			, type: 'float'  },		//작업shot
		{	name: 'totl_shot'			, type: 'float'  },		//누계shot
		{	name: 'updt_expc_shot'		, type: 'float'  },		//수정예상shot
		{	name: 'updt_expc_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//수정예상일자
		{	name: 'runr_wigt'			, type: 'float'  },		//런너중량
		{	name: 'prod_wigt'			, type: 'float'  },		//제품중량
		{	name: 'cycl_time'			, type: 'float'  },		//회전시간
		{	name: 'mtrl_bacd'			, type: 'string' },		//재질구분
		{	name: 'mtrl_name'			, type: 'string' },		//재질구분
		{	name: 'mtrl_bacd_2snd'		, type: 'string' },		//재질구분2
		{	name: 'mtrl_2snd_name'		, type: 'string' },		//재질구분2
		{	name: 'mold_grad_bacd'		, type: 'string' },		//등급구분
		{	name: 'mold_grad_name'		, type: 'string' },		//등급구분
		{	name: 'mold_grad_bacd_2snd'	, type: 'string' },		//등급구분2
		{	name: 'mold_grad_2snd_name'	, type: 'string' },		//등급구분2
		{	name: 'cstm_idcd'			, type: 'string' },		//거래처id
		{	name: 'cstm_name'			, type: 'string' },		//거래처명
		{	name: 'cvic_usge'			, type: 'string' },		//설비용도
		{	name: 'item_idcd'			, type: 'string' },		//제품ID
		{	name: 'item_name'			, type: 'string' },		//제품명
		{	name: 'mchn_numb'			, type: 'string' },		//기기번호
		{	name: 'insp_type_name'		, type: 'string' },		//검사유형명
		{	name: 'insp_type_idcd'		, type: 'string' },		//검사유형코드
		{	name: 'remk_text'			, type: 'string' },		//메모
		{	name: 'egrv_numb'			, type: 'string' },		//각인번호
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
		{	name: 'imge_1fst'			, type: 'string' },		//이미지1
		{	name: 'imge_2snd'			, type: 'string' },		//이미지2
		{	name: 'imge_3trd'			, type: 'string' },		//이미지3
		{	name: 'imge_4frt'			, type: 'string' },		//이미지4
		{	name: 'imge_5fit'			, type: 'string' },		//이미지5
		{	name: 'resultshot'			, type: 'string' },		//잔여shot
	]
});

