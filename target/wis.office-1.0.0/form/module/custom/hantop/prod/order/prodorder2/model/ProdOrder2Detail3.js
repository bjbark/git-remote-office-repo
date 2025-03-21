Ext.define('module.custom.hantop.prod.order.prodorder2.model.ProdOrder2Detail3', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_date'				, type: 'string'	//INVOICE날짜
		},{	name: 'invc_numb'				, type: 'string'	//INVOICE번호
		},{	name: 'line_seqn'				, type: 'float'		//순번
		},{	name: 'plan_date'				, type: 'string'	//계획날짜
		},{	name: 'lott_numb'				, type: 'string'	//LOT번호
		},{	name: 'acpt_numb'				, type: 'string'	//수주번호
		},{	name: 'acpt_amnd_degr'			, type: 'float'		//수주차수
		},{	name: 'acpt_seqn'				, type: 'float'		//수주순번
		},{	name: 'ispl_name'				, type: 'string'	//설치위치
		},{	name: 'wdbf_itid'				, type: 'string'	//BF품목ID
		},{	name: 'wdsf_itid'				, type: 'string'	//SF품목ID
		},{	name: 'prod_trst_numb'			, type: 'string'	//생산의뢰번호
		},{	name: 'prod_trst_seqn'			, type: 'float'		//생산의뢰순번


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