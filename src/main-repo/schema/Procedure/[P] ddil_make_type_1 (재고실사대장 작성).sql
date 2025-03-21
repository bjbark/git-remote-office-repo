/*
call ddil_make_type_1('N1000WINFO','20190812','20190812','WINFOWRHSMAST1001')

select * from ddil_mast


select * from ddil_item


*/


drop procedure if exists ddil_make_type_1 ; 
/*
 전체 창고별 재고를  조회한다. (결과는 창고별로 재고를 분리해서 조회한다.)
*/

CREATE procedure ddil_make_type_1 (
     _stor  varchar(50),
     _fr_dt varchar(50),
     _to_dt varchar(50),
     _wrhs_idcd varchar(50)
    )  
begin    

DECLARE _last_yyyymm     VARCHAR(50);
DECLARE _new_invc_numb   VARCHAR(50);

select max(clos_yymm) into _last_yyyymm
from   isos_sum
where  clos_yymm < substring(_fr_dt,1,6)
and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
;        

call fn_seq_gen_v3(_stor , 'ddil_mast','',_new_invc_numb);

    insert into ddil_mast (
                  invc_numb
                , invc_date
                , bzpl_idcd
                , wrhs_idcd
                , drtr_idcd
                , ddil_regi_yorn
                , ddil_regi_date
                , ddil_adpt_yorn
                , ddil_adpt_date
                , user_memo      , sysm_memo
                , prnt_idcd      , line_levl   , line_ordr     , line_stat     , line_clos
                , find_name
                , updt_user_name , updt_ipad   , updt_dttm     , updt_idcd     , updt_urif
                , crte_user_name , crte_ipad   , crte_dttm     , crte_idcd     , crte_urif
       ) values ( _new_invc_numb
                , _to_dt
                , (select bzpl_idcd from wrhs_mast where wrhs_idcd = _wrhs_idcd)
                , _wrhs_idcd
                , null
                , 'N'
                , null
                , 'N'
                , null
                , null  , 'By 재고실사 대장 작성 프로시져 '
                , null                , 0                , 0                , '0'                , '0'
                , concat( _wrhs_idcd , (select wrhs_name from wrhs_mast where wrhs_idcd = _wrhs_idcd))
                , null        , null         , date_format(now(), '%Y%m%d%H%i%s') , null  , null
                , null        , null         , date_format(now(), '%Y%m%d%H%i%s') , null  , null
          )
    ;
    insert into ddil_item (
                  invc_numb
                , line_seqn
                , acct_bacd
                , item_idcd
                , unit_idcd
                , stnd_unit
                , book_good_qntt
                , book_poor_qntt
                , book_issb_qntt
                , book_qntt_ttsm
                , ddil_good_qntt
                , ddil_poor_qntt
                , ddil_issb_qntt
                , ddil_qntt_ttsm
                , diff_good_qntt
                , diff_poor_qntt
                , uper_seqn      , disp_seqn
                , user_memo      , sysm_memo
                , prnt_idcd      , line_levl   , line_ordr     , line_stat     , line_clos
                , find_name
                , updt_user_name , updt_ipad   , updt_dttm     , updt_idcd     , updt_urif
                , crte_user_name , crte_ipad   , crte_dttm     , crte_idcd     , crte_urif
            )
