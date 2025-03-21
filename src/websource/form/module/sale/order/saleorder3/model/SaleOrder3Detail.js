Ext.define('module.sale.order.saleorder3.model.SaleOrder3Detail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice번호
		},{	name: 'amnd_degr'			, type: 'float', defaultValue : 1			//amd차수
		},{	name: 'line_seqn'			, type: 'int' , defaultValue : 1			//순번
		},{	name: 'uper_seqn'			, type: 'int' , defaultValue : 1			//순번
		},{	name: 'disp_seqn'			, type: 'int' , defaultValue : 1			//순번
		},{	name: 'wkod_numb'			, type: 'string'		//지시번호
		},{	name: 'invc_numb2'			, type: 'string'		//지시번호
		},{	name: 'item_idcd'			, type: 'string'		//품목ID
		},{	name: 'item_code'			, type: 'string'		//품목코드
		},{	name: 'item_name'			, type: 'string'		//품명
		},{	name: 'item_spec'			, type: 'string'		//품목규격
		},{	name: 'wkfw_idcd'			, type: 'string'		//생산라인ID
		},{	name: 'unit_idcd'			, type: 'string'		//단위ID
		},{	name: 'unit_name'			, type: 'string'		//단위명
		},{	name: 'orig_invc_numb'		, type: 'string'		//원invoice번호
		},{	name: 'cont_pric'			, type: 'float', defaultValue : 0			//계약단가
		},{	name: 'item_wigt'			, type: 'float'			//중량
		},{	name: 'orig_seqn'			, type: 'float'			//원순번
		},{	name: 'orig_invc_qntt'		, type: 'float'			//원invoice수량
		},{	name: 'optn_dvcd'			, type: 'float'			//옵션구분코드
		},{	name: 'optn_psbl_yorn'		, type: 'string', defaultValue : '0'		//옵션가능여부
		},{	name: 'optn_adtn'			, type: 'float'			//옵션추가
		},{	name: 'pric_adpt'			, type: 'float'			//단가적용
		},{	name: 'norm_sale_pric'		, type: 'float'			//정상판매단가
		},{	name: 'sale_stnd_pric'		, type: 'float'			//판매기준단가
		},{	name: 'invc_qntt'			, type: 'float'			//invoice수량
		},{	name: 'invc_pric'			, type: 'float'			//invoice단가
		},{	name: 'vatx_incl_yorn'		, type: 'string', defaultValue : '0'		//부가세포함여부
		},{	name: 'vatx_rate'			, type: 'float' , defaultValue : 0			//부가세율
		},{	name: 'sply_amnt'			, type: 'float', defaultValue : 0			//공급가액
		},{	name: 'vatx_amnt'			, type: 'float', defaultValue : 0			//부가세금액
		},{	name: 'invc_amnt'			, type: 'float', defaultValue : 0			//invoice금액
		},{	name: 'krwn_amnt'			, type: 'float'			//원화금액
		},{	name: 'krwn_vatx'			, type: 'float'			//원화부가세
		},{	name: 'krwn_ttsm_amnt'		, type: 'float'			//원화합계금액
		},{	name: 'stnd_unit'			, type: 'string'		//기준단위
		},{	name: 'stnd_unit_qntt'		, type: 'float'			//기준단위수량
		},{	name: 'wrhs_idcd'			, type: 'string'		//창고ID
		},{	name: 'dlvy_cstm_idcd'		, type: 'string'		//납품거래처ID
		},{	name: 'deli_date2'			, type: 'string', serialize: Ext.util.Format.dateToStr,		//납기일자
		},{	name: 'dlvy_date'			, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//납품일자
		},{	name: 'dlvy_hhmm'			, type: 'string'		//납품시분
		},{	name: 'remk_text'			, type: 'string'		//비고
		},{	name: 'ostt_dvcd'			, type: 'string'		//출고구분코드
		},{	name: 'dsct_qntt'			, type: 'float'			//중단수량
		},{	name: 'dlvy_memo'			, type: 'string'		//배송메모
		},{	name: 'uper_seqn'			, type: 'float'			//상위순번
		},{	name: 'disp_seqn'			, type: 'float'			//표시순번
		},{	name: 'cstm_lott_numb'		, type: 'string'		//고객LOT번호
		},{	name: 'mold_idcd'			, type: 'string'		//금형코드
		},{	name: 'pdsd_yorn'			, type: 'string'		//생산지시
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
		},{ name: 'item_idcd'			, type: 'string'
		},{ name: 'mtrl_bacd'			, type: 'string'
		},{ name: 'mtrl_bacd_name'		, type: 'string'
		},{ name: 'item_clss_bacd'		, type: 'string'
		},{ name: 'item_bacd'			, type: 'string'
		},{ name: 'make_bacd'			, type: 'string'
		},{ name: 'srfc_proc_yorn'		, type: 'string'
		},{ name: 'emgc_yorn'			, type: 'string'
		},{ name: 'drwg_yorn'			, type: 'string'
		},{ name: 'drwg_numb'			, type: 'string'
		},{ name: 'prod_lott_numb'		, type: 'string'
		},{ name: 'item_clss_bacd_name'	, type: 'string'
		},{ name: 'item_bacd_name'		, type: 'string'
		},{ name: 'make_bacd_name'		, type: 'string'
		},{ name: 'cstm_prcs_numb'		, type: 'string'
		},{ name: 'cstm_mold_code'		, type: 'string'
		},{ name: 'prod_lott_numb'		, type: 'string'
		},{ name: 'cstm_idcd'			, type: 'string'
		},{ name: 'stok_qntt'			, type: 'float'
		}
	],
	recalculation : function(inv) {
		var row = this,
			baseamt = row.get('invc_qntt') * row.get('cont_pric')
		;
		row.set('sply_amnt'	, Math.floor(row.get('invc_qntt') * row.get('cont_pric') /10)*10 );
		row.set('vatx_amnt'	, Math.floor(Number(_global.tax_rt) * row.get('sply_amnt')/1000)*10 );
		row.set('invc_amnt'	, row.get('sply_amnt') + row.get('vatx_amnt')) ;
	}
});