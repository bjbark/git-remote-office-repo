Ext.define('module.project.querymaker.model.QueryMaker',{ extend:'Axt.data.Model',
	fields: [
 		{	name: 'path'                , type: 'string' 	/* 경로		*/
 		},{	name: 'srvc'                , type: 'string' 	/* 서비스		*/
 		},{	name: 'modl'                , type: 'string' 	/* 모쥴		*/
 		},{	name: 'line_no'             , type: 'float' 	/* 라인번호		*/ , defaultValue : 0
 		},{	name: 'type_cd'             , type: 'string' 	/* 타입코드		*/
 		},{	name: 'query_txt'           , type: 'string' 	/* 쿼리문장		*/
 		},{	name: 'ref_1'               , type: 'string' 	/* 참조1		*/
 		},{	name: 'ref_2'               , type: 'string' 	/* 참조2		*/
 		},{	name: 'ref_3'               , type: 'string' 	/* 참조3		*/
 		},{	name: 'ref_4'               , type: 'string' 	/* 참조4		*/
 		},{	name: 'ref_5'               , type: 'string' 	/* 참조1		*/
 		},{	name: 'ref_6'               , type: 'string' 	/* 참조2		*/
 		},{	name: 'ref_7'               , type: 'string' 	/* 참조3		*/
 		},{	name: 'ref_8'               , type: 'string' 	/* 참조4		*/
 		},{	name: 'deli_val'            , type: 'string' 	/* 전달값		*/
 		},{	name: 'cnst_val'            , type: 'string' 	/* 전달값		*/
 		},{	name: 'usr_memo'            , type: 'string' 	/* 사용자메모	*/
 		},{	name: 'sys_memo'            , type: 'string' 	/* 시스템메모	*/
 		},{	name: 'prnt_id'             , type: 'string' 	/* 아이디		*/
 		},{	name: 'row_lvl'             , type: 'float' 	/* ROW레벨	*/ , defaultValue : 0
 		},{	name: 'row_ord'             , type: 'float' 	/* ROW순서	*/ , defaultValue : 0
 		},{	name: 'row_sts'             , type: 'string' 	/* 상태(진행)	*/ , defaultValue: '0'
 		},{	name: 'row_clos'            , type: 'string' 	/* 마감여부		*/
 		},{	name: 'find_nm'             , type: 'string' 	/* 찾기명		*/
 		},{	name: 'upt_usr_nm'          , type: 'string' 	/* 수정사용자명	*/
 		},{	name: 'upt_ip'              , type: 'string' 	/* 수정IP		*/
 		},{	name: 'upt_dttm'            , type: 'string' 	/* 수정일시		*/
 		},{	name: 'upt_id'              , type: 'string' 	/* 수정아이디	*/ , defaultValue: _global.login_pk
 		},{	name: 'upt_ui'              , type: 'string' 	/* 수정UI		*/
 		},{	name: 'crt_usr_nm'          , type: 'string' 	/* 작성사용자명	*/
 		},{	name: 'crt_ip'              , type: 'string' 	/* 작성IP		*/
 		},{	name: 'crt_dttm'            , type: 'string' 	/* 작성DTTM	*/
 		},{	name: 'crt_id'              , type: 'string' 	/* 작성아이디	*/ , defaultValue: _global.login_pk
 		},{	name: 'crt_ui'              , type: 'string' 	/* 작성UI		*/
 		}
 	]
 });
