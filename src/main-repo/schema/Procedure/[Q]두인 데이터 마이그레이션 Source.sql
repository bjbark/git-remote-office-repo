delete from work_book;
insert into work_book ( 
             invc_numb
           , invc_date
           , bzpl_idcd
           , prod_dept_idcd
           , wkfw_idcd
           , wkct_idcd
           , item_idcd
           , pdsd_numb
           , wkod_numb
           , wkod_seqn
           , indn_qntt
           , prod_qntt
           , good_qntt
           , poor_qntt
           , work_sttm
           , work_edtm
           , need_time
           , work_mnhr
           , wker_idcd
           , work_pcnt
           , lott_numb
           , rewd_objt_qntt
           , work_cond_1fst
           , work_cond_2snd
           , work_cond_3trd
           , work_cond_5fit
           , work_cond_6six
           , work_cond_7svn
           , stun_prod_qntt
           , stun_good_qntt
           , stun_poor_qntt
           , work_dvcd
           , wkct_insp_yorn
           , last_wkct_yorn
           , work_para
           , mtrl_ivst_yorn
           , user_memo
           , sysm_memo
           , line_stat
           , find_name
   )
   select 
           concat( replace(replace(a.date,'-',''),' 00:00:00.000',''), lpad(rNum,3,'0')) as invc_numb
           , replace(replace(a.date,'-',''),' 00:00:00.000','')  as invc_date
           , case when  a.cvic_idcd < '0031' then 'DOOINBZPL001'  else 'DOOINBZPL001'  end as bzpl_idcd
           , case when  a.cvic_idcd < '0031' then 'DOOINDEPT2200' else 'DOOINDEPT2220' end as prod_dept_idcd
           , null as wkfw_idcd
           , case when  a.cvic_idcd < '0031' then 'DOOINWKCT101'  else 'DOOINWKCT201'  end as wkct_idcd
           , a.item_idcd as item_idcd
           , concat( replace(replace(a.date,'-',''),' 00:00:00.000',''), lpad(rNum,3,'0')) as pdsd_numb
           , concat( replace(replace(a.date,'-',''),' 00:00:00.000',''), lpad(rNum,3,'0')) as wkod_numb
           , 1 as wkod_seqn
           , TRUNCATE(a.qntt_1 , 0) as indn_qntt
           , a.qntt_2               as prod_qntt
           , a.qntt_2               as good_qntt
           , 0                      as poor_qntt
           , case when a.work_dvcd = '주간' then '083000' else '200000' end as work_sttm
           , case when a.work_dvcd = '주간' then '200000' else '080000' end as work_edtm
           , 750                    as need_time
           , null      as work_mnhr
           , null      as wker_idcd
           , ifnull(CHAR_LENGTH(a.worker),0) - ifnull(char_length(replace(a.worker,'/','')),0) + 1 as work_pcnt
           , null      as lott_numb
           , 0         as rewd_objt_qntt
           , null      as work_cond_1fst
           , null      as work_cond_2snd
           , null      as work_cond_3trd
           , null      as work_cond_5fit
           , null      as work_cond_6six
           , null      as work_cond_7svn
           , TRUNCATE(a.qntt_1 , 0) as stun_prod_qntt
           , a.qntt_2  as stun_good_qntt
           , 0         as stun_poor_qntt
           , case when a.work_dvcd = '주간' then '1' else '2' end as work_dvcd
           , null      as wkct_insp_yorn
           , null      as last_wkct_yorn
           , case when a.work_dvcd = '주간' then '1' else '2' end as work_para
           , null      as mtrl_ivst_yorn
           , rem       as user_memo
           , a.worker  as sysm_memo
           , '1'       as line_stat
           , null      as find_name
	from (	   
   SELECT M.*
   FROM (
    SELECT (CASE @val WHEN t1.date THEN @rownum:=@rownum+1 
                      ELSE @rownum:=1 END) as rNum,
           (@val:=t1.date) temp,
           t1.*
   FROM plist_master t1,
        (SELECT @val:='', @rownum:=0) SUB
   WHERE SUBSTRING(t1.date,1,4) > '2012'
   and   SUBSTRING(t1.date,1,10)  < '2019-11-01'   
   ORDER BY t1.date   , no               
  ) M
  ) a
  ;   
  
  
  
  
  
insert into work_book_cvic (  
             invc_numb
           , line_seqn
           , cvic_idcd
           , wker_idcd
           , prep_time
           , work_time
           , mold_yorn
           , mold_idcd
           , mold_htct
           , cavity
           , updt_shot
           , goal_time
           , qult_halt_time
           , cvic_halt_time
           , mtrl_halt_time
           , etcc_halt_time
           , remk_text
           , pcmt
           , cvic_stat_dvcd
           , uper_seqn
           , disp_seqn
           , user_memo
           , sysm_memo
           , line_stat
           , find_name
    )		   
