SELECT 
        a.입고번호        as istt_numb
      , a.입고순번        as istt_seqn
      , a.입고창고        as istt_wrhs
      , a.입고구분        as istt_dvsn
      , a.입고일자        as istt_date
      , a.사업장          as bzpl
	  , (SELECT 회사명    FROM 회사정보 R     WHERE A.사업장 = R.회사코드)  AS bzpl_name
      , a.거래처          as cstm
	  , (SELECT 거래처명  FROM 거래처마스터 R WHERE A.거래처 = R.거래처코드)  AS cstm_name
      , a.완제품코드      as prod_code
      , a.품목코드        as item_code
	  , (SELECT 품명      FROM 품목정보 R     WHERE A.품목코드 = R.품목코드)  AS item_name
      , a.제품코드        as prod_code
	  , (SELECT 품명      FROM 품목정보 R     WHERE A.제품코드 = R.품목코드)  AS prod_name
      , a.재질            as mtrl
      , a.공정코드        as wkct_code
      , a.색상            as colr
      , a.색상2           as colr_2snd
      , a.box수량         as boxx_qntt
      , a.수량            as qntt
      , a.단가            as pric
      , a.금액            as amnt
      , a.화폐단위        as mney_unit
      , a.환율            as excg_rate
      , a.환산금액        as exng_amnt
      , a.부가세구분      as vatx_dvsn
      , a.부가세          as vatx
      , a.결재조건        as apvl_cond
      , a.lc번호          as lc_numb
      , a.lotno           as lott_numb
      , a.대금지불여부    as cpay_yorn
      , a.자동출고        as auto_ostt
      , a.확정            as cofm
      , a.입고접수순번    as istt_acpt_seqn
      , a.수정일시        as updt_dttm
      , a.수정자          as amdr
      , a.입력일시        as iput_dttm
      , a.입력자          as ipus
      , a.검사순번        as insp_seqn
      , a.비고            as remk_text
      , a.발주번호        as offr_numb
      , a.발주순번        as offr_seqn
      , a.긴급유무        as emgc_yorn
      , a.작업일자        as work_date
      , a.작업번호        as work_numb
      , a.영업담당        as sale_drtr
      , a.수주번호        as acpt_numb
      , a.수주항번        as acpt_seqn
      , a.확인            as cnfm
      , a.확인자          as cnfm_amen
      , a.확인일시        as cnfm_dttm
      , a.확인비고        as cnfm_remk_text
      , a.가단가          as temp_pric
      , a.매입마감비고    as puch_clos_remk_text
      , a.단가비고        as pric_remk_text
      , a.공제지급구분    as subt_paym_dvsn
FROM 제품입고대장 A
where convert(char(8),입고일자,112) = '20190507'
ORDER BY A.입고일자 DESC



-- 출고대기 현황

select a.* , a.qntt - a.ostt_qntt as not_ostt_qntt
from (
select 
          m.수주번호           as acpt_numb
        , m.수주구분           as acpt_dvsn
        , m.사업장             as bzpl
        , m.거래처             as cstm
	    , (SELECT 거래처명  FROM 거래처마스터 R WHERE m.거래처 = R.거래처코드)  AS cstm_name
        , m.영업부서           as sale_dept
        , m.영업담당           as sale_drtr
	    , (SELECT 성명      FROM 사원정보     R WHERE m.영업담당 = R.사원번호)  AS sale_drtr_name
        , m.수주일자           as acpt_date
        , m.판매구분           as sale_dvsn
        , m.지불조건           as paym_cond
        , m.결제조건           as apvl_cond
        , m.고객발주번호       as cstm_offr_numb
        , m.po종류             as pcod_kind
        , m.구분               as dvsn
        , m.원발주일           as orig_offr_date
        , m.비고구분           as remk_text_dvsn
        , m.사출칼라비고       as ejac_colr_remk_text
        , m.주의사항           as atpt
        , m.납품장소           as dlvy_loct
        , d.수주항번           as acpt_seqn
        , d.신규여부           as anew_yorn
        , d.품목코드           as item_code
        , d.품명               as item_name
        , d.규격               as spec
        , d.단위               as unit
        , d.수량               as qntt
		, isnull((select sum(수량) from 제품출고대장 r where d.수주번호 = r.수주번호 
		                                               and   d.수주항번 = r.수주항번),0) as ostt_qntt
        , d.단가               as pric
        , d.납기일자           as deli_date
        , d.비고               as remk_text
        , d.순번               as seqn
        , d.확인               as cnfm
        , d.확인자             as cnfm_amen
        , d.확인일시           as cnfm_dttm
        , d.납품처             as dlvy_offe
        , d.상태               as stat
        , d.고객품목코드       as cstm_item_code
        , d.생산대기           as prod_idle
        , d.확인2              as cnfm_2snd
        , d.확인일시2          as cnfm_dttm_2snd
        , d.납기확정일자2      as deli_fxdt_2snd
        , d.납기확정일자3      as deli_fxdt_3trd
        , d.확인자2            as cnfr_2snd
        , d.확인비고           as cnfm_remk_text
        , d.확인비고2          as cnfm_remk_text_2snd
        , d.출고검사일         as ostt_insp_date
        , d.납기일자변경비고   as dlvy_date_chge_remk_text
        , d.수주완료처리자     as acpt_cmpl_drtr
        , d.수주완료처리일시   as acpt_cmpl_dttm
        , d.수주완료           as acpt_cmpl
        , d.사양확정여부       as optn_cofm_yorn
from 수주대장 d , 수주서 m
where d.수주번호 = m.수주번호
) a






