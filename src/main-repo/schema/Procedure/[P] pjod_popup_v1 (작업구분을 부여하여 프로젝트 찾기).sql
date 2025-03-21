drop procedure if exists `pjod_popup_v1`;

CREATE PROCEDURE `pjod_popup_v1`(
	 _work_ordr_dvcd varchar(4),
	 _find_name  varchar(100)
    )
begin


select * 
from (
    select    a.pjod_dvcd        , '1000' as work_ordr_dvcd  , 1 as ordr_degr
            , a.expt_dvcd        , a.cstm_idcd       , a.cstm_name			
    		, a.prjt_idcd        , a.regi_date        , a.pjod_name       , a.item_idcd			
    		, a.item_name        , a.item_spec        , a.modl_name       , a.esti_amnt			
    		, a.cofm_yorn        , a.cofm_date        , a.cofm_amnt       , a.crny_dvcd			
    		, a.frst_exam_date   , a.send_exam_date   , a.deli_date       , a.ppsl_deli_date	
    		, a.strt_date        , a.endd_date        , a.drtr_idcd       , a.dlvy_date			
    		, a.last_yorn        , a.apvl_date        , a.apvl_drtr_idcd  , a.cstm_item_code	
    		, a.mold_size        , a.cavity           , a.mold_wigt       , a.used_mtrl_name	
    		, a.prod_wigt        , a.used_tons        , a.pjod_idcd       , a.amnd_degr			
    		, a.pjod_code        , c.user_name as drtr_name               , a.item_imge			
    		, a.user_memo        , a.sysm_memo        , a.prnt_idcd       , a.drtr_idcd			
    		, a.line_stat        , a.line_clos        , a.find_name       , a.updt_user_name	
    		, b.buss_name        , b.buss_numb        , b.buss_kind			
    		, b.buss_type        , b.boss_name        , b.tele_numb       , b.faxi_numb			
    		, b.mail_addr        , b.hdph_numb        , c.user_name       , c.user_idcd			
    		, i.item_code        , a.item_imge2													
    from	pjod_mast a																			
    		left outer join item_mast i on a.item_idcd = i.item_idcd							
    		left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd							
    		left outer join user_mast c on a.drtr_idcd = c.user_idcd							
    where   1=1										
    and     a.line_clos <> 1
    and     _work_ordr_dvcd = '1000'
    and     a.find_name like concat('%',_find_name,'%')
    union all
    select    m.pjod_dvcd        , '1200' as work_ordr_dvcd  , a.line_seqn  as ordr_degr
            , m.expt_dvcd        , m.cstm_idcd       , m.cstm_name			
    		, m.prjt_idcd        , m.regi_date        , m.pjod_name       , m.item_idcd			
    		, m.item_name        , m.item_spec        , m.modl_name       , m.esti_amnt			
    		, m.cofm_yorn        , m.cofm_date        , m.cofm_amnt       , m.crny_dvcd			
    		, m.frst_exam_date   , m.send_exam_date   , m.deli_date       , m.ppsl_deli_date	
    		, m.strt_date        , m.endd_date        , m.drtr_idcd       , m.dlvy_date			
    		, m.last_yorn        , m.apvl_date        , m.apvl_drtr_idcd  , m.cstm_item_code	
    		, m.mold_size        , m.cavity           , m.mold_wigt       , m.used_mtrl_name	
    		, m.prod_wigt        , m.used_tons        , m.pjod_idcd       , m.amnd_degr			
    		, m.pjod_code        , c.user_name as drtr_name               , m.item_imge			
    		, a.chge_resn as user_memo , m.sysm_memo  , m.prnt_idcd       , m.drtr_idcd			
    		, m.line_stat        , m.line_clos        , m.find_name       , m.updt_user_name	
    		, b.buss_name        , b.buss_numb        , b.buss_kind			
    		, b.buss_type        , b.boss_name        , b.tele_numb       , b.faxi_numb			
    		, b.mail_addr        , b.hdph_numb        , c.user_name       , c.user_idcd			
    		, i.item_code        , m.item_imge2													
    from	pjod_dsig_chge a		
            left outer join pjod_mast m on a.pjod_idcd = m.pjod_idcd																	
    		left outer join item_mast i on m.item_idcd = i.item_idcd							
    		left outer join cstm_mast b on m.cstm_idcd = b.cstm_idcd							
    		left outer join user_mast c on m.drtr_idcd = c.user_idcd							
    where   1=1										
    and     _work_ordr_dvcd = '1200'
    and     a.find_name like concat('%',_find_name,'%')
    union all
    select    a.pjod_dvcd        , '2000' as work_ordr_dvcd  
            , ifnull((select max(ordr_degr) from pjod_bop r where r.pjod_idcd = a.pjod_idcd and r.work_ordr_dvcd = '2000'),0) + 1 as ordr_degr
            , a.expt_dvcd        , a.cstm_idcd       , a.cstm_name			
    		, a.prjt_idcd        , a.regi_date        , a.pjod_name       , a.item_idcd			
    		, a.item_name        , a.item_spec        , a.modl_name       , a.esti_amnt			
    		, a.cofm_yorn        , a.cofm_date        , a.cofm_amnt       , a.crny_dvcd			
    		, a.frst_exam_date   , a.send_exam_date   , a.deli_date       , a.ppsl_deli_date	
    		, a.strt_date        , a.endd_date        , a.drtr_idcd       , a.dlvy_date			
    		, a.last_yorn        , a.apvl_date        , a.apvl_drtr_idcd  , a.cstm_item_code	
    		, a.mold_size        , a.cavity           , a.mold_wigt       , a.used_mtrl_name	
    		, a.prod_wigt        , a.used_tons        , a.pjod_idcd       , a.amnd_degr			
    		, a.pjod_code        , c.user_name as drtr_name               , a.item_imge			
    		, a.user_memo        , a.sysm_memo        , a.prnt_idcd       , a.drtr_idcd			
    		, a.line_stat        , a.line_clos        , a.find_name       , a.updt_user_name	
    		, b.buss_name        , b.buss_numb        , b.buss_kind			
    		, b.buss_type        , b.boss_name        , b.tele_numb       , b.faxi_numb			
    		, b.mail_addr        , b.hdph_numb        , c.user_name       , c.user_idcd			
    		, i.item_code        , a.item_imge2													
    from	pjod_mast a																			
    		left outer join item_mast i on a.item_idcd = i.item_idcd							
    		left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd							
    		left outer join user_mast c on a.drtr_idcd = c.user_idcd							
    where   1=1										
    and     line_clos <> 1
    and     _work_ordr_dvcd = '2000'
    and     a.find_name like concat('%',_find_name,'%')
    and     a.pjod_idcd in (select pjod_idcd 
                            from   pjod_work_book
    						group  by pjod_idcd
    						)
    union all
    select    m.pjod_dvcd        , '4000' as work_ordr_dvcd  , a.line_seqn  as ordr_degr
            , m.expt_dvcd        , m.cstm_idcd       , m.cstm_name			
    		, m.prjt_idcd        , m.regi_date        , m.pjod_name       , m.item_idcd			
    		, m.item_name        , m.item_spec        , m.modl_name       , m.esti_amnt			
    		, m.cofm_yorn        , m.cofm_date        , m.cofm_amnt       , m.crny_dvcd			
    		, m.frst_exam_date   , m.send_exam_date   , m.deli_date       , m.ppsl_deli_date	
    		, m.strt_date        , m.endd_date        , m.drtr_idcd       , m.dlvy_date			
    		, m.last_yorn        , m.apvl_date        , m.apvl_drtr_idcd  , m.cstm_item_code	
    		, m.mold_size        , m.cavity           , m.mold_wigt       , m.used_mtrl_name	
    		, m.prod_wigt        , m.used_tons        , m.pjod_idcd       , m.amnd_degr			
    		, m.pjod_code        , c.user_name as drtr_name               , m.item_imge			
    		, m.user_memo        , m.sysm_memo        , m.prnt_idcd       , m.drtr_idcd			
    		, m.line_stat        , m.line_clos        , m.find_name       , m.updt_user_name	
    		, b.buss_name        , b.buss_numb        , b.buss_kind			
    		, b.buss_type        , b.boss_name        , b.tele_numb       , b.faxi_numb			
    		, b.mail_addr        , b.hdph_numb        , c.user_name       , c.user_idcd			
    		, i.item_code        , m.item_imge2													
    from	pjod_test_prod a		
            left outer join pjod_mast m on a.pjod_idcd = m.pjod_idcd																	
    		left outer join item_mast i on m.item_idcd = i.item_idcd							
    		left outer join cstm_mast b on m.cstm_idcd = b.cstm_idcd							
    		left outer join user_mast c on m.drtr_idcd = c.user_idcd							
    where   1=1										
    and     a.find_name like concat('%',_find_name,'%')
    and     _work_ordr_dvcd = '4000'
    union all
    select    a.pjod_dvcd        , '5000' as work_ordr_dvcd  , 1 as ordr_degr
            , a.expt_dvcd        , a.cstm_idcd       , a.cstm_name			
    		, a.prjt_idcd        , a.regi_date        , a.pjod_name       , a.item_idcd			
    		, a.item_name        , a.item_spec        , a.modl_name       , a.esti_amnt			
    		, a.cofm_yorn        , a.cofm_date        , a.cofm_amnt       , a.crny_dvcd			
    		, a.frst_exam_date   , a.send_exam_date   , a.deli_date       , a.ppsl_deli_date	
    		, a.strt_date        , a.endd_date        , a.drtr_idcd       , a.dlvy_date			
    		, a.last_yorn        , a.apvl_date        , a.apvl_drtr_idcd  , a.cstm_item_code	
    		, a.mold_size        , a.cavity           , a.mold_wigt       , a.used_mtrl_name	
    		, a.prod_wigt        , a.used_tons        , a.pjod_idcd       , a.amnd_degr			
    		, a.pjod_code        , c.user_name as drtr_name               , a.item_imge			
    		, a.user_memo        , a.sysm_memo        , a.prnt_idcd       , a.drtr_idcd			
    		, a.line_stat        , a.line_clos        , a.find_name       , a.updt_user_name	
    		, b.buss_name        , b.buss_numb        , b.buss_kind			
    		, b.buss_type        , b.boss_name        , b.tele_numb       , b.faxi_numb			
    		, b.mail_addr        , b.hdph_numb        , c.user_name       , c.user_idcd			
    		, i.item_code        , a.item_imge2													
    from	pjod_mast a																			
    		left outer join item_mast i on a.item_idcd = i.item_idcd							
    		left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd							
    		left outer join user_mast c on a.drtr_idcd = c.user_idcd							
    where   1=1										
    and     a.line_clos = 1
    and     _work_ordr_dvcd = '5000'
    and     a.find_name like concat('%',_find_name,'%')
) a
order by a.pjod_idcd desc	
;
end
																
