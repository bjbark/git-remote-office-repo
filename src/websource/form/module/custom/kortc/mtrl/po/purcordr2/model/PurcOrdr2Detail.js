Ext.define('module.custom.kortc.mtrl.po.purcordr2.model.PurcOrdr2Detail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/* invoice번호	*/
		},{	name: 'amnd_degr'			, type: 'float'		/* amd차수 		*/ , defaultValue : 1
		},{	name: 'line_seqn'			, type: 'int'		/* INVOICE순번	*/ , defaultValue : 1
		},{	name: 'uper_seqn'			, type: 'int'		/* 상위 상세 번호	*/ , defaultValue : 1
		},{	name: 'disp_seqn'			, type: 'int'		/* 화면출력번호	*/ , defaultValue : 1
		},{	name: 'drtr_idcd'			, type: 'string'	/* 담당자ID		*/ , defaultValue : _global.login_id
		},{	name: 'user_name'			, type: 'string'	/* 담당자명		*/ , defaultValue : _global.login_nm
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID		*/
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처명		*/
		},{	name: 'item_idcd'			, type: 'string'	/* 품목ID		*/
		},{	name: 'item_code'			, type: 'string'	/* 품목코드		*/
		},{	name: 'item_name'			, type: 'string'	/* 품명		*/
		},{	name: 'item_spec'			, type: 'string'	/* 품목규격		*/
		},{	name: 'unit_idcd'			, type: 'string'	/* 단위ID		*/
		},{	name: 'unit_name'			, type: 'string'	/* 단위명		*/
		},{	name: 'need_qntt'			, type: 'float'		/* 소요수량		*/
		},{	name: 'offr_qntt'			, type: 'float'		/* 발주수량		*/
		},{	name: 'offr_pric'			, type: 'float'		/* 발주단가		*/
		},{	name: 'vatx_incl_yorn'		, type: 'string'	/* 부가세포함여부	*/
		},{	name: 'vatx_rate'			, type: 'float'		/* 부가세율		*/
		},{	name: 'offr_amnt'			, type: 'float'		/* 발주금액		*/
		},{	name: 'offr_vatx'			, type: 'float'		/* 발주부가세		*/
		},{	name: 'ttsm_amnt'			, type: 'float'		/* 합계금액		*/
		},{	name: 'offr_amnt_totl'		, type: 'float'		/* 합계금액		*/
		},{	name: 'deli_reqn_date'		, type: 'string'	/* 납기요청일자	*/ , defaultValue : Ext.Date.format(new Date(),'Y-m-d'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'deli_date2'			, type: 'string'	/* 납기일자		*/ , serialize: Ext.util.Format.dateToStr,
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
		},{	name: 'mes_system_type'		, type: 'string',defaultValue:_global.options.mes_system_type	//
		}
	],
	recalculation: function(inv) {
		var row = this,
			resId = _global.options.mes_system_type.toUpperCase(),
			baseamt = row.get('offr_qntt') * row.get('offr_pric'),
			editor = Ext.ComponentQuery.query('module-purcordr2-worker-editor')[0]
		;
		if(resId == 'SJFLV') {
			if(editor.down('[name=supl_dvcd]').value == '6000' ){
				row.set('offr_amnt'	, Math.round((row.get('offr_qntt') * row.get('offr_pric')) * 100) / 100.0);
				row.set('offr_vatx'	, 0);
			}else{
				row.set('offr_amnt'	, Math.round(row.get('offr_qntt') * row.get('offr_pric')));
				row.set('offr_vatx'	, Math.trunc(row.get('offr_amnt') / Number(_global.tax_rt)));
			}
		}else{
			row.set('offr_amnt'	, Math.floor((row.get('offr_qntt') * row.get('offr_pric')) / 10) * 10);

			if(editor.down('[name=supl_dvcd]').value == '6000' ){
				row.set('offr_vatx'	, 0);
			}else{
				row.set('offr_vatx'	, Math.trunc(row.get('offr_amnt') / Number(_global.tax_rt)));
			}
		}

		row.set('ttsm_amnt'	, row.get('offr_amnt') + row.get('offr_vatx')) ;
	}
});