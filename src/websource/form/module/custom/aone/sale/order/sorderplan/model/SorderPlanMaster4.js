Ext.define('module.custom.aone.sale.order.sorderplan.model.SorderPlanMaster4', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'drtr_idcd'			, type: 'string'		//invoice번호
		},{	name: 'user_name'			, type: 'string'
		},{	name: 'drtr_name'			, type: 'string'
		},{	name: 'prod_drtr_idcd'		, type: 'string'
		},{	name: '1_day'				, type: 'string'
		},{	name: '2_day'				, type: 'string'
		},{	name: '3_day'				, type: 'string'
		},{	name: '4_day'				, type: 'string'
		},{	name: '5_day'				, type: 'string'
		},{	name: '6_day'				, type: 'string'
		},{	name: '7_day'				, type: 'string'
		},{	name: '8_day'				, type: 'string'
		},{	name: '9_day'				, type: 'string'
		},{	name: '10_day'				, type: 'string'
		},{	name: '11_day'				, type: 'string'
		},{	name: '12_day'				, type: 'string'
		},{	name: '13_day'				, type: 'string'
		},{	name: '14_day'				, type: 'string'
		},{	name: '15_day'				, type: 'string'
		},{	name: '16_day'				, type: 'string'
		},{	name: '17_day'				, type: 'string'
		},{	name: '18_day'				, type: 'string'
		},{	name: '19_day'				, type: 'string'
		},{	name: '20_day'				, type: 'string'
		},{	name: '21_day'				, type: 'string'
		},{	name: '22_day'				, type: 'string'
		},{	name: '23_day'				, type: 'string'
		},{	name: '24_day'				, type: 'string'
		},{	name: '25_day'				, type: 'string'
		},{	name: '26_day'				, type: 'string'
		},{	name: '27_day'				, type: 'string'
		},{	name: '28_day'				, type: 'string'
		},{	name: '29_day'				, type: 'string'
		},{	name: '30_day'				, type: 'string'
		},{	name: '31_day'				, type: 'string'
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