Ext.define('module.custom.hantop.sale.estientry2.model.EstiEntry2WorkerMtrlLister', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//견적번호
		},{	name: 'amnd_degr'			, type: 'float'			//차수
		},{	name: 'line_seqn'			, type: 'float'			//순번
		},{	name: 'assi_seqn'			, type: 'float'			//보조순번
		},{	name: 'wndw_itid'			, type: 'string'		//창호품목ID
		},{	name: 'brnd_bacd'			, type: 'string'
		},{	name: 'dvcd'				, type: 'string'
		},{	name: 'base_name'			, type: 'string'		//브랜드명
		},{	name: 'wndw_modl_idcd'		, type: 'string'		//창호모델ID
		},{	name: 'wndw_name'			, type: 'string'		//창호명
		},{	name: 'modl_name'			, type: 'string'		//창호품목명
		},{	name: 'wdtp_idcd'			, type: 'string'		//창호형태ID
		},{	name: 'wdtp_name'			, type: 'string'		//창호형태명
		},{	name: 'acct_bacd'			, type: 'string'		//계정분류코드
		},{	name: 'bfsf_dvcd'			, type: 'string'		//틀짝망구분코드
		},{	name: 'ivst_item_idcd'		, type: 'string'		//투임품목ID
		},{	name: 'ivst_item_name'		, type: 'string'		//투입품목명
		},{	name: 'ivst_item_spec'		, type: 'string'		//투입품목규격
		},{	name: 'char_itid'			, type: 'string'		//고유품목ID
		},{	name: 'esnt_dvcd'			, type: 'string'		//필수구분코드
		},{	name: 'esnt_yorn'			, type: 'string'		//필수여부
		},{	name: 'endd_yorn'			, type: 'string'		//종료여부
		},{	name: 'sett_yorn'			, type: 'string'		//정산여부
		},{	name: 'auto_calc_yorn'		, type: 'string'		//자동계산여부
		},{	name: 'puch_cstm_idcd'		, type: 'string'		//구매거래처ID
		},{	name: 'calc_frml'			, type: 'string'		//계산공식
		},{	name: 'item_widh'			, type: 'float'			//품목폭
		},{	name: 'item_hght'			, type: 'float'			//품목높이
		},{	name: 'item_tick'			, type: 'float'			//품목두께
		},{	name: 'esti_pric'			, type: 'float'			//견적단가
		},{	name: 'puch_pric'			, type: 'float'			//구매단가
		},{	name: 'need_qntt'			, type: 'float'			//소요량
		},{	name: 'loss_rate'			, type: 'float'			//loss율
		},{	name: 'loss_qntt'			, type: 'float'			//loss수량
		}
	],
});