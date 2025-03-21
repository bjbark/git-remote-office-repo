Ext.define('module.project.domainmanager.model.Domain',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'line_no'        	, type: 'string'
		},{	name: 'field_id'       	, type: 'string'
		},{	name: 'fied_name'       	, type: 'string'
		},{	name: 'field_nm_englh' 	, type: 'string'
		},{	name: 'field_nm_chi'	, type: 'string'
		},{	name: 'field_nm_jpns'  	, type: 'string'
		},{	name: 'field_nm_etc'   	, type: 'string'
		},{	name: 'data_type'      	, type: 'string'
		},{	name: 'data_len'       	, type: 'string'
		},{	name: 'w_nm_1'         	, type: 'string'
		},{	name: 'w_id_1'         	, type: 'string'
		},{	name: 'w_nm_2'         	, type: 'string'
		},{	name: 'w_id_2'         	, type: 'string'
		},{	name: 'w_nm_3'         	, type: 'string'
		},{	name: 'w_id_3'         	, type: 'string'
		},{	name: 'w_nm_4'         	, type: 'string'
		},{	name: 'w_id_4'         	, type: 'string'
		},{	name: 'w_nm_5'         	, type: 'string'
		},{	name: 'w_id_5'         	, type: 'string'
		},{	name: 'w_nm_6'         	, type: 'string'
		},{	name: 'w_id_6'         	, type: 'string'
		},{	name: 'old_id'         	, type: 'string'
		},{	name: 'dscrt'          	, type: 'string'
		},{	name: 'ref_table'      	, type: 'string'
		},{	name: 'prnt_gbcd'      	, type: 'string'
		},{	name: 'inter_val'      	, type: 'string'
 		},{	name: 'usr_memo'        , type: 'string' 	/* 사용자메모		*/
 		},{	name: 'sys_memo'        , type: 'string' 	/* 시스템메모		*/
 		},{	name: 'prnt_id'         , type: 'string' 	/* 아이디		*/
 		},{	name: 'row_lvl'         , type: 'float' 	/* ROW레벨		*/ , defaultValue : 0
 		},{	name: 'row_ord'         , type: 'float' 	/* ROW순서		*/ , defaultValue : 0
 		},{	name: 'row_sts'         , type: 'string' 	/* 상태(진행)		*/ , defaultValue: '0'
 		},{	name: 'row_clos'        , type: 'string' 	/* 마감여부		*/
 		},{	name: 'find_nm'         , type: 'string' 	/* 찾기명		*/
 		},{	name: 'upt_usr_nm'      , type: 'string' 	/* 수정사용자명	*/
 		},{	name: 'upt_ip'          , type: 'string' 	/* 수정IP		*/
 		},{	name: 'upt_dttm'        , type: 'string' 	/* 수정일시		*/
 		},{	name: 'upt_id'          , type: 'string' 	/* 수정아이디		*/ , defaultValue: _global.login_pk
 		},{	name: 'upt_ui'          , type: 'string' 	/* 수정UI		*/
 		},{	name: 'crt_usr_nm'      , type: 'string' 	/* 작성사용자명	*/
 		},{	name: 'crt_ip'          , type: 'string' 	/* 작성IP		*/
 		},{	name: 'crt_dttm'        , type: 'string' 	/* 작성DTTM		*/
 		},{	name: 'crt_id'          , type: 'string' 	/* 작성아이디		*/ , defaultValue: _global.login_pk
 		},{	name: 'crt_ui'          , type: 'string' 	/* 작성UI		*/
		},{	name: '_field_id'      	, type: 'string'	, mapping : 'field_id'
	    }
    ]
});
