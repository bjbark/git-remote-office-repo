Ext.define('module.custom.sjflv.mtrl.po.purcordrcost.model.PurcOrdrCostMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'				, type: 'string'		//invoice번호
		},{	name: 'invc_date'				, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//납품일자
		},{	name: 'cstm_name'				, type: 'string'			//거래처명
		},{	name: 'entr_date'				, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//통관일자
		},{	name: 'bl_numb'					, type: 'string'			//BL번호
		},{	name: 'bl_pric_amnt'			, type: 'float'				//BL운임금액
		},{	name: 'lc_stot_amnt'			, type: 'float'				//LC결제금액
		},{	name: 'exrt'					, type: 'float'				//환율
		},{	name: 'taxx_amnt'				, type: 'float'				//세금금액
		},{	name: 'taxx_vatx'				, type: 'float'				//세금부가세
		},{	name: 'wrhs_insu_amnt'			, type: 'float'				//창고보험금액
		},{	name: 'wrhs_insu_vatx'			, type: 'float'				//창고보험부가세
		},{	name: 'entr_cmsn_amnt'			, type: 'float'				//통관수수료금액
		},{	name: 'entr_cmsn_vatx'			, type: 'float'				//통관수수료부가세
		},{	name: 'trnt_exps_amnt'			, type: 'float'				//운송비용금액
		},{	name: 'trnt_exps_vatx'			, type: 'float'				//운송비용부가세
		},{	name: 'etcc_amnt_1fst'			, type: 'float'				//기타금액1
		},{	name: 'etcc_amnt_1fst_vatx'		, type: 'float'				//기타금액부가세
		},{	name: 'etcc_amnt_2snd'			, type: 'float'				//기타금액2
		},{	name: 'etcc_amnt_2snd_vatx'		, type: 'float'				//기타금액2부가세
		},{	name: 'ttsm_sum'				, type: 'float'				//총금액
		},{	name: 'ttsm_vatx_amnt'			, type: 'float'				//총비용
		},{	name: 'ttsm_amnt'				, type: 'float'				//총비용(부가세제외)
		},{	name: 'remk_text'				, type: 'string'			//비고
		},{	name: 'exps_line_clos'			, type: 'string'			//정산마감


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