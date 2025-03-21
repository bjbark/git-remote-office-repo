Ext.define('module.custom.sjflv.mtrl.imp.ordermast.model.OrderMastDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//INVOICE번호
		},{	name: 'amnd_degr'			, type: 'float' , defaultValue : 1			//AMD차수
		},{	name: 'line_seqn'			, type: 'float' 		//순번
		},{	name: 'item_idcd'			, type: 'string' 		//품목ID
		},{	name: 'item_code'			, type: 'string' 		//품목코드
		},{	name: 'item_name'			, type: 'string' 		//품목명
		},{	name: 'item_spec'			, type: 'string' 		//품목규격
		},{	name: 'item_hscd'			, type: 'string' 		//품목HS코드
		},{	name: 'mker_name'			, type: 'string'		//제조사명
		},{	name: 'unit_idcd'			, type: 'string'		//단위ID
		},{	name: 'unit_name'			, type: 'string'		//단위ID
		},{	name: 'qntt'				, type: 'float' , defaultValue : 0			//수량
		},{	name: 'exch_pric'			, type: 'float' , defaultValue : 0			//외환단가
		},{	name: 'exch_amnt'			, type: 'float' , defaultValue : 0			//외환금액
		},{	name: 'krwn_pric'			, type: 'float' , defaultValue : 0			//원화단가
		},{	name: 'krwn_amnt'			, type: 'float' , defaultValue : 0			//원화금액
		},{	name: 'deli_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr 		//납기일자
		},{	name: 'ship_schd_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//선적예정일자
		},{	name: 'ostt_wrhs_idcd'		, type: 'string'		//출고창고ID
		},{	name: 'dlvy_cstm_idcd'		, type: 'string'		//납품거래처ID
		},{	name: 'dlvy_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//납품일자
		},{	name: 'dlvy_time'			, type: 'string'		//납품시간
		},{	name: 'orig_seqn'			, type: 'float'			//원순번
		},{	name: 'trnt_exps'			, type: 'float' , defaultValue : 0			//운송비용
		},{	name: 'extr_exps'			, type: 'float' , defaultValue : 0			//부대비용
		},{	name: 'sett_amnt'			, type: 'float' , defaultValue : 0			//정산금액
		},{	name: 'sett_pric'			, type: 'float' , defaultValue : 0			//정산단가
		},{	name: 'json_data'			, type: 'string'		//JSONDATA
		},{	name: 'each_qntt'			, type: 'float' , defaultValue : 0			//EACH
		},{	name: 'pckg_size'			, type: 'float' , defaultValue : 0			//pack size
		},{	name: 'cmis_pric'			, type: 'float'		//
		},{	name: 'cmis_amnt'			, type: 'float'		//
		},{	name: 'pfit_pric'			, type: 'float'		//
		},{	name: 'pfit_amnt'			, type: 'float'		//



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
	]
});