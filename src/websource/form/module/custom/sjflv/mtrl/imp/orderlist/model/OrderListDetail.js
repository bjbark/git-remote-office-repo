Ext.define('module.custom.sjflv.mtrl.imp.orderlist.model.OrderListDetail',{ extend:'Axt.data.Model',
	fields : [
		{name: 'invc_numb',				type: 'string'},		//INVOICE번호
		{name: 'line_seqn',				type: 'float' },		//순번
		{name: 'acpt_numb',				type: 'string'},		//수주번호
		{name: 'acpt_seqn',				type: 'float' },		//수주순번
		{name: 'assi_seqn',				type: 'float' },		//보조순번
		{name: 'sale_numb',				type: 'string'},		//매출번호
		{name: 'sale_seqn',				type: 'float' },		//매출순번
		{name: 'colt_dvcd',				type: 'string'},		//수금구분코드
		{name: 'colt_degr',				type: 'float' } ,		//수금차수
		{name: 'plan_date',				type: 'string'  , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//계획일자
		{name: 'plan_amnt',				type: 'float' },		//계획금액
		{name: 'colt_amnt',				type: 'float '},		//수금금액

		{name: 'item_idcd',				type: 'string'},		//품목ID
		{name: 'item_code',				type: 'string'},		//품콕코드
		{name: 'item_name',				type: 'string'},		//품목명
		{name: 'item_spec',				type: 'string'},		//품목규격
		{name: 'item_hscd',				type: 'string'},		//HS Code
		{name: 'unit_name',				type: 'string'},		//단위명
		{name: 'qntt',					type: 'float' },		//수량
		{name: 'exch_pric',				type: 'float' },		//단가
		{name: 'exch_amnt',				type: 'float' },		//금액
		{name: 'krwn_pric',				type: 'float' },		//원화단가
		{name: 'krwn_amnt',				type: 'float' },		//원화금액
		{name: 'mker_name',				type: 'string'},		//메이커명
		{name: 'ship_schd_date',		type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},			//선적예정일

		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'string'},		//ROW순서
		{name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},		//ROW마감
		{name: 'find_name',				type: 'string'},		//찾기명
		{name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{name: 'updt_ipad',				type: 'string'},		//수정IP
		{name: 'updt_dttm',				type: 'string'},		//수정일시
		{name: 'updt_idcd',				type: 'string', defaultValue : _global.login_pk},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string', defaultValue : _global.login_pk},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
