Ext.define('module.custom.dhtec.sale.order.saleplanorder2.model.SalePlanOrder2',{ extend:'Axt.data.Model',
	fields: [
		{name: 'wrhs_idcd',				type: 'string'},		//창고ID
		{name: 'wrhs_code',				type: 'string'},		//창고ID
		{name: 'bzct_idcd',				type: 'string'},		//사업부문ID
		{name: 'bzpl_idcd',				type: 'string'},		//생산사업장ID
		{name: 'bzpl_name',				type: 'string'},		//생산사업장ID
		{name: 'wrhs_name',				type: 'string'},		//창고명
		{name: 'mngt_wrhs_name',		type: 'string'},		//관리창고명
		{name: 'dept_idcd',				type: 'string'},		//관리부서ID
		{name: 'dept_name',				type: 'string'},		//관리부서명
		{name: 'mngt_wrhs_dvcd',		type: 'string'},		//관리창고구분코드
		{name: 'drtr_idcd',				type: 'string'},		//담당자ID
		{name: 'drtr_name',				type: 'string'},		//담당자명
		{name: 'trut_cstm_idcd',		type: 'string'},		//위탁거래처ID
		{name: 'drtr_cntr_dvcd',		type: 'string'},		//창고담당자통제구분
		{name: 'lcal_dvcd',				type: 'string'},		//지역구분코드
		{name: 'dstr_dvcd',				type: 'string'},		//권역구분코드
		{name: 'full_addr',				type: 'string'}, 		//FULL주소
		{name: 'addr_1fst',				type: 'string'},		//주소1
		{name: 'addr_2snd',				type: 'string'},		//주소2
		{name: 'post_code',				type: 'string'},		//우편번호
		{name: 'wms_code',				type: 'string'},		//WMS코드
		{name: 'nega_stok_yorn',		type: 'string'},		//음수재고관리여부
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
		{name: 'updt_idcd',				type: 'string'},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string'},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