금형대장 query

select 
          a.관리번호     as MNGT_NUMB
        , a.명칭         as NAME
        , a.대장번호     as LEDG_NUMB
        , a.규격         as SPEC
        , a.공용여부     as COMM_USED_YORN
        , a.품목코드     as ITEM_CODE
        , a.중량         as WIGT
        , a.차종         as CRTY
        , a.작성일자     as DWUP_DATE
        , a.제작일자     as MAKE_DATE
        , a.구입년월     as PUCH_YYMM
        , a.제작업체     as MAKE_ENTR
        , a.제작업체명   as MAKE_ENTR_NAME
        , a.제작가격     as MAKE_PRIC
        , a.예상수명     as EXPC_LGLF
        , a.점검쇼트     as CHEK_SHOT
        , a.성형시간     as MKFC_TIME
        , a.CAVITY       as CAVITY
        , a.특수강재질   as SPCL_MTRL
        , a.제품재질     as PROD_MTRL
        , a.형종         as HYDV
        , a.형크기       as TYPE_SIZE
        , a.구분         as DVSN
        , a.폐기일자     as DSSE_DATE
        , a.표면처리     as SRFC_PROC
        , a.부품명       as PRTS_NAME
        , a.소유처       as OWNE_OFFE
        , a.인수처       as RCPT_OFFE
        , a.인수자       as ACTR
        , a.구조상       as STRU_UPPT
        , a.구조중       as STRU_MIDL
        , a.구조하       as STRU_LPRT
        , a.USECAV       as USECAV
        , a.주거래처     as MAIN_CSTM
        , a.브랜드       as BRND
        , a.결제일자     as APVL_DATE
        , a.보증수명     as GUTR_LGLF
        , a.총생산량     as TOTL_PROD_QNTT
        , a.상태         as STAT
        , a.근거문서     as BASS_DOCM
        , a.공장         as FTRY
        , a.제품용량     as PROD_CAPA
        , a.전금형번호   as BEFR_MOLD_NUMB
        , a.제공업체     as OFFR_ENTR
        , a.신규여부     as ANEW_YORN
        , a.톤당원료가   as TON_PERC_MTRL_PRIC
        , a.런너중량     as RUNR_WIGT
        , a.로스무게     as LOSS_WGHT
        , a.로스단위     as LOSS_UNIT
        , a.회수재료     as WDRW_MTRL
        , a.회수단위     as WDRW_UNIT
        , a.원료소요량   as MTRL_NDQT
        , a.착색비       as COLR_RATE
        , a.착색단위     as COLR_UNIT
        , a.비고         as REMK_TEXT
        , a.img          as img
        , a.금형사이즈   as MOLD_SIZE
        , a.온스         as ONZE
        , a.게이트형태   as GATE_TYPE
        , a.형체거리     as HYVW_DIST
        , a.주사용설비   as MAIN_USED_CVIC
        , a.관리업체     as MNGT_ENTR
