Ext.define('module.custom.iypkg.prod.prodordr.model.ProdOrdrWkct', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice번호
		},{	name: 'invc_seqn'			, type: 'float'			//순번
		},{	name: 'line_seqn'			, type: 'float'			//지시순번
		},{	name: 'plan_qntt'			, type: 'float'			//계획수량
		},{	name: 'cvic_idcd'			, type: 'string'		//설비명
		},{	name: 'wkct_stnm'			, type: 'string'		//보조명
		},{	name: 'plan_sttm'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//시작일자
		},{	name: 'pdod_date'			, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd')		//지시일자
		},{	name: 'wkct_name'			, type: 'string'		//공정명
		},{	name: 'need_qntt'			, type: 'float'			//소요수량(수주수량)
		},{	name: 'unit_name'			, type: 'string'		//수량단위
		},{	name: 'wkun_dvcd'			, type: 'string'		//작업단위구분
		},{	name: 'indn_qntt'			, type: 'float'			//누적지시수량
		},{	name: 'plan_qntt2'			, type: 'float'			//지시수량

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