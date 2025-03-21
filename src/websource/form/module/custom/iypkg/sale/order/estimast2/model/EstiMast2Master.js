Ext.define('module.custom.iypkg.sale.order.estimast2.model.EstiMast2Master', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'amnd_degr'			, type: 'float'  , defaultValue: 1		//amd차수
		},{	name: 'line_seqn'			, type: 'float'		//순번
		},{	name: 'assi_seqn'			, type: 'float'		//보조순번
		},{	name: 'bzpl_idcd'			, type: 'string'	//사업장
		},{	name: 'invc_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'),convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//invoice일자
		},{	name: 'cstm_idcd'			, type: 'string'	//거래처id
		},{	name: 'cstm_code'			, type: 'string'	//거래처코드
		},{	name: 'cstm_name'			, type: 'string'	//거래처명
		},{	name: 'esti_dvcd'			, type: 'string'	//견적구분코드
		},{	name: 'deli_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//납기일자
		},{	name: 'dept_idcd'			, type: 'string'	//부서id
		},{	name: 'drtr_idcd'			, type: 'string'	//담당자id
		},{	name: 'drtr_name'			, type: 'string'	//담당자명
		},{	name: 'boss_name'			, type: 'string'	//대표자명
		},{	name: 'expt_dvcd'			, type: 'string'	//수출구분코드
		},{	name: 'gnrl_mngt_cost_rate'	, type: 'float'		//일반관리비율
		},{	name: 'pfit_rate'			, type: 'float'		//이익율
		},{	name: 'mdtn_prsn'			, type: 'string'	//중개인
		},{	name: 'dlvy_cond'			, type: 'string'	//인도조건
		},{	name: 'esti_vald_term'		, type: 'string'	//견적유효기간
		},{	name: 'excg_rate_chge_yorn'	, type: 'string'	//환율변경여부
		},{	name: 'paym_cond'			, type: 'string'	//지불조건
		},{	name: 'memo'				, type: 'string'	//메모
		},{	name: 'esti_amnt'			, type: 'float'		//견적금액
		},{	name: 'esti_vatx'			, type: 'float'		//견적부가세
		},{	name: 'ttsm_amnt'			, type: 'float'		//합계금액
		},{	name: 'rcvr_name'			, type: 'string'	//수신자명
		},{	name: 'esti_case_name'		, type: 'string'	//견적건명
		},{	name: 'supl_dvcd'			, type: 'string'	//조달구분
		},{	name: 'crny_dvcd'			, type: 'string'	//통화구분코드
		},{	name: 'excg_rate'			, type: 'float'		//환율
		},{	name: 'vatx_dvcd'			, type: 'string'	//자료구분

		},{	name: 'prod_code'			, type: 'string'	//품목코드
		},{	name: 'prod_name'			, type: 'string'	//품목명
		},{	name: 'item_spec'			, type: 'string'	//품목규격
		},{	name: 'esti_qntt'			, type: 'float'		//견적수량
		},{	name: 'bxty_idcd'			, type: 'string'	//박스ID
		},{	name: 'bxty_name'			, type: 'string'	//박스명
		},{	name: 'mtrl_idcd'			, type: 'string'	//원단ID
		},{	name: 'mtrl_name'			, type: 'string'	//원단명
		},{	name: 'ppln_dvcd'			, type: 'float'		//품목골
		},{	name: 'item_leng'			, type: 'float'		//장
		},{	name: 'item_widh'			, type: 'float'		//폭
		},{	name: 'item_hght'			, type: 'float'		//고
		},{	name: 'mxm2_qntt'			, type: 'float'		//제곱미터수량
		},{	name: 'mxm2_pric'			, type: 'float'		//제곱미터단가

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
		},{	name: 'acpt_cofm_yorn'		, type: 'string' , defaultValue : '0'		// 수주확정여부
		},{	name: 'chk'					, type: 'string'	//수정 변수
		}
	],
	recalculation: function(inv) {
		var row = this,
			baseamt = row.get('qntt') * row.get('pric')
		;
		row.set('amnt'	, row.get('qntt') * row.get('pric')) ;
	}
});