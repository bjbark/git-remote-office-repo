Ext.define('module.project.domainmanager.model.Relation',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'relt_idcd'              , type: 'string' 	/* 관계ID		*/
		},{	name: 'relt_name'              , type: 'string' 	/* 관계명		*/
		},{	name: 'mast_tabl'           , type: 'string' 	/* 마스터 테이블	*/
		},{	name: 'dtil_tabl'            , type: 'string' 	/* 디테일 테이블	*/
		},{	name: 'desct'               , type: 'string' 	/* 설명			*/
		},{	name: 'mast_tabl_nm'        , type: 'string' 	/* 테이블명		*/
		},{	name: 'dtl_tabl_nm'         , type: 'string' 	/* 테이블명		*/
		},{	name: 'relt_type_gbcd'       , type: 'string' 	/* 관계차수		*/
		},{	name: 'relt_degr_gbcd'       , type: 'string' 	/* 식별관계		*/
		},{	name: 'usr_memo'            , type: 'string' 	/* 사용자메모	*/
		},{	name: 'sys_memo'            , type: 'string' 	/* 시스템메모	*/
		},{	name: 'prnt_id'             , type: 'string' 	/* 아이디		*/
		},{	name: 'row_lvl'             , type: 'string' 	/* ROW레벨		*/
		},{	name: 'row_ord'             , type: 'float' 	/* ROW순서		*/ , defaultValue : 0
		},{	name: 'row_sts'             , type: 'string' 	/* 상태(진행)		*/ , defaultValue: '0'
		},{	name: 'row_clos'            , type: 'string' 	/* 마감여부		*/
		},{	name: 'find_nm'             , type: 'string' 	/* 찾기명		*/
		},{	name: 'upt_usr_nm'          , type: 'string' 	/* 수정사용자명	*/
		},{	name: 'upt_ip'              , type: 'string' 	/* 수정IP		*/
		},{	name: 'upt_dttm'            , type: 'string' 	/* 수정일시		*/
		},{	name: 'upt_id'              , type: 'string' 	/* 수정아이디	*/ , defaultValue: _global.login_pk
		},{	name: 'upt_ui'              , type: 'string' 	/* 수정UI		*/
		},{	name: 'crt_usr_nm'          , type: 'string' 	/* 작성사용자명	*/
		},{	name: 'crt_ip'              , type: 'string' 	/* 작성IP		*/
		},{	name: 'crt_dttm'            , type: 'string' 	/* 작성DTTM		*/
		},{	name: 'crt_id'              , type: 'string' 	/* 작성아이디	*/ , defaultValue: _global.login_pk
		},{	name: 'crt_ui'              , type: 'string' 	/* 작성UI		*/
		}
	]
});
