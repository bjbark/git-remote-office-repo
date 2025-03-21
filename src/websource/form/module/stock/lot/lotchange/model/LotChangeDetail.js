Ext.define('module.stock.lot.lotchange.model.LotChangeDetail',{ extend:'Axt.data.Model',
	fields : [
	    {name: 'lott_numb'				, type: 'string'},		//LOT번호
	    {name: 'line_seqn'				, type: 'int'	},		//LOT번호
		{name: 'bzpl_idcd'				, type: 'string'},		//사업장id
		{name: 'wrhs_idcd'				, type: 'string'},		//창고id
		{name: 'item_idcd'				, type: 'string'},		//품목id
		{name: 'item_name'				, type: 'string'},		//품명
		{name: 'item_spec'				, type: 'string'},		//규격
		{name: 'item_code'				, type: 'string'},		//품목코드
		{name: 'modl_name'				, type: 'string'},		//모델명
		{name: 'unit_idcd'				, type: 'string'},		//단위ID
		{name: 'unit_name'				, type: 'string'},		//단위명
		{name: 'wrhs_name'				, type: 'string'},		//창고명
		{name: 'isos_dvcd'				, type: 'float'   , defaultValue: '2500'},		//수불구분
		{name: 'istt_qntt'				, type: 'string'},		//입고수량
		{name: 'ostt_qntt'				, type: 'string'},		//출고수량
		{name: 'chge_qntt'				, type: 'string'},		//조정수량
		{name: 'stok_qntt'				, type: 'string'},		//재고수량
		{name: 'tagg_dvcd'				, type: 'string'},		//인식표구분코드
		{name: 'invc_date'				, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	//INVOICE일자
		{name: 'invc_numb'				, type: 'string'},		//INVOICE번호
		{name: 'invc_numb'				, type: 'string'},		//INVOICE번호
		{name: 'full_invc_numb'			, type: 'string'},		//INVOICE번호
		{name: 'invc_seqn'				, type: 'float' },		//INVOICE순번
		{name: 'acct_bacd'				, type: 'string'},		//계정구분
		{name: 'acct_bacd_name'			, type: 'string'},		//계정구분명
		{name: 'user_memo'				, type: 'string'},		//사용자메모
		{name: 'sysm_memo'				, type: 'string'},		//시스템메모
		{name: 'prnt_idcd'				, type: 'string'},		//부모ID
		{name: 'line_levl'				, type: 'float'   , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr'				, type: 'float' },		//ROW순서
		{name: 'line_stat'				, type: 'float'   , defaultValue: '0'},		//ROW상태
		{name: 'line_clos'				, type: 'float' },		//ROW마감
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
		{name: 'qntt'					, type: 'float' },		//조정수량
	]
});
