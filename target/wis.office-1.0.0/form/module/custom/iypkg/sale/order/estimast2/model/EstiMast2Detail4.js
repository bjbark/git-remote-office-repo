Ext.define('module.custom.iypkg.sale.order.estimast2.model.EstiMast2Detail4', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'assi_seqn'			, type: 'float'		//보조순번
		},{	name: 'amnd_degr'			, type: 'float' , defaultValue : 1	//amd차수
		},{	name: 'line_seqn'			, type: 'float'		//순번
		/*개발내역*/
		},{	name: 'devl_ctnt'			, type: 'string'	//개발내역
		},{	name: 'amnt'				, type: 'float'		//금액
		},{	name: 'remk_text'			, type: 'string'	//비고
		},{	name: 'uper_seqn'			, type: 'float'		//상위순번
		},{	name: 'disp_seqn'			, type: 'float'		//표시순번

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
		},{	name: 'modi_yorn'			, type: 'string', defaultValue : 'n'		//수정 변수
		}
	],
	recalculation: function(inv) {
		var row = this,
			baseamt = row.get('qntt') * row.get('pric')
		;
		row.set('amnt'	, row.get('qntt') * row.get('pric')) ;
	}
});