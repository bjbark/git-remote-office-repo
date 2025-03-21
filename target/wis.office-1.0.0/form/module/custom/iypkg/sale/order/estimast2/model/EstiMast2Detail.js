Ext.define('module.custom.iypkg.sale.order.estimast2.model.EstiMast2Detail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice번호
		},{	name: 'amnd_degr'			, type: 'float' , defaultValue : 1	//amd차수
		},{	name: 'line_seqn'			, type: 'float'			//순번
		},{	name: 'esti_item_dvcd'		, type: 'float'			//견적품목구분코드
		},{	name: 'item_idcd'			, type: 'string'		//품목ID
		},{	name: 'item_code'			, type: 'string'		//품목코드
		},{	name: 'item_name'			, type: 'string'		//품목명
		},{	name: 'item_spec'			, type: 'string'		//품목규격
		},{	name: 'cstm_item_name'		, type: 'string'		//거래처품명
		},{	name: 'cstm_item_code'		, type: 'string'		//고객품목코드
		},{	name: 'unit_idcd'			, type: 'string'		//단위ID
		},{	name: 'norm_sale_pric'		, type: 'float' 		//정상판매단가
		},{	name: 'sale_stnd_pric'		, type: 'float'			//판매기준단가
		},{	name: 'dsnt_rate'			, type: 'float'			//할인율
		},{	name: 'cost_pric'			, type: 'float'			//원가단가
		},{	name: 'esti_pric'			, type: 'float'			//견적단가
		},{	name: 'pfit_rate'			, type: 'float'			//마진율
		},{	name: 'esti_qntt'			, type: 'float'			//견적수량
		},{	name: 'vatx_incl_yorn'		, type: 'float'			//부가세포함여부
		},{	name: 'vatx_rate'			, type: 'float' , defaultValue : _global.tax_rt ,		//부가세율
		},{	name: 'krwn_amnt'			, type: 'float'			//원화금액
		},{	name: 'krwn_vatx'			, type: 'float'			//원화부가세
		},{	name: 'krwn_ttsm_amnt'		, type: 'float'			//원화합계금액
		},{	name: 'deli_date'			, type: 'float' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납기일자
		},{	name: 'remk_text'			, type: 'float'			//비고
		},{	name: 'mney_unit'			, type: 'string'		//화폐단위
		},{	name: 'exrt'				, type: 'float' 		//환율
		},{	name: 'exch_pric'			, type: 'float' 		//외환단가
		},{	name: 'exch_amnt'			, type: 'float' 		//외환금액
		},{	name: 'horz_leng'			, type: 'float' 		//가로길이
		},{	name: 'vrtl_leng'			, type: 'float' 		//세로길이
		},{	name: 'item_tick'			, type: 'float' 		//품목두께
		},{	name: 'real_item_tick'		, type: 'float' 		//실품목두께
		},{	name: 'roll_leng'			, type: 'float' 		//ROLL길이
		},{	name: 'roll_perc_qntt'		, type: 'float' 		//ROLL당수량
		},{	name: 'json_data'			, type: 'float' 		//JSONDATA
		},{	name: 'uper_seqn'			, type: 'float' 		//상위순번
		},{	name: 'disp_seqn'			, type: 'float' 		//표시순번
		},{	name: 'supl_dvcd'			, type: 'string'		//조달구분
		},{	name: 'fabc_stnd_pric'		, type: 'float' 		//원단표준단가/m2
		},{	name: 'ordr_mxm2_pric'		, type: 'float' 		//매입단가/m2
		},{	name: 'ordr_cstm_name'		, type: 'string'		//매입처
		},{	name: 'ordr_cstm_idcd'		, type: 'string'		//매입처ID



		},{	name: 'remk_text'			, type: 'string'		//비고
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
		},{	name: 'bxty_idcd'			, type: 'string'		//박스ID
		},{	name: 'bxty_name'			, type: 'string'		//박스명
		},{	name: 'mtrl_idcd'			, type: 'string'		//원단ID
		},{	name: 'mtrl_name'			, type: 'string'		//원단명
		},{	name: 'item_line'			, type: 'string'		//품목골
		},{	name: 'item_leng'			, type: 'float' , defaultValue : 0			//장
		},{	name: 'item_widh'			, type: 'float' , defaultValue : 0			//폭
		},{	name: 'item_hght'			, type: 'float' , defaultValue : 0			//고
		},{	name: 'mxm2_qntt'			, type: 'float' , defaultValue : 0			//제곱미터수량
		},{	name: 'mxm2_pric'			, type: 'float' , defaultValue : 0			//제곱미터단가
		},{	name: 'item_fxqt'			, type: 'string'		//원단절수
		},{	name: 'item_widh2'			, type: 'float'			//원단폭
		},{	name: 'item_leng2'			, type: 'float'			//원단장
		},{	name: 'pqty_pric'			, type: 'float'			//단가/개
		},{	name: 'sply_amnt'			, type: 'float'			//공급가액
		},{	name: 'vatx_amnt'			, type: 'float'			//부가세액
		},{	name: 'ttsm_amnt'			, type: 'float'			//합계금액
		}
	],
});