with base_stok   as (                                                                                        
                    select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd , sum(ifnull(a.base_qntt,0)) as base_qntt
                    from (
                           select bzpl_idcd , wrhs_idcd , item_idcd 
                                , base_qntt + istt_qntt - ostt_qntt as base_qntt
                           from   isos_sum 
                           where  clos_yymm = _last_yyyymm
                           and    base_qntt + istt_qntt - ostt_qntt <> 0
                           and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
                           union all 
                           select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
                                  , case invc_dvcd when '1100' then a.qntt
                                                   when '1200' then a.qntt
                                                   when '1300' then a.qntt * -1
                                                   when '1400' then a.qntt
                                                   when '2100' then a.qntt * -1
                                                   when '2200' then a.qntt * -1
                                                   when '2300' then a.qntt * -1
                                                   when '2400' then a.qntt * -1
                                                   else a.qntt  end as base_qntt
                           from   isos_book a
                           where  invc_date >= concat(_last_yyyymm , '31')
                           and    invc_date < _fr_dt
                           and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
                    ) a
                    group by a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
                    ),
     istt_1100   as (
                    select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
                         , sum(a.qntt) as istt_qntt
                    from   isos_book a
                    where  invc_dvcd in ('1100')
                    and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
                    group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     istt_1200   as (
                    select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
                         , sum(a.qntt) as istt_qntt
                    from   isos_book a
                    where  invc_dvcd in ('1200')
                    and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
                    group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     istt_1300   as (
                    select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
                         , sum(a.qntt) as istt_qntt
                    from   isos_book a
                    where  invc_dvcd in ('1300')
                    and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
                    group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     move_1400   as (
                    select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
                         , sum(a.qntt) as move_qntt
                    from   isos_book a
                    where  invc_dvcd in ('1400')
                    and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
                    group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     move_2300   as (
                    select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
                         , sum(a.qntt) as move_qntt
                    from   isos_book a
                    where  invc_dvcd in ('2300')
                    and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
                    group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     ostt_2100   as (
                    select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
                         , sum(a.qntt) as ostt_qntt
                    from   isos_book a
                    where  invc_dvcd in ('2100')
                    and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
                    group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     ostt_2200   as (
                    select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
                         , sum(a.qntt) as ostt_qntt
                    from   isos_book a
                    where  invc_dvcd in ('2200')
                    and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
                    group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     ostt_2400   as (
                    select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
                         , sum(a.qntt) as ostt_qntt
                    from   isos_book a
                    where  invc_dvcd in ('2400')
                    and    invc_date between _fr_dt and _to_dt
                    and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
                    group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     item       as (
                    select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd, a.acct_bacd
                    from (
                           select (select bzpl_idcd from wrhs_mast where wrhs_idcd = a.istt_wrhs_idcd) as bzpl_idcd
                                , a.istt_wrhs_idcd as wrhs_idcd 
                                , a.item_idcd, a.acct_bacd
                           from   item_mast a
                           where  (istt_wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
                           union all
                           select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd, i.acct_bacd
                           from   isos_book a
                                  left outer join item_mast i on a.item_idcd = i.item_idcd
                           where  substring(a.invc_date,1,6) = _last_yyyymm
                           and    (wrhs_idcd = _wrhs_idcd or _wrhs_idcd = '@')
                           group  by a.bzpl_idcd , a.wrhs_idcd , a.item_idcd , i.acct_bacd
                           union all
                           select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd, i.acct_bacd
                           from   isos_sum a
                                  left outer join item_mast i on a.item_idcd = i.item_idcd
                           where  clos_yymm = _last_yyyymm
                           group  by a.bzpl_idcd , a.wrhs_idcd , a.item_idcd , i.acct_bacd
                    ) a 
                    group  by a.bzpl_idcd , a.wrhs_idcd , a.item_idcd , a.acct_bacd
                    )
          select  _new_invc_numb
                , row_number() over() 
                , item_mast.acct_bacd
                , item.item_idcd
                , item_mast.unit_idcd
                , item_mast.unit_idcd
                , ifnull(base_stok.base_qntt,0) 
                  + (ifnull(istt_1100.istt_qntt,0) + ifnull(istt_1200.istt_qntt,0) + ifnull(istt_1300.istt_qntt,0) + ifnull(move_1400.move_qntt,0))
                  - (ifnull(ostt_2100.ostt_qntt,0) + ifnull(ostt_2200.ostt_qntt,0) + ifnull(ostt_2400.ostt_qntt,0) + ifnull(move_2300.move_qntt,0)) as stok_qntt
                , 0
                , 0
                , ifnull(base_stok.base_qntt,0) 
                  + (ifnull(istt_1100.istt_qntt,0) + ifnull(istt_1200.istt_qntt,0) + ifnull(istt_1300.istt_qntt,0) + ifnull(move_1400.move_qntt,0))
                  - (ifnull(ostt_2100.ostt_qntt,0) + ifnull(ostt_2200.ostt_qntt,0) + ifnull(ostt_2400.ostt_qntt,0) + ifnull(move_2300.move_qntt,0)) as book_qntt_ttsm
                , ifnull(base_stok.base_qntt,0) 
                  + (ifnull(istt_1100.istt_qntt,0) + ifnull(istt_1200.istt_qntt,0) + ifnull(istt_1300.istt_qntt,0) + ifnull(move_1400.move_qntt,0))
                  - (ifnull(ostt_2100.ostt_qntt,0) + ifnull(ostt_2200.ostt_qntt,0) + ifnull(ostt_2400.ostt_qntt,0) + ifnull(move_2300.move_qntt,0)) as ddil_good_qntt
                , 0
                , 0
                , ifnull(base_stok.base_qntt,0) 
                  + (ifnull(istt_1100.istt_qntt,0) + ifnull(istt_1200.istt_qntt,0) + ifnull(istt_1300.istt_qntt,0) + ifnull(move_1400.move_qntt,0))
                  - (ifnull(ostt_2100.ostt_qntt,0) + ifnull(ostt_2200.ostt_qntt,0) + ifnull(ostt_2400.ostt_qntt,0) + ifnull(move_2300.move_qntt,0)) as ddil_qntt_ttsm
                , 0
                , 0          
                , row_number() over() 
                , row_number() over() 
                , null        , 'By 재고실사 대장 작성 프로시져 '
                , _new_invc_numb , 1         , 0       , '0'   , '0'
                , concat( _new_invc_numb , item.item_idcd , item_mast.item_name , item_mast.item_spec)
                , null           , null      , date_format(now(), '%Y%m%d%H%i%s')  , null   , null
                , null           , null      , date_format(now(), '%Y%m%d%H%i%s')  , null   , null
          from    item
                  left outer join base_stok on item.bzpl_idcd = base_stok.bzpl_idcd and item.wrhs_idcd = base_stok.wrhs_idcd and item.item_idcd = base_stok.item_idcd
                  left outer join istt_1100 on item.bzpl_idcd = istt_1100.bzpl_idcd and item.wrhs_idcd = istt_1100.wrhs_idcd and item.item_idcd = istt_1100.item_idcd
                  left outer join istt_1200 on item.bzpl_idcd = istt_1200.bzpl_idcd and item.wrhs_idcd = istt_1200.wrhs_idcd and item.item_idcd = istt_1200.item_idcd
                  left outer join istt_1300 on item.bzpl_idcd = istt_1300.bzpl_idcd and item.wrhs_idcd = istt_1300.wrhs_idcd and item.item_idcd = istt_1300.item_idcd
                  left outer join move_1400 on item.bzpl_idcd = move_1400.bzpl_idcd and item.wrhs_idcd = move_1400.wrhs_idcd and item.item_idcd = move_1400.item_idcd
                  left outer join move_2300 on item.bzpl_idcd = move_2300.bzpl_idcd and item.wrhs_idcd = move_2300.wrhs_idcd and item.item_idcd = move_2300.item_idcd
                  left outer join ostt_2100 on item.bzpl_idcd = ostt_2100.bzpl_idcd and item.wrhs_idcd = ostt_2100.wrhs_idcd and item.item_idcd = ostt_2100.item_idcd
                  left outer join ostt_2200 on item.bzpl_idcd = ostt_2200.bzpl_idcd and item.wrhs_idcd = ostt_2200.wrhs_idcd and item.item_idcd = ostt_2200.item_idcd
                  left outer join ostt_2400 on item.bzpl_idcd = ostt_2400.bzpl_idcd and item.wrhs_idcd = ostt_2400.wrhs_idcd and item.item_idcd = ostt_2400.item_idcd
                  left outer join item_mast on item.item_idcd = item_mast.item_idcd
    ;    
END
