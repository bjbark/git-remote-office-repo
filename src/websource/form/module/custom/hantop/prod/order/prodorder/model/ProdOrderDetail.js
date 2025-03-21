Ext.define('module.custom.hantop.prod.order.prodorder.model.ProdOrderDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice번호
		},{	name: 'amnd_degr'			, type: 'float' , defaultValue : 1	//amd차수
		},{	name: 'line_seqn'			, type: 'float'			//순번
		},{	name: 'ispl_name'			, type: 'string'		//설치위치명
		},{	name: 'wndw_modl_idcd'		, type: 'string'		//창호모델ID
		},{	name: 'modl_name'			, type: 'string'		//창호모델명
		},{	name: 'wdgr_idcd'			, type: 'string'		//창호그룹ID
		},{	name: 'wdtp_idcd'			, type: 'string'		//창호형태ID
		},{	name: 'wdsf_rate_name'		, type: 'string'		//창형태 = 창짝비율명
		},{	name: 'wndw_dirt_dvcd'		, type: 'string'		//창방향
		},{	name: 'invc_qntt'			, type: 'float'			//수량
		},{	name: 'wdbf_itid'			, type: 'string'		//BF품목ID
		},{	name: 'wdsf_itid'			, type: 'string'		//SF품목ID
		},{	name: 'item_widh'			, type: 'float'			//길이 = 폭
		},{	name: 'item_widh_1fst'		, type: 'float'			//길이1 = 폭
		},{	name: 'item_hght'			, type: 'float'			//높이
		},{	name: 'item_hght_1fst'		, type: 'float'			//높이1
		},{	name: 'inwp_itid'			, type: 'string'		//내부랩핑품목ID
		},{	name: 'otwp_itid'			, type: 'string'		//외부랩핑품목ID
		},{	name: 'ings_itid'			, type: 'string'		//내부유리품목ID
		},{	name: 'otgs_itid'			, type: 'string'		//외부유리품목ID
		},{	name: 'ings_fixd_itid'		, type: 'string'		//내부유리FIX품목ID
		},{	name: 'otgs_fixd_itid'		, type: 'string'		//외부유리FIX품목ID
		},{	name: 'ings_tick'			, type: 'string'		//내부유리두께
		},{	name: 'otgs_tick'			, type: 'string'		//외부유리두께
		},{	name: 'inhd_left_itid'		, type: 'string'		//내부핸들좌측품목ID
		},{	name: 'inhd_righ_itid'		, type: 'string'		//내부핸들우측품목ID
		},{	name: 'othd_left_itid'		, type: 'string'		//외부핸들좌측품목ID
		},{	name: 'othd_righ_itid'		, type: 'string'		//외부핸들우측품목ID
		},{	name: 'efcn_grad_dvcd'		, type: 'string'		//효율등급구분코드
		},{	name: 'mult_hole_yorn'		, type: 'string'		//배수홀여부
		},{	name: 'moss_incl_yorn'		, type: 'string'		//방충망포함여부
		},{	name: 'moss_itid'			, type: 'string'		//방충망품목ID
		},{	name: 'hndl_hght'			, type: 'float'			//핸들높이
		},{	name: 'clee_innr'			, type: 'string'		//크리내측
		},{	name: 'clee_otsd'			, type: 'string'		//크리외측
		},{	name: 'remk_text'			, type: 'string'		//비고
		},{	name: 'brnd_bacd'			, type: 'string'		//브랜드구분코드
		},{	name: 'brnd_name'			, type: 'string'		//브랜드명

		},{	name: 'chge_resn'			, type: 'string'		//변경사유
		},{	name: 'drtr_idcd'			, type: 'string'		//담당자ID
		},{	name: 'rcpt_date'			, type: 'string'		//변경일자
		},{	name: 'chge_resn_dvcd'		, type: 'string'		//변경사유구분
		},{	name: 'cstm_drtr_name'		, type: 'string'		//고객담당자명

		},{	name: 'user_memo'			, type: 'string'		//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'		//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'		//부모ID
		},{	name: 'line_levl'			, type: 'float' , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float' , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string', defaultValue: '0'		// ROW상태
		},{	name: 'line_clos'			, type: 'string', defaultValue: '0'		// ROW마감
		},{	name: 'find_name'			, type: 'string'		//찾기명
		},{	name: 'updt_user_name'		, type: 'string'		//수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'		//수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'		//수정UI
		},{	name: 'crte_user_name'		, type: 'string'		//생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'		//생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 생성ID
		},{	name: 'crte_urif'			, type: 'string'		//생성UI
		}
	],
});