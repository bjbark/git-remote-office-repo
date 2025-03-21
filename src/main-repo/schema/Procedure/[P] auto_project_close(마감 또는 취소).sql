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

drop procedure if exists `auto_project_close`;

CREATE PROCEDURE `auto_project_close`(
     _close_job      varchar(50),
     _pjod_idcd      varchar(50),
	 _work_ordr_dvcd varchar(50), 
     _ordr_degr      int,
	 _close_flag     char(1)
    )
begin
if  _close_job = 'pjod_work_schd' then
   begin
    if _work_ordr_dvcd = '1000' then 
       begin
          update pjod_mast set prod_cofm_yorn = _close_flag
          where  pjod_idcd = _pjod_idcd
          ;
       end;
	end if;
    if _work_ordr_dvcd = '1200' then 
       begin
          update pjod_dsig_chge set prod_cofm_yorn = _close_flag
          where  pjod_idcd = _pjod_idcd
		  and    line_seqn = _ordr_degr
          ;
       end;
	end if;
	end;
end if;   
		
end