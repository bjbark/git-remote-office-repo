/*

call fn_seq_gen_v2 (
'N1000DOOIN',
'ETOT_TRST_MAST',
''
)

call fn_seq_gen_v2 (
'N1000DOOIN',
'ETOT_TRST_ITEM',
''
)

select * from seqn_dflt where tabl_name = 'ETOT_TRST_ITEM'

*/




drop procedure if exists `fn_seq_gen_v2`;

create  procedure `fn_seq_gen_v2`(
     _stor  varchar(50),
     _table varchar(50),
     _invc_numb varchar(50)
    ) 
begin
    declare _hqof_idcd       varchar(50);
    declare _seqn_leng       integer;
--    declare _last_seqn     integer;
    declare _last_seqn       double;
    declare _year            varchar(2);
    declare _month           varchar(2);
    declare _bfhd_fill       varchar(50);
    declare _fill_char       varchar(50);
    declare _last_idcd       varchar(50);
    declare _seqn_type       varchar(50);
    declare _year_incl       varchar(50);
    declare _monh_incl       varchar(50);
	declare _refn_tabl       varchar(50);
	declare _refn_fied       varchar(50);
	declare _seqn_fied       varchar(50);
	declare _check_idcd1     varchar(50);
	declare _check_idcd2     varchar(50);
    declare _code_year       varchar(2);
    declare _code_month      varchar(2);
	declare _code_bfhd_fill  varchar(50);
    declare _code_leng       integer;
    declare _code_fill_char  char(1);
    declare _code_year_incl  varchar(50);
    declare _code_monh_incl  varchar(50);
	declare _check_code1     varchar(50);
	declare _check_code2     varchar(50);
    declare _last_code       varchar(50);
    declare _code_last_seqn  double;
	DECLARE _SQL VARCHAR(2500);

	SET collation_connection = 'utf8_general_ci' ;

    select   substring(ifnull(_stor,''),1,10) into _hqof_idcd;
	/*
	 먼저 등록된 최종번호를 검증하기 위한 준비 작업을 진행한다. 
     (코드 앞부분(공통으로 적용되는 코드(년월이 포함된)이 같지 않으면 신규로 1번부터 부여하기 위한)
	*/
	
	select  ifnull(bfhd_fill,concat(_hqof_idcd,_table))
          , ifnull(seqn_leng,6)
          , ifnull(fill_char,'0')
		  , ifnull(seqn_type,'일반')
		  , ifnull(year_incl,'0')
		  , ifnull(monh_incl,'0')
		  , ifnull(refn_tabl,'') 
		  , ifnull(refn_fied,'') 
		  , substr(last_idcd,1,length(last_idcd) - seqn_leng)  /* 마지막으로 사용한 ID에서 Sequence 부분을 제외하고 취한다. */
		  , ifnull(code_bfhd_fill,concat(_hqof_idcd,_table))
          , ifnull(code_leng,6)
          , ifnull(code_fill_char,'0')
		  , ifnull(code_year_incl,'0')
		  , ifnull(code_monh_incl,'0')
		  , substr(last_code,1,length(last_code) - code_leng)  /* 마지막으로 사용한 ID에서 Sequence 부분을 제외하고 취한다. */
    into    _bfhd_fill
          , _seqn_leng
          , _fill_char
          , _seqn_type
          , _year_incl
          , _monh_incl
		  , _refn_tabl
		  , _refn_fied
		  , _check_idcd1
		  , _code_bfhd_fill
		  , _code_leng
		  , _code_fill_char
		  , _code_year_incl
		  , _code_monh_incl
		  , _check_code1
	from    seqn_dflt
	where   lower(hqof_idcd) = lower(_hqof_idcd)
	and     lower(tabl_name) = lower(_table) 
    ;

   if  _year_incl = '1' then
       select substr(sysdate(),3,2)   into _year;
   end if;	   
   if  _monh_incl = '1' then 
       select substr(sysdate(),6,2)   into _month;
   end if;
   if  _code_year_incl = '1' then
       select substr(sysdate(),3,2)   into _code_year;
   end if;	   
   if  _code_monh_incl = '1' then 
       select substr(sysdate(),6,2)   into _code_month;
   end if;
	
	select concat(ifnull(ifnull(  _bfhd_fill
                                , concat(_hqof_idcd,_table)) ,'')
                                , ifnull(_year,'')
                                , ifnull(_month,'')
                     ) into _check_idcd2
	;
	select concat(ifnull(ifnull(  _code_bfhd_fill
                                , concat(_hqof_idcd,_table)) ,'')
                                , ifnull(_code_year,'')
                                , ifnull(_code_month,'')
                     ) into _check_code2
	;
	
    select  ifnull(last_seqn,0) + 1
          , ifnull(last_idcd,concat(_hqof_idcd,_table))
		  , ifnull(code_last_seqn,0) + 1
          , ifnull(last_code,concat(_hqof_idcd,_table))
    into    _last_seqn
          , _last_idcd
		  , _code_last_seqn
		  , _last_code
	from    seqn_dflt
	where   lower(hqof_idcd) = lower(_hqof_idcd)
	and     lower(tabl_name) = lower(_table) 
    and     _check_idcd1 = _Check_idcd2  /*  위에서 준비한 Check Field들이 동일한경우에 한하여 최종순번 + 1을 적용 나머지는 1을 적용  */
   ;
   select  ifnull(_bfhd_fill,concat(_hqof_idcd,_table)) into _bfhd_fill;
   select  ifnull(_seqn_leng,6)   into _seqn_leng;
   select  ifnull(_fill_char,'0') into _fill_char;
   select  ifnull(_last_seqn,1)   into _last_seqn;
   
   select  ifnull(_code_bfhd_fill,'')  into _code_bfhd_fill;
   select  ifnull(_code_leng,6)        into _code_leng;
   select  ifnull(_code_fill_char,'0') into _code_fill_char;
   select  ifnull(_code_last_seqn,1)   into _code_last_seqn;
   
   /*
     function 내에서는 다이나믹 쿼리를 사용할 수 없는 제약사항이 있어 프로시져로 변경 처리했다. 
	 Invoice 형식으로 구성된 테이블일 경우 해당 테이블에 직접 접근하여 최종 번호를 받아와 처리한다. 
	 ID번호의 부족현상을 제거하기 위해 년월을 추가 적용할 수 있도록 하였다. 
	 seqn_type에는 "일반", "INVOICE ITEM" , "INVOICE HEAD"로 구성하여야 한다. 
   */
   
   if  _seqn_type = "INVOICE ITEM" then begin
        select 'invc_seqn' into _seqn_fied;	
         SET _SQL = CONCAT( "update seqn_dflt set last_seqn = " 
		                    ,   "(SELECT  cast(ifnull(max(",_seqn_fied,  " ),0) as int)   + 1  "
		                    ,   " from    " , lower(_table)
 						    ,   " where   " , _seqn_fied , " REGEXP '[[:digit:]]' "
 					   	    ,   " and     " , _refn_fied , " = ",  "'",_invc_numb , "'  "
							,   ")"
							, "where upper(hqof_idcd)  = upper( '", _hqof_idcd , "')"
							, "and   upper(tabl_name)  = upper( '", _table , "')"
     						, ";"
						);
	    SET @STATEMENT = _SQL;
        PREPARE DYNQUERY FROM @STATEMENT;
        EXECUTE DYNQUERY;
   	    DEALLOCATE PREPARE DYNQUERY;
		update  seqn_dflt set last_idcd = last_seqn  , last_code = _last_code , code_last_seqn = _code_last_seqn
		where   upper(hqof_idcd) = upper(_hqof_idcd)
		and     upper(tabl_name) = upper(_table);
	end;	
    else begin
       select concat(ifnull(ifnull(  _bfhd_fill
                                   , concat(_hqof_idcd,_table)) ,'')
			    				   , ifnull(_year,'')
				    			   , ifnull(_month,'')
					    		   , lpad(_last_seqn, _seqn_leng,'0')
                     ) into _last_idcd
       ;
       select concat(ifnull(ifnull(  _code_bfhd_fill
                                   , concat(_hqof_idcd,_table)) ,'')
			    				   , ifnull(_code_year,'')
				    			   , ifnull(_code_month,'')
					    		   , lpad(_code_last_seqn, _code_leng,'0')
                     ) into _last_code
       ;
					 
					 
       insert into seqn_dflt (
                       hqof_idcd
                     , tabl_name
                     , bfhd_fill
                     , seqn_leng
                     , fill_char
                     , last_seqn
                     , last_idcd
					 , code_bfhd_fill
					 , code_leng
					 , code_fill_char
					 , code_last_seqn
					 , last_code
                    ) values (
	                   _hqof_idcd
				     , _table
                     , _bfhd_fill
				     , _seqn_leng
				     , _fill_char
                     , _last_seqn
				     , _last_idcd
					 , _code_bfhd_fill
					 , _code_leng
					 , _code_fill_char
					 , _code_last_seqn
					 , _last_code
				    )
           on duplicate key update
                   bfhd_fill       = _bfhd_fill
                 , seqn_leng       = _seqn_leng
                 , fill_char       = _fill_char
                 , last_seqn       = _last_seqn
                 , last_idcd       = _last_idcd
				 , code_bfhd_fill  = _code_bfhd_fill
				 , code_leng       = _code_leng
				 , code_fill_char  = _code_fill_char
				 , code_last_seqn  = _code_last_seqn
				 , last_code       = _last_code
                 , updt_dttm       = date_format(now(),'%y%m%d')
    ;       
	end;
   end if;
   
    select  last_idcd as seq , last_code as code
	from    seqn_dflt
    where   upper(hqof_idcd) = upper(_hqof_idcd)
	and     upper(tabl_name) = upper(_table)
	;
end