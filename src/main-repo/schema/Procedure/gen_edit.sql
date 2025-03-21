CREATE PROCEDURE `gen_edit`(
   _path  varchar(50),
   _srvc  varchar(50),
   _modl  varchar(50)
)
BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE vRowCount INT DEFAULT 0 ;
  
  
  DECLARE _curcnt int DEFAULT 0;  
  DECLARE _wktxt  varchar(200);
  DECLARE _wktxt1 varchar(200);
  DECLARE v_finished INTEGER DEFAULT 0;  

  DECLARE _LINE_NO    int;
  DECLARE _FLD_ID     varchar(50);
  DECLARE _FLD_NM     varchar(50);
  DECLARE _DATA_TYPE  varchar(50);
  DECLARE _LEN        int;
  DECLARE _ALIGN      varchar(50);
  DECLARE _FRMT_STR   varchar(50);
  DECLARE _LOOKUP_STR varchar(50);
  DECLARE _DEFLT_VAL  varchar(50);

  
  
  
  
  DECLARE cur1 CURSOR 
    FOR SELECT 	 line_numb
			   , fied_idcd
			   , ifnull(fied_name,fied_idcd) AS FLD_NM
			   , data_type
			   , data_leng
			   , adjt_dvsn
			   , fomt_strg
			   , lkup_strg
			   , dflt_valu
 	      from cert_data_model
        where  lower(path_name) = lower(_path)
        and    lower(srvc_name) = lower(_srvc)
        and    lower(modl_name) = lower(_modl)
        and    lower(fied_idcd) not in 
                  ( 'sys_memo'   , 'prnt_id' , 'row_sts'    , 'find_nm'      , 'row_clos'
				  , 'row_ord'    , 'row_lvl'  
                  , 'upt_usr_nm' , 'upt_ip'  , 'upt_dttm'   , 'upt_id'       , 'upt_ui' 
                  , 'crt_usr_nm' , 'crt_ip'  , 'crt_dttm'   , 'crt_id'       , 'crt_ui' 
				  , 'sysm_memo'  , 'prnt_idcd' , 'line_stat' , 'find_name'   , 'line_clos'
				  , 'line_ordr'  , 'line_lvel'  
                  , 'updt_user_name' , 'updt_ipad' , 'updt_dttm' , 'updt_idcd' , 'updt_urif' 
                  , 'crte_user_name' , 'crte_ipad' , 'crte_dttm' , 'crte_idcd' , 'crte_urif' 
				  )

	;
 DECLARE CONTINUE HANDLER 
    FOR NOT FOUND SET v_finished = 1;
 OPEN cur1; 

 delete from  tmp_screen 

 ;

 get_field : LOOP
    FETCH cur1 INTO   _LINE_NO    
                    , _FLD_ID     
                    , _FLD_NM     
                    , _DATA_TYPE  
                    , _LEN        
                    , _ALIGN      
                    , _FRMT_STR   
                    , _LOOKUP_STR 
                    , _DEFLT_VAL  ;
    IF v_finished = 1 THEN 
       LEAVE get_field;
    END IF;
	set    _curcnt = _curcnt + 1;
    select concat('			{	fieldLabel     	: Language.get( ''',rtrim(convert(_fld_id, char(50))),'',''',''',rtrim(convert(_fld_nm, char(50))),'''','),')	into _wktxt;
    insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);

	set    _curcnt = _curcnt + 1;
    select concat('				name	     	: ''',rtrim(convert(_fld_id, char(50))),''',') 	into _wktxt;
    insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);


	select  case lower(_data_type)  	
				when 'varchar'       then 'textfield'
				when 'varchar2'      then 'textfield'
				when 'nvarchar'      then 'textfield'
				when 'text'          then 'textfield'
				when 'char'          then 'textfield'
				when 'ntext'         then 'textfield'
				when 'bit'           then 'textfield'
				when 'datetime'      then 'datefield'
				when 'smalldatetime' then 'datefield'
				when 'binary_float'  then 'numericfield'
				when 'clob'          then 'textfield'
				when 'image'         then 'textfield'
				when 'float'         then 'numericfield'
				when 'number'        then 'numericfield'
				when 'numeric'       then 'numericfield'
				when 'int'           then 'numericfield'
				when 'integer'       then 'numericfield'
				when 'long'          then 'numericfield'
				when 'decimal'       then 'numericfield'
				when 'smallint'      then 'numericfield'
				else 'textfield'  
			end	 into _wktxt1;
   	select case when substring(lower(_fld_id),length(_fld_id)-2,3) = '_dt'   then 'datefield'
			    else _wktxt1 end into _wktxt1;
   	select case when substring(lower(_fld_id),length(_fld_id)-4,5) = '_date' then 'datefield'
			    else _wktxt1 end into _wktxt1;
				
   	select case when lower(ifnull(_LOOKUP_STR,'')) <> '' then 'lookupfield'
			    else _wktxt1 end into _wktxt1;
    if  trim(lower(_fld_id)) in ( 'dept_nm'   , 'step_nm'   , 'stor_nm'   , 'wk_duty_nm'    , 'emp_nm'
	                            , 'dept_name' , 'step_name' , 'stor_name' , 'work_duty_name', 'empy_name'
		  					    , 'item_name' , 'user_name' , 'cvic_name' , 'whrs_name'     , 'bzpl_name'
	                             ) then set _wktxt1 = 'popupfield';
	end if;
    if  (substring(lower(_fld_id),length(_fld_id)-4,5) = '_yorn' ) then 
	    set _wktxt1 = 'lookupfield';
		set _LOOKUP_STR = 'yorn';
	end if;
    if  (substring(lower(_fld_id),length(_fld_id)-4,5) = '_dvcd' ) then 
	    set _wktxt1 = 'lookupfield';
		set _LOOKUP_STR = _fld_id;
	end if;
				
	set    _curcnt = _curcnt + 1;
    select concat('				xtype	     	: ''',_wktxt1,''',') 	into _wktxt;
    insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);

	if  _wktxt1 = 'textfield' then 
		set    _curcnt = _curcnt + 1;
		select '				readOnly     	: false,' 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select '				allowBlank     	: true,' 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select concat('				fieldCls     	: ',''''',',   '          /* requiredindex , readonlyfield   */' ) 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
	end if;
	
	if  _wktxt1 = 'datefield' then 
		set    _curcnt = _curcnt + 1;
		select '				readOnly     	: false,' 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select '				editable     	: false,' 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select '				allowBlank     	: false,' 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select concat('				fieldCls     	: ','''readonlyfield'',',   '          /* requiredindex , readonlyfield   */' ) 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select '				format     		: Const.DATE_FORMAT_YMD_BAR,' 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select '				submitFormat	: Const.DATE_FORMAT_YMD,' 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
	end if;
	
	if  _wktxt1 = 'lookupfield' then 
		set    _curcnt = _curcnt + 1;
		select '				readOnly     	: false,' 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select '				editable     	: false,' 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select concat('				lookupValue    	: resource.lookup(''',rtrim(_LOOKUP_STR),'''),' ) 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
	end if;
	
	if  _wktxt1 = 'popupfield' then 
		set    _curcnt = _curcnt + 1;
		select concat('				pair	    	: ''',substring(lower(_fld_id),1,length(_fld_id)-2),'id',''',' ) 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select '				clearable     	: true,' 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select '				popup	     	: { ' 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select '					select     	: ''SINGLE'',' 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select case  trim(lower(_fld_id)) 
				when 'dept_nm'        then '					widget     	: ''lookup-hrdept-popup'','
				when 'dept_name'      then '					widget     	: ''lookup-hrdept-popup'','
				when 'emp_nm'         then '					widget     	: ''lookup-hrempmst-popup'','
				when 'empy_name'      then '					widget     	: ''lookup-hrempmst-popup'','
				when 'step_nm'        then '					widget     	: ''lookup-hrstep-popup'','
				when 'step_name'      then '					widget     	: ''lookup-hrstep-popup'','
				when 'wk_duty_nm'     then '					widget     	: ''lookup-hrworkduty-popup'','
				when 'work_duty_name' then '					widget     	: ''lookup-hrworkduty-popup'','
				when 'stor_nm'        then '					widget     	: ''lookup-stor-popup'','
				when 'stor_name'      then '					widget     	: ''lookup-stor-popup'','

				when 'dept_name'      then '					widget     	: ''lookup-dept-popup'','
				when 'item_name'      then '					widget     	: ''lookup-item-popup'','
				when 'user_name'      then '					widget     	: ''lookup-user-popup'','
				when 'wkct_name'      then '					widget     	: ''lookup-wkct-popup'','
				when 'wrhs_name'      then '					widget     	: ''lookup-wkct-popup'','
				when 'cvit_name'      then '					widget     	: ''lookup-cvit-popup'','
				when 'bzpl_name'      then '					widget     	: ''lookup-bzpl-popup'','
				else                       '					widget     	: ''lookup-xxxxxxxxxxxxx-popup'',' 	end 
			into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select '					params		: { hqof_idcd : _global.hqof_idcd },' 	                  into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select '					result		: function(records, nameField, pairField){' 	          into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select concat('						nameField.setValue(records[0].get(''',trim(_fld_id),'''));')  into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select concat('						pairField.setValue(records[0].get(''',substring(lower(_fld_id),1,length(_fld_id)-4),'idcd','''));' ) 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select '			},' 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
		set    _curcnt = _curcnt + 1;
		select concat('			{	name : ''',substring(lower(_fld_id),1,length(_fld_id)-4),'idcd'' ,xtype :''textfield'' , hidden : true') 	into _wktxt;
		insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
	end if;
	set    _curcnt = _curcnt + 1;
	select '			},' 	into _wktxt;
	insert into tmp_screen(line_no, txt) values (_curcnt, _wktxt);
  END LOOP get_field;
  CLOSE cur1;
  select * from tmp_screen order by line_no;
end