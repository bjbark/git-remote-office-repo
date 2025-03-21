
DROP FUNCTION IF EXISTS `fn_seq_gen`;

CREATE  FUNCTION `fn_seq_gen`(
     _stor  varchar(50),
     _table varchar(50)
    ) RETURNS varchar(50) CHARSET utf8
begin
    DECLARE _seq       VARCHAR(50);
    DECLARE _seqn_code VARCHAR(50);
    DECLARE _num       integer;F
    DECLARE _input     VARCHAR(10);
    DECLARE _pre       VARCHAR(50);
    DECLARE _tbl_nm    VARCHAR(50);
    DECLARE _HQ_ID     VARCHAR(50);
    DECLARE _len INT;
    DECLARE _chr VARCHAR(10);
    select   substring(ifnull(_stor,''),1,10) into _HQ_ID;
		
		
		
    select   ifnull(_table,'test_table'), 'x', '0' , 50
      into   _tbl_nm,   _pre,      _chr,       _len ; 
		
    select   ifnull(tabl_name , _table), ifnull(bfhd_fill,'x'), ifnull(fill_char,'0') , ifnull(seqn_leng , 50)
      into   _tbl_nm,   _pre,      _chr,       _len  
      from   seqn_dflt
    where    seqn_idcd   =  lower(ifnull(_table,'all'))
      and    hqof_idcd   =  _HQ_ID
      ;    

    select ifnull(_tbl_nm,_table),   ifnull(_pre,''),  ifnull(_chr,'0'), ifnull(_len ,50)
      into   _tbl_nm,   _pre,      _chr,       _len  ;

    select case lower(_table)    
                when  'code_mst'            then  6
                when  'menu_mst'            then  10
                when  'module_mst'          then  10
                when  'branch_mst'          then  4
                when  'angel.cust_mst'      then  5
                else  10
           end into _len
    ;
    select case lower(_table)    
                when  'code_mst'            then   '0'
                when  'menu_mst'            then   '0'
                when  'angel.module_mst'    then   '0'
                when  'angel.cust_mst'      then   '0'
                else  '0'
           end into _chr
    ;
    select case lower(ifnull(_table,'all'))    
                when  'menu_mst'            then   '0'
                when  'module_mst'          then   '0'
                when  'branch_mst'          then   '0'
                when  'angel.branch_mst'    then   '0'
                when  'angel.cust_mst'      then   '0'
                else  _stor
           end into _pre
    ;
    select case ifnull(lower(_table),'all') 
                when  'module_mst' then 
                   ( SELECT  ifnull(max(seqn_numb),0)  + 1 
                       FROM  seqn_dflt                                                                  
                      WHERE  seqn_numb REGEXP '[[:digit:]]'
                        AND  hqof_idcd = _HQ_ID
                           )
                when  'all' then 
                   ( SELECT  ifnull(max(seqn_numb),0) + 1 
                       FROM  seqn_dflt                                                                             
                      WHERE  seqn_numb REGEXP '[[:digit:]]'
                        AND  hqof_idcd = _HQ_ID
                           )
 
                else
                   ( SELECT  ifnull(MAX(seqn_numb),0) + 1 
                       FROM  seqn_dflt                                                                             
                      WHERE  seqn_numb REGEXP '[[:digit:]]'
                        AND  tabl_name = lower(_table) 
                        AND  hqof_idcd = _HQ_ID
                   ) 
           end into _num
    ;
    SELECT ifnull(MAX(seqn_numb),0) + 1 
      into _num
      FROM seqn_dflt                                                                             
     WHERE seqn_numb REGEXP '[[:digit:]]'
       AND seqn_idcd = lower(_table) 
       AND hqof_idcd = _HQ_ID
    ;
    if ifnull(_num,0) != 0 then
            IF LENGTH(_num) > _len then
                 select SUBSTRING(CONVERT(_num,char(50)), 1, _len) into _seq;
            else select CONVERT(_num,char(50)) into _seq;
          end if;
    end if;
 

   select concat(ifnull(_pre,''),lpad(_seq, _len,'0')) into _seqn_code;
	 
   INSERT INTO seqn_dflt 
                (  hqof_idcd, seqn_idcd,   seqn_numb, seqn_code , crte_dttm 
                ) VALUES (
                   _HQ_ID,lower(ifnull(_table,'all')), _seq  , _seqn_code  , date_format(now(),'%Y%m%d') )
           on duplicate key UPDATE
             seqn_numb = _num
           , seqn_code = _seqn_code
           , UPDT_DTTM  = date_format(now(),'%Y%m%d')
    ;       
    return  _seqn_code;  
		
end