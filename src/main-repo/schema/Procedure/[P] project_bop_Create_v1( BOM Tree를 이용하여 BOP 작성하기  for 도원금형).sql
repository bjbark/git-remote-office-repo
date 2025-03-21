/*

call project_bop_create('DW-1938','standard4')

BOM에 등록된 자료는 총 4레벨로 구성되어 있다. 
이 구조를 강제로 3레벨로 낯추어 BOP를 작성한다. 

<<2020.1.1 이만재 부장과 카톡 협의 내용>>
부장님 새해 복 많이 받으세요... 뭐 좀 물어보겠습니다... 
현재 BOP가 4레벨로 구분되어 있습니다.. 
그런데 상무님께서는 너무 복잡하다고 하시고.. 
대표님이 보시는 간트차트도 3레벨로만 보신다고 하니 
등록된 4레벨 자료를 3레벨로 재 취합하여 보여드리는 수 밖엔 다른 방법이 없습니다... 
현재 그 방법으로 개발하고 있습니다만, 
개발하다 보니 여러 과정을 거쳐 나오는 관계로 검증도 어렵고, 
정확히 일정을 계산하는데 애로사항이 있습니다.. 
하여  BOP를 그냥 3단계로 구분하는 방법은 어떨런지요?

네.... 그렇게 하세요

*/


drop procedure if exists project_bop_create_v1 ; 


CREATE procedure `project_bop_create_v1`(
       _pjod_idcd varchar(50),
	   _std_idcd  varchar(50),
	   _work_ordr_dvcd varchar(4),
	   _ordr_degr int
    )  
begin	

delete from pjod_bop 
where pjod_idcd = _pjod_idcd
;

insert into pjod_bop (
           pjod_idcd      , work_ordr_dvcd , ordr_degr
		 , line_seqn      , work_item_idcd , item_idcd      , item_name      , item_spec
         , item_mtrl      , wkct_idcd      , plan_sttm      , plan_edtm      , otod_yorn
         , wker_idcd      , work_pcnt      , cstm_idcd      , indn_qntt      , remk_text
         , work_cont      , imge_1fst      , imge_2snd      , lwcs_yorn      , used_yorn                     
	     , bomt_seqn      , uper_seqn      , disp_seqn      , user_memo      , sysm_memo
         , prnt_idcd      , line_levl      , line_ordr      , line_stat      , line_clos      , find_name
         , updt_user_name , updt_ipad      , updt_dttm      , updt_idcd      , updt_urif      , crte_user_name
         , crte_ipad      , crte_dttm      , crte_idcd      , crte_urif
		 )
