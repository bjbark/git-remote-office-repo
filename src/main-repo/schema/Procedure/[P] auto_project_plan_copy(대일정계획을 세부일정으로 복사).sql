/*

설계 및 작업 대 일정계획을 세부 일정 계획으로 복사한다. 

*/




drop procedure if exists `auto_project_plan_copy`;

create  procedure `auto_project_plan_copy`(
     _invc_numb  varchar(50),
	 _plan_dvcd  varchar(8)
    ) 
begin
    declare _new_invc_numb    varchar(50);
    declare _stor             varchar(50);
	
	
	delete from pjod_work_schd
	where  pjod_idcd = _invc_numb
	and    work_schd_dvcd = '2000'
	and    _plan_dvcd = 'work'
	;
	delete from pjod_dsig_schd
	where  pjod_idcd = _invc_numb
	and    dsig_schd_dvcd = '2000'
	and    _plan_dvcd = 'dsig'
	;
    insert into pjod_work_schd (
                   `pjod_idcd`      , `work_schd_dvcd` , `id`                , `seqn`
                 , `name`           , `progress`       , `progressbyworklog` , `relevance`      , `type`
                 , `typeld`         , `description`    , `code`              , `level`          , `status`
                 , `depends`        , `start`          , `duration`          , `end`            , `startismilestone`
                 , `endismilestone` , `collapsed`      , `canwrite`          , `canadd`         , `candelete`
                 , `canaddlssue`    , `haschild`       , `starttime`         , `endtime`        , `wkct_idcd`
                 , `user_memo`      , `sysm_memo`      , `prnt_idcd`         , `line_levl`      , `line_ordr`
                 , `line_stat`      , `line_clos`      , `find_name`
                 , `updt_user_name` , `updt_ipad`      , `updt_dttm`         , `updt_idcd`      , `updt_urif`
                 , `crte_user_name` , `crte_ipad`      , `crte_dttm`         , `crte_idcd`      , `crte_urif`
	       )
	        select 
                   a.`pjod_idcd`
                 , '2000'
                 , a.`id`
                 , a.`seqn`
                 , a.`name`
                 , a.`progress`
                 , a.`progressbyworklog`
                 , a.`relevance`
                 , a.`type`
                 , a.`typeld`
                 , a.`description`
                 , a.`code`
                 , a.`level`
                 , a.`status`
                 , a.`depends`
                 , a.`start`
                 , a.`duration`
                 , a.`end`
                 , a.`startismilestone`
                 , a.`endismilestone`
                 , a.`collapsed`
                 , a.`canwrite`
                 , a.`canadd`
                 , a.`candelete`
                 , a.`canaddlssue`
                 , a.`haschild`
                 , a.`starttime`
                 , a.`endtime`
                 , a.`wkct_idcd`
                 , a.`user_memo`
                 , a.`sysm_memo`
                 , a.`prnt_idcd`
                 , a.`line_levl`
                 , a.`line_ordr`
                 , a.`line_stat`
                 , a.`line_clos`
                 , a.`find_name`
                 , a.`updt_user_name`
                 , a.`updt_ipad`
                 , a.`updt_dttm`
                 , a.`updt_idcd`
                 , a.`updt_urif`
                 , a.`crte_user_name`
                 , a.`crte_ipad`
                 , a.`crte_dttm`
                 , a.`crte_idcd`
                 , a.`crte_urif`
            from  pjod_work_schd a
	        where a.`pjod_idcd` = _invc_numb
			and   a.`work_schd_dvcd` = '1000'
			and   _plan_dvcd = 'work'
	        ;
    insert into pjod_dsig_schd (
                   `pjod_idcd`      , `dsig_schd_dvcd`    , `id`             , `seqn`             , `name`
                 , `progress`       , `progressbyworklog` , `relevance`      , `type`             , `typeld`
                 , `description`    , `code`              , `level`          , `status`           , `depends`
                 , `start`          , `duration`          , `end`            , `startismilestone` , `endismilestone`
                 , `collapsed`      , `canwrite`          , `canadd`         , `candelete`        , `canaddlssue`
                 , `haschild`       , `starttime`         , `endtime`        , `wkct_idcd`        , `item_idcd`
                 , `rsps_name`      , `ivst_pcnt`         , `need_mnhr`      , `chge_coef`
                 , `user_memo`      , `sysm_memo`         , `prnt_idcd`      , `line_levl`        , `line_ordr`
                 , `line_stat`      , `line_clos`         , `find_name`
                 , `updt_user_name` , `updt_ipad`         , `updt_dttm`      , `updt_idcd`        , `updt_urif`
                 , `crte_user_name` , `crte_ipad`         , `crte_dttm`      , `crte_idcd`        , `crte_urif`
				 )
		select 		 
                 a.`pjod_idcd`
               , '2000'
               , a.`id`
               , a.`seqn`
               , a.`name`
               , a.`progress`
               , a.`progressbyworklog`
               , a.`relevance`
               , a.`type`
               , a.`typeld`
               , a.`description`
               , a.`code`
               , a.`level`
               , a.`status`
               , a.`depends`
               , a.`start`
               , a.`duration`
               , a.`end`
               , a.`startismilestone`
               , a.`endismilestone`
               , a.`collapsed`
               , a.`canwrite`
               , a.`canadd`
               , a.`candelete`
               , a.`canaddlssue`
               , a.`haschild`
               , a.`starttime`
               , a.`endtime`
               , a.`wkct_idcd`
               , a.`item_idcd`
               , a.`rsps_name`
               , a.`ivst_pcnt`
               , a.`need_mnhr`
               , a.`chge_coef`
               , a.`user_memo`
               , a.`sysm_memo`
               , a.`prnt_idcd`
               , a.`line_levl`
               , a.`line_ordr`
               , a.`line_stat`
               , a.`line_clos`
               , a.`find_name`
               , a.`updt_user_name`
               , a.`updt_ipad`
               , a.`updt_dttm`
               , a.`updt_idcd`
               , a.`updt_urif`
               , a.`crte_user_name`
               , a.`crte_ipad`
               , a.`crte_dttm`
               , a.`crte_idcd`
               , a.`crte_urif`
        from   pjod_dsig_schd a
		where  a.`pjod_idcd` = _invc_numb
		and    a.`dsig_schd_dvcd` = '1000'
		and    _plan_dvcd = 'dsig'
    ;

end