from  금형대장 a		

where 1=1
and   a.관리번호 = '051'
and   a.명칭 like '%풀%'




금형수리대장

select 
          a.id            as idcd
        , a.금형번호      as mold_numb
        , a.수리일자      as repa_date
        , a.수리번호      as repa_numb
        , a.거래처        as cstm
        , a.수리부위      as repa_regn
        , a.수리내용      as repa_cont
        , a.조치비용      as trtm_exps
        , a.비고          as remk_text
        , a.사용자재      as used_mtrl
        , a.수정일시      as updt_dttm
        , a.수정자        as amdr
        , a.입력일시      as iput_dttm
        , a.입력자        as ipus
        , a.완료여부      as cmpl_yorn
        , a.유상여부      as cpst_yorn
        , a.입고일자      as istt_date
        , a.출고일자      as ostt_date
        , a.수리          as repa
        , a.수리자명      as repa_drtr_name
        , a.통보일자      as ifom_date
        , a.완료요구일    as cmpl_rqst_date
        , a.사출처        as ejac_offe
        , a.ecrno         as ecrno
        , a.econo         as ecod_numb
        , a.리비젼        as chge_degr
        , a.영업          as sale
        , a.생산          as prod
        , a.자재          as mtrl
        , a.qa            as qa
        , a.영업지원      as sale_aply
        , a.pt            as pt
        , a.문제점        as prob
        , a.부서코드      as dept_code
        , a.첨부          as attc
        , a.img           as img
        , a.품목코드      as item_code
        , a.재질          as mtrl
        , a.색상          as colr
        , a.수리구분      as repa_dvsn
        , a.금형사연계    as mold_cmpy_cnec
        , m.명칭          as name
        , m.대장번호      as ledg_numb
        , m.규격          as spec
        , m.공용여부      as comm_used_yorn
        , m.품목코드      as item_code
        , m.중량          as wigt
        , m.차종          as crty
        , m.작성일자      as dwup_date
        , m.제작일자      as make_date
        , m.구입년월      as puch_yymm
        , m.제작업체      as make_entr
        , m.제작업체명    as make_entr_name
        , m.제작가격      as make_pric
        , m.예상수명      as expc_lglf
        , m.점검쇼트      as chek_shot
        , m.성형시간      as mkfc_time
        , m.cavity        as cavity
        , m.특수강재질    as spcl_mtrl
        , m.제품재질      as prod_mtrl
        , m.형종          as hydv
        , m.형크기        as type_size
        , m.구분          as dvsn
        , m.폐기일자      as dsse_date
        , m.표면처리      as srfc_proc
        , m.부품명        as prts_name
        , m.소유처        as owne_offe
        , m.인수처        as rcpt_offe
        , m.인수자        as actr
        , m.구조상        as stru_uppt
        , m.구조중        as stru_midl
        , m.구조하        as stru_lprt
        , m.usecav        as usecav
        , m.주거래처      as main_cstm
        , m.브랜드        as brnd
        , m.결제일자      as apvl_date
        , m.보증수명      as gutr_lglf
        , m.총생산량      as totl_prod_qntt
        , m.상태          as stat
        , m.근거문서      as bass_docm
        , m.공장          as ftry
        , m.제품용량      as prod_capa
        , m.전금형번호    as befr_mold_numb
        , m.제공업체      as offr_entr
        , m.신규여부      as anew_yorn
        , m.톤당원료가    as ton_perc_mtrl_pric
        , m.런너중량      as runr_wigt
        , m.로스무게      as loss_wght
        , m.로스단위      as loss_unit
        , m.회수재료      as wdrw_mtrl
        , m.회수단위      as wdrw_unit
        , m.원료소요량    as mtrl_ndqt
        , m.착색비        as colr_rate
        , m.착색단위      as colr_unit
        , m.비고          as remk_text
        , m.img           as img
        , m.금형사이즈    as mold_size
        , m.온스          as onze
        , m.게이트형태    as gate_type
        , m.형체거리      as hyvw_dist
        , m.주사용설비    as main_used_cvic
        , m.관리업체      as mngt_entr
from  금형수리대장 a, 금형대장 m		

where a.금형번호 = m.관리번호











































































































































