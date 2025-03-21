CREATE PROCEDURE `gen_update_new`(
   _tbl_nm  varchar(50),
   _db_knd  varchar(50)
   )
begin
   declare _last_fld int;
   declare _first_key int;
   declare _last_key int;
   
   select max(fied_seqn) into _last_fld
   from   cert_table
   where  lower(tabl_name) = lower(_tbl_nm) 
   and    lower(prjt_dvsn) = lower(ifnull(_db_knd,'MAIN'))
   ;
   select max(fied_seqn) into _last_key
   from   cert_table
   where  lower(tabl_name) = lower(_tbl_nm) 
   and    lower(prjt_dvsn) = lower(ifnull(_db_knd,'MAIN'))
   and    lower(key_dvcd) = 'k'
   ;
   select min(fied_seqn) into _first_key
   from   cert_table
   where  lower(tabl_name) = lower(_tbl_nm) 
   and    lower(prjt_dvsn) = lower(ifnull(_db_knd,'MAIN'))
   and    lower(key_dvcd) = 'k'
   ;
-- select * from cert_table where tabl_name like 'TABLE%'
   select a.seq, a.dat
   from   (
        select 0 as seq, '			data.param' as dat
        union all
        select 10000 as seq,
               concat( '					.table("'
                     , lower(_tbl_nm) 
        			 , '"' 
        			 , space(63 - length(_tbl_nm))
        			 , ')'
                     )	as dat		 
        union all
        select 20001 as seq,
               concat( '					.where("where '
                     , lower(fied_idcd)  
        			 , space(15 - length(fied_idcd)) 
        			 , ' = :'
        			 , lower(fied_idcd) 
        			 , space(38 - length(fied_idcd)) 
        			 , '")'
                     , '  /*  ' 
        			 , fied_name 
        			 , '  */'
        			 ) as dat
        from  cert_table 
        where tabl_name = lower(_tbl_nm) 
        and   lower(prjt_dvsn) = lower(ifnull(_db_knd,'MAIN'))
        and   key_dvcd = 'K'
        and   fied_seqn = _first_key
        union all
        select 30001 as seq,
               concat( '					.where("and   '
                     , lower(fied_idcd)  
        			 , space(15 - length(fied_idcd)) 
        			 , ' = :'
        			 , lower(fied_idcd) 
        			 , space(38 - length(fied_idcd)) 
                     , '")'
                     , '  /*  ' 
        			 , fied_name 
        			 , '  */'
        			 ) as dat
        from  cert_table 
        where tabl_name        =  lower(_tbl_nm) 
        and   lower(prjt_dvsn) =  lower(ifnull(_db_knd,'MAIN'))
        and   key_dvcd        =  'K'
        and   fied_seqn       != _first_key
        union all
        select 40001 as seq, '					//' as dat
        union all
        select 50000 + ifnull(fied_seqn,0) as seq,
               concat( '					.unique("' 
                     , lower(fied_idcd) 
        			 , '"'
        			 , space( 18 - length(fied_idcd)     )  
                     , ', row.fixParameter("' 
                     , lower(fied_idcd)
        			 , '"'
					 , space(20 - length(fied_idcd))
        			 , '))' 
        			 ) as dat
        from  cert_table 
        where tabl_name = lower(_tbl_nm) 
        and   lower(prjt_dvsn) = lower(ifnull(_db_knd,'MAIN'))
        and   key_dvcd = 'K'
        union all
        select 60001 as seq, '					//' as dat
        union all
        select 70000 + ifnull(fied_seqn,0) as seq,
               concat( case when upper(fied_idcd) in ('CRT_USR_NM'     ,'CRT_IP'    , 'CRT_DTTM'  , 'CRT_ID'    ,'CRT_UI'     , 'USERID'
			                                       'CRTE_USER_NAME' ,'CRTE_IPAD' , 'CRTE_DTTM' , 'CRTE_IDCD' , 'CRTE_URIF'
                                                  ) 
                            then  '				.insert("'
                            else case when upper(substring(fied_idcd,length(fied_idcd)-6,length(fied_idcd))) in ('RGST_DT')
                                      then  '					.insert("'
                                      else  '					.update("' 
        						 end
                       end          
                     , lower(fied_idcd) 
                     , '"'
        			 , space( 18 - length(fied_idcd)     )  
                     , case when (fied_idcd in ('CRT_DTTM','UPT_DTTM','CRTE_DTTM','UPDT_DTTM')) 
        	                              or (upper(substring(fied_idcd,length(fied_idcd)-6,length(fied_idcd))) in ('RGST_DT'))
        		 	                      or (upper(substring(fied_idcd,length(fied_idcd)-5,length(fied_idcd))) in ('CHG_DT'))
                            then  ', new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )'
                            else concat(case null_prms_dvcd when 'N' 
        			                                 then  case when ifnull(dflt_valu,'') = '' 
        			                                            then ', row.fixParameter("' 
        		                                                else ', row.getParameter("' 
        										           end
        	                                         else ', row.getParameter("' 
        				                end 
        				                , lower(fied_idcd)
        				                , '"'
        				                , space(20 - length(fied_idcd))
        				                , '))' 
        				                )
                       end
                     , '  /*  ' 
        	         , fied_name 
        	         , '  */'
        	         ) as dat
        from  cert_table 
        where tabl_name = lower(_tbl_nm) 
        and   lower(prjt_dvsn) = lower(ifnull(_db_knd,'MAIN'))
        and   ifnull(key_dvcd,'') <> 'K'
		and   fied_idcd not in (
				 'usr_memo'       , 'sys_memo'       , 'prnt_id'   , 'row_lvl'   , 'row_ord'   , 'row_sts'   , 'row_clos'     
	        	,'find_nm'        , 'upt_usr_nm'     , 'upt_ip'    , 'upt_dttm'  , 'upt_id'    , 'upt_ui'       
				,'crt_usr_nm'     , 'crt_ip'         , 'crt_dttm'  , 'crt_id'    , 'crt_ui'       
				,'user_memo'      , 'sysm_memo'      , 'prnt_idcd' , 'line_levl' , 'line_ordr' , 'line_stat' , 'line_clos'     
	        	,'find_name'      , 'updt_user_name' , 'updt_ipad' , 'updt_dttm' , 'updt_idcd' , 'updt_urif'       
				,'crte_user_name' , 'crte_ipad'      , 'crte_dttm' , 'crte_idcd' , 'crte_urif'       
			  )	
        union all
        select 80000 + 1 as seq,
                '					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */' as dat
        union all
        select 80000 + 2 as seq,
				'					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */' as dat
        union all
        select 80000 + 3 as seq,
				'					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */' as dat
        union all
        select 80000 + 4 as seq,
				'					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */' as dat
        union all
        select 80000 + 5 as seq,
				'					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */' as dat
        union all
        select 80000 + 6 as seq,
				'					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */' as dat
        union all
        select 80000 + 7 as seq,
				'					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */' as dat
        union all
        select 80000 + 8 as seq,
				'					.update("find_name"			, row.getParamText(""            ).trim()' as dat
        union all
        select 80000 + 9 as seq,
				'												+ row.getParamText(""            ).trim()' as dat
        union all
        select 80000 + 10 as seq,
				'												+ row.getParamText(""            ).trim()' as dat
        union all
        select 80000 + 11 as seq,
				'												+ row.getParamText(""            ).trim())' as dat
        union all
        select 80000 + 12 as seq,
				'					.update("updt_user_name"	, row.getParameter("updt_user_name"      ))  /*  수정사용자명  */ ' as dat
        union all
        select 80000 + 13 as seq,
				'					.update("updt_ipad"			, row.getParameter("updt_ipad"           ))  /*  수정IP  */'   as dat
        union all
        select 80000 + 19 as seq,
				'					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */' as dat
        union all
        select 80000 + 15 as seq,
				'					.update("updt_idcd"			, row.getParameter("updt_idcd"           ))  /*  수정ID  */ ' as dat
        union all
        select 80000 + 16 as seq,
				'					.update("updt_urif"			, row.getParameter("updt_urif"           ))  /*  수정UI  */ ' as dat
        union all
        select 80000 + 17 as seq,
				'					.insert("crte_user_name"	, row.getParameter("crte_user_name"      ))  /*  생성사용자명  */ ' as dat
        union all
        select 80000 + 18 as seq,
				'					.insert("crte_ipad"			, row.getParameter("crte_ipad"           ))  /*  생성IP  */ ' as dat
        union all
        select 80000 + 20 as seq,
				'					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */ ' as dat
        union all
        select 80000 + 21 as seq,
				'					.insert("crte_idcd"			, row.getParameter("crte_idcd"           ))  /*  생성ID  */' as dat
        union all
        select 80000 + 22 as seq,
				'					.insert("crte_urif"			, row.getParameter("crte_urif"           ))  /*  생성UI  */' as dat
	    ) a
		order by a.seq
;
end