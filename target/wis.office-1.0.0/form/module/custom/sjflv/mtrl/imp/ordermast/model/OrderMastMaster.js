Ext.define('module.custom.sjflv.mtrl.imp.ordermast.model.OrderMastMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	//INVOICE번호
		},{	name: 'line_seqn'			, type: 'float'  , defaultValue: 1		//amd차수
		},{	name: 'amnd_degr'			, type: 'float'  , defaultValue: 1		//amd차수
		},{	name: 'invc_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'bzpl_idcd'			, type: 'string'	//사업장
		},{	name: 'cstm_idcd'			, type: 'string'	//거래처ID
		},{	name: 'offr_numb'			, type: 'string'	//발주번호
		},{	name: 'incm_dvcd'			, type: 'string'	//수입구분코드
		},{	name: 'mngt_numb'			, type: 'string'	//관리번호
		},{	name: 'ship_viaa_dvcd'		, type: 'string'	//ShipVia구분코드
		//},{	name: 'buyr_name'			, type: 'string'	//바이어명
		},{	name: 'mdtn_prsn'			, type: 'string'	//중개인
		},{	name: 'drtr_idcd'			, type: 'string'	//담당자ID
		},{	name: 'drtr_name'			, type: 'string'	//담당자명
		},{	name: 'pric_cond_dvcd'		, type: 'string' 	//가격조건구분코드
		},{	name: 'trde_stot_dvcd'		, type: 'string' 	//무역결제구분코드
		},{	name: 'stot_time_dvcd'		, type: 'string'	//결제시기구분코드
		},{	name: 'stot_ddln'			, type: 'string'	//결제기한
		},{	name: 'mney_unit'			, type: 'string'	//화폐단위
		},{	name: 'exrt'				, type: 'float' , defaultValue : 0	//환율
		},{	name: 'amnd_degr'			, type: 'float'    	//환율
		},{	name: 'ship_port'			, type: 'string'	//선적항구
		},{	name: 'etdd'				, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	//ETD
		},{	name: 'dsch_port'			, type: 'string'	//Discharging Port
		},{	name: 'etaa'				, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//ETA
		},{	name: 'ecdd'				, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//ECD
		},{	name: 'arvl_port'			, type: 'string'	//도착항구
		},{	name: 'pckg_unit'			, type: 'string'	//포장단위
		},{	name: 'ogin_name'			, type: 'string'	//원산지명
		},{	name: 'vldt'				, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	//Validity
		},{	name: 'trde_trnt_dvcd'		, type: 'string'	//무역운송구분코드
		},{	name: 'orig_invc_numb'		, type: 'string'	//원INVOICE번호
		},{	name: 'orig_amnd_degr'		, type: 'float' , defaultValue : 1		//원AMD차수
		},{	name: 'dsct_yorn'			, type: 'string'	//중단여부
		},{	name: 'paym_yorn'			, type: 'string'	//지급여부
		},{	name: 'paym_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//지급일자
		},{	name: 'paym_numb'			, type: 'string'	//지급번호
		},{	name: 'paym_memo'			, type: 'string'	//지급메모
		},{	name: 'bl_yorn'				, type: 'string'	//BL여부
		},{	name: 'bl_numb'				, type: 'string'	//BL번호
		},{	name: 'bl_date'				, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	//BL일자
		},{	name: 'entr_yorn'			, type: 'string'	//통관여부
		},{	name: 'entr_numb'			, type: 'string'	//통관번호
		},{	name: 'entr_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//통관일자
		},{	name: 'cofm_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//확정일자
		},{	name: 'cofm_yorn'			, type: 'string'	//확정여부
		},{	name: 'bzpl_name'			, type: 'string'	//사업장명
		},{	name: 'ordr_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//order date
		},{	name: 'ordr_numb'			, type: 'string'	//order numb
		},{	name: 'item_name'			, type: 'string'	//품목
		},{	name: 'each_qntt'			, type: 'float'		//Each
		},{	name: 'pckg_size'			, type: 'string'	//Pack Size
		},{	name: 'qntt'				, type: 'float'		//수량
		},{	name: 'exch_pric'			, type: 'float'		//단가
		},{	name: 'exch_amnt'			, type: 'float'		//금액
		},{	name: 'cmis_pric'			, type: 'float'		//금액
		},{	name: 'cmis_amnt'			, type: 'float'		//금액
		},{	name: 'pfit_pric'			, type: 'float'		//금액
		},{	name: 'pfit_amnt'			, type: 'float'		//금액
		},{	name: 'mdtn_prsn'			, type: 'string'	//Forwarder
		},{	name: 'mdtn_name'			, type: 'string'	//Forwarder
		},{	name: 'buyr'				, type: 'string'	//바이어
		},{	name: 'reqt_cstm_idcd'		, type: 'string'	//요청고객
		},{	name: 'reqt_cstm_name'		, type: 'string'	//요청고객명
		},{	name: 'ship_memo'			, type: 'string'	//선적메모
		},{	name: 'change'				, type: 'string'	//change
		},


		{	name: 'user_memo'			, type: 'string'	//사용자메모
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