/*

call option_init('N1000FILKO', 'filling_mes')


select * from filling_mes.optn_mast;


*/


drop procedure if exists option_init ; 


CREATE procedure `option_init`(
       _hqof_idcd varchar(50),
       _db_name   varchar(50)
    )  
begin	
declare _sql1 varchar(2000);
declare _sql2 varchar(2000);
set _sql1 = concat ('delete from ',_db_name,'.optn_mast;')
;
set _sql2 = concat ('insert into ',_db_name,'.optn_mast (',
                         '    prjt_idcd       ',
                         '  , optn_idcd       ',
                         '  , hqof_idcd       ',
                         '  , optn_name       ',
                         '  , clss_1fst       ',
                         '  , clss_2snd       ',
                         '  , clss_3trd       ',
                         '  , optn_desc       ',
                         '  , optn_logc_valu  ',
                         '  , optn_yorn_valu  ',
                         '  , optn_nmbr_valu  ',
                         '  , optn_char_valu  ',
                         '  , optn_scpe_from  ',
                         '  , optn_scpe_util  ',
                         '  , optn_etcc       ',
                         '  , code_idcd       ',
                         '  , user_memo       ',
                         '  , sysm_memo       ',
                         '  , prnt_idcd       ',
                         '  , line_levl       ',
                         '  , line_ordr       ',
                         '  , line_stat       ',
                         '  , line_clos       ',
                         '  , find_name       ',
                         '  , updt_user_name  ',
                         '  , updt_ipad       ',
                         '  , updt_dttm       ',
                         '  , updt_idcd       ',
                         '  , updt_urif       ',
                         '  , crte_user_name  ',
                         '  , crte_ipad       ',
                         '  , crte_dttm       ',
                         '  , crte_idcd       ',
                         '  , crte_urif       ',
                         ') ',
                         'select              ',
                         '    prjt_idcd       ',
                         '  , optn_idcd       ',
                         '  , ', "'",_hqof_idcd,"'",'  as hqof_idcd ',
                         '  , optn_name       ',
                         '  , clss_1fst       ',
                         '  , clss_2snd       ',
                         '  , clss_3trd       ',
                         '  , optn_desc       ',
                         '  , optn_logc_valu  ',
                         '  , optn_yorn_valu  ',
                         '  , optn_nmbr_valu  ',
                         '  , optn_char_valu  ',
                         '  , optn_scpe_from  ',
                         '  , optn_scpe_util  ',
                         '  , optn_etcc       ',
                         '  , code_idcd       ',
                         '  , user_memo       ',
                         '  , sysm_memo       ',
                         '  , prnt_idcd       ',
                         '  , line_levl       ',
                         '  , line_ordr       ',
                         '  , line_stat       ',
                         '  , line_clos       ',
                         '  , find_name       ',
                         '  , updt_user_name  ',
                         '  , updt_ipad       ',
                         '  , updt_dttm       ',
                         '  , updt_idcd       ',
                         '  , updt_urif       ',
                         '  , crte_user_name  ',
                         '  , crte_ipad       ',
                         '  , crte_dttm       ',
                         '  , crte_idcd       ',
                         '  , crte_urif       ',
                         'from control_db.optn_mast  '
                         '; ');
						 
	    SET @STATEMENT = _SQL1;
        PREPARE DYNQUERY FROM @STATEMENT;
        EXECUTE DYNQUERY;
	    SET @STATEMENT = _SQL2;
        PREPARE DYNQUERY FROM @STATEMENT;
        EXECUTE DYNQUERY;
   	    DEALLOCATE PREPARE DYNQUERY;

end
