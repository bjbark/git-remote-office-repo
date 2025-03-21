Ext.define('module.stock.lot.lotchange.model.LotChangeMaster',{ extend:'Axt.data.Model',
	fields : [
		{name: 'lott_numb'				, type: 'string'},		//LOT번호
		{name: 'line_seqn'				, type: 'string'},		//순번
		{name: 'bzpl_idcd'				, type: 'string'},		//사업부문구분코드
		{name: 'isos_dvcd'				, type: 'float' },		//입출고구분코드
		{name: 'invc_numb'				, type: 'string'},		//invoice번호
		{name: 'invc_seqn'				, type: 'float' },		//invoice순번
		{name: 'wrhs_idcd'				, type: 'float' },		//창고ID
		{name: 'item_idcd'				, type: 'string'},		//품목ID
		{name: 'item_code'				, type: 'string'},		//품목코드
		{name: 'item_spec'				, type: 'string'},		//규격
		{name: 'wrhs_name'				, type: 'string'},		//창고명
		{name: 'modl_name'				, type: 'string'},		//모델명
		{name: 'stok_symb'				, type: 'string'},		//재고부호
		{name: 'stok_qntt'				, type: 'string'},		//재고수량
		{name: 'istt_qntt'				, type: 'float' },		//입고수량
		{name: 'ostt_qntt'				, type: 'float' },		//출고수량
		{name: 'chge_qntt'				, type: 'float' },		//조정수량
		{name: 'item_name'				, type: 'string'},		//품명
		{name: 'uper_seqn'				, type: 'string'},		//상위순번
		{name: 'disp_seqn'				, type: 'string'},		//표시순번
		{name: 'acct_bacd'				, type: 'string'},		//계정구분
		{name: 'acct_bacd_name'			, type: 'string'},		//계정구분명
		{name: 'invc_numb'				, type: 'string'},		//INVOICE번호
		{name: 'full_invc_numb'			, type: 'string'},		//INVOICE번호
		{name: 'invc_seqn'				, type: 'float' },		//INVOICE순번
		{name: 'unit_name'				, type: 'string'},		//수불단위

		{name: 'user_memo'				, type: 'string'},		//사용자메모
		{name: 'sysm_memo'				, type: 'string'},		//시스템메모
		{name: 'prnt_idcd'				, type: 'string'},		//부모ID
		{name: 'line_levl'				, type: 'float'  , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr'				, type: 'string'},		//ROW순서
		{name: 'line_stat'				, type: 'string' , defaultValue: '0'},		//ROW상태
		{name: 'line_clos'				, type: 'string'},		//ROW마감
		{name: 'find_name'				, type: 'string'},		//찾기명
		{name: 'updt_user_name'			, type: 'string'},		//수정사용자명
		{name: 'updt_ipad'				, type: 'string'},		//수정IP
		{name: 'updt_dttm'				, type: 'string'},		//수정일시
		{name: 'updt_idcd'				, type: 'string'},		//수정ID
		{name: 'updt_urif'				, type: 'string'},		//수정UI
		{name: 'crte_user_name'			, type: 'string'},		//생성사용자명
		{name: 'crte_ipad'				, type: 'string'},		//생성IP
		{name: 'crte_dttm'				, type: 'string'},		//생성일시
		{name: 'crte_idcd'				, type: 'string'},		//생성ID
		{name: 'crte_urif'				, type: 'string'},		//생성UI
	]
});
