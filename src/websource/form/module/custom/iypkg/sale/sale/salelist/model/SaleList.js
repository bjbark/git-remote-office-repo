Ext.define('module.custom.iypkg.sale.sale.salelist.model.SaleList', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice번호
		},{	name: 'amnd_degr'			, type: 'float' , defaultValue : 1	//amd차수
		},{	name: 'line_seqn'			, type: 'float'			//순번
		},{	name: 'cstm_name'			, type: 'string'		//거래처명
		},{	name: 'drtr_idcd'			, type: 'string'		//담당자ID
		},{	name: 'drtr_name'			, type: 'string'		//담당자명
		},{	name: 'prod_name'			, type: 'string'		//품목코드
		},{	name: 'prod_spec'			, type: 'string'		//품목규격
		},{	name: 'ostt_qntt'			, type: 'float'			//출고수량
		},{	name: 'sale_qntt'			, type: 'float'			//판매수량
		},{	name: 'rqod_qntt'			, type: 'float'			//청구수량
		},{	name: 'sale_pric'			, type: 'string'		//판매단가
		},{	name: 'sale_amnt'			, type: 'float'			//공급가액
		},{	name: 'pcod_numb'			, type: 'string'		//PO NO
		},{	name: 'acpt_numb'			, type: 'string'		//수주번호
		},{	name: 'invc_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//출고일자
		},{	name: 'acpt_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//수주일자
		},{	name: 'sale_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//판매일자
		},{	name: 'rqod_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//청구일자

		},{	name: 'rnum'				, type: 'string'
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