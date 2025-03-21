Ext.define('module.custom.sjflv.sale.export.ordermast2.model.OrderMast2Master', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'ordr_numb'			, type: 'string'	//invoice번호
		},{	name: 'cust_invc_numb'		, type: 'string'	//커스텀invoice번호
		},{	name: 'amnd_degr'			, type: 'float'  , defaultValue: 1		//amd차수
		},{	name: 'ordr_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr//invoice일자
		},{	name: 'bzpl_idcd'			, type: 'string' 	//사업장
		},{	name: 'bzpl_name'			, type: 'string' 	//사업장
		},{	name: 'cstm_idcd'			, type: 'string' 	//
		},{	name: 'cstm_name'			, type: 'string' 	//
		},{	name: 'item_idcd'			, type: 'string' 	//
		},{	name: 'item_name'			, type: 'string' 	//
		},{	name: 'hala_yorn'			, type: 'string' 	//
		},{	name: 'pckg_size'			, type: 'float ' 	//
		},{	name: 'exch_pric'			, type: 'float ' 	//
		},{	name: 'exch_amnt'			, type: 'float ' 	//
		},{	name: 'qntt'				, type: 'float ' 	//
		},{	name: 'buyr_name'			, type: 'string' 	//customer idcd
		},{	name: 'remk_text'			, type: 'string' 	//
		},{	name: 'payment'				, type: 'string'	//
		},{	name: 'trde_trnt_dvcd'		, type: 'string' 	//운송방법
		},{	name: 'pric_cond_dvcd'		, type: 'string' 	//가격조건
		},{	name: 'expt_lcal_name'		, type: 'string' 	//Area

		},{	name: 'ostt_schd_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//
		},{	name: 'etdd'				, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//
		},{	name: 'etaa'				, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//

//		invoice
		},{	name: 'arvl_port'			, type: 'string' 	//도착항구
		},{	name: 'ship_port'			, type: 'string' 	//선적항구
		},{	name: 'ogin_name'			, type: 'string' 	//원산지명
		},{	name: 'cstm_pcod_numb'		, type: 'string' 	//고객PONO
		},{	name: 'invc_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr//invoice일자
		},{	name: 'invc_numb'			, type: 'string' 	//
		},{	name: 'ship_name'			, type: 'string' 	//송화인
		},{	name: 'csge_name'			, type: 'string' 	//수화인
		},{	name: 'ntfc_text'			, type: 'string' 	//알림문장
		},{	name: 'remk_text'			, type: 'string' 	//비고
		},{	name: 'paym_cond_name'		, type: 'string' 	//지불조건명
		},{	name: 'cofm_yorn'			, type: 'string' 	//확정여부
		},{	name: 'pckg_totl_wigt'		, type: 'string' 	//확정여부

//		exps

		},{	name: 'exps_numb'			, type: 'string' 	//exps invoice 번호
		},{	name: 'paym_cstm_name'		, type: 'string' 	//지급처
		},{	name: 'exps_krwn_ttsm'		, type: 'float ' 	//운송금액
		},{	name: 'paym_date'			, type: 'string ', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr 	//지급일

//		packing list

		},{	name: 'pckg_unit'		, type: 'string' 	//packing size


//		nego
		},{	name: 'cmis_pric'			, type: 'float ' 	//업체커미션 kg단가
		},{	name: 'cmis_amnt'			, type: 'float ' 	//업체커미션 금액
		},{	name: 'pfit_pric'			, type: 'float ' 	//net kg 단가
		},{	name: 'pfit_amnt'			, type: 'float ' 	//net 마진




		},{	name: 'modify'		, type: 'string' 	//지급처

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
		}
	]
});