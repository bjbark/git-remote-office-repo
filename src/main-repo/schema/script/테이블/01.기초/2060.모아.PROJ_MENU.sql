/*************************************************************************************************
--
--    MENU_INFO 
-- -- DROP TABLE pjt_menu;
*************************************************************************************************/
 create table pjt_menu  
 (
  	menu_id                       varchar(   50   )                                                      not null, /* 메뉴 id */
	menu_nm                       varchar(   50   )                                                              , /* 메뉴 명 */
	/*------------------------------------------------------------------------------------------------------------- */
 	admin_use                        char(    1   ) default '0'                                          not null, 
	/*------------------------------------------------------------------------------------------------------------- */
	tree_expn_yn                        char(    1   ) default '1'                                          not null, /* 트리 확장 여부 */
	last_modl_yn                        char(    1   ) default '1'                                          not null, /* 최종 모듈 여부 */
	modl_id                     varchar(  200   )                                                              , /* 모듈이름 */
	modl_nm                     varchar(  200   )                                                              , /* 컨트롤명 */
	/*------------------------------------------------------------------------------------------------------------- */
	select_yn                        char(    1   ) default '0'                                          not null, /* 조회 사용 여부 1  */
	inpt_use_yn                        char(    1   ) default '0'                                          not null, /* 등록 사용 여부 2  */
	upt_use_yn                        char(    1   ) default '0'                                          not null, /* 수정 사용 여부 4  */
	del_use_yn                        char(    1   ) default '0'                                          not null, /* 삭제 사용 여부 8  */
	prt_use_yn                        char(    1   ) default '0'                                          not null, /* 출력 사용 여부 16 */
	expt_use_yn                        char(    1   ) default '0'                                          not null, /* 엑셀 사용 여부 32 */
	/*------------------------------------------------------------------------------------------------------------- */
	prnt_id                     varchar(   50   ) default '0'                                          not null, /* 상위 메뉴 id */
	row_lvl                     integer           default  1                                           not null, /* 데이터 레벨 */
	/*------------------------------------------------------------------------------------------------------------- */
	user_memo                     varchar(  200   )                                                              , /* 사용자 메모 */
    sys_memo                     varchar(  200   )                                                               , /* 시스템 메모 */
	/*-------------------------------------------------------------------------------------------------------------*/
    row_sts                     integer           default 0                                            not null, /* 데이터 상태 코드 */
    row_ord                     integer           default 0                                            not null, /* 표시 순서 */
    find_name                     varchar(  800   )                                                              , -- 검색어
    /*------------------------------------------------------------------------------------------------------------- */
    upt_ui                     varchar(   50   )                                                               , /* 데이터 수정 화면 */
    upt_id                     varchar(   50   )                                                               , /* 데이터 수정자 명 */
    upt_ip                     varchar(   25   )                                                               , /* 데이터 수정자 ip */
    upt_dttm                     varchar(   14   )                                                               , /* 데이터 수정일시 */
    /*-------------------------------------------------------------------------------------------------------------*/
    crt_ui                     varchar(   50   )                                                               , /* 데이터 생성 화면 */
    crt_id                     varchar(   50   )                                                               , /* 데이터 생성자 명 */
    crt_ip                     varchar(   25   )                                                               , /* 데이터 생성자 ip */
    crt_dttm                     varchar(   14   )                                                               , /* 데이터 생성 일시 */
	/*------------------------------------------------------------------------------------------------------------- */
	constraint      pk_proj_menu primary key ( menu_id ) 
 ) engine=innodb default charset=utf8;  
   
  --insert into pjt_menu ( menu_id , menu_nm  , prnt_id , row_lvl , last_modl_yn ) values ('0', '0' , '0' , '1' ,'0' );
  --insert into pjt_menu ( menu_id , menu_nm  , prnt_id , row_lvl , last_modl_yn                                    ) values ('000000000001', '개발자' , '0' , '2' , '0'  );
  --insert into pjt_menu ( menu_id , menu_nm  , prnt_id , row_lvl , modl_id , modl_nm , inpt_use_yn, upt_use_yn ) values ('000000000002', '메뉴관리' , '000000000001' , '3' , 'project' , 'ProjMenu' ,  '1' ,'1' );
  --insert into pjt_menu ( menu_id , menu_nm  , prnt_id , row_lvl , last_modl_yn                                    ) values ('000000000005', '고객사' , '0' , '2' , '0'  );

  
  
 
