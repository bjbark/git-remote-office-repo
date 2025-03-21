Ext.define('module.custom.hjsys.sale.order.saleorder.model.SaleOrderMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'amnd_degr'			, type: 'float '  , defaultValue: 1		//amd차수
		},{	name: 'bzpl_idcd'			, type: 'string' 	//사업장ID
		},{	name: 'invc_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//INVOICE일자
		},{	name: 'ordr_dvcd'			, type: 'string' 	//오더구분코드
		},{	name: 'orig_invc_numb'		, type: 'string' 	//원INVOICE번호
		},{	name: 'modl_name'			, type: 'string' 	//모델명
		},{	name: 'expt_dvcd'			, type: 'string' 	//수출구분코드
		},{	name: 'pcod_numb'			, type: 'string' 	//PONO
		},{	name: 'deli_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//납기일자
		},{	name: 'deli_rate'			, type: 'float' 	//품명수
		},{	name: 'cstm_idcd'			, type: 'string' 	//거래처ID
		},{	name: 'cstm_code'			, type: 'string' 	//거래처코드
		},{	name: 'dlvy_cstm_idcd'		, type: 'string' 	//납품거래처ID
		},{	name: 'dlvy_cstm_name'		, type: 'string' 	//납품처명
		},{	name: 'dlvy_cstm'			, type: 'string' 	//납품거래처명
		},{	name: 'cstm_name'			, type: 'string' 	//고객명
		},{	name: 'acpt_dvcd'			, type: 'string' 	//수주구분코드
		},{	name: 'mdtn_prsn'			, type: 'string' 	//중개인
		},{	name: 'cont_date'			, type: 'string' 	//계약일자
		},{	name: 'drtr_idcd'			, type: 'string' , defaultValue: _global.login_id		//담당자ID	//담당자ID
		},{	name: 'dept_idcd'			, type: 'string' 	//부서ID
		},{	name: 'crny_dvcd'			, type: 'string' 	//통화구분코드
		},{	name: 'excg_rate'			, type: 'float ' , defaultValue : 0	 	//환율
		},{	name: 'ostt_wrhs_idcd'		, type: 'string' 	//출고창고ID
		},{	name: 'acpt_qntt'			, type: 'float ' , defaultValue : 1		//수주수량
		},{	name: 'unit_idcd'			, type: 'string' 	//단위ID
		},{	name: 'unit_name'			, type: 'string' 	//단위명
		},{	name: 'trut_dvcd'			, type: 'string' 	//위탁구분코드
		},{	name: 'dlvy_cond_dvcd'		, type: 'string' 	//인도조건구분코드
		},{	name: 'crdt_exce_yorn'		, type: 'string' 	//여신초과여부
		},{	name: 'amnt_lack_yorn'		, type: 'string' 	//금액미달여부
		},{	name: 'sale_stor_yorn'		, type: 'string' 	//판매보관여부
		},{	name: 'remk_text'			, type: 'string' 	//비고
		},{	name: 'memo'				, type: 'string' 	//메모
		},{	name: 'cofm_yorn'			, type: 'string' 	//확정여부
		},{	name: 'cofm_dttm'			, type: 'string' 	//확정일시
		},{	name: 'cstm_drtr_name'		, type: 'string' 	//거래처담당자명
		},{	name: 'cofm_drtr_idcd'		, type: 'string' 	//확정담당자ID
		},{	name: 'acpt_stat_dvcd'		, type: 'string' , defaultValue: '0011'	//수주상태구분코드
		},{	name: 'pror_chk'			, type: 'float'  , defaultValue: 0	// 계획
		},{	name: 'main_chk'			, type: 'float'  , defaultValue: 0	// 원자재
		},{	name: 'sub_chk'				, type: 'float'  , defaultValue: 0	// 부자재
		},{	name: 'esti_cnfm_yorn'		, type: 'float'  , defaultValue: 0	//견적여부
		},{	name: 'qntt_totl'			, type: 'float' 	//품명총수량
		},{	name: 'chk'					, type: 'string'	//체크
		},{	name: 'line_seqn'			, type: 'float'  , defaultValue : 1 	//순번
		},{	name: 'mtrl_seqn'			, type: 'float'		//자재순번

		},{	name: 'item_code'			, type: 'string'	//제품코드
		},{	name: 'item_leng'			, type: 'float'		//제품길이
		},{	name: 'item_widh'			, type: 'float'		//제품넓이


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
		},{	name: 'stor_id'				, type: 'string' , defaultValue : _global.stor_id
		},{	name: 'item_idcd'			, type: 'string'
		},{	name: 'modify'				, type: 'string'
		}
	]
});