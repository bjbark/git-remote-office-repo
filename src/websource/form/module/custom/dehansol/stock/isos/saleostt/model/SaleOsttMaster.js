Ext.define('module.custom.dehansol.stock.isos.saleostt.model.SaleOsttMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'amnd_degr'			, type: 'float'  , defaultValue: 1		//amd차수
		},{	name: 'bzpl_idcd'			, type: 'string' , defaultValue: _global.hq_id			//사업장
		},{	name: 'invc_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr 	//invoice일자
		},{	name: 'ordr_dvcd'			, type: 'string'	//오더구분코드
		},{	name: 'orig_invc_numb'		, type: 'string'	//원Invoice번호
		},{	name: 'item_count'			, type: 'string'	//건별 품목수
		},{	name: 'expt_dvcd'			, type: 'string'	//수출구분코드
		},{	name: 'pcod_numb'			, type: 'string'	//pono
		},{	name: 'max_deli'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납기일자
		},{	name: 'cstm_idcd'			, type: 'string'	//거래처ID
		},{	name: 'cstm_code'			, type: 'string'	//거래처코드
		},{	name: 'cstm_name'			, type: 'string'	//거래처명
		},{	name: 'boss_name'			, type: 'string'	//대표자명
		},{	name: 'mdtn_prsn'			, type: 'string'	//중개인
		},{	name: 'cont_date'			, type: 'string'	//계약일자
		},{	name: 'drtr_idcd'			, type: 'string', defaultValue: _global.login_id		//담당자ID
		},{	name: 'cstm_drtr_name'		, type: 'string'	//담당자명
		},{	name: 'drtr_name'			, type: 'string'	//담당자명
		},{	name: 'dept_idcd'			, type: 'string'	//부서ID
		},{	name: 'dept_name'			, type: 'string'	//부서명
		},{	name: 'crny_dvcd'			, type: 'string'	//통화구분코드
		},{	name: 'excg_rate'			, type: 'float' , defaultValue : 1		//환율
		},{	name: 'trut_dvcd'			, type: 'string'	//위탁구분코드
		},{	name: 'dlvy_cond_dvcd'		, type: 'string'	//인도조건구분코드
		},{	name: 'crdt_exce_yorn'		, type: 'string'	//여신초과여부
		},{	name: 'amnt_lack_yorn'		, type: 'string'	//금액미달여부
		},{	name: 'sale_stor_yorn'		, type: 'string'	//판매보관여부
		},{	name: 'cofm_yorn'			, type: 'string'	//확정여부
		},{	name: 'cofm_dttm'			, type: 'string'	//확정일시
		},{	name: 'cofm_drtr_idcd'		, type: 'string'	//확정담당자
		},{	name: 'acpt_stat_dvcd'		, type: 'string' , defaultValue: '0011'	//수주상태구분코드
		},{	name: 'deli_reqt_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납기요청일자
		},{	name: 'login_nm'			, type: 'string' 	//로그인nm
		},{	name: 'login_id'			, type: 'string' 	//로그인id
		},{	name: 'cstm_lott_numb'		, type: 'string' 	//lot번호
		},{	name: 'item_idcd'			, type: 'string' 	//품목ID
		},{	name: 'item_name'			, type: 'string' 	//품명
		},{	name: 'item_spec'			, type: 'string' 	//규격
		},{	name: 'modl_name'			, type: 'string' 	//모델명
		},{	name: 'invc_qntt'			, type: 'float', defaultValue : 1	   	//수량
		},{	name: 'upid_qntt'			, type: 'float' 	//미납수량
		},{	name: 'line_seqn'			, type: 'float' 	//수주항번
		},{	name: 'deli_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//협력사변경납기일자
		},{	name: 'cstm_offr_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr, 	//발주일자
		},{	name: 'cstm_deli_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//납기일자
		},{	name: 'cstm_drtr_name'		, type: 'string' 	//담당자명
		},{	name: 'deli_chge_resn'		, type: 'string' 	//협력사변경사유
		},{	name: 'invc_pric'			, type: 'float'   	//단가
		},{	name: 'sply_amnt'			, type: 'float'  	//금액
		},{	name: 'sum_qntt'			, type: 'float'  	//총수량
		},{	name: 'sum_amnt'			, type: 'float'  	//총금액
		},{	name: 'remk_text'			, type: 'string' 	//후공정처및거래처
		},{	name: 'ostt_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	//출고일자

		},{	name: 'dict_yorn'			, type: 'string'	//치공구유형구분코드
		},{	name: 'fixt_type_dvcd'		, type: 'string'	//치공구유형구분코드
		},{	name: 'fixt_code'			, type: 'string'	//치공구유형구분코드
		},{	name: 'puch_reqt_numb'		, type: 'string'	//구매요청번호
		},{	name: 'puch_reqt_date'		, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//구매요청일자
		},{	name: 'chit_elec_date'		, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//전표전기일자
		},{	name: 'tool_numb'			, type: 'string'	//TOOL번호
		},{	name: 'film_numb'			, type: 'string'	//필름번호
		},{	name: 'film_kind_dvcd'		, type: 'string'	//필름종류구분코드
		},{	name: 'film_name'			, type: 'string'	//필름명
		},{	name: 'film_acpt_dttm'		, type: 'string',  convert : Ext.util.Format.strToDateTime	//필름수령일시
		},{	name: 'plmk_numb'			, type: 'string'	//제판번호
		},{	name: 'plmk_kind_code'		, type: 'string'	//제판종류코드
		},{	name: 'plmk_kind_name'		, type: 'string'	//제판종류명
		},{	name: 'plmk_kind_name2'		, type: 'string'	//제판종류명
		},{	name: 'plmk_size'			, type: 'string'	//제판크기
		},{	name: 'mesh_bacd'			, type: 'string'	//망사분류코드
		},{	name: 'mesh_bacd_name'		, type: 'string'	//망사이름
		},{	name: 'mesh_name'			, type: 'string'	//망사명
		},{	name: 'mesh_type_dvcd'		, type: 'string'	//망사타입구분코드
		},{	name: 'jigg_code'			, type: 'string'	//지그코드
		},{	name: 'jigg_grup_code'		, type: 'string'	//지그그룹코드
		},{	name: 'bbtt_jigg_type'		, type: 'string'	//BBT지그타입
		},{	name: 'cstm_prod_numb'		, type: 'string'	//고객제품번호
		},{	name: 'cstm_modl_name'		, type: 'string'	//고객모델명
		},{	name: 'revs_numb'			, type: 'string'	//리비젼번호
		},{	name: 'mtrl_name'			, type: 'string'	//자재명
		},{	name: 'cstm_name2'			, type: 'string'	//고객거래처명
		},{	name: 'cstm_code'			, type: 'string'	//고객거래처코드
		},{	name: 'pdgr'				, type: 'string'	//제품군
		},{	name: 'strt_flor'			, type: 'string'	//시층
		},{	name: 'endd_flor'			, type: 'string'	//종층
		},{	name: 'xscl'				, type: 'string'	//X스케일
		},{	name: 'yscl'				, type: 'string'	//Y스케일
		},{	name: 'wkct_code'			, type: 'string'	//공정코드
		},{	name: 'wkct_name'			, type: 'string'	//공정명
		},{	name: 'wkct_ordr'			, type: 'float'		//공정순서
		},{	name: 'indv_qntt'			, type: 'float'		//개체수
		},{	name: 'hole_diam'			, type: 'float'		//홀파이
		},{	name: 'hpjg_proc_mthd'		, type: 'string'	//HP지그가공방법
		},{	name: 'prjg_proc_mthd'		, type: 'string'	//인쇄지그가공방법
		},{	name: 'yval_cetr'			, type: 'float'		//Y값중심
		},{	name: 'bbtt_pont'			, type: 'float'		//BBT포인트
		},{	name: 'jgup_qntt'			, type: 'float'		//지그업수
		},{	name: 'hole_qntt'			, type: 'float'		//홀수
		},{	name: 'brcd'				, type: 'string'	//바코드
		},{	name: 'full_angl'			, type: 'string'	//견장각도
		},{	name: 'tens_from'			, type: 'string'	//텐션부터
		},{	name: 'tens_util'			, type: 'string'	//텐션까지
		},{	name: 'wkly_1fst'			, type: 'float'		//주간1
		},{	name: 'wkly_2snd'			, type: 'float'		//주간2
		},{	name: 'spmr_hold_yorn'		, type: 'string'	//사급자재보유여부
		},{	name: 'spmr_acpt_dttm'		, type: 'string'	//사급자재수령일시
		},{	name: 'spmr_acpt_offe'		, type: 'string'	//사급자재수령일시
		},{	name: 'b_line'				, type: 'float'		//건너뛰기
		},{	name: 'film_acpt_yorn'		, type: 'string'	//필름수령여부
		},{	name: 'film_acpt_offe'		, type: 'string'	//필름수령처
		},{	name: 'levl_publ_yorn'		, type: 'string'	//레벨발행여부
		},{	name: 'tool_revs'			, type: 'string'	//TOOL_REV번호
		},{	name: 'sufc_dvcd'			, type: 'string'	//면구분코드
		},{	name: 'trst_name'			, type: 'string'	//의뢰자명
		},{	name: 'dict_dvsn_name'		, type: 'string'	// 다이렉트구분명
		},{	name: 'prcs_type'			, type: 'string'	// 주문유형
		},{	name: 'istt_qntt'			, type: 'float'		// 입고수량
		},{	name: 'base_unit'			, type: 'string'	// 기본단위
		},{	name: 'make_entr_name'		, type: 'string'	// 제작업체명
		},{	name: 'nwol_dvsn_name'		, type: 'string'	// 신구구분명
		},{	name: 'olmt_tick'			, type: 'string'	// 유제두께
		},{	name: 'norm_yorn'			, type: 'string'	// 양산여부
		},{	name: 'otod_istt_cstm'		, type: 'string'	// 외주입고거래처
		},{	name: 'mcmp_istt_cstm'		, type: 'string'	// 자사입고거래처
		},{	name: 'json_data'			, type: 'float' 	//JSONDATA

		},{	name: 'rprt_file_name'		, type: 'string'	//보고서파일명
		},{	name: 'rpst_item_idcd'		, type: 'string'	//표준품목코드
		},{	name: 'plmk_size_horz'		, type: 'string'	//규격(가로)
		},{	name: 'plmk_size_vrtl'		, type: 'string'	//규격(세로)

		},{	name: 'user_memo'			, type: 'string'	//발주품목비고
		},{	name: 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'	//부모ID
		},{	name: 'line_levl'			, type: 'float'  , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float'  , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string' , defaultValue: '0'	// ROW상태
		},{	name: 'line_clos'			, type: 'string' , defaultValue : 0		// ROW마감
		},{	name: 'find_name'			, type: 'string'	// 찾기명
		},{	name: 'updt_user_name'		, type: 'string'	// 수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'	// 수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime	// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue: _global.login_pk			// 수정ID
		},{	name: 'updt_urif'			, type: 'string'	// 수정UI
		},{	name: 'crte_user_name'		, type: 'string'	// 생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	// 생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime	// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue: _global.login_pk			// 생성ID
		},{	name: 'crte_urif'			, type: 'string'	// 생성UI
		}
	]
});