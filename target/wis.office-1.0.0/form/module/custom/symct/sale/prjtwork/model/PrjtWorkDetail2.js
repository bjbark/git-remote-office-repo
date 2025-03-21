Ext.define('module.custom.symct.sale.prjtwork.model.PrjtWorkDetail2',{ extend:'Axt.data.Model',
	fields : [
		{name: 'pjod_idcd',				type: 'string'},		//프로젝트ID
		{name: 'line_seqn',				type: 'flaot'},			//순번
		{name: 'item_idcd',				type: 'string'},		//품목id
		{name: 'item_name',				type: 'string'},		//품명
		{name: 'item_code',				type: 'string'},		//품명
		{name: 'item_spec',				type: 'string'},		//품목규격
		{name: 'modl_name',				type: 'string'},		//모델명
		{name: 'mtrl_dvcd',				type: 'string'},		//재질구분
		{name: 'acpt_qntt',				type: 'flaot', defaultValue: '1'},	//수주수량
		{name: 'esti_pric',				type: 'flaot', defaultValue: '0'},			//견적단가
		{name: 'esti_amnt',				type: 'flaot', defaultValue: '0'},	//견적금액
		{name: 'cofm_yorn',				type: 'string'},		//확정여부
		{name: 'cofm_date',				type: 'string'},		//확정일자
		{name: 'cofm_pric',				type: 'flaot', defaultValue: '0'},			//확정단가
		{name: 'cofm_amnt',				type: 'flaot', defaultValue: '0'},			//확정금액
		{name: 'sply_amnt',				type: 'flaot', defaultValue: '0'},			//공급가액
		{name: 'vatx',					type: 'flaot', defaultValue: '0'},			//부가세
		{name: 'ttsm_amnt',				type: 'flaot', defaultValue: '0'},			//합계금액
		{name: 'deli_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,	//납기일자
		{name: 'ppsl_deli_date',		type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,	//제안납기일자
		{name: 'supl_dvcd',				type: 'string'},		//조달구분코드
		{name: 'prod_cofm_yorn',		type: 'string'},		//생산확정여부
		{name: 'imge_1fst',				type: 'string'},		//이미지1
		{name: 'imge_2snd',				type: 'string'},		//이미지2
		{name: 'modify',				type: 'string'},		//chk

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

