Ext.define('module.prod.project.prjtotodwork.model.PrjtOtodWorkDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/* invoice번호	*/
		},{	name: 'amnd_degr'			, type: 'float'		/* amd차수 		*/ , defaultValue : 1
		},{	name: 'new_invc_numb'		, type: 'string'	/* invoice번호	*/
		},{	name: 'new_line_seqn'		, type: 'float'		/* INVOICE순번	*/
		},{	name: 'line_seqn'			, type: 'int'		/* INVOICE순번	*/ , defaultValue : 1
		},{	name: 'uper_seqn'			, type: 'int'		/* 상위 상세 번호	*/ , defaultValue : 1
		},{	name: 'disp_seqn'			, type: 'int'		/* 화면출력번호	*/ , defaultValue : 1
		},{	name: 'drtr_idcd'			, type: 'string'	/* 담당자ID	*/
		},{	name: 'user_name'			, type: 'string'	/* 담당자명		*/ , defaultValue : _global.login_nm
		},{	name: 'item_idcd'			, type: 'string'	/* 품목ID		*/
		},{	name: 'item_code'			, type: 'string'	/* 품목코드		*/
		},{	name: 'item_name'			, type: 'string'	/* 품명		*/
		},{	name: 'item_spec'			, type: 'string'	/* 품목규격		*/
		},{	name: 'item_mtrl'			, type: 'string'	/* 품목재질		*/
		},{	name: 'unit_idcd'			, type: 'string'	/* 단위ID		*/
		},{	name: 'unit_name'			, type: 'string'	/* 단위명		*/
		},{	name: 'offr_qntt'			, type: 'float'		/* 발주수량		*/
		},{	name: 'offr_pric'			, type: 'float'		/* 발주단가		*/
		},{	name: 'vatx_incl_yorn'		, type: 'string'	/* 부가세포함여부	*/
		},{	name: 'vatx_rate'			, type: 'float'		/* 부가세율		*/
		},{	name: 'offr_amnt'			, type: 'float'		/* 발주금액		*/
		},{	name: 'offr_vatx'			, type: 'float'		/* 발주부가세		*/
		},{	name: 'ttsm_amnt'			, type: 'float'		/* 합계금액		*/
		},{	name: 'offr_amnt_totl'		, type: 'float'		/* 합계금액		*/
		},{	name: 'deli_reqn_date'		, type: 'string'	/* 납기요청일자	*/ , defaultValue : Ext.Date.format(new Date(),'Y-m-d'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'deli_date'			, type: 'string'	/* 납기일자		*/ , serialize: Ext.util.Format.dateToStr
		},{	name: 'invc_date'			, type: 'string'	/* 납기일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'pric_dvcd'			, type: 'string'	/* 단가구분코드	*/
		},{	name: 'fund_dvcd'			, type: 'string'	/* 자금구분코드	*/
		},{	name: 'dlvy_date'			, type: 'string'	/* 납품일자		*/ , defaultValue : Ext.Date.format(new Date(),'Y-m-d'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'dlvy_time'			, type: 'string'	/* 납품시간		*/
		},{	name: 'send_deli_date'		, type: 'string'	/* 2차납기일자	*/
		},{	name: 'dlvy_wrhs_idcd'		, type: 'string'	/* 납품창고ID	*/
		},{	name: 'krwn_pric'			, type: 'float'		/* 원화단가		*/
		},{	name: 'krwn_amnt'			, type: 'float'		/* 원화금액		*/
		},{	name: 'krwn_vatx'			, type: 'float'		/* 원화부가세		*/
		},{	name: 'krwn_amnt_totl'		, type: 'float'		/* 원화금액계		*/
		},{	name: 'krwn_amnt'			, type: 'float'		/* 원화금액		*/
		},{	name: 'insd_remk_text'		, type: 'string'	/* 내부비고		*/
		},{	name: 'otsd_remk_text'		, type: 'string'	/* 외부비고		*/
		},{	name: 'stnd_unit'			, type: 'string'	/* 기준단위		*/
		},{	name: 'orig_invc_numb'		, type: 'string'	/* 원invoice번호	*/
		},{	name: 'orig_amnd_degr'		, type: 'float'		/* 원amd차수		*/
		},{	name: 'orig_seqn'			, type: 'float'		/* 원순번			*/

		},{	name: 'pjod_idcd'			, type: 'string'	/* 프로젝트수주id*/
		},{	name: 'work_schd_dvcd'		, type: 'string'	/* 작업일정구분코드*/
		},{	name: 'gant_id'				, type: 'string'	/* id*/
		},{	name: 'line_seqn'			, type: 'float'		/* 순번 		*/
		},{	name: 'item_idcd'			, type: 'string'	/* 품목id		*/
		},{	name: 'item_spec'			, type: 'string'	/* 품목규격		*/
		},{	name: 'item_mtrl'			, type: 'string'	/* 품목재질		*/
		},{	name: 'ivst_wkct_idcd'		, type: 'string'	/* 투입공정id	*/
		},{	name: 'unit_idcd'			, type: 'string'	/* 단위id		*/
		},{	name: 'supl_dvcd'			, type: 'string'	/* 조달구분코드	*/
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처id	*/
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처명		*/
		},{	name: 'ndqt_nmrt'			, type: 'string'	/* 소요량분자	*/
		},{	name: 'ndqt_dnmn'			, type: 'string'	/* 소요량분모	*/
		},{	name: 'need_qntt'			, type: 'float'		/* 소요수량		*/
		},{	name: 'used_schd_date'		, type: 'string'	/* 사용예정일자	*/
		},{	name: 'lwcs_yorn'			, type: 'string'	/* 하위유무		*/
		},{	name: 'incm_loss_rate'		, type: 'float'		/* 사내LOSS율	*/
		},{	name: 'otcm_loss_rate'		, type: 'float'		/* 사외LOSS율	*/
		},{	name: 'stok_plac'			, type: 'string'	/* 재고위치		*/
		},{	name: 'stok_unit_idcd'		, type: 'string'	/* 재고단위 ID	*/
		},{	name: 'remk_text'			, type: 'string'	/* 비고		*/
		},{	name: 'last_yorn'			, type: 'string'	/* 최종여부		*/
		},{	name: 'imge_1fst'			, type: 'string'	/* 이미지1		*/
		},{	name: 'uper_seqn'			, type: 'float'		/* 상위순번		*/
		},{	name: 'disp_seqn'			, type: 'float'		/* 표시순번		*/

		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모		*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모		*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨		*/, defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서		*/, defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태		*/, defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감		*/, defaultValue: '0'
		},{	name: 'find_name'			, type: 'string'	/* 찾기명			*/
		},{	name: 'updt_user_name'		, type: 'string'	/* 수정사용자명	*/
		},{	name: 'updt_ipad'			, type: 'string'	/* 수정IP		*/
		},{	name: 'updt_dttm'			, type: 'string'	/* 수정일시		*/, convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'			, type: 'string'	/* 수정ID		*/, defaultValue : _global.login_pk
		},{	name: 'updt_urif'			, type: 'string'	/* 수정UI		*/
		},{	name: 'crte_user_name'		, type: 'string'	/* 생성사용자명	*/
		},{	name: 'crte_ipad'			, type: 'string'	/* 생성IP		*/
		},{	name: 'crte_dttm'			, type: 'string'	/* 생성일시		*/, convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'			, type: 'string'	/* 생성ID		*/, defaultValue : _global.login_pk
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI		*/
		}
	],
	recalculation: function(inv) {
		var row = this,
			baseamt = row.get('offr_qntt') * row.get('offr_pric')
		;
		row.set('offr_amnt'	, Math.floor(row.get('offr_qntt') * row.get('offr_pric') /10)*10);
		row.set('offr_vatx'	, Math.floor(Number(_global.tax_rt) * row.get('offr_amnt')/1000)*10 );
		row.set('ttsm_amnt'	, row.get('offr_amnt') + row.get('offr_vatx')) ;
	}
});