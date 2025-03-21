Ext.define('module.project.projword.model.ProjWord',{ extend:'Axt.data.Model',
	fields: [
 		{	name: 'hqof_idcd',				type: 'string'  , defaultValue : 'common' /* 본사 ID */
 		},{	name: 'word_idcd',				type: 'string'   /*  단어ID          */
		},{	name: 'word_code',				type: 'string'   /*  단어코드      */
		},{	name: 'word_name',				type: 'string'   /*  단어명         */
		},{	name: 'word_dvcd',				type: 'string' , defaultValue : '1'  /*  단어구분      */
		},{	name: 'word_eglh_name',			type: 'string'   /*  영어            */
		},{	name: 'word_chna_name',			type: 'string'   /*  중죽어         */
		},{	name: 'word_jpan_name',			type: 'string'   /*  일어            */
		},{	name: 'word_etcc_name',			type: 'string'   /*  기타            */
		},{	name: 'locl_yorn',				type: 'string'   /*  로컬 단어 여부       */
		},{	name: 'user_memo',				type: 'string' 		//사용자메모
		},{	name: 'sysm_memo',				type: 'string'		//시스템메모
		},{	name: 'prnt_idcd',				type: 'string'		//부모ID
		},{	name: 'line_levl',				type: 'float', defaultValue: '0'	//ROW레벨
		},{	name: 'line_ordr',				type: 'string'		//ROW순서
		},{	name: 'line_stat',				type: 'string', defaultValue: '0'		//ROW상태
		},{	name: 'line_clos',				type: 'string'		//ROW마감
		},{	name: 'find_name',				type: 'string'		//찾기명
		},{	name: 'updt_user_name',			type: 'string'		//수정사용자명
		},{	name: 'updt_ipad',				type: 'string'		//수정IP
		},{	name: 'updt_dttm',				type: 'string'		//수정일시
		},{	name: 'updt_idcd',				type: 'string'		//수정ID
		},{	name: 'updt_urif',				type: 'string'		//수정UI
		},{	name: 'crte_user_name',			type: 'string'		//생성사용자명
		},{	name: 'crte_ipad',				type: 'string'		//생성IP
		},{	name: 'crte_dttm',				type: 'string'		//생성일시
		},{	name: 'crte_idcd',				type: 'string'		//생성ID
		},{	name: 'crte_urif',				type: 'string'		//생성UI
		}
	]
});

