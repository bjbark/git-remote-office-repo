/*

call auto_stock_po_dlvy (
'N1000DOOIN',
'ETOT_TRST_ITEM',
''
)

select * from seqn_dflt where tabl_name = 'ETOT_TRST_ITEM'

*/

drop procedure if exists `auto_stock`;
/*
 입고처리(정확히 검사대기)된 발주번호를 받아 발주대장의 입고수량 및 일자를 갱신한다. 
 발주번호를 기준으로 입고수량 및 입고일자를 무조건 합산하여 최신 상태를 유지한다. 
*/

CREATE PROCEDURE `auto_stock`(
     _stor       varchar(50),
     _invc_numb  varchar(50),
	 _line_seqn  integer,
	 _job_dvcd   varchar(50)
    )
begin
    declare _new_invc_numb    varchar(50);
    declare _wk_invc          varchar(50);
	declare _wk_seqn          integer;
    declare _invc_dvcd        varchar(4);
	declare _isos_dvcd        varchar(4);
	
/*  Update 작업을 위해 Lock을 걸어둔다.  */	
select count(*) from purc_istt_item where orig_invc_numb = _invc_numb for update;	

if _job_dvcd = '입고접수' then 
    begin
	    select orig_invc_numb , orig_seqn into _wk_invc , _wk_seqn
		from   purc_istt_item
		where  invc_numb = _invc_numb
		and    line_seqn = _line_seqn
		;
        update purc_ordr_item set dlvy_qntt = ifnull((select sum(istt_qntt) 
                                                      from   purc_istt_item
        									          where  purc_istt_item.orig_invc_numb = purc_ordr_item.invc_numb
        									          and    purc_istt_item.orig_seqn      = purc_ordr_item.line_seqn
        									   ), 0)
        where  invc_numb = _wk_invc
		and    line_seqn = _wk_seqn
        ;									   
        
        update purc_ordr_item set dlvy_date = (select max(purc_istt_mast.invc_date)
                                               from   purc_istt_item 
                                                      left outer join purc_istt_mast on purc_istt_item.invc_numb = purc_istt_mast.invc_numb
                                               where  purc_istt_item.orig_invc_numb = purc_ordr_item.invc_numb
                                               and    purc_istt_item.orig_seqn      = purc_ordr_item.line_seqn
        									   )
        where  invc_numb = _wk_invc
		and    line_seqn = _wk_seqn
        ;									   
    end;
end if;


if _job_dvcd = '입고접수_삭제' then 
    /*  반드시 원본 삭제전에 처리해 줘야 한다....   */
    begin
	    select orig_invc_numb , orig_seqn into _wk_invc , _wk_seqn
		from   purc_istt_item
		where  invc_numb = _invc_numb
		and    line_seqn = _line_seqn
		;
        update purc_ordr_item set dlvy_qntt = ifnull((select sum(istt_qntt) 
                                                      from   purc_istt_item
        									          where  purc_istt_item.orig_invc_numb = purc_ordr_item.invc_numb
        									          and    purc_istt_item.orig_seqn      = purc_ordr_item.line_seqn
        									   ), 0) * -1
        where  invc_numb = _wk_invc
		and    line_seqn = _wk_seqn
        ;									   
        
        update purc_ordr_item set dlvy_date = (select max(purc_istt_mast.invc_date)
                                               from   purc_istt_item 
                                                      left outer join purc_istt_mast on purc_istt_item.invc_numb = purc_istt_mast.invc_numb
                                               where  purc_istt_item.orig_invc_numb = purc_ordr_item.invc_numb
                                               and    purc_istt_item.orig_seqn      = purc_ordr_item.line_seqn
        									   )
        where  invc_numb = _wk_invc
		and    line_seqn = _wk_seqn
        ;									   
    end;
end if;



