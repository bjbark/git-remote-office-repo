Ext.define('module.custom.aone.sale.order.sorderlist1.model.SorderList1Master',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb',			type: 'string'},		//invoice번호
		{	name: 'invc_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//주문일자
		{	name: 'acpt_dvcd',			type: 'string'},		//입고유형
		{	name: 'acpt_stat_dvcd',		type: 'string'},		//진행상태
		{	name: 'repa_stat_dvcd',		type: 'string'},		//수리구분
		{	name: 'amnd_degr',			type: 'string'},		//차수
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'user_name',			type: 'string'},		//품명
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'lcls_idcd',			type: 'string'},		//품목 대분류
		{	name: 'mcls_idcd',			type: 'string'},		//품목 중분류
		{	name: 'item_spec',			type: 'string'},		//규격
		{	name: 'modl_name',			type: 'string'},		//모델명
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_code',			type: 'string'},		//거래처코드
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'invc_amnt',			type: 'float'},			//수리 총 금액
		{	name: 'invc_qntt',			type: 'float'},			//품목수
		{	name: 'deli_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//납기일자
		{	name: 'acpt_case_name',		type: 'string'},		//주문명
		{	name: 'remk_text',			type: 'string'},		//전달사항
		{	name: 'drtr_idcd',			type: 'string'},		//엔지니어
		{	name: 'prod_drtr_name',		type: 'string'},		//엔지니어
		{	name: 'pord_drtr_idcd',		type: 'string'},		//엔지니어ID
		{	name: 'rnum',				type: 'string'},		//엔지니어
		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},		//부모ID
		{	name: 'line_levl',			type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',			type: 'string'},		//ROW순서
		{	name: 'line_stat',			type: 'string'},		//ROW상태
		{	name: 'line_seqn',			type: 'string', defaultValue: '1'},		//ROW상태
		{	name: 'line_clos',			type: 'string'},		//ROW마감
		{	name: 'find_name',			type: 'string'},		//찾기명
		{	name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',			type: 'string'},		//수정IP
		{	name: 'updt_dttm',			type: 'string'},		//수정일시
		{	name: 'updt_idcd',			type: 'string'},		//수정ID
		{	name: 'updt_urif',			type: 'string'},		//수정UI
		{	name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',			type: 'string'},		//생성IP
		{	name: 'crte_dttm',			type: 'string'},		//생성일시
		{	name: 'crte_idcd',			type: 'string'},		//생성ID
		{	name: 'crte_urif',			type: 'string'},		//생성UI
		{	name: 'mes_system_type',	type: 'string',defaultValue:_global.options.mes_system_type},	//

		{	name: 'clss_desc',			type: 'string'}, 		//수리품목
		{	name: 'prod_drtr_idcd',		type: 'string'}, 		//엔지니어ID
		{	name: 'prod_drtr_name',		type: 'string'}, 		//엔지니어
		{	name: 'sral_numb',			type: 'string'}, 		//시리얼 넘버
		{	name: 'deli_date2',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//출고 예정 일자
		{	name: 'ostt_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//출고 일자
		{	name: 'need_time',			type: 'float'},			//작업시간
		{	name: 'make_cost',			type: 'float'},			//견적비
		{	name: 'pric_time',			type: 'float'},			//시간 단가(수리비)
		{	name: 'psep_exps_amnt',		type: 'float'},			//인건비(수리비)
		{	name: 'prts_repa_amnt',		type: 'float'},			//부품비(수리비)
		{	name: 'etcc_repa_amnt',		type: 'float'},			//공과잡비(수리비)
		{	name: 'entp_pfit_amnt',		type: 'float'},			//기업마진(수리비)
		{	name: 'repa_exps_amnt',		type: 'float'},			//수리비
		{	name: 'invc_amnt',			type: 'float'},			//수리비
		{	name: 'bill_publ_yorn',		type: 'string'},		//
		{	name: 'bill_date',			type: 'string',convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{	name: 'bill_amnt',			type: 'float'},			//
		{	name: 'tkot_text',			type: 'string'},		// 반출내용
		{	name: 'tkot_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		// 반출일자

		{	name: 'work_invc_numb',		type: 'string'},		//
	]
});