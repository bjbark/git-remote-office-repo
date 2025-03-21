Ext.define('module.custom.hantop.prod.order.prodorder.model.ProdOrderCofm', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호 = 창호견적번호
		},{	name: 'amnd_degr'			, type: 'float'  , defaultValue: 1		//amd차수
		},{	name: 'esti_dvcd'			, type: 'string'	//견적구분코드
		},{	name: 'esti_date'			, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	//견적일자 = 발주일
		},{	name: 'vald_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	//유효일자
		},{	name: 'cont_schd_date'		, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	//시공예정일자
		},{	name: 'scen_addr_1fst'		, type: 'string'	//시공주소1
		},{	name: 'scen_addr_2snd'		, type: 'string'	//시공주소2
		},{	name: 'scen_addr'			, type: 'string'	//시공주소2
			, convert : function(value, record){
				return record.get('scen_addr_1fst') + ' ' + record.get('scen_addr_2snd');
			}
		},{	name: 'copr_stor_name'		, type: 'string'	//제휴점명
		},{	name: 'ordr_numb'			, type: 'string'	//오더번호
		},{	name: 'cstm_esti_numb'		, type: 'string'	//고객견적번호


		},{	name: 'drtr_idcd'			, type: 'string'	//담당자id = 영업자ID
		},{	name: 'drtr_name'			, type: 'string'	//담당자명 = 영업자명
		},{	name: 'atmr_drtr_name'		, type: 'string'	//실측담당자명
		},{	name: 'cstm_idcd'			, type: 'string'	//거래처id
		},{	name: 'cstm_code'			, type: 'string'	//거래처코드
		},{	name: 'cstm_name'			, type: 'string'	//거래처명
		},{	name: 'bsmt_loss_rate'		, type: 'float' 	//원자재LOSS율
		},{	name: 'asmt_loss_rate'		, type: 'float' 	//부자재LOSS율
		},{	name: 'weld_loss_rate'		, type: 'float' 	//용접LOSS율
		},{	name: 'rein_viss_itvl'		, type: 'float' 	//보강비스간격
		},{	name: 'ancr_atch_itvl'		, type: 'float' 	//앵커부착간격
		},{	name: 'pror_yorn'			, type: 'string' 	//지시확정여부

		},{	name: 'change'				, type: 'string' 	//수정변수

		},{	name: 'remk_text'			, type: 'string'	//비고
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