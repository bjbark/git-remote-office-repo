/*
call system_option_init('N1000DEDUK')
select * from optn_mast;
*/

drop procedure if exists `system_option_init`;

CREATE PROCEDURE `system_option_init`(
     _stor  varchar(50)
    ) 

begin
    declare _db_name   varchar(50);
    declare _db_find   int;

/*
*/

select case _stor when 'N1000WINFO' then 'wismes'
                  when 'N1000DOOIN' then 'wismes'
				  when 'N1000DOWON' then 'dowon_mes'
				  when 'N1000DEDUK' then 'deduk_mes'
				  when 'N1000FILKO' then 'filling_mes'
				  when 'N1000NBOLT' then 'nbolt_mes'
                  else null end into _db_name
;				  

SELECT COUNT(*) FROM Information_schema.tables
WHERE  table_schema = _db_name
AND    table_name = 'optn_mast'
into   _db_find
;

if  _db_find = 0 then
  begin
    Create Table optn_mast like control_db.optn_mast
    ;
  end;
end if;

    insert into optn_mast
    select  * from 	 control_db.optn_mast r
	on duplicate key
	update sysm_memo = r.sysm_memo
    ;
    update optn_mast set hqof_idcd = _stor
    ;
    
    update optn_mast set optn_char_valu = concat(_stor,'1000')
    where  optn_idcd = 'dflt_hqof_idcd'
    ;
end