/*************************************************************************************************
-- 
--    pjt_wrd 
-- -- drop table pjt_wrd; 
*************************************************************************************************/
 create table pjt_wrd 
 ( 
  	word_idcd                       varchar(   50   )                                                      not null, /* 코드 id */
  	wrd_cd                       varchar(   50   )                                                      not null, /* 코드 cd */
  	word_name                       varchar(  200   )                                                              , /* 코드 명 */
	wrd_gb                          char(    4   ) default '0000'                                       not null, /*  0000 : 전체 0001 : 기초코드 0002 : 단어코드 */
	/*------------------------------------------------------------------------------------------------------------- */
    lookup_deflt_val                       varchar(   50   )                                                              , /* lookup 값중 하나, 디폴트값 */
	lookup_val                       varchar( 4000   )                                                      not null, /* lookup values */
	itm_val                       varchar( 4000   )                                                      not null, /* lookup values */
	/*------------------------------------------------------------------------------------------------------------- */
	user_memo                     varchar(  200   )                                                              , /* 사용자 메모 */
    sys_memo                     varchar(  200   )                                                              , /* 시스템 메모 */
	prnt_id                     varchar(   50   )                                                      not null, /* 상위 ID  */
	row_lvl                     integer           default 0                                            not null, /* 레벨   */
    row_ord                     integer           default 0                                            not null, /* 표시 순서 */
    row_sts                     integer           default 0                                            not null, /* 데이터 상태 코드 */
	find_name                     varchar(   800  )	                                                         null, /* 검색필드 */
    upt_nm                     varchar(   200  )                                                              , /* 데이터 수정자 명 */
    upt_ip                     varchar(   25   )                                                              , /* 데이터 수정자 ip */
    upt_dttm                     varchar(   14   )                                                              , /* 데이터 수정일시 */
    crt_nm                     varchar(  200   )                                                              , /* 데이터 생성자 명 */
    crt_ip                     varchar(   25   )                                                              , /* 데이터 생성자 ip */
    crt_dttm                     varchar(   14   )                                                              , /* 데이터 생성 일시 */
	/*------------------------------------------------------------------------------------------------------------- */
	constraint      pk_proj_word primary key ( word_idcd ) 
 ) engine=InnoDB default charset=utf8;
  
/*************************************************************************************************
--  index 
*************************************************************************************************/
  --create  unique index ix_proj_word_proj_id      on pjt_wrd( pjt_id, proj_cd  );
-- insert into pjt_wrd ( pjt_id , word_idcd , wrd_cd , word_name, wrd_gb , lookup_deflt_val , lookup_val , itm_val , find_name , row_sts , prnt_id  
--)
--select '0000014814' as pjt_id , code_id , code_cd , code_nm, code_gb , lookup_deflt_val , lookup_val , itm_val , find_name , row_sts , prnt_id 
--from code_info where site_id = 'control'
--;
--


