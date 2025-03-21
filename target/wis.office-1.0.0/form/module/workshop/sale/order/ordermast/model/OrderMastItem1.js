Ext.define('module.workshop.sale.order.ordermast.model.OrderMastItem1',{ extend:'Axt.data.Model',
	fields:
		[
		 	{name: 'wkfw_code',				type: 'string'},						//공정흐름코드
		 	{name: 'wkfw_name',				type: 'string'},						//공정흐름명
			{name: 'wkfw_idcd',				type: 'string'},						//공정흐름ID
			{name: 'line_seqn',				type: 'float' },						//항번
			{name: 'wkct_idcd',				type: 'string'},						//공정ID
			{name: 'wkct_code',				type: 'string'},						//공정코드
			{name: 'wkct_name',				type: 'string'},						//공정명
			{name: 'wkct_stnm',				type: 'string'},						//공정약칭
			{name: 'dept_idcd',				type: 'string'},						//부서id
			{name: 'wkct_insp_yorn',		type: 'string'},						//공정검사여부
			{name: 'last_wkct_yorn',		type: 'string'},						//최종공정여부
			{name: 'aftr_wkct_ordr',		type: 'float'},							//후공정순서
			{name: 'mtrl_cost_rate',		type: 'float'},							//재료비진척율
			{name: 'labo_cost_rate',		type: 'float'},							//노무비진척율
			{name: 'expn_rate',				type: 'float'},							//경비진척율
			{name: 'work_item_idcd',		type: 'string'},						//작업품목ID
			{name: 'work_item_code',		type: 'string'},						//작업품목코드
			{name: 'work_item_name',		type: 'string'},						//작업품명
			{name: 'modify',				type: 'string'},
			{name: 'stor_id',				type: 'string', defaultValue : _global.stor_id},		//stor_id
			{name: 'bzpl_idcd',				type: 'string', defaultValue : _global.dflt_bzpl_idcd},	//bzpl_idcd

			{name: 'otod_yorn',				type: 'string'},						//외주여부
			{name: 'otod_cstm_idcd',		type: 'string'},						//외주거래처ID
			{name: 'otod_cstm_name',		type: 'string'},						//외주거래처명
			{name: 'indn_qntt',				type: 'float' },						//지시수량
			{name: 'plan_strt_dttm',		type: 'string'},						//시작일자
			{name: 'plan_endd_dttm',		type: 'string'},						//종료일자
			{name: 'wkfw_seqn',				type: 'float' },						//공정순서
			{name: 'new_invc_numb',			type: 'string'},						//수주번호+'-'+수주순번
			{name: 'invc_numb',				type: 'string'},						//INVOICE번호
			{name: 'pdod_date',				type: 'string' ,  convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },		//생산지시일자
			{name: 'cstm_idcd',				type: 'string'},						//거래처ID
			{name: 'cstm_name',				type: 'string'},						//거래처명
			{name: 'item_idcd',				type: 'string'},						//품목ID
			{name: 'item_name',				type: 'string'},						//품명
			{name: 'unit_idcd',				type: 'string'},						//단위ID
			{name: 'prog_dvcd',				type: 'string'},						//진행구분코드
			{name: 'remk_text',				type: 'string'},						//비고
			{name: 'prog_stat_dvcd',		type: 'string'},						//진행상태
			//pror_mast
			{name: 'work_strt_dttm',		type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr},		//작업시작일시
			{name: 'work_endd_dttm',		type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr},		//작업종료일시
			{name: 'acpt_numb',				type: 'string'},						//수주번호
			{name: 'acpt_seqn',				type: 'float' },						//수주순번
			{name: 'acpt_amnd_degr',		type: 'string'},						//수주차수
			//pror_item


			{name: 'user_memo',				type: 'string'},						//사용자메모
			{name: 'sysm_memo',				type: 'string'},						//시스템메모
			{name: 'prnt_idcd',				type: 'string'},						//부모ID
			{name: 'line_levl',				type: 'float', defaultValue: '0'},		//ROW레벨
			{name: 'line_ordr',				type: 'string'},						//ROW순서
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
		]
	});

