Ext.define('module.qc.insp.inspentry6.model.InspEntry6Lister1',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'insp_dvcd'			, type: 'string' , defaultValue: '0'},	//검사구분코드
		{	name: 'invc_numb'			, type: 'string' },		//INVOICE번호
		{	name: 'line_seqn'			, type: 'float'  },		//순번
		{	name: 'invc_date'			, type: 'string' ,defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },    //INVOICE일자수
		{	name: 'cstm_idcd'			, type: 'string' },		//거래처ID
		{	name: 'item_idcd'			, type: 'string' },		//품목ID
		{	name: 'wkct_idcd'			, type: 'string' },		//공정ID
		{	name: 'wkct_item_idcd'		, type: 'string' },		//공정품목ID
		{	name: 'acpt_numb'			, type: 'string' },		//수주번호
		{	name: 'acpt_seqn'			, type: 'float'  },		//수주순번
		{	name: 'pdsd_numb'			, type: 'string' },		//생산계획번호
		{	name: 'trtm_drtr_name'		, type: 'string' },		//조치담당자
		{	name: 'trtm_drtr_idcd'		, type: 'string' },		//조치담당자id
		{	name: 'insp_sbsc_seqn'		, type: 'string' },
		{	name: 'amnd_degr'			, type: 'string' },
		{	name: 'pref_rank'			, type: 'string' },
		{	name: 'plan_sttm'			, type: 'string' },
		{	name: 'plan_edtm'			, type: 'string' },
		{	name: 'acpt_qntt'			, type: 'string' },
		{	name: 'wkfw_idcd'			, type: 'string' },
		{	name: 'wkod_numb'			, type: 'string' },		//작업지시번호
		{	name: 'lott_numb'			, type: 'string' },		//LOT번호
		{	name: 'sral_strt_numb'		, type: 'string' },		//시리얼시작번호
		{	name: 'dlvy_idcd'			, type: 'string' },		//납품ID
		{	name: 'dlvy_seqn'			, type: 'float'  },		//납품순번
		{	name: 'cnfm_dept_idcd'		, type: 'string' },		//확인부서ID
		{	name: 'cnfm_drtr_idcd'		, type: 'string' },		//확인담당자ID
		{	name: 'insp_mthd_dvcd'		, type: 'string' },		//검사방법구분코드
		{	name: 'indn_qntt'			, type: 'float'  },		//지시수량
		{	name: 'prod_qntt'			, type: 'float'  },		//생산수량
		{	name: 'rett_qntt'			, type: 'float'  },		//반품수량
		{	name: 'dsse_qntt'			, type: 'float'  },		//폐기수량
		{	name: 'scex_qntt'			, type: 'float'  },		//특채수량
		{	name: 'msmt_valu'			, type: 'string' },		//측정값
		{	name: 'insp_qntt'			, type: 'float'  },		//검사수량
		{	name: 'good_qntt'			, type: 'float'  },		//양품수량
		{	name: 'poor_qntt'			, type: 'float'  },		//불량수량
		{	name: 'pass_qntt'			, type: 'float'  },		//합격수량
		{	name: 'rewk_qntt'			, type: 'float'  },		//재작업수량
		{	name: 'poor_caus_bacd'		, type: 'string' },		//불량원인구분코드
		{	name: 'poor_caus_name'		, type: 'string' },		//불량원인구분코드
		{	name: 'poor_type_bacd'		, type: 'string' },		//불량유형분류코드
		{	name: 'poor_type_name'		, type: 'string' },		//불량유형명
		{	name: 'insp_scre_numb'		, type: 'string' },		//검사성적번호
		{	name: 'smpl_numb'			, type: 'string' },		//샘플링번호
		{	name: 'istt_yorn'			, type: 'string' },		//입고여부
		{	name: 'uper_seqn'			, type: 'float'	 },		//상위순번
		{	name: 'disp_seqn'			, type: 'float' },		//표시순번
		{	name: 'wkct_code'			, type: 'string' },		//공정코드
		{	name: 'wkct_name'			, type: 'string' },		//공정명
		{	name: 'wkct_insp_dvcd'			, type: 'string' },		//
		{	name: 'user_name'			, type: 'string' },		//사용자이름
		{	name: 'judt_dvcd'			, type: 'string' },		//판정
		{	name: 'insp_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},    //검사일자
		{	name: 'smli_dvcd'			, type: 'string' },		//
		{	name: 'insp_strt_time'		, type: 'string' },		//검사시작시간
		{	name: 'rank'				, type: 'string' },		//순번

		{	name: 'wkod_numb'			, type: 'string' },		//지시번호
		{	name: 'pdod_date'			, type: 'string' ,defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },	//지시일자
		{	name: 'trtm_date'			, type: 'string' ,defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },	//지시일자
		{	name: 'cstm_name'			, type: 'string' },		//거래처명
		{	name: 'item_name'			, type: 'string' },		//품명
		{	name: 'item_spec'			, type: 'string' },		//품목코드
		{	name: 'cvic_name'			, type: 'string' },		//검사장비

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