if _job_dvcd = '입고검사' then 
    begin
	    select orig_invc_numb , orig_seqn into  _wk_invc , _wk_seqn
		from   purc_istt_item
		where  invc_numb = _invc_numb
		and    line_seqn = _line_seqn
		;
	/*	
		set _wk_invc = _invc_numb;
		set _wk_saeqn = _wk_seqn;
	*/	
		
		/*   구매입고_내역의 Invoice번호 = _invc_numb, 구매입고_내역의 발주번호 = _wk_invc   */
		select count(*) from purc_ordr_item where invc_numb = _wk_invc for update  /* records lock for update  */
		;
		
		/*  구매 발주대장의 입고수량(합격수량)을 갱신한다.  */
        update purc_ordr_item set pass_qntt = ifnull((select sum(pass_qntt) 
                                                      from   purc_istt_item
        									          where  purc_istt_item.orig_invc_numb = purc_ordr_item.invc_numb
        									          and    purc_istt_item.orig_seqn      = purc_ordr_item.line_seqn
        									   ), 0)
        where  invc_numb = _wk_invc
		and    line_seqn = _wk_seqn
        ;									   
        set _invc_dvcd = '1100';  /* 1100=구매입고|1200=기타입고|1300=반품입고|1400=이동입고|2100=생산출고|2200=기타출고|2300=이동출고|2400=재고조정  */
		
		/*  이전 자료를 정리한다.  */
        delete from isos_book
		where  invc_dvcd      = _invc_dvcd
		and    orig_invc_numb = _invc_numb
		;
		call fn_seq_gen_v3(_stor , 'isos_book','',_new_invc_numb);
        /* 검사대장이 수정 또는 신규 추가되면 합격수량을 발췌하여 수불대장에 추가한다.(재고현황은 트리거에 의하여 자동 처리된다.)   */
        insert into isos_book (
                   bzpl_idcd        , invc_dvcd        , invc_numb      , line_seqn
                 , invc_date        , invc_orgn        , wrhs_idcd      , dept_idcd
                 , drtr_idcd        , cstm_idcd        , acct_bacd      , item_idcd
                 , item_code        , unit_idcd        , stnd_pric      , vatx_incl_yorn
                 , vatx_rate        , qntt             , pric           , amnt
                 , vatx             , stok_qntt        , stok_pric      , stok_amnt
                 , lott_numb        , orig_invc_numb   , orig_seqn   
                 , uper_seqn        , disp_seqn
                 , user_memo        , sysm_memo        , prnt_idcd      , line_stat
                 , line_clos        , find_name        , crte_dttm
               ) 
            select m.bzpl_idcd      , _invc_dvcd       , _new_invc_numb , a.line_seqn
			     , a.insp_date      , a.orig_invc_numb , m.istt_wrhs_idcd, m.dept_idcd
				 , m.drtr_idcd      , a.cstm_idcd      , i.acct_bacd    , a.item_idcd
				 , i.item_code      , i.unit_idcd      , null           , a.vatx_incl_yorn
				 , a.vatx_rate      , a.pass_qntt      , p.offr_pric    , a.pass_qntt * p.offr_pric
                 , ( a.pass_qntt * p.offr_pric )  * a.vatx_rate / 100
                 , a.pass_qntt      , ip.puch_pric     , a.pass_qntt * ip.puch_pric
				 , a.lott_numb      , a.orig_invc_numb , a.orig_seqn
				 , a.uper_seqn      , a.disp_seqn
				 , null             , null             , a.invc_numb    , '0'
				 , '0'              
				 , concat(i.item_code , ' ' , i.item_name , ' ' , a.lott_numb , a.insp_date )
				 , date_format(now(), '%Y%m%d%H%i%s')
            from   purc_istt_item a
                   left outer join purc_istt_mast m  on a.invc_numb      = m.invc_numb
                   left outer join purc_ordr_item p  on a.orig_invc_numb = p.invc_numb  and a.orig_seqn = p.line_seqn
                   left outer join item_mast      i  on a.item_idcd      = i.item_idcd
                   left outer join item_purc      ip on a.item_idcd      = ip.item_idcd
			where  a.pass_qntt <> 0	   
			and    a.invc_numb = _invc_numb
    		and    a.line_seqn   = _wk_seqn
        ; 				   
        set _isos_dvcd = '1101';  /* 1101:매입 2101:생산입고 2102:반품입고 2103:기타입고 2104:이동입고 1201:생산출고 2201:판매 2202:자가소비 2203:기타출고 2204:이동출고 2205:재고조정 */

        delete from lot_isos_book 
		where  invc_numb = _invc_numb
		and    isos_dvcd = _isos_dvcd 					
		;		                     

        /*  검사대장에 수정 또는 신규 되면 LOT 수불대장에 반영한다. (재고현황은 트리거에 의하여 자동 처리된다. )   */
        insert into lot_isos_book (
                   lott_numb        , line_seqn        , bzpl_idcd     , isos_dvcd
                 , invc_date        , invc_numb        , invc_seqn     , wrhs_idcd
                 , item_idcd        , qntt             , stok_symb
                 , uper_seqn        , disp_seqn
                 , user_memo        , sysm_memo        , prnt_idcd     , line_stat
                 , line_clos        , find_name        , crte_dttm
               ) 
            select a.lott_numb      
			     , (select ifnull(max(line_seqn),0) + 1 from lot_isos_book x where a.lott_numb = x.lott_numb)
			     , m.bzpl_idcd      , _isos_dvcd
			     , a.insp_date      , a.invc_numb      , a.line_seqn   , m.istt_wrhs_idcd
				 , a.item_idcd      , a.pass_qntt      , +1
				 , a.uper_seqn      , a.disp_seqn
				 , null             , null             , a.invc_numb   , '0'
				 , '0'              
				 , concat(i.item_code , ' ' , i.item_name , ' ' , a.lott_numb , a.insp_date )
				 , date_format(now(), '%Y%m%d%H%i%s')
            from   purc_istt_item a
                   left outer join purc_istt_mast m  on a.invc_numb      = m.invc_numb
                   left outer join item_mast      i  on a.item_idcd      = i.item_idcd
			where  ifnull(a.lott_numb,'') <> ''	   
			and    a.invc_numb = _invc_numb
    		and    a.line_seqn   = _wk_seqn
			;
    end;
