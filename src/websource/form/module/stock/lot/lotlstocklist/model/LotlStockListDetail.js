Ext.define('module.stock.lot.lotlstocklist.model.LotlStockListDetail',{ extend:'Axt.data.Model',
	fields : [
		{name: 'lott_numb'				, type: 'string' },		//LOT번호
		{name: 'wrhs_idcd'				, type: 'string' },		//창고id
		{name: 'item_idcd'				, type: 'string' },		//품목id
		{name: 'isos_dvcd'				, type: 'string' },		//수불구분
		{name: 'istt_qntt'				, type: 'float'  },		//입고수량
		{name: 'ostt_qntt'				, type: 'float'  },		//출고수량
		{name: 'chge_qntt'				, type: 'float'  },		//조정수량
		{name: 'stok_qntt'				, type: 'float'  },		//재고수량
		{name: 'tagg_dvcd'				, type: 'string' },		//인식표구분코드
		{name: 'invc_date'				, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},
		{name: 'invc_numb'				, type: 'string' },		//INVOICE번호
		{name: 'invc_evdc'				, type: 'string' },		//INVOICE번호
		{name: 'invc_seqn'				, type: 'string' },		//INVOICE순번
		{name: 'user_memo'				, type: 'string' },		//사용자메모
		{name: 'sysm_memo'				, type: 'string' },		//시스템메모
		{name: 'prnt_idcd'				, type: 'string' },		//부모ID
		{name: 'line_levl'				, type: 'float'   , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr'				, type: 'string' },		//ROW순서
		{name: 'line_stat'				, type: 'string'  , defaultValue: '0'},		//ROW상태
		{name: 'line_clos'				, type: 'string' },		//ROW마감
		{name: 'find_name'				, type: 'string' },		//찾기명
		{name: 'updt_user_name'			, type: 'string' },		//수정사용자명
		{name: 'updt_ipad'				, type: 'string' },		//수정IP
		{name: 'updt_dttm'				, type: 'string' },		//수정일시
		{name: 'updt_idcd'				, type: 'string' },		//수정ID
		{name: 'updt_urif'				, type: 'string' },		//수정UI
		{name: 'crte_user_name'			, type: 'string' },		//생성사용자명
		{name: 'crte_ipad'				, type: 'string' },		//생성IP
		{name: 'crte_dttm'				, type: 'string' },		//생성일시
		{name: 'crte_idcd'				, type: 'string' },		//생성ID
		{name: 'crte_urif'				, type: 'string' },		//생성UI
		{name: 'make_date'				, type: 'string' ,  convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//제조일자
		{name: 'rtil_ddln_date'			, type: 'string' ,  convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//유통기한
		{name: 'user_memo'				, type: 'string' },		//메모사항
	]
});
