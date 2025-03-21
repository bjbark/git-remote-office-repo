Ext.define('module.custom.aone.sale.esti.estimast.model.EstiMastDetail6', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice번호
		},{	name: 'amnd_degr'			, type: 'float'			//amd 차수
		},{	name: 'line_seqn'			, type: 'float' 		//
		},{	name: 'assi_seqn'			, type: 'float'	,defaultValue : 1	//보조순번
		},{	name: 'cnsl_dttm'			, type: 'string'
		},{	name: 'item_name'			, type: 'string'		//품목명
		},{	name: 'item_idcd'			, type: 'string'		//품목번호
		},{	name: 'item_spec'			, type: 'string'		//규격
		},{	name: 'pric'				, type: 'float'			//단가
		},{	name: 'amnt'				, type: 'float'			//금액
		},{	name: 'wkct_name'			, type: 'string'		//가공내용
		},{	name: 'drtr_idcd'			, type: 'string'
		},{	name: 'cstm_dept_name'		, type: 'string'
		},{	name: 'cstm_drtr_name'		, type: 'string'
		},{	name: 'cnsl_cont'			, type: 'string'
		},{	name: 'cost_yorn'			, type: 'string'
		},{	name: 'dsig_yorn'			, type: 'string'
		},{	name: 'puch_yorn'			, type: 'string'
		},{	name: 'otod_yorn'			, type: 'string'
		},{	name: 'prod_yorn'			, type: 'string'
		},{	name: 'otod_yorn'			, type: 'string'
		},{	name: 'rply_reqt_yorn'		, type: 'string'
		},{	name: 'rply_mthd_dvcd'		, type: 'string'
		},{	name: 'rply_drtr_idcd'		, type: 'string'
		},{	name: 'rply_dttm'			, type: 'string'
		},{	name: 'rply_cont'			, type: 'string'
		},{	name: 'drtr_name'			, type: 'string'

		},{	name: 'qntt'				, type: 'float'			// 자재소요량
		},{	name: 'pric'				, type: 'float'			// 자재금액
		},{	name: 'amnt'				, type: 'float'			// 자재합계금액

		},{	name: 'user_memo'			, type: 'string'		//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'		//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'		//부모ID
		},{	name: 'line_levl'			, type: 'float'  , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float'  , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string' , defaultValue: '0'	// ROW상태
		},{	name: 'line_clos'			, type: 'string' , defaultValue: '0'	// ROW마감
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