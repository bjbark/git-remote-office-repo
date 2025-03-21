insert into module_mst (
                 PJT_ID
               , SITE_ID
               , MENU_ID
               , MENU_NM
               , MENU_NM_ENGLH
               , MENU_NM_CHI
               , MENU_NM_JPNS
               , MENU_NM_ETC
               , MENU_GB
               , TREE_EXPN_YN
               , LAST_MODL_YN
               , MODL_ID
               , MODL_NM
               , INQ_USE_YN
               , INPT_USE_YN
               , UPT_USE_YN
               , DEL_USE_YN
               , PRT_USE_YN
               , EXPT_USE_YN
               , AUTH_GB
               , BASE_MENU_USE_YN
               , HQ_USE_YN
               , DM_USE_YN
               , BRANCH_USE_YN
               , DEV_USR_PER
               , PERF_RT
               , OLD_VER_MENU
               , OLD_VER_MENU_NM
               , admin_use
               , USR_MEMO
               , SYS_MEMO
               , PRNT_ID
               , ROW_LVL
               , ROW_ORD
               , ROW_STS
               , ROW_CLOS
               , FIND_NM
               , UPT_USR_NM
               , UPT_IP
               , UPT_DTTM
               , UPT_ID
               , UPT_UI
               , CRT_USR_NM
               , CRT_IP
               , CRT_DTTM
               , CRT_ID
               , CRT_UI
) select         PJT_ID
               , SITE_ID
               , '30001'
               , 'WIS MES System'
               , MENU_NM_ENGLH
               , MENU_NM_CHI
               , MENU_NM_JPNS
               , MENU_NM_ETC
               , MENU_GB
               , TREE_EXPN_YN
               , LAST_MODL_YN
               , MODL_ID
               , MODL_NM
               , INQ_USE_YN
               , INPT_USE_YN
               , UPT_USE_YN
               , DEL_USE_YN
               , PRT_USE_YN
               , EXPT_USE_YN
               , AUTH_GB
               , BASE_MENU_USE_YN
               , HQ_USE_YN
               , DM_USE_YN
               , BRANCH_USE_YN
               , DEV_USR_PER
               , PERF_RT
               , OLD_VER_MENU
               , OLD_VER_MENU_NM
               , admin_use
               , USR_MEMO
               , SYS_MEMO
               , PRNT_ID
               , ROW_LVL
               , ROW_ORD
               , ROW_STS
               , ROW_CLOS
               , FIND_NM
               , UPT_USR_NM
               , UPT_IP
               , UPT_DTTM
               , UPT_ID
               , UPT_UI
               , CRT_USR_NM
               , CRT_IP
               , CRT_DTTM
               , CRT_ID
               , CRT_UI
from module_mst
where  menu_nm like '가요%'
;

insert into module_mst (
                 PJT_ID
               , SITE_ID
               , MENU_ID
               , MENU_NM
               , MENU_NM_ENGLH
               , MENU_NM_CHI
               , MENU_NM_JPNS
               , MENU_NM_ETC
               , MENU_GB
               , TREE_EXPN_YN
               , LAST_MODL_YN
               , MODL_ID
               , MODL_NM
               , INQ_USE_YN
               , INPT_USE_YN
               , UPT_USE_YN
               , DEL_USE_YN
               , PRT_USE_YN
               , EXPT_USE_YN
               , AUTH_GB
               , BASE_MENU_USE_YN
               , HQ_USE_YN
               , DM_USE_YN
               , BRANCH_USE_YN
               , DEV_USR_PER
               , PERF_RT
               , OLD_VER_MENU
               , OLD_VER_MENU_NM
               , admin_use
               , USR_MEMO
               , SYS_MEMO
               , PRNT_ID
               , ROW_LVL
               , ROW_ORD
               , ROW_STS
               , ROW_CLOS
               , FIND_NM
               , UPT_USR_NM
               , UPT_IP
               , UPT_DTTM
               , UPT_ID
               , UPT_UI
               , CRT_USR_NM
               , CRT_IP
               , CRT_DTTM
               , CRT_ID
               , CRT_UI
) select         PJT_ID
               , SITE_ID
               , concat(@rownum := @rownum+1) as menu_id
               , MENU_NM
               , MENU_NM_ENGLH
               , MENU_NM_CHI
               , MENU_NM_JPNS
               , MENU_NM_ETC
               , MENU_GB
               , TREE_EXPN_YN
               , LAST_MODL_YN
               , MODL_ID
               , MODL_NM
               , INQ_USE_YN
               , INPT_USE_YN
               , UPT_USE_YN
               , DEL_USE_YN
               , PRT_USE_YN
               , EXPT_USE_YN
               , AUTH_GB
               , BASE_MENU_USE_YN
               , HQ_USE_YN
               , DM_USE_YN
               , BRANCH_USE_YN
               , DEV_USR_PER
               , PERF_RT
               , OLD_VER_MENU
               , OLD_VER_MENU_NM
               , admin_use
               , USR_MEMO
               , SYS_MEMO
               , PRNT_ID
               , ROW_LVL
               , ROW_ORD
               , ROW_STS
               , ROW_CLOS
               , FIND_NM
               , UPT_USR_NM
               , UPT_IP
               , UPT_DTTM
               , UPT_ID
               , UPT_UI
               , CRT_USR_NM
               , CRT_IP
               , CRT_DTTM
               , CRT_ID
               , CRT_UI
from module_mst ,  (SELECT @rownum :=30010) as R
where  prnt_id = '10005'
and row_sts = '0'
;







