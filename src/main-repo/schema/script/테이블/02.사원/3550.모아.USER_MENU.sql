/*************************************************************************************************
--
--    사원 메뉴   
-- -- drop table usr_menu; 
*************************************************************************************************/
 create table usr_menu
 (
  	emp_id                       varchar(   50   )                                                      not null, -- 사원 id
  	menu_id                       varchar(   50   )                                                      not null, -- 메뉴 id
	/*-------------------------------------------------------------------------------------------------------------*/
	mymenu_yn                        char(    1   ) default '0'                                          not null, -- 트리 확장 여부
	/*------------------------------------------------------------------------------------------------------------- */
	select_yn                        char(    1   ) default '0'                                          not null, /* 조회 사용 여부 1  */
	inpt_use_yn                        char(    1   ) default '0'                                          not null, /* 등록 사용 여부 2  */
	upt_use_yn                        char(    1   ) default '0'                                          not null, /* 수정 사용 여부 4  */
	del_use_yn                        char(    1   ) default '0'                                          not null, /* 삭제 사용 여부 8  */
	prt_use_yn                        char(    1   ) default '0'                                          not null, /* 출력 사용 여부 16 */
	expt_use_yn                        char(    1   ) default '0'                                          not null, /* 엑셀 사용 여부 32 */
	/*------------------------------------------------------------------------------------------------------------- */
	user_memo                     varchar(  200   )                                                              , /* 사용자 메모 */
    sys_memo                     varchar(  200   )                                                              , /* 시스템 메모 */
    row_ord                     integer           default 0                                            not null, /* 표시 순서 */
    row_sts                     integer           default 0                                            not null, /* 데이터 상태 코드 */
	/*------------------------------------------------------------------------------------------------------------- */
    upt_ui                     varchar(   50   )                                                              , /* 데이터 수정자 명 */
    upt_id                     varchar(   50   )                                                              , /* 데이터 수정자 명 */
    upt_ip                     varchar(   25   )                                                              , /* 데이터 수정자 ip */
    upt_dttm                     varchar(   14   )                                                              , /* 데이터 수정일시 */
	/*------------------------------------------------------------------------------------------------------------- */
    crt_ui                     varchar(   50   )                                                              , /* 데이터 생성자 명 */
    crt_id                     varchar(   50   )                                                              , /* 데이터 생성자 명 */
    crt_ip                     varchar(   25   )                                                              , /* 데이터 생성자 ip */
    crt_dttm                     varchar(   14   )                                                              , /* 데이터 생성 일시 */
	/*------------------------------------------------------------------------------------------------------------- */
	constraint      pk_usr_menu  primary key ( emp_id, menu_id ) 
 ) engine=innodb default charset=utf8;  
    
   --insert into usr_menu ( emp_id , menu_id , inpt_use_yn ,upt_use_yn , del_use_yn ) values ('0000', '000000000002' ,'1','1','1' );
   --insert into usr_menu ( emp_id , menu_id , inpt_use_yn ,upt_use_yn , del_use_yn ) values ('0000', '000000000009' ,'1','1','1' );
   --insert into usr_menu ( emp_id , menu_id , inpt_use_yn ,upt_use_yn , del_use_yn ) values ('0000', '000000000010' ,'1','1','1' );
   
   
   
