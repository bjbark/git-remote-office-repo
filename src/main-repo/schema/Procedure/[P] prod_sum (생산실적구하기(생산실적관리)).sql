/*
call stock_list_type_1('20190601','20190701')
*/

drop procedure if exists prod_sum ; 
/*
 전체 창고별 재고를  조회한다. (결과는 창고별로 재고를 분리해서 조회한다.)
*/

CREATE procedure `prod_sum`(
       _invc_numb varchar(50),
       _work_date varchar(50)
    )  
begin	
select max(a.cavity) *   sum(a.prod_qntt)  as prod_qntt
from (
select max(m.cavity)
	 , sum(cast(d.param1 as unsigned)) as prod_qntt
	 , min(d.timepoint) as strt_time , max(d.timepoint) as endd_time
	 , TIMESTAMPDIFF(minute, str_to_date(min(d.timepoint),'%Y%m%d%H%i%s'), str_to_date(max(d.timepoint),'%Y%m%d%H%i%s')) AS time_diff
from   pror_item a
       left outer join item_adon  ia on a.item_idcd   = ia.item_idcd
	   left outer join wt_conv    c  on a.cvic_idcd   = c.cvic_idcd
	   left outer join mold_mast  m  on ia.mold_idcd  = m.mold_idcd
	   left outer join wt_data_in d  on c.device = d.device  and c.ch = d.ch and d.timepoint between a.work_strt_dttm and a.work_endd_dttm and substring(d.timepoint,1,8) = _work_date
where  _work_date between substring(a.work_strt_dttm,1,8) and substring(a.work_endd_dttm,1,8)
and    a.invc_numb = _invc_numb
) a
;
END

