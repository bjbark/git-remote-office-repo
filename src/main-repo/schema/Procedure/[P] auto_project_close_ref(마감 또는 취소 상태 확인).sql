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

drop procedure if exists `auto_project_close_ref`;

CREATE PROCEDURE `auto_project_close_ref`(
     _close_job      varchar(50),
     _pjod_idcd      varchar(50),
	 _work_ordr_dvcd varchar(50), 
     _ordr_degr      int
    )
begin
if  _close_job = 'pjod_work_schd' then
    begin
      select prod_cofm_yorn, dsig_cofm_yorn
	  from   pjod_mast
	  where  pjod_idcd = _pjod_idcd
	  and    _work_ordr_dvcd = '1000'
	  union all
	  select prod_cofm_yorn, dsig_cofm_yorn
	  from   pjod_dsig_chge
	  where  pjod_idcd = _pjod_idcd
	  and    line_seqn = _ordr_degr
	  and    _work_ordr_dvcd = '1200'
	  ;
	end;
end if;   
		
end