end if;


if _job_dvcd = '기타입고' then 
    begin
        set _invc_dvcd = '1200';  /* 1100=구매입고|1200=기타입고|1300=반품입고|1400=이동입고|2100=생산출고|2200=기타출고|2300=이동출고|2400=재고조정  */
		/*  이전 자료를 정리한다.  */
        delete from isos_book
		where  invc_dvcd      = _invc_dvcd
		and    orig_invc_numb = _invc_numb
		;
		call fn_seq_gen_v3(_stor , 'isos_book','',_new_invc_numb);
        /* 검사대장이 수정 또는 신규 추가되면 합격수량을 발췌하여 수불대장에 추가한다.(재고현황은 트리거에 의하여 자동 처리된다.)   */
        insert into isos_book (
                   bzpl_idcd        , invc_dvcd        , invc_numb      , line_seqn
                 , invc_date        , invc_orgn        , wrhs_idcd      , dept_idcd
                 , drtr_idcd        , cstm_idcd        , acct_bacd      , item_idcd
                 , item_code        , unit_idcd        , stnd_pric      , vatx_incl_yorn
                 , vatx_rate        , qntt             , pric           , amnt
                 , vatx             , stok_qntt        , stok_pric      , stok_amnt
                 , lott_numb        , orig_invc_numb   , orig_seqn   
                 , uper_seqn        , disp_seqn
                 , user_memo        , sysm_memo        , prnt_idcd      , line_stat
                 , line_clos        , find_name        , crte_dttm
               ) 
            select m.bzpl_idcd      , _invc_dvcd       , _new_invc_numb   , a.line_seqn
			     , m.invc_date      , a.orig_invc_numb , a.istt_wrhs_idcd , a.proc_dept_idcd
				 , a.proc_drtr_idcd , a.cstm_idcd      , i.acct_bacd      , a.item_idcd
				 , i.item_code      , i.unit_idcd      , null             , a.vatx_incl_yorn
				 , a.vatx_rate      , a.isss_qntt      , a.stnd_pric      , a.amnt
                 , a.vatx_amnt      , a.istt_qntt      , a.stnd_pric      , a.amnt
				 , a.lott_numb      , a.invc_numb      , a.orig_seqn
				 , a.uper_seqn      , a.disp_seqn
				 , null             , null             , a.invc_numb      , '0'
				 , '0'              
				 , concat(i.item_code , ' ' , i.item_name , ' ' , r.lott_numb , a.insp_date )
				 , date_format(now(), '%Y%m%d%H%i%s')
            from   etit_item a
			       left outer join etit_mast m on a.invc_numb = m.invc_numb
                   left outer join item_mast i on a.item_idcd = i.item_idcd
			where  a.istt_qntt <> 0	   
			and    a.invc_numb = _invc_numb
        ; 				   
        set _isos_dvcd = '2103';  /* 1101:매입 2101:생산입고 2102:반품입고 2103:기타입고 2104:이동입고 1201:생산출고 2201:판매 2202:자가소비 2203:기타출고 2204:이동출고 2205:재고조정 */

        delete from lot_isos_book 
		where  invc_numb = _invc_numb
		and    isos_dvcd = _isos_dvcd 					
		;		                     

        /*  검사대장에 수정 또는 신규 되면 LOT 수불대장에 반영한다. (재고현황은 트리거에 의하여 자동 처리된다. )   */
        insert into lot_isos_book (
                   lott_numb        , line_seqn        , bzpl_idcd     , isos_dvcd
                 , invc_date        , invc_numb        , invc_seqn     , wrhs_idcd
                 , item_idcd        , qntt             , stok_symb
                 , uper_seqn        , disp_seqn
                 , user_memo        , sysm_memo        , prnt_idcd     , line_stat
                 , line_clos        , find_name        , crte_dttm
               ) 
            select a.lott_numb      , _invc_dvcd       
			     , (select ifnull(max(line_seqn),0) + 1 from lot_isos_book x where r.lott_numb = x.lott_numb)
			     , a.bzpl_idcd      , _isos_dvcd
			     , a.invc_date      , a.invc_numb      , a.line_seqn   , m.istt_wrhs_idcd
				 , a.item_idcd      , a.istt_qntt      , +1
				 , a.uper_seqn      , a.disp_seqn
				 , null             , null             , a.invc_numb   , '0'
				 , '0'              
				 , concat(i.item_code , ' ' , i.item_name , ' ' , a.lott_numb , a.invc_date )
				 , date_format(now(), '%Y%m%d%H%i%s')
            from   purc_insp a
			       left outer join etit_mast m on a.invc_numb = m.invc_numb
			where  ifnull(a.lott_numb,'') <> ''	   
			and    a.invc_numb = _invc_numb
			;
    end;
end if;

		
end