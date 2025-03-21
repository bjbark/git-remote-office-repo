with over_days as (
select w.pjod_idcd , w.wkct_idcd
     , sum(datediff(
           ifnull((select max(invc_date)
	               from   pjod_work_book r
	               where  w.pjod_idcd = r.pjod_idcd
		           and    w.id  = r.idcd
		          ),date_format(now(),'%Y%m%d'))
		, str_to_date(FROM_UNIXTIME(w.`start`/1000,'%Y%m%d'),'%Y%m%d') 		  
	    )) as over_days			  
from  pjod_work_schd w
left  outer join pjod_mast m on w.pjod_idcd = m.pjod_idcd
where w.work_schd_dvcd = '2000'
and   w.line_clos = '0'
and	  m.line_stat	< '2'
group by w.pjod_idcd , w.wkct_idcd
),
orders as (
select a.pjod_idcd , i.item_name      , c.cstm_name , m.modl_name
     , m.regi_date , m.ppsl_deli_date , m.deli_date 
from  pjod_work_schd a
left  outer join pjod_mast m on a.pjod_idcd = m.pjod_idcd
left  outer join cstm_mast c on a.pjod_idcd = c.cstm_idcd
left  outer join item_mast i on a.item_idcd = i.item_idcd
where a.work_schd_dvcd = '2000'
and   m.line_clos = '0'
and	  m.line_stat	< '2'
group by a.pjod_idcd , a.wkct_idcd
),






orders as (
select																					
      a.pjod_idcd        , a.amnd_degr        , a.pjod_code        , a.pjod_dvcd		
    , a.expt_dvcd        , a.cstm_idcd        , a.cstm_name        , a.prjt_idcd		
    , a.regi_date        , a.pjod_name        , a.item_idcd        , a.item_name		
    , a.item_spec        , a.modl_name        , a.esti_amnt        , a.cofm_yorn		
    , a.cofm_date        , a.cofm_amnt        , a.crny_dvcd        , a.frst_exam_date	
    , a.send_exam_date   , a.deli_date        , a.ppsl_deli_date   , a.strt_date		
    , a.endd_date        , a.drtr_idcd        , a.dlvy_date        , a.last_yorn		
    , a.apvl_date        , a.apvl_drtr_idcd   , a.cstm_item_code   , a.mold_size		
    , a.cavity           , a.mold_wigt        , a.used_mtrl_name   , a.prod_wigt		
    , a.used_tons        , a.item_imge        , a.item_imge2       , a.shkg_text		
    , a.mold_mtrl        , a.work_rsps_idcd   , a.dsig_rsps_idcd   , a.modl_rsps_idcd	
    , a.user_memo        , a.sysm_memo        , a.prnt_idcd								
    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	
    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		
    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , a.crte_idcd		
    , a.crte_urif        , i.item_code
from    pjod_mast a																		
left outer join item_mast i on a.item_idcd = i.item_idcd								
where   1=1																				
and		a.line_stat	< '2'
and     a.line_clos = 0
)




select *																				
from (																					
select																					
      a.pjod_idcd        , a.amnd_degr        , a.pjod_code        , a.pjod_dvcd		
    , a.expt_dvcd        , a.cstm_idcd        , a.cstm_name        , a.prjt_idcd		
    , a.regi_date        , a.pjod_name        , a.item_idcd        , a.item_name		
    , a.item_spec        , a.modl_name        , a.esti_amnt        , a.cofm_yorn		
    , a.cofm_date        , a.cofm_amnt        , a.crny_dvcd        , a.frst_exam_date	
    , a.send_exam_date   , a.deli_date        , a.ppsl_deli_date   , a.strt_date		
    , a.endd_date        , a.drtr_idcd        , a.dlvy_date        , a.last_yorn		
    , a.apvl_date        , a.apvl_drtr_idcd   , a.cstm_item_code   , a.mold_size		
    , a.cavity           , a.mold_wigt        , a.used_mtrl_name   , a.prod_wigt		
    , a.used_tons        , a.item_imge        , a.item_imge2       , a.shkg_text		
    , a.mold_mtrl        , a.work_rsps_idcd   , a.dsig_rsps_idcd   , a.modl_rsps_idcd	
    , a.user_memo        , a.sysm_memo        , a.prnt_idcd								
    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	
    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		
    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , a.crte_idcd		
    , a.crte_urif        , i.item_code
from    pjod_mast a																		
left outer join item_mast i on a.item_idcd = i.item_idcd								
where   1=1																				
and		a.line_stat	< :line_stat
and     a.line_clos = 0
order by a.pjod_idcd ) a																


sum(select date_diff(str_to_date(FROM_UNIXTIME(w.`start`/1000,'%Y%m%d'),'%Y%m%d') , 
           ifnull((select max(invc_date)
	               from   pjod_work_book r
	               where  a.pjod_idcd = r.pjod_idcd
                   and    a.work_schd_dvcd = '2000'
		           and    a.id  = r.id
		          ),date_format(now(),'%Y%m%d')) 
    from  pjod_work_schd w
where w.pjod_idcd = a.pjod_idcd
and   w.work_schd_dvcd = '2000'
)
			 
			 
			 
			 
			 
			 
계획일자 <= 금일일자



select 

as sttm

