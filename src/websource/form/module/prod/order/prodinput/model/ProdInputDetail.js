Ext.define('module.prod.order.prodinput.model.ProdInputDetail',{ extend:'Axt.data.Model',
	fields : [
		{name: 'invc_numb'				, type: 'string'},		//INVOICE번호
		{name: 'line_seqn'				, type: 'string'},		//순번
		{name: 'bzpl_idcd'				, type: 'string'},		//사업장ID
		{name: 'wkfw_idcd'				, type: 'float' },		//공정흐름ID
		{name: 'wkct_idcd'				, type: 'float' },		//공정ID
		{name: 'wkct_item_idcd'			, type: 'string'},		//공정품목ID
		{name: 'prod_dept_idcd'			, type: 'string'},		//생산부서ID
		{name: 'orig_invc_numb'			, type: 'float' },		//원INVOICE번호
		{name: 'cstm_idcd'				, type: 'float' },		//거래처ID
		{name: 'item_idcd'				, type: 'float' }, 		//품목ID
		{name: 'bomt_degr'				, type: 'float' },		//BOM차수
		{name: 'unit_idcd'				, type: 'string'},		//단위ID
		{name: 'indn_qntt'				, type: 'float' },		//지시수량
		{name: 'work_strt_dttm'			, type: 'string'},		//작업시작일시
		{name: 'work_endd_dttm'			, type: 'string'},		//작업종료일시
		{name: 'work_dvcd'				, type: 'float' },		//작업구분코드
		{name: 'insp_wkct_yorn'			, type: 'string'},		//검사공정여부
		{name: 'last_wkct_yorn'			, type: 'string'},		//최종공정여부
		{name: 'cofm_yorn'				, type: 'float' },		//확정여부
		{name: 'remk_text'				, type: 'string'},		//비고

		{name: 'cstm_name'				, type: 'string'},		//거래처명
		{name: 'item_name'				, type: 'string'},		//품명
		{name: 'item_spec'				, type: 'string'},		//품목규격
		{name: 'summ_qntt'				, type: 'float'},		//지시수량-생산수량 (대기수량)
		{name: 'trst_qntt'				, type: 'float'},		//현 출고대기
		{name: 'ttsm_amnt'				, type: 'float'},		//현 당월매출액

		{name: 'user_memo'				, type: 'string'},		//사용자메모
		{name: 'sysm_memo'				, type: 'string'},		//시스템메모
		{name: 'prnt_idcd'				, type: 'string'},		//부모ID
		{name: 'line_levl'				, type: 'float'   , defaultValue: '0'},		//ROW레벨
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
