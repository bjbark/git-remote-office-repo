Ext.define('module.cost.costlist.model.CostList',{ extend:'Axt.data.Model',
	fields : [
		{name: 'invc_numb'				, type: 'string' },		//LOT번호
		{name: 'invc_date'				, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	//생산일자
		{name: 'bzpl_idcd'				, type: 'string' },		//사업장ID
		{name: 'prod_dept_idcd'			, type: 'string' },		//생산부서ID
		{name: 'wkfw_idcd'				, type: 'string' },		//공정흐름ID
		{name: 'wkct_idcd'				, type: 'string' },		//공정ID
		{name: 'cvic_idcd'				, type: 'string' },		//설비ID
		{name: 'mold_idcd'				, type: 'string' },		//금형ID
		{name: 'item_idcd'				, type: 'string' },		//품목ID
		{name: 'item_code'				, type: 'string' },		//품목코드
		{name: 'item_mtrl'				, type: 'string' },		//품목재질
		{name: 'item_spec'				, type: 'string' },		//품목규격
		{name: 'item_name'				, type: 'string' },		//품명
		{name: 'invc_qntt'				, type: 'float'  },		//단가
		{name: 'invc_pric'				, type: 'float'  },		//금액
		{name: 'invc_amnt'				, type: 'float'  },		//금액
		{name: 'sply_amnt'				, type: 'float'  },		//금액
		{name: 'cvic_name'				, type: 'string' },		//설비명
		{name: 'cavity'					, type: 'string' },		//cavity
		{name: 'cycl_time'				, type: 'string' },		//cycle time
		{name: 'good_prgs'				, type: 'float'  },		//양품율
		{name: 'mtrl_bacd'				, type: 'string' },		//재질분류코드
		{name: 'pdsd_numb'				, type: 'string' },		//생산계획번호
		{name: 'wkod_numb'				, type: 'string' },		//작업지시번호
		{name: 'wkod_seqn'				, type: 'float'  },		//작업지시순번
		{name: 'dayn_dvcd'				, type: 'string' },		//주야구분코드
		{name: 'indn_qntt'				, type: 'float'  },		//지시수량
		{name: 'prod_qntt'				, type: 'float'  },		//생산수량
		{name: 'good_qntt'				, type: 'float'  },		//양품수량
		{name: 'poor_qntt'				, type: 'float'  },		//불량수량
		{name: 'theo_qntt'				, type: 'float'  },		//이론수량
		{name: 'unit_pric'				, type: 'float'  },		//개당단가
		{name: 'ttsm_amnt'				, type: 'float'  },		//합계금액
		{name: 'mtrl_amnt'				, type: 'float'  },		//원재료비
		{name: 'labo_amnt'				, type: 'float'  },		//인건비
		{name: 'adex_amnt'				, type: 'float'  },		//임율(관리비)
		{name: 'prof_amnt'				, type: 'float'  },		//관리&이윤
		{name: 'finl_cost'				, type: 'float'  },		//최종생산원가
		{name: 'finl_unit_cost'			, type: 'float'  },		//최종개당원가
		{name: 'cost_sale'				, type: 'float'  },		//판매대비원가비
		{name: 'work_sttm'				, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//작업시작시간
		{name: 'work_edtm'				, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//작업종료시간
		{name: 'need_time'				, type: 'string' },		//소요시간
		{name: 'work_mnhr'				, type: 'string' },		//작업공수
		{name: 'wker_idcd'				, type: 'string' },		//작업자ID
		{name: 'work_pcnt'				, type: 'string' },		//작업인원
		{name: 'lott_numb'				, type: 'string' },		//LOT번호
		{name: 'rewd_objt_qntt'			, type: 'string' },		//재생대상수량
		{name: 'work_cond_1fst'			, type: 'string' },		//작업조건1
		{name: 'work_cond_2snd'			, type: 'string' },		//작업조건2
		{name: 'work_cond_3trd'			, type: 'string' },		//작업조건3
		{name: 'work_cond_5fit'			, type: 'string' },		//작업조건5
		{name: 'work_cond_6six'			, type: 'string' },		//작업조건6
		{name: 'work_cond_7svn'			, type: 'string' },		//작업조건7
		{name: 'stun_prod_qntt'			, type: 'float'  },		//기준단위생산수량
		{name: 'stun_good_qntt'			, type: 'float'  },		//기준단위양품수량
		{name: 'stun_poor_qntt'			, type: 'float'  },		//기준단위불량수량
		{name: 'work_dvcd'				, type: 'float'  },		//작업구분코드
		{name: 'wkct_insp_yorn'			, type: 'string' },		//공정검사여부
		{name: 'last_wkct_yorn'			, type: 'string' },		//최종공정여부
		{name: 'work_para'				, type: 'string' },		//작업조
		{name: 'mtrl_ivst_yorn'			, type: 'string' },		//자재투입여부
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
