Ext.define('module.custom.sjflv.prod.order.workbook.model.WorkBookDetail4',{ extend:'Axt.data.Model',
	fields : [
		{name: 'invc_numb'				, type: 'string'},		//INVOICE번호
		{name: 'invc_date'				, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	//INVOICE일자
		{name: 'line_seqn'				, type: 'float' },		//순번
		{name: 'item_idcd'				, type: 'string' },		//품목ID
		{name: 'item_name'				, type: 'string' },		//품명
		{name: 'unit_idcd'				, type: 'string' },		//단위ID
		{name: 'unit_name'				, type: 'string' },		//단위명
		{name: 'need_qntt'				, type: 'float' },		//소요수량
		{name: 'ivst_qntt'				, type: 'float' },		//투입수량
		{name: 'stnd_unit_qntt'			, type: 'float' },		//기준단위수량
		{name: 'lott_numb'				, type: 'string'},		//LOT번호
		{name: 'lott_mngt_yorn'			, type: 'string'},		//LOT관리여부
		{name: 'remk_text'				, type: 'string'},		//비고
		{name: 'uper_seqn'				, type: 'float' },		//상위순번
		{name: 'disp_seqn'				, type: 'float' },		//표시순번

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
	]
});
