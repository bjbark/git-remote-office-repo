drop procedure if exists  `auto_eco_ok`
;


CREATE DEFINER=`angel`@`%` PROCEDURE `auto_eco_ok`(
     _ecod_idcd  varchar(50),
     _cofm_yorn     int
    )
begin
declare _degr_cnt  int;
declare _prnt_item_idcd  varchar(50);
    
select prnt_item_idcd into _prnt_item_idcd
from   eco_mast
where  eco_idcd = _ecod_idcd
;    
if    _cofm_yorn = 1 then
    begin
        select ifnull(max(bomt_degr),0) + 1 into _degr_cnt
        from   bom_mast
        where  prnt_item_idcd = _prnt_item_idcd 
        ;
        insert into bom_mast(
                      prnt_item_idcd    , bomt_degr     , line_seqn     , ivst_wkct_idcd  , unit_idcd
                    , ndqt_nmrt         , ndqt_dnmn     , lwcs_yorn     , incm_loss_rate  , otcm_loss_rate
                    , strt_date         , endd_date     , stok_plac     , stok_unit_idcd  , aset_clss_dvcd
                    , remk_text         , item_idcd     , uper_seqn     , disp_seqn       , last_yorn    
                    , user_memo         , sysm_memo     , prnt_idcd     , line_levl       , line_ordr
                    , line_stat         , line_clos     , find_name
                    , updt_user_name    , updt_ipad     , updt_dttm     , updt_idcd       , updt_urif
                    , crte_user_name    , crte_ipad     , crte_dttm     , crte_idcd       , crte_urif
                )                        
              select  a.prnt_item_idcd  , _degr_cnt     , a.line_seqn   , a.ivst_wkct_idcd
                    , a.unit_idcd       , a.ndqt_nmrt   , a.ndqt_dnmn   , a.lwcs_yorn     , a.incm_loss_rate
                    , a.otcm_loss_rate  , b.strt_date   , b.endd_date   , a.stok_plac     , a.stok_unit_idcd
                    , a.aset_clss_dvcd  , a.remk_text   , a.item_idcd   , a.uper_seqn     , a.disp_seqn,"1" as last_yorn
                    , null              , 'copyed eco'  , a.prnt_idcd   , a.line_levl     , a.line_ordr
                    , '0'               , '0'           , a.find_name 
                    , a.updt_user_name  , a.updt_ipad   , a.updt_dttm   , a.updt_idcd     , a.updt_urif
                    , a.crte_user_name  , a.crte_ipad   , date_format(now(), '%Y%m%d%H%i%s')    , a.crte_idcd 
                    , a.crte_urif
        from    eco_dtil a 
                right outer join eco_mast b on a.ecod_idcd = b.ecod_idcd 
        where   a.ecod_idcd = _ecod_idcd
    ;
    update  bom_mast set last_yorn  = 0
    where   prnt_item_idcd = _prnt_item_idcd 
    and     bomt_degr <> _degr_cnt
    ;    
    update  eco_mast set cofm_yorn = '1' , cofm_degr = _degr_cnt
    where   a.ecod_idcd = _ecod_idcd
    ;
    end;
end if;

if _cofm_yorn = 0 then
    begin
        delete from bom_mast 
        where (prnt_item_idcd , bomt_degr) = (select a.prnt_item_idcd,b.cofm_degr as bomt_degr 
                                              from   eco_dtil a 
                                                     right outer join  eco_mast b on a.ecod_idcd = b.ecod_idcd 
                                              where a.ecod_idcd = _ecod_idcd)
        ;
    update eco_mast set cofm_yorn = '0' , cofm_degr = null
    where   a.ecod_idcd = _ecod_idcd
    ;
    update  bom_mast set last_yorn  = 0
    where   prnt_item_idcd = _prnt_item_idcd 
                              
    and     bomt_degr = (select max(bomt_degr)
                         from   bom_mast
                         where  prnt_item_idcd = _prnt_item_idcd
                        )
    ;
    end;
end if;
end