select 
             concat( replace(replace(a.date,'-',''),' 00:00:00.000',''), lpad(rNum,3,'0'))  as invc_numb
           , 1  as line_seqn
           , a.cvic_idcd  as cvic_idcd
           , a.worker  as wker_idcd
           , null  as prep_time
           , 750  as work_time
           , '1'  as mold_yorn
           , mold_idcd  as mold_idcd
           , null  as mold_htct
           , a.cavity  as cavity
           , 0  as updt_shot
           , null  as goal_time
           , null  as qult_halt_time
           , null  as cvic_halt_time
           , null  as mtrl_halt_time
           , null  as etcc_halt_time
           , rem   as remk_text
           , null  as pcmt
           , '1'   as cvic_stat_dvcd
           , null  as uper_seqn
           , null  as disp_seqn
           , null  as user_memo
           , null  as sysm_memo
           , null  as line_stat
           , '1'   as find_name
	from (	   
   SELECT M.*
   FROM (
    SELECT (CASE @val WHEN t1.date THEN @rownum:=@rownum+1 
                      ELSE @rownum:=1 END) as rNum,
           (@val:=t1.date) temp,
           t1.*
   FROM plist_master t1,
        (SELECT @val:='', @rownum:=0) SUB
   WHERE SUBSTRING(t1.date,1,4) > '2012'
   and   SUBSTRING(t1.date,1,10)  < '2019-11-01'   
   ORDER BY t1.date   , no               
  ) M
  ) a
  ;   
  
--  ****************************************************************************************  
--  금형 정보 Conv.  
--  ****************************************************************************************   
  
delete from mold_mast;
insert into mold_mast (  
             mold_idcd
           , mold_code
           , mold_name
           , mold_spec
           , cstm_idcd
           , used_tons
           , item_idcd
           , mngt_dept_idcd
           , stor_plac
           , make_natn_idcd
           , make_cmpy_name
           , make_date
           , puch_cstm_idcd
           , puch_cstm_name
           , vend_tele_numb
           , afsv_tele_numb
           , mchn_numb
           , puch_date
           , cvic_usge
           , puch_amnt
           , cavity
           , mold_edtn_numb
           , dsig_shot
           , init_shot
           , work_shot
           , totl_shot
           , updt_expc_shot
           , updt_expc_date
           , mold_stat_dvcd
           , egrv_numb
           , rcpt_cmpy_name
           , mtrl_dvcd
           , mtrl_dvcd_2snd
           , grad_dvcd
           , grad_dvcd_2snd
           , norm_yorn
           , ejac_mchn
           , runr_wigt
           , prod_wigt
           , cycl_time
           , dsse_date
           , dsse_resn
           , owne_riht
           , imge_1fst
           , imge_2snd
           , insp_type_idcd
           , remk_text
           , user_memo
           , sysm_memo
           , line_stat
           , find_name
           , updt_user_name
           , updt_dttm
           , crte_user_name
           , crte_dttm
          )
select       concat('DOOINMOLD',mold_idcd)  as mold_idcd
           , mold_idcd         as mold_code
           , mold_name         as mold_name
           , mold_spec         as mold_spec
           , 'DOOINCSTMYNW01'  as cstm_idcd
           , replace(ejac_mchn,'T','')      as used_tons
           , null              as item_idcd
           , 'DOOINDEPT5000'   as mngt_dept_idcd
           , zone_idcd         as stor_plac
           , 'kr'              as make_natn_idcd
           , make_cmpy_name    as make_cmpy_name
           , substring(replace(replace(make_date,'-',''),' 00:00:00.000',''),1,8)  as make_date
           , null              as puch_cstm_idcd
           , null              as puch_cstm_name
           , null              as vend_tele_numb
           , null              as afsv_tele_numb
           , null              as mchn_numb
           , null              as puch_date
           , null              as cvic_usge
           , null              as puch_amnt
           , replace(cavity,'1*','')  as cavity
           , null              as mold_edtn_numb
           , null              as dsig_shot
           , null              as init_shot
           , null              as work_shot
           , totl_shot         as totl_shot
           , null              as updt_expc_shot
           , null              as updt_expc_date
           , case norm_yorn when '양산' then '1000' else '9000' end  as mold_stat_dvcd
           , egrv_numb         as egrv_numb
           , rcpt_cmpy_name    as rcpt_cmpy_name
           , mtrl_dvcd         as mtrl_dvcd
           , mtrl_dvcd2        as mtrl_dvcd_2snd
           , grad_dvcd         as grad_dvcd
           , null              as grad_dvcd_2snd
           , case when norm_yorn = '양산' then '1' else 0 end  as norm_yorn
           , null              as ejac_mchn
           , runr_wigt         as runr_wigt
           , prod_wigt         as prod_wigt
           , cycl_time         as cycl_time
           , null              as dsse_date
           , null              as dsse_resn
           , owmer             as owne_riht
           , null              as imge_1fst
           , null              as imge_2snd
           , null              as insp_type_idcd
           , remk_text         as remk_text
           , user_memo         as user_memo
           , null              as sysm_memo
           , case when norm_yorn = '폐기' then '2' else '1'  end as line_stat
           , concat('DOOINMOLD',mold_idcd , ' ' , mold_idcd , ' ', mold_name , ' ' , mold_spec)  as find_name
           , updt_user_name  as updt_user_name
           , concat(replace(substring(updt_dttm,1,10),'-',''),'000000')  as updt_dttm
           , crte_user_name  as crte_user_name
           , concat(replace(substring(crte_dttm,1,10),'-',''),'000000')   as crte_dttm
from conv_mold_list
where mold_idcd <> '금형번호'
and   mold_idcd is not null
;

