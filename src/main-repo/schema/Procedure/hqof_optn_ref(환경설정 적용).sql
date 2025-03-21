/*

call hqof_optn_ref ( 'WINFO1000')

*/

drop procedure if exists hqof_optn_ref; 
/*
 전체 창고별 재고를  조회한다. (결과는 창고별로 재고를 분리해서 조회한다.)
*/

CREATE procedure `hqof_optn_ref`(
       _hqof_idcd varchar(50)
    )  
begin
with 
  item_adon_type as (
     select hqof_idcd
	      , case when optn_logc_valu in ('예','1','YES','Yes','yes','Y','y') then 1 else 0 end as item_adon
	 from   optn_mast	  
	 where  hqof_idcd = _hqof_idcd
	 and    optn_idcd = '품목추가정보표시'
),
  item_optn_type as (
     select hqof_idcd
	      , case when optn_logc_valu in ('예','1','YES','Yes','yes','Y','y') then 1 else 0 end as item_optn
	 from   optn_mast	  
	 where  hqof_idcd = _hqof_idcd
	 and    optn_idcd = '품목속성정보표시'
), 
  password_optn as (
     select hqof_idcd
	      , optn_etcc as pass_word
	 from   optn_mast	  
	 where  hqof_idcd = _hqof_idcd
	 and    optn_idcd = '초기비밀번호'
   
)  


select item_adon_type.item_adon
     , item_optn_type.item_optn
	 , password_optn.pass_word
from   item_adon_type
     , item_optn_type
	 , password_optn
-- where  item_adon_type.hqof_idcd = item_optn_type.hqof_idcd
;
end



