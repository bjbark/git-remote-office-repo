신규 DB 필드명 변경에 따른 조정 작업
  sscd_code를 직접 Update할 수 있으나, 구 시스템과의 호환성 확보를 위해 복사 처리한다. 
  
select * from sscd_mast where sscd_code = 'row_sts'

select * from sscd_mast where sscd_idcd = '30057'

delete from sscd_mast where sscd_idcd = '30008'


  
  


insert into sscd_mast (
        sscd_idcd
       ,lang_dvcd
       ,site_idcd
       ,sscd_code
       ,sscd_name
       ,sscd_dvcd
       ,dflt_valu
       ,lkup_valu
       ,sbsc_valu
       ,user_memo
       ,sysm_memo
       ,prnt_idcd
       ,line_levl
       ,line_ordr
       ,line_stat
       ,line_clos
       ,find_name
       ,updt_user_name
       ,updt_ipad
       ,updt_dttm
       ,updt_idcd
       ,updt_urif
       ,crte_user_name
       ,crte_ipad
       ,crte_dttm
       ,crte_idcd
       ,crte_urif
)	   
select  ifnull((select max(sscd_idcd) from sscd_mast where substring(sscd_idcd,1,1) = '3'),0) + 1 as aa
       ,lang_dvcd
       ,site_idcd
       ,'line_stat'
       ,sscd_name
       ,sscd_dvcd
       ,dflt_valu
       ,lkup_valu
       ,sbsc_valu
       ,user_memo
       ,sysm_memo
       ,prnt_idcd
       ,line_levl
       ,line_ordr
       ,line_stat
       ,line_clos
       ,find_name
       ,updt_user_name
       ,updt_ipad
       ,updt_dttm
       ,updt_idcd
       ,updt_urif
       ,crte_user_name
       ,crte_ipad
       ,crte_dttm
       ,crte_idcd
       ,crte_urif
from  sscd_mast
where sscd_code = 'row_sts'