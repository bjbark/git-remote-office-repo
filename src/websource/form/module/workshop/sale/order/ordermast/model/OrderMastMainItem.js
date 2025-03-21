Ext.define('module.workshop.sale.order.ordermast.model.OrderMastMainItem',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'invc_numb'			, type: 'string' },		//상담번호
		{	name: 'line_seqn'			, type: 'float ' },		//순번
		{	name: 'indx_assi_seqn'		, type: 'float ' },		//보조순번
		{	name: 'indx_used_yorn'		, type: 'string' },		//간지사용여부
		{	name: 'shet_idcd'			, type: 'string' },		//용지ID
		{	name: 'shet_name'			, type: 'string' },		//용지명
		{	name: 'indx_shet_wght'		, type: 'float' },		//평량
		{	name: 'volm_indx_qntt'		, type: 'float' },		//권당간지수
		{	name: 'prnt_mthd_dvcd'		, type: 'string' },		//인새컬러분류코드
		{	name: 'prnt_colr_bacd_indx'	, type: 'string' },		//인새컬러분류코드
		{	name: 'prnt_yorn'			, type: 'string' },		//인쇄여부
		{	name: 'indx_yorn'			, type: 'string' },		//색인표여부
		{	name: 'indx_esti_amnt'		, type: 'float',defaultValue : 0 },		//견적금액
		{	name: 'indx_esti_pric'		, type: 'float' },		//견적단가
		{	name: 'dprt_blwt_pric'		, type: 'float' },		//
		{	name: 'sprt_blwt_pric'		, type: 'float' },		//
		{	name: 'dprt_colr_pric'		, type: 'float' },		//
		{	name: 'sprt_colr_pric'		, type: 'float' },		//
		{	name: 'cofm_pric'			, type: 'float' },		//확정단가
		{	name: 'sply_amnt'			, type: 'float' },		//공급가액
		{	name: 'vatx_amnt'			, type: 'float' },		//부가세액
		{	name: 'ttsm_amnt'			, type: 'float' },		//합계금액
		{	name: 'work_memo'			, type: 'string' },		//작업메모

		{name: 'sysm_memo',				type: 'string'},						//시스템메모
		{name: 'prnt_idcd',				type: 'string'},						//부모ID
		{name: 'line_levl',				type: 'float' , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'string', defaultValue: '0'},		//ROW순서
		{name: 'line_stat',				type: 'string', defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},						//ROW마감
		{name: 'find_name',				type: 'string'},						//찾기명
		{name: 'updt_user_name',		type: 'string'},						//수정사용자명
		{name: 'updt_ipad',				type: 'string'},						//수정IP
		{name: 'updt_dttm',				type: 'string'},						//수정일시
		{name: 'updt_idcd',				type: 'string'},						//수정ID
		{name: 'updt_urif',				type: 'string'},						//수정UI
		{name: 'crte_user_name',		type: 'string'},						//생성사용자명
		{name: 'crte_ipad',				type: 'string'},						//생성IP
		{name: 'crte_dttm',				type: 'string'},						//생성일시
		{name: 'crte_idcd',				type: 'string'},						//생성ID
		{name: 'crte_urif',				type: 'string'},						//생성UI
	],
});

