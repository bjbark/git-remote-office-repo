Ext.define('module.custom.sjflv.sale.order.oemmast.model.OemMastMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'amnd_degr'			, type: 'float'  , defaultValue: 1		//amd차수
		},{	name: 'line_seqn'			, type: 'float'  , defaultValue: 1		//amd차수
		},{	name: 'bzpl_idcd'			, type: 'string' , defaultValue: _global.hq_id			//사업장
		},{	name: 'invc_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//invoice일자
		},{	name: 'ostt_date'			, type: 'string'	//출고일자
		},{	name: 'acpt_dvcd'			, type: 'string'	//수주구분코드
		},{	name: 'ordr_dvcd'			, type: 'string'	//오더구분코드
		},{	name: 'bsmt_amnt'			, type: 'string'	//오더구분코드
		},{	name: 'orig_invc_numb'		, type: 'string'	//원Invoice번호
		},{	name: 'new_invc_numb'		, type: 'string'	//새Invoice번호
		},{	name: 'new_line_seqn'		, type: 'string'	//새seqn
		},{	name: 'bsmt_amnt_form'		, type: 'string'	//새seqn
		},{	name: 'expt_dvcd'			, type: 'string'	//수출구분코드
		},{	name: 'acpt_dvcd'			, type: 'string'	//수주구분코드
		},{	name: 'pcod_numb'			, type: 'string'	//pono
		},{	name: 'deli_date'			, type: 'string' 	/*납기일자*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'cstm_idcd'			, type: 'string'	//거래처ID
		},{	name: 'cstm_idcd2'			, type: 'string'	//거래처ID
		},{	name: 'cstm_code'			, type: 'string'	//거래처ID
		},{	name: 'cstm_name'			, type: 'string'	//거래처명
		},{	name: 'cstm_name2'			, type: 'string'	//거래처명
		},{	name: 'boss_name'			, type: 'string'	//대표자명
		},{	name: 'mdtn_prsn'			, type: 'string'	//중개인
		},{	name: 'cont_date'			, type: 'string'	//계약일자
		},{	name: 'drtr_idcd'			, type: 'string'	//담당자ID
		},{	name: 'cstm_drtr_name'		, type: 'string'	//고객담당자명
		},{	name: 'drtr_name'			, type: 'string'	//담당자명
		},{	name: 'dept_idcd'			, type: 'string'	//부서ID
		},{	name: 'dept_name'			, type: 'string'	//부서명
		},{	name: 'mtrl_name'			, type: 'string'	//재질명
		},{	name: 'crny_dvcd'			, type: 'string'	//통화구분코드
		},{	name: 'ostt_qntt'			, type: 'float'		//출고수량
		},{	name: 'is_qntt'				, type: 'float'		//입고수량(OEM)
		},{	name: 'is_date'				, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr, //출고일자(OEM)
		},{	name: 'os_qntt'				, type: 'float'		//출고수량(OEM)
		},{	name: 'os_date'				, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr, //출고일자(OEM)
		},{	name: 'orig_seqn'			, type: 'float'		//리비젼번호
		},{	name: 'invc_qntt'			, type: 'float'		//발주수량
		},{	name: 'cont_pric'			, type: 'float'		//수주단가
		},{	name: 'invc_pric'			, type: 'float'		//수주단가
		},{	name: 'sply_amnt'			, type: 'float'		//금액
		},{	name: 'invc_amnt'			, type: 'float'		//수주금액
		},{	name: 'istt_pric'			, type: 'float'		//수주금액
		},{	name: 'item_idcd'			, type: 'string'	//품목ID
		},{	name: 'item_code'			, type: 'string'	//품목코드
		},{	name: 'item_name'			, type: 'string'	//품목명
		},{	name: 'item_spec'			, type: 'string'	//품목규격
		},{	name: 'unit_idcd'			, type: 'string'	//단위ID
		},{	name: 'acct_bacd'			, type: 'string'	//품목계정
		},{	name: 'dlvy_cstm_idcd'		, type: 'string'	//납품처ID
		},{	name: 'upid_baln_qntt'		, type: 'float'		//미납잔량
		},{	name: 'excg_rate'			, type: 'float' , defaultValue : 1		//환율
		},{	name: 'trut_dvcd'			, type: 'string'	//위탁구분코드
		},{	name: 'dlvy_cond_dvcd'		, type: 'string'	//인도조건구분코드
		},{	name: 'crdt_exce_yorn'		, type: 'string'	//여신초과여부
		},{	name: 'amnt_lack_yorn'		, type: 'string'	//금액미달여부
		},{	name: 'sale_stor_yorn'		, type: 'string'	//판매보관여부
		},{	name: 'cofm_yorn'			, type: 'string'	//확정여부
		},{	name: 'cofm_dttm'			, type: 'string'	//확정일시
		},{	name: 'cofm_drtr_idcd'		, type: 'string'	//확정담당자
		},{	name: 'acpt_stat_dvcd'		, type: 'string' , defaultValue: '0010'	//수주상태구분코드
		},{	name: 'deli_reqt_date'		, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납기요청일자
		},{	name: 'login_nm'			, type: 'string' 	//로그인nm
		},{	name: 'login_id'			, type: 'string' 	//로그인id
		},{	name: 'cnt'					, type: 'float ' 	//승인 취소 체크값
		},{	name: 'spec_horz'			, type: 'float' 	//규격가로
		},{	name: 'spec_vrtl'			, type: 'float' 	//규격세로
		},{	name: 'spec_tick'			, type: 'float' 	//규격두께
		},{	name: 'bath_qntt'			, type: 'float' 	//batch수량
		},{	name: 'colr_ccnt'			, type: 'float' 	//컬러도수
		},{	name: 'liqu_type'			, type: 'string' 	//액형
		},{	name: 'fabc_widh'			, type: 'float' 	//원단폭
		},{	name: 'proc_bacd'			, type: 'string' 	//가공분류코드
		},{	name: 'nutc_yorn'			, type: 'string' 	//넛찌여부
		},{	name: 'hole_yorn'			, type: 'string' 	//타공여부
		},{	name: 'stnd_yorn'			, type: 'string' 	//스텐드여부
		},{	name: 'uppr_open_yorn'		, type: 'string' 	//상단오픈여부
		},{	name: 'lwrp_open_yorn'		, type: 'string' 	//하단오픈여부
		},{	name: 'left_open_yorn'		, type: 'string' 	//좌측오픈여부
		},{	name: 'righ_open_yorn'		, type: 'string' 	//우측오픈여부
		},{	name: 'zipr_yorn'			, type: 'string' 	//지퍼여부
		},{	name: 'roll_perc_poch'		, type: 'float' 	//ROLL당파우치
		},{	name: 'ygls_tick'			, type: 'float' 	//유광두께
		},{	name: 'ngls_tick'			, type: 'float' 	//무광두께
		},{	name: 'poch_wdth'			, type: 'float' 	//파우치넓이
		},{	name: 'poch_hght'			, type: 'float' 	//파우치높이
		},{	name: 'poch_tick'			, type: 'float' 	//파우치두께
		},{	name: 'item_tick'			, type: 'float' 	//품목두께
		},{	name: 'real_item_tick'		, type: 'float' 	//실품목두께
		},{	name: 'sale_amnt'			, type: 'float' 	//출하금액
		},{	name: 'dlvy_addr'			, type: 'string' 	//배송지
		},{	name: 'dely_cstm_name'		, type: 'string' 	//배송처
		},{	name: 'modi_yorn'			, type: 'string', defaultValue : 'n'		//수정 변수
		},{	name: 'prod_trst_dvcd'		, type: 'string',   //생산구분
		},{	name: 'pric_cost'			, type: 'float',   	//원료단가
		},{	name: 'bsmt_pric'			, type: 'float',   	//원료단가
		},{	name: 'bsmt_pric2'			, type: 'float',   	//원료단가
		},{	name: 'make_cost'			, type: 'float',   	//임가공비
		},{	name: 'revs_numb'			, type: 'float',
		},{	name: 'prod_cost'			, type: 'float',   	//생산비


		},{	name: 'wndw_area'			, type: 'float' 	//총면적
		},{	name: 'wdbf_cost'			, type: 'float' 	//BF원가
		},{	name: 'wdsf_cost'			, type: 'float' 	//SF원가
		},{	name: 'wdmf_cost'			, type: 'float' 	//MF원가
		},{	name: 'wdsf_glss_cost'		, type: 'float' 	//유리원가
		},{	name: 'totl_cost'			, type: 'float' 	//견적금액
		},{	name: 'tmmk_pric'			, type: 'float' 	//임가공단가
			
		},{	name: 'rcpt_cmpy_idcd'		, type: 'string' 	//인수처ID
		},{	name: 'rcpt_cmpy_name'		, type: 'string' 	//인수처명

		},{	name: 'mcls_name'			, type: 'string' 	//중분류

		},{	name: 'hqof_idcd'			, type: 'string' , defaultValue : _global.hqof_idcd,		//사업장id
		},{	name: 'chk'					, type: 'string'	//chk
		},{	name: 'user_memo'			, type: 'string'	//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'	//부모ID
		},{	name: 'line_levl'			, type: 'float'  , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float'  , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string' , defaultValue: '0'	// ROW상태
		},{	name: 'line_clos'			, type: 'string' , defaultValue : 0		// ROW마감
		},{	name: 'find_name'			, type: 'string'	// 찾기명
		},{	name: 'updt_user_name'		, type: 'string'	// 수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'	// 수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue: _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'	// 수정UI
		},{	name: 'crte_user_name'		, type: 'string'	// 생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	// 생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue: _global.login_pk				//생성ID
		},{	name: 'crte_urif'			, type: 'string'	// 생성UI
		},{	name: 'pdsd_yorn'			, type: 'string'	// 생산계획여부
		},{	name: 'mes_system_type'		, type: 'string' , defaultValue:_global.options.mes_system_type	//
		},{	name: 'prod_trst_dvcd'		, type: 'string' , defaultValue: '1000'	//생산의뢰구분코드
		},{	name: 'vatx_dvcd'			, type: 'string'	// 과세여부
		},{	name: 'vatx_incl_yorn'		, type: 'string'	//부가세포함여부
		}
	]
});