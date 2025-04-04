Ext.define('module.custom.dhtec.sale.sale.saleplanlist2.model.SalePlanList2Master0',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'amnd_degr'			, type: 'float'  , defaultValue: 1		//amd차수
		},{	name: 'bzpl_idcd'			, type: 'string' , defaultValue: _global.hq_id			//사업장
		},{	name: 'invc_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//invoice일자
		},{	name: 'ordr_dvcd'			, type: 'string'	//오더구분코드
		},{	name: 'orig_invc_numb'		, type: 'string'	//원Invoice번호
		},{	name: 'item_count'			, type: 'string'	//건별 품목수
		},{	name: 'expt_dvcd'			, type: 'string'	//수출구분코드
		},{	name: 'pcod_numb'			, type: 'string'	//pono
		},{	name: 'max_deli'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납기일자
		},{	name: 'cstm_idcd'			, type: 'string'	//거래처ID
		},{	name: 'cstm_code'			, type: 'string'	//거래처ID
		},{	name: 'cstm_name'			, type: 'string'	//거래처명
		},{	name: 'boss_name'			, type: 'string'	//대표자명
		},{	name: 'mdtn_prsn'			, type: 'string'	//중개인
		},{	name: 'cont_date'			, type: 'string'	//계약일자
		},{	name: 'drtr_idcd'			, type: 'string'	//담당자ID
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
		},{	name: 'acpt_stat_dvcd'		, type: 'string' , defaultValue: '0010'	//수주상태구분코드
		},{	name: 'deli_reqt_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납기요청일자
		},{	name: 'login_nm'			, type: 'string' 	//로그인nm
		},{	name: 'login_id'			, type: 'string' 	//로그인id
		},{	name: 'cstm_lott_numb'		, type: 'string' 	//lot번호
		},{	name: 'item_idcd'			, type: 'string' 	//품목ID
		},{	name: 'item_code'			, type: 'string' 	//품목코드
		},{	name: 'item_name'			, type: 'string' 	//품명
		},{	name: 'item_spec'			, type: 'string' 	//규격
		},{	name: 'invc_qntt'			, type: 'float' 	//수량
		},{	name: 'ostt_qntt'			, type: 'float' 	//납품수량
		},{	name: 'upid_qntt'			, type: 'float' 	//미납수량
		},{	name: 'line_seqn'			, type: 'float' 	//수주항번
		},{	name: 'deli_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//협력사변경납기일자
		},{	name: 'cstm_offr_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr, 	//발주일자
		},{	name: 'cstm_deli_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//납기일자
		},{	name: 'cstm_drtr_name'		, type: 'string' 	//담당자명
		},{	name: 'deli_chge_resn'		, type: 'string' 	//협력사변경사유
		},{	name: 'invc_pric'			, type: 'float' 	//단가
		},{	name: 'sply_amnt'			, type: 'float' 	//금액
		},{	name: 'remk_text'			, type: 'string' 	//후공정처및거래처
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
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDate		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue: _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'	// 수정UI
		},{	name: 'crte_user_name'		, type: 'string'	// 생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	// 생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDate		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue: _global.login_pk				//생성ID
		},{	name: 'crte_urif'			, type: 'string'	// 생성UI
		},{	name: 'crte_name'			, type: 'string'	// 생성자명
		}
	]
});