with recursive cte as (																								
    select pjod_idcd      , line_seqn      , work_item_idcd , item_idcd      , item_name      , item_spec      , item_mtrl
         , ivst_wkct_idcd , unit_idcd      , supl_dvcd      , cstm_idcd      , ndqt_nmrt      , ndqt_dnmn
         , need_qntt      , used_schd_date , lwcs_yorn      , incm_loss_rate , otcm_loss_rate , stok_plac
         , stok_unit_idcd , remk_text      , offr_date      , offr_numb      , offr_qntt      , last_yorn
         , imge_1fst      , imge_2snd
	     , uper_seqn      , disp_seqn      , user_memo      , sysm_memo
         , ifnull(_pjod_idcd,'standard')    as prnt_idcd    , 0  as prnt_seqn  
		 , line_levl      , line_ordr      , line_stat      , line_clos      , find_name
         , updt_user_name , updt_ipad      , updt_dttm      , updt_idcd      , updt_urif      , crte_user_name
         , crte_ipad      , crte_dttm      , crte_idcd      , crte_urif
    from   pjod_bom
	where  pjod_idcd = _std_idcd
	and    item_idcd not in ('T04')
	and    line_levl = 1
    union all 
    select a.pjod_idcd      , a.line_seqn      , a.work_item_idcd , a.item_idcd      , a.item_name      , a.item_spec      , a.item_mtrl
         , a.ivst_wkct_idcd , a.unit_idcd      , a.supl_dvcd      , a.cstm_idcd      , a.ndqt_nmrt      , a.ndqt_dnmn
         , a.need_qntt      , a.used_schd_date , a.lwcs_yorn      , a.incm_loss_rate , a.otcm_loss_rate , a.stok_plac
         , a.stok_unit_idcd , a.remk_text      , a.offr_date      , a.offr_numb      , a.offr_qntt      , a.last_yorn
         , a.imge_1fst      , a.imge_2snd
	     , a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo
         , a.prnt_idcd      , b.line_seqn  as  prnt_seqn          , b.line_levl + 1 as line_levl						
		 , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name
         , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif      , a.crte_user_name
         , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif
    from   pjod_bom a																								
    inner join cte b on a.prnt_idcd = b.work_item_idcd and a.pjod_idcd = b.pjod_idcd
	where  a.item_idcd not in ('T04')
)
  select
           _pjod_idcd      as pjod_idcd  
         , _work_ordr_dvcd as work_ordr_dvcd
         , _ordr_degr      as ordr_degr		 
		 , line_seqn       as line_seqn      
		 , work_item_idcd  as work_item_idcd      
		 , item_idcd       as item_idcd      
		 , item_name       as item_name      
		 , item_spec       as item_spec
         , item_mtrl       as item_mtrl      
		 , ivst_wkct_idcd  as wkct_idcd
		 , null            as plan_sttm      
		 , null            as plan_edtm      
		 , '0'             as otod_yorn
         , null            as wker_idcd      
		 , 1               as work_pcnt      
		 , null            as cstm_idcd      
		 , 1               as indn_qntt      
		 , null            as remk_text
		 , remk_text       as work_cont
         , null            as imge_1fst      
		 , null            as imge_2snd      
		 , null            as lwcs_yorn                       
		 , 1               as used_yorn
		 , line_seqn       as bomt_seqn
	     , line_seqn - 1   as uper_seqn      
		 , line_seqn + 1   as disp_seqn      
		 , null            as user_memo      
		 , null            as sysm_memo
         , prnt_idcd       as prnt_idcd      
		 , line_levl       as line_levl      
		 , line_ordr       as line_ordr      
		 , line_stat       as line_stat      
		 , line_clos       as line_clos      
		 , find_name       as find_name
         , null            as updt_user_name 
		 , null            as updt_ipad      
		 , null            as updt_dttm      
		 , null            as updt_idcd      
		 , null            as updt_urif      
		 , null            as crte_user_name
         , null            as crte_ipad      
		 , date_format(now(), '%Y%m%d%H%I%S')   as crte_dttm
		 , null            as crte_idcd      
		 , null            as crte_urif
    from   cte a																									
	where  work_item_idcd not in ('002', '999') /* 소재구매 및 주문제작  */
	and    line_levl <= 2
	union all
    select
           _pjod_idcd      as pjod_idcd      
         , _work_ordr_dvcd as work_ordr_dvcd
         , _ordr_degr      as ordr_degr		 
		 , line_seqn       as line_seqn      
		 , work_item_idcd  as work_item_idcd      
         , (select max(item_idcd) 
		    from   pjod_bom r
			where  r.pjod_idcd = _std_idcd
			and    r.item_idcd = a.prnt_idcd
			and    r.line_levl = 3
			) as item_idcd
         , (select max(item_name) 
		    from   pjod_bom r
			where  r.pjod_idcd = _std_idcd
			and    r.item_idcd = a.prnt_idcd
			and    r.line_levl = 3
			) as item_name
		 , item_spec       as item_spec
         , item_mtrl       as item_mtrl      
		 , ivst_wkct_idcd  as wkct_idcd
		 , null            as plan_sttm      
		 , null            as plan_edtm      
		 , '0'             as otod_yorn
         , null            as wker_idcd      
		 , 1               as work_pcnt      
		 , null            as cstm_idcd      
		 , 1               as indn_qntt      
		 , null            as remk_text
		 , remk_text       as work_cont
         , null            as imge_1fst      
		 , null            as imge_2snd      
		 , null            as lwcs_yorn                       
		 , 1               as used_yorn
		 , line_seqn       as bomt_seqn
	     , line_seqn - 1   as uper_seqn      
		 , line_seqn + 1   as disp_seqn      
		 , null            as user_memo      
		 , null            as sysm_memo
         , (select max(prnt_idcd) 
		    from   pjod_bom r
			where  r.pjod_idcd = _std_idcd
			and    r.item_idcd = a.prnt_idcd
			and    r.line_levl = 3
			) as prnt_idcd
		 , 3               as line_levl      
		 , line_ordr       as line_ordr      
		 , line_stat       as line_stat      
		 , line_clos       as line_clos      
		 , find_name       as find_name
         , null            as updt_user_name 
		 , null            as updt_ipad      
		 , null            as updt_dttm      
		 , null            as updt_idcd      
		 , null            as updt_urif      
		 , null            as crte_user_name
         , null            as crte_ipad      
		 , date_format(now(), '%Y%m%d%H%I%S')   as crte_dttm
		 , null            as crte_idcd      
		 , null            as crte_urif
    from   cte a																									
	where  work_item_idcd not in ('002', '999') /* 소재구매 및 주문제작  */
	and    line_levl = 4
	group by work_item_idcd 
	     , (select max(prnt_idcd) 
		    from   pjod_bom r
			where  r.pjod_idcd = _std_idcd
			and    r.item_idcd = a.prnt_idcd
			and    r.line_levl = 3
			) 
	
;
end