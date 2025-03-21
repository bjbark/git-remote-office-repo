package com.sky.system.custom.symct.sale.prjtwork;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.utils.file.UploadItem;


@Service("symct.PrjtWorkService")
public class PrjtWorkService extends DefaultServiceHandler {

	public SqlResultMap getMaster(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select     a.pjod_idcd       , a.amnd_degr         , a.pjod_code       , a.pjod_dvcd		")
			.query("         , a.expt_dvcd       , a.cstm_idcd         , a.prjt_idcd       , a.regi_date		")
			.query("         , a.item_idcd       , a.esti_amnt         , a.cofm_yorn       , a.cofm_date		")
			.query("         , a.cofm_amnt       , a.crny_dvcd         , a.frst_exam_date  , a.send_exam_date	")
			.query("         , a.deli_date       , a.ppsl_deli_date    , a.strt_date       , a.endd_date		")
			.query("         , a.drtr_idcd       , a.dlvy_date         , a.last_yorn       , a.apvl_date		")
			.query("         , a.apvl_drtr_idcd  , a.cstm_item_code    , a.mold_size       , a.cavity			")
			.query("         , a.mold_wigt       , a.used_mtrl_name    , a.prod_wigt       , a.used_tons		")
			.query("         , a.pjod_name       , a.item_imge         , a.item_imge2							")
			.query("         , a.shkg_text       , a.mold_mtrl         , a.work_rsps_idcd						")
			.query("         , a.dsig_rsps_idcd  , a.modl_rsps_idcd    , a.rela_pjod_idcd						")
			.query("         , a.user_memo       , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.query("         , a.line_ordr       , a.line_stat         , a.line_clos       , a.find_name		")
			.query("         , a.updt_user_name  , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.query("         , a.updt_urif       , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.query("         , a.crte_idcd       , a.crte_urif													")
			.query("         , c.cstm_code       , c.cstm_name         , u1.user_name as drtr_name				")
			.query("         , u2.user_name as work_rsps_name          , u3.user_name as dsig_rsps_name			")
			.query("         , u4.user_name as modl_rsps_name													")
			.query("         , i.item_code       , i.item_spec         , a.item_name       , a.modl_name		")
			.query("         , p.prjt_code       , p.prjt_name													")
			.query("         , c.buss_name       , c.buss_numb         , c.buss_kind       , c.buss_type		")
			.query("         , c.corp_dvcd       , c.boss_name         , c.tele_numb       , c.faxi_numb		")
			.query("         , c.mail_addr       , c.hdph_numb													")
		;
		data.param
			.where("from pjod_mast a																			")
			.where("left outer join cstm_mast c  on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join user_mast u1 on a.drtr_idcd = u1.user_idcd									")
			.where("left outer join user_mast u2 on a.work_rsps_idcd = u2.user_idcd								")
			.where("left outer join user_mast u3 on a.dsig_rsps_idcd = u3.user_idcd								")
			.where("left outer join user_mast u4 on a.modl_rsps_idcd = u4.user_idcd								")
			.where("left outer join item_mast i  on a.item_idcd = i.item_idcd									")
			.where("left outer join prjt_mast p  on a.prjt_idcd = p.prjt_idcd									")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     a.regi_date >= :regi_date1     " , arg.getParamText("regi_date1" ))
			.where("and     a.regi_date <= :regi_date2     " , arg.getParamText("regi_date2" ))
			.where("and     a.prjt_idcd  = :prjt_idcd      " , arg.getParamText("prjt_idcd"  ))
			.where("and     a.cstm_idcd  = :cstm_idcd      " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_clos  = :line_clos      " , arg.getParamText("line_clos"  ))
			.where("and     a.deli_date >= :deli_date1     " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2     " , arg.getParamText("deli_date2" ))
			.where("and     a.pjod_idcd  = :pjod_idcd      " , arg.getParamText("pjod_idcd"  ))
			.where("and     a.drtr_idcd  = :drtr_idcd      " , arg.getParamText("drtr_idcd"  ))
			.where("and     a.expt_dvcd  = :expt_dvcd      " , arg.getParamText("expt_dvcd"  ))
			.where("and     a.line_stat  < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by  a.pjod_idcd desc, a.regi_date desc													")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.pjod_dvcd        , a.expt_dvcd        , a.cstm_idcd       , a.cstm_name			")
			.query("		, a.prjt_idcd        , a.regi_date        , a.pjod_name       , a.item_idcd			")
			.query("		, a.item_name        , a.item_spec        , a.modl_name       , a.esti_amnt			")
			.query("		, a.cofm_yorn        , a.cofm_date        , a.cofm_amnt       , a.crny_dvcd			")
			.query("		, a.frst_exam_date   , a.send_exam_date   , a.deli_date       , a.ppsl_deli_date	")
			.query("		, a.strt_date        , a.endd_date        , a.drtr_idcd       , a.dlvy_date			")
			.query("		, a.last_yorn        , a.apvl_date        , a.apvl_drtr_idcd  , a.cstm_item_code	")
			.query("		, a.mold_size        , a.cavity           , a.mold_wigt       , a.used_mtrl_name	")
			.query("		, a.prod_wigt        , a.used_tons        , a.pjod_idcd       , a.amnd_degr			")
			.query("		, a.pjod_code        , c.user_name as drtr_name               , a.item_imge			")
			.query("		, a.user_memo        , a.sysm_memo        , a.prnt_idcd       , a.drtr_idcd			")
			.query("		, a.line_stat        , a.line_clos        , a.find_name       , a.updt_user_name	")
			.query("		, a.updt_ipad        , a.updt_dttm        , a.updt_idcd       , a.updt_urif			")
			.query("		, a.crte_user_name   , a.crte_ipad        , a.crte_dttm       , a.crte_idcd			")
			.query("		, a.crte_urif        , b.buss_name        , b.buss_numb       , b.buss_kind			")
			.query("		, b.buss_type        , b.boss_name        , b.tele_numb       , b.faxi_numb			")
			.query("		, b.mail_addr        , b.hdph_numb        , c.user_name       , c.user_idcd			")
			.query("		, i.item_code        , a.item_imge2													")
		;
		data.param //퀴리문
			.where("from	pjod_mast a																			")
			.where("		left outer join item_mast i on a.item_idcd = i.item_idcd							")
			.where("		left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd							")
			.where("		left outer join user_mast c on a.drtr_idcd = c.user_idcd							")
			.where("where   1=1																					")
			.where("and     a.item_idcd  = :item_idcd", arg.getParameter("item_idcd"							))
			.where("and     a.pjod_idcd  = :pjod_idcd", arg.getParameter("pjod_idcd"							))
			.where("and     a.cstm_idcd  = :cstm_idcd", arg.getParameter("cstm_idcd"							))
			.where("and     a.drtr_idcd  = :user_idcd", arg.getParameter("user_idcd"							))
			.where("and	    a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     a.regi_date  between :fr_dt      " , arg.getParamText("fr_dt") )
			.where("                     and     :to_dt      " , arg.getParamText("to_dt") )
			.where("order by a.pjod_idcd desc																	")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}
	/*
	 * 마감 / 해지 건을 수정.
	 */
	public SqlResultMap getSale_Work_Lookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("with pjod as(")
			.query("     select  a.pjod_idcd        , a.amnd_degr               , a.cofm_amnt      , a.esti_amnt	")
			.query("           , a.expt_dvcd        , a.cstm_idcd               , a.cstm_name      , a.prjt_idcd	")
			.query("           , a.regi_date        , a.pjod_name               , a.item_idcd      , a.item_name	")
			.query("           , a.item_spec        , a.modl_name               , a.cofm_yorn      , a.find_name	")
			.query("           , a.line_stat																		")
			.query("     from    pjod_mast a																		")
			.query("     union all																					")
			.query("     select  a.pjod_idcd        , a.line_seqn as amnd_degr  , a.cofm_amnt      , a.esti_amnt	")
			.query("           , null as expt_dvcd  , b.cstm_idcd               , b.cstm_name      , b.prjt_idcd	")
			.query("           , a.regi_date        , b.pjod_name               , a.item_idcd      , a.item_name	")
			.query("           , a.item_spec        , b.modl_name               , a.cofm_yorn      , b.find_name	")
			.query("           , b.line_stat																		")
			.query("     from    pjod_dsig_chge a																	")
			.query("             left outer join pjod_mast b on a.pjod_idcd = b.pjod_idcd							")
			.query(")																								")
			.query("select * from pjod 																				")
			.query("where 1=1 																						")
			.query("and   pjod_idcd = :pjod_idcd      "	, arg.getParameter("pjod_idcd"))
			.query("and   modl_name = :modl_name      "	, arg.getParameter("modl_name"))
			.query("and   item_idcd = :item_idcd      "	, arg.getParameter("item_idcd"))
			.query("and   cstm_idcd = :cstm_idcd      "	, arg.getParameter("cstm_idcd"))
			.query("and   find_name like %:pjod_idcd% "	, arg.getParameter("find_name"))
			.query("order by pjod_idcd,amnd_degr 																	")
		;

		return data.selectForMap(page, rows, (page == 1)); //
	}
	public SqlResultMap setClose(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
//		String table		= arg.getParamText("table");
		String line_clos	= arg.getParamText("line_clos");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_close (			")
			.query("   :STOR       "  , hq			 )  // 본사코드
//			.query(" , :table      "  , table	 )  // Invoice 번호
			.query(" , :pjod_idcd  "  , invc_numb	 )  // Invoice 번호
			.query(" , :line_close "  , line_clos 	)  //
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap getDetail0(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.pjod_idcd           , a.line_seqn         , a.item_idcd         , a.item_name		")
			.query("        , a.item_spec           , a.modl_name         , a.mtrl_dvcd         , a.acpt_qntt		")
			.query("        , a.esti_pric           , a.esti_amnt         , a.cofm_yorn         , a.cofm_date		")
			.query("        , a.cofm_pric           , a.cofm_amnt         , a.sply_amnt         , a.vatx			")
			.query("        , a.ttsm_amnt           , a.deli_date         , a.ppsl_deli_date    , a.supl_dvcd		")
			.query("        , a.prod_cofm_yorn      , a.imge_1fst         , a.imge_2snd								")
			.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd           , a.crte_urif													")
			.query("        , i.item_code																			")
		;
		data.param
			.where("from pjod_item a																				")
			.where("left outer join pjod_mast b on a.pjod_idcd = b.pjod_idcd										")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where(",(select @curRank:=0) r																			")
			.where("where   1=1																						")
			.where("and     a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pjod_idcd																					")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.pjod_idcd           , a.amnd_degr         , a.amnd_resn         , a.pjod_code		")
			.query("        , a.pjod_dvcd           , a.expt_dvcd         , a.prjt_idcd         , a.regi_date		")
			.query("        , a.pjod_name           , a.item_idcd         , a.esti_amnt         , a.crny_dvcd		")
			.query("        , a.frst_exam_date      , a.send_exam_date    , a.deli_date         , a.strt_date		")
			.query("        , a.endd_date           , a.drtr_idcd         , a.dlvy_date         , a.last_yorn		")
			.query("        , a.apvl_date           , a.apvl_drtr_idcd    , a.amnd_date								")
			.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd           , a.crte_urif													")
			.query("        , b.cstm_idcd           , c.cstm_code         , c.cstm_name								")
			.query("        , i.item_code           , i.item_name         , i.item_spec         , i.modl_name		")
			.query("        , p.prjt_name           , u.user_name as apvl_drtr_name									")
			.query("        , c.buss_name           , c.buss_numb         , c.buss_kind         , c.buss_type		")
			.query("        , c.corp_dvcd           , c.boss_name         , c.tele_numb         , c.faxi_numb		")
			.query("        , c.mail_addr           , c.hdph_numb         , @curRank:=@curRank+1 as rank			")
		;
		data.param
			.where("from pjod_amnd a																				")
			.where("left outer join pjod_mast b on a.pjod_idcd = b.pjod_idcd										")
			.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd										")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("left outer join prjt_mast p on a.prjt_idcd = p.prjt_idcd										")
			.where("left outer join user_mast u on a.apvl_drtr_idcd = u.user_idcd									")
			.where(",(select @curRank:=0) r																			")
			.where("where   1=1																						")
			.where("and     a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by rank																					")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.pjod_idcd        , a.dsig_schd_dvcd   , a.id                   , a.seqn				")
			.query("        , a.name             , a.progress         , a.progressbyworklog    , a.relevance		")
			.query("        , a.type             , a.typeld           , a.description          , a.code				")
			.query("        , a.level            , a.status           , a.depends              , a.start			")
			.query("        , a.duration         , a.end              , a.startismilestone     , a.endismilestone	")
			.query("        , a.collapsed        , a.canwrite         , a.canadd               , a.candelete		")
			.query("        , a.canaddlssue      , a.haschild         , a.starttime            , a.endtime			")
			.query("        , a.wkct_idcd        , a.rsps_name        , a.ivst_pcnt            , a.need_mnhr		")
			.query("        , a.chge_coef																			")
			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd            , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat        , a.line_clos            , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm            , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad            , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif														")
		;
		data.param
			.where("from pjod_dsig_schd a																			")
			.where("where    1=1																					")
			.where("and      dsig_schd_dvcd = '1000'																")
			.where("and      a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"  ))
			.where("and      a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pjod_idcd																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a. pjod_idcd       , a.work_schd_dvcd    , a.id                  , a.seqn					")
			.query("        , a.name             , a.progress          , a.progressbyworklog   , a.relevance			")
			.query("        , a.type             , a.typeld            , a.description         , a.code					")
			.query("        , a.level            , a.status            , a.depends             , a.start				")
			.query("        , a.duration         , a.end               , a.startismilestone    , a.endismilestone		")
			.query("        , a.collapsed        , a.canwrite          , a.canadd              , a.candelete			")
			.query("        , a.canaddlssue      , a.haschild          , a.starttime           , a.endtime				")
			.query("        , a.wkct_idcd																				")
			.query("        , a.user_memo        , a.sysm_memo         , a.prnt_idcd           , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat         , a.line_clos           , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad         , a.updt_dttm           , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name    , a.crte_ipad           , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif															")
			.query("        , w.wkct_code        , w.wkct_name         , u.user_name as rsps_name						")
			.query("        ,(select count(pjod_idcd) from pjod_work_assigs												")
			.query("                                  where a.pjod_idcd = pjod_idcd and work_schd_dvcd = '1000'			")
			.query("                                  and a.id = id) as ivst_pcnt										")
			.query("        ,a.duration * (select count(pjod_idcd) from pjod_work_assigs								")
			.query("                       where a.pjod_idcd = pjod_idcd and work_schd_dvcd = '1000'					")
			.query("                       and a.id = id) as need_mnhr													")
		;
		data.param
			.where("from pjod_work_schd a																				")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd											")
			.where("left outer join pjod_work_assigs p on a.pjod_idcd = p.pjod_idcd and p.work_schd_dvcd = '1000'		")
			.where("                                      and a.id = p.id and p.roleid = 'tmp_1'						")
			.where("left outer join user_mast u on p.resourceid = u.user_idcd											")
			.where("where    1=1																						")
			.where("and      a.work_schd_dvcd = '1000'																	")
			.where("and      a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"  ))
			.where("and      a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pjod_idcd																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail4(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.pjod_idcd        , a.line_seqn       , a.cnsl_dttm        , a.drtr_idcd			")
			.query("        , a.cstm_dept_name   , a.cstm_drtr_name  , a.cnsl_cont        , a.cost_yorn			")
			.query("        , a.dsig_yorn        , a.puch_yorn       , a.otod_yorn        , a.prod_yorn			")
			.query("        , a.rply_reqt_yorn   , a.rply_mthd_dvcd  , a.rply_drtr_idcd   , a.rply_dttm			")
			.query("        , a.rply_cont        , a.remk_text       , a.uper_seqn        , a.disp_seqn			")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , u.user_name as drtr_name															")
		;
		data.param
			.where("from pjod_cnsl a																			")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("where    1=1																				")
			.where("and      a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"  ))
			.where("and      a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pjod_idcd																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getInvoice(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select     a.pjod_idcd       , a.amnd_degr         , a.pjod_code       , a.pjod_dvcd		")
			.query("         , a.expt_dvcd       , a.cstm_idcd         , a.prjt_idcd       , a.regi_date		")
			.query("         , a.item_idcd       , a.esti_amnt         , a.cofm_yorn       , a.cofm_date		")
			.query("         , a.cofm_amnt       , a.crny_dvcd         , a.frst_exam_date  , a.send_exam_date	")
			.query("         , a.deli_date       , a.ppsl_deli_date    , a.strt_date       , a.endd_date		")
			.query("         , a.drtr_idcd       , a.dlvy_date         , a.last_yorn       , a.apvl_date		")
			.query("         , a.apvl_drtr_idcd  , a.cstm_item_code    , a.mold_size       , a.cavity			")
			.query("         , a.mold_wigt       , a.used_mtrl_name    , a.prod_wigt       , a.used_tons		")
			.query("         , a.pjod_name       , a.item_imge         , a.item_imge2      , a.cstm_item_code	")
			.query("         , a.shkg_text       , a.mold_mtrl         , a.work_rsps_idcd						")
			.query("         , a.dsig_rsps_idcd  , a.modl_rsps_idcd    , a.rela_pjod_idcd						")
			.query("         , a.user_memo       , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.query("         , a.line_ordr       , a.line_stat         , a.line_clos       , a.find_name		")
			.query("         , a.updt_user_name  , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.query("         , a.updt_urif       , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.query("         , a.crte_idcd       , a.crte_urif													")
			.query("         , c.cstm_code       , c.cstm_name         , u1.user_name as drtr_name				")
			.query("         , u2.user_name as work_rsps_name          , u3.user_name as dsig_rsps_name			")
			.query("         , u4.user_name as modl_rsps_name													")
			.query("         , i.item_code       , i.item_spec         , a.item_name       , a.modl_name		")
			.query("         , p.prjt_code       , p.prjt_name													")
			.query("         , c.buss_name       , c.buss_numb         , c.buss_kind       , c.buss_type		")
			.query("         , c.corp_dvcd       , c.boss_name         , c.tele_numb       , c.faxi_numb		")
			.query("         , c.mail_addr       , c.hdph_numb													")
			.query("from pjod_mast a																			")
			.query("left outer join cstm_mast c  on a.cstm_idcd       = c.cstm_idcd								")
			.query("left outer join user_mast u1 on a.drtr_idcd       = u1.user_idcd							")
			.query("left outer join user_mast u2 on a.work_rsps_idcd  = u2.user_idcd							")
			.query("left outer join user_mast u3 on a.dsig_rsps_idcd  = u3.user_idcd							")
			.query("left outer join user_mast u4 on a.modl_rsps_idcd  = u4.user_idcd							")
			.query("left outer join item_mast i  on a.item_idcd       = i.item_idcd								")
			.query("left outer join prjt_mast p  on a.prjt_idcd       = p.prjt_idcd								")
			.query("where    1=1																				")
			.query("and      a.pjod_idcd = :pjod_idcd        " , arg.getParameter("pjod_idcd"					))
			.query("and      a.line_stat < :line_stat        " , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("order by a.pjod_idcd																		")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.pjod_idcd        , a.line_seqn       , a.colt_dvcd        , a.colt_degr			")
				.query("        , a.plan_date        , a.plan_amnt       , a.colt_date        , a.colt_amnt			")
				.query("        , a.drtr_idcd																		")
				.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
				.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
				.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
				.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
				.query("        , a.crte_idcd        , a.crte_urif													")
				.query("from pjod_colt a																			")
				.query("where    1=1																				")
				.query("and      a.pjod_idcd   = :pjod_idcd    " , arg.getParamText("pjod_idcd"))
				.query("and      a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
				.query("order by a.pjod_idcd																		")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				data.param
					.table("pjod_mast						")
					.where("where pjod_idcd  = :pjod_idcd	")

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;data.attach(Action.update);

			} else {
				data.param
				.table("pjod_mast						")
				.where("where pjod_idcd	= :pjod_idcd	")

				.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"))

				.update("amnd_degr"			, row.getParameter("amnd_degr"))
				.update("pjod_code"			, row.getParameter("pjod_code"))
				.update("pjod_dvcd"			, row.getParameter("pjod_dvcd"))
				.update("expt_dvcd"			, row.getParameter("expt_dvcd"))
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"))
				.update("cstm_name"			, row.getParameter("cstm_name"))
				.update("prjt_idcd"			, row.getParameter("prjt_idcd"))
				.update("regi_date"			, row.getParameter("regi_date"))
				.update("pjod_name"			, row.getParameter("pjod_name"))
				.update("item_idcd"			, row.getParameter("item_idcd"))
				.update("item_name"			, row.getParameter("item_name"))
				.update("item_spec"			, row.getParameter("item_spec"))
				.update("modl_name"			, row.getParameter("modl_name"))
				.update("esti_amnt"			, row.getParameter("esti_amnt"))
				.update("cofm_yorn"			, row.getParameter("cofm_yorn"))
				.update("cofm_date"			, row.getParameter("cofm_date"))
				.update("cofm_amnt"			, row.getParameter("cofm_amnt"))
				.update("crny_dvcd"			, row.getParameter("crny_dvcd"))
				.update("frst_exam_date"	, row.getParameter("frst_exam_date"))
				.update("send_exam_date"	, row.getParameter("send_exam_date"))
				.update("deli_date"			, row.getParameter("deli_date"))
				.update("ppsl_deli_date"	, row.getParameter("ppsl_deli_date"))
				.update("strt_date"			, row.getParameter("strt_date"))
				.update("endd_date"			, row.getParameter("endd_date"))
				.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
				.update("dlvy_date"			, row.getParameter("dlvy_date"))
				.update("last_yorn"			, row.getParameter("last_yorn"))
				.update("apvl_date"			, row.getParameter("apvl_date"))
				.update("apvl_drtr_idcd"	, row.getParameter("apvl_drtr_idcd"))
				.update("cstm_item_code"	, row.getParameter("cstm_item_code"))
				.update("mold_size"			, row.getParameter("mold_size"))
				.update("cavity"			, row.getParameter("cavity"))
				.update("mold_wigt"			, row.getParameter("mold_wigt"))
				.update("used_mtrl_name"	, row.getParameter("used_mtrl_name"))
				.update("prod_wigt"			, row.getParameter("prod_wigt"))
				.update("used_tons"			, row.getParameter("used_tons"))
				.update("shkg_text"			, row.getParameter("shkg_text"))
				.update("mold_mtrl"			, row.getParameter("mold_mtrl"))
				.update("work_rsps_idcd"	, row.getParameter("work_rsps_idcd"))
				.update("dsig_rsps_idcd"	, row.getParameter("dsig_rsps_idcd"))
				.update("modl_rsps_idcd"	, row.getParameter("modl_rsps_idcd"))
				.update("rela_pjod_idcd"	, row.getParameter("rela_pjod_idcd"))
				.update("find_name"			, row.getParamText("pjod_idcd").trim()
											+ " "
											+ row.getParamText("item_name").trim()
											+ " "
											+ row.getParamText("cstm_idcd").trim()
											+ " "
											+ row.getParamText("cstm_name").trim())
				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.modify);
				data.execute();
				data.clear();

				data.param
					.table("item_mast							")
					.where("where item_idcd		= :item_idcd	")		//품목ID

					.unique("item_idcd"			, row.fixParameter("item_idcd"			))		//품목ID

					.update("item_code"			, row.getParameter("item_code"			))		//품목코드
					.update("item_name"			, row.getParameter("item_name"			))		//품목명
					.update("item_spec"			, row.getParameter("item_spec"			))		//품목규격
					.update("modl_name"			, row.getParameter("modl_name"			))		//모델명
					.update("acct_bacd"			, "4000"								)		//계정분류코드

					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;data.attach(Action.modify);
				data.execute();
				data.clear();

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
			}
		}
	data.execute();
	return null;
	}

	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {

		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if(rowaction == Action.delete){
				data.param
					.table("pjod_colt					")
					.where("where pjod_idcd = :pjod_idcd")
					.where("and   line_seqn = :line_seqn")

					.unique("pjod_idcd"				, row.fixParameter("pjod_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))
				;data.attach(Action.delete);
				data.execute();
				data.clear();
			}else{
				data.param
					.table("pjod_colt					")
					.where("where pjod_idcd = :pjod_idcd")
					.where("and   line_seqn = :line_seqn")

					.unique("pjod_idcd"				, row.fixParameter("pjod_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))
				;data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("pjod_colt					")
					.where("where pjod_idcd	= :pjod_idcd")
					.where("where line_seqn	= :line_seqn")

					.unique("pjod_idcd"				, row.fixParameter("pjod_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))

					.update("colt_dvcd"				, row.getParameter("colt_dvcd"))
					.update("colt_degr"				, row.getParameter("colt_degr"))
					.update("plan_date"				, row.getParameter("plan_date"))
					.update("plan_amnt"				, row.getParameter("plan_amnt"))
					.update("colt_date"				, row.getParameter("colt_date"))
					.update("colt_amnt"				, row.getParameter("colt_amnt"))
					.update("drtr_idcd"				, row.getParameter("drtr_idcd"))

					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.insert);
			}
		}
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
				data.param
					.table("pjod_item													")
					.where("where pjod_idcd = :pjod_idcd								")		//프로젝트수주id
					.where("and   line_seqn = :line_seqn								")		//순번

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("item_name"			, row.getParameter("item_name"			))		//품목명
					.update("item_spec"			, row.getParameter("item_spec"			))		//품목규격
					.update("modl_name"			, row.getParameter("modl_name"			))		//모델명
					.update("mtrl_dvcd"			, row.getParameter("mtrl_dvcd"			))		//재질구분
					.update("acpt_qntt"			, row.getParameter("acpt_qntt"			))		//수주수량
					.update("esti_pric"			, row.getParameter("esti_pric"			))		//견적단가
					.update("esti_amnt"			, row.getParameter("esti_amnt"			))		//견적금액
					.update("cofm_yorn"			, row.getParameter("cofm_yorn"			))		//확정여부
					.update("cofm_date"			, row.getParameter("cofm_date"			))		//확정일자
					.update("cofm_pric"			, row.getParameter("cofm_pric"			))		//확정단가
					.update("cofm_amnt"			, row.getParameter("cofm_amnt"			))		//확정금액
					.update("sply_amnt"			, row.getParameter("sply_amnt"			))		//공급가액
					.update("vatx"				, row.getParameter("vatx"				))		//부가세
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))		//합계금액
					.update("deli_date"			, row.getParameter("deli_date"			))		//납기일자
					.update("ppsl_deli_date"	, row.getParameter("ppsl_deli_date"		))		//제안납기일자
					.update("supl_dvcd"			, row.getParameter("supl_dvcd"			))		//조달구분
					.update("prod_cofm_yorn"	, row.getParameter("prod_cofm_yorn"		))		//생산확정여부
					.update("imge_1fst"			, row.getParameter("imge_1fst"			))		//이미지1
					.update("imge_2snd"			, row.getParameter("imge_2snd"			))		//이미지2

					.update("user_memo"			, row.getParameter("user_memo"			))		//메모사항

					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(rowaction);
			}
		data.execute();
		return null ;
	}

	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("pjod_amnd						")
					.where("where pjod_idcd  = :pjod_idcd	")
					.where("and   amnd_degr  = :amnd_degr	")

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"	))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"	))
					;data.attach(Action.delete);
			} else {
				data.param
					.table("pjod_amnd						")
					.where("where pjod_idcd  = :pjod_idcd	")
					.where("and   amnd_degr  = :amnd_degr	")

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"	))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"	))

					.update("pjod_code"			, row.getParameter("pjod_code"))
					.update("pjod_dvcd"			, row.getParameter("pjod_dvcd"))
					.update("expt_dvcd"			, row.getParameter("expt_dvcd"))
					.update("prjt_idcd"			, row.getParameter("prjt_idcd"))
					.update("regi_date"			, row.getParameter("regi_date"))
					.update("amnd_date"			, row.getParameter("amnd_date"))
					.update("amnd_resn"			, row.getParameter("amnd_resn"))
					.update("pjod_name"			, row.getParameter("pjod_name"))
					.update("item_idcd"			, row.getParameter("item_idcd"))
					.update("item_name"			, row.getParameter("item_name"))
					.update("item_spec"			, row.getParameter("item_spec"))
					.update("modl_name"			, row.getParameter("modl_name"))
					.update("esti_amnt"			, row.getParameter("esti_amnt"))
					.update("crny_dvcd"			, row.getParameter("crny_dvcd"))
					.update("frst_exam_date"	, row.getParameter("frst_exam_date"))
					.update("send_exam_date"	, row.getParameter("send_exam_date"))
					.update("deli_date"			, row.getParameter("deli_date"))
					.update("strt_date"			, row.getParameter("strt_date"))
					.update("endd_date"			, row.getParameter("endd_date"))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
					.update("dlvy_date"			, row.getParameter("dlvy_date"))
					.update("apvl_date"			, row.getParameter("apvl_date"))
					.update("apvl_drtr_idcd"	, row.getParameter("apvl_drtr_idcd"))

					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("pjod_amnd						")
					.where("where pjod_idcd  = :pjod_idcd	")
					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"	))
					.update("last_yorn"			,"0")  // 모두 최종이 아닌 것으로 setting
				;data.attach(Action.update);
				data.execute();
				data.clear();

				// 최종 amend를 찾아서 last_yorn에 "1"을 update 한다.
				data.param
					.query("update pjod_amnd  set last_yorn = '1'															")
					.query("where pjod_idcd = :pjod_idcd2 " , row.fixParameter("pjod_idcd"	))
					.query("and   amnd_degr = (select amnd_degr																")
					.query("                   from   pjod_amnd																")
					.query("                   where  pjod_idcd = :pjod_idcd3 " ,row.fixParameter("pjod_idcd"	))
					.query("                   order  by amnd_date desc														")
					.query("                   limit  1																		")
					.query("                  )																				")
				;data.attach(Action.direct);
				data.execute();
				data.clear();

				data.param
					.query("update pjod_mast a inner join pjod_amnd b on a.pjod_idcd = b.pjod_idcd and b.last_yorn = '1'	")
					.query("       set a.amnd_degr       = b.amnd_degr														")
					.query("         , a.pjod_code       = b.pjod_code														")
					.query("         , a.pjod_dvcd       = b.pjod_dvcd														")
					.query("         , a.expt_dvcd       = b.expt_dvcd														")
					.query("         , a.prjt_idcd       = b.prjt_idcd														")
					.query("         , a.regi_date       = b.regi_date														")
					.query("         , a.pjod_name       = b.pjod_name														")
					.query("         , a.item_idcd       = b.item_idcd														")
					.query("         , a.item_name       = b.item_name														")
					.query("         , a.item_spec       = b.item_spec														")
					.query("         , a.modl_name       = b.modl_name														")
					.query("         , a.esti_amnt       = b.esti_amnt														")
					.query("         , a.crny_dvcd       = b.crny_dvcd														")
					.query("         , a.frst_exam_date  = b.frst_exam_date													")
					.query("         , a.send_exam_date  = b.send_exam_date													")
					.query("         , a.deli_date       = b.deli_date														")
					.query("         , a.strt_date       = b.strt_date														")
					.query("         , a.endd_date       = b.endd_date														")
					.query("         , a.drtr_idcd       = b.drtr_idcd														")
					.query("         , a.dlvy_date       = b.dlvy_date														")
					.query("         , a.last_yorn       = b.last_yorn														")
					.query("         , a.apvl_date       = b.apvl_date														")
					.query("         , a.apvl_drtr_idcd  = b.apvl_drtr_idcd													")
					.query("where a.pjod_idcd  = :pjod_idcd4 " ,row.fixParameter("pjod_idcd"	))
				;data.attach(Action.direct);
				data.execute();
				data.clear();

				data.param
					.query("update pjod_mast set															")
					.query("      last_yorn = 1																")
					.query("and   pjod_idcd   = :pjod_idcd5" , row.fixParameter("pjod_idcd"					))
					.query("and   amnd_degr   = :amnd_degr2" , row.fixParameter("amnd_degr"					))
				;data.attach(Action.direct);
				data.execute();
				data.clear();
			}
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("pjod_mast")
					.where("where pjod_idcd  = :pjod_idcd")

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);
			} else {
				data.param
					.table("pjod_mast")
					.where("where pjod_idcd	= :pjod_idcd" )

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"))

					.update("amnd_degr"			, row.getParameter("amnd_degr"))
					.update("pjod_code"			, row.getParameter("pjod_code"))
					.update("pjod_dvcd"			, row.getParameter("pjod_dvcd"))
					.update("expt_dvcd"			, row.getParameter("expt_dvcd"))
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"))
					.update("cstm_name"			, row.getParameter("cstm_name"))
					.update("prjt_idcd"			, row.getParameter("prjt_idcd"))
					.update("regi_date"			, row.getParameter("regi_date"))
					.update("pjod_name"			, row.getParameter("pjod_name"))
					.update("item_idcd"			, row.getParameter("item_idcd"))
					.update("item_name"			, row.getParameter("item_name"))
					.update("item_spec"			, row.getParameter("item_spec"))
					.update("modl_name"			, row.getParameter("modl_name"))
					.update("esti_amnt"			, row.getParameter("esti_amnt"))
					.update("cofm_yorn"			, row.getParameter("cofm_yorn"))
					.update("cofm_date"			, row.getParameter("cofm_date"))
					.update("cofm_amnt"			, row.getParameter("cofm_amnt"))
					.update("crny_dvcd"			, row.getParameter("crny_dvcd"))
					.update("frst_exam_date"	, row.getParameter("frst_exam_date"))
					.update("send_exam_date"	, row.getParameter("send_exam_date"))
					.update("deli_date"			, row.getParameter("deli_date"))
					.update("ppsl_deli_date"	, row.getParameter("ppsl_deli_date"))
					.update("strt_date"			, row.getParameter("strt_date"))
					.update("endd_date"			, row.getParameter("endd_date"))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
					.update("dlvy_date"			, row.getParameter("dlvy_date"))
					.update("last_yorn"			, row.getParameter("last_yorn"))
					.update("apvl_date"			, row.getParameter("apvl_date"))
					.update("apvl_drtr_idcd"	, row.getParameter("apvl_drtr_idcd"))
					.update("cstm_item_code"	, row.getParameter("cstm_item_code"))
					.update("mold_size"			, row.getParameter("mold_size"))
					.update("cavity"			, row.getParameter("cavity"))
					.update("mold_wigt"			, row.getParameter("mold_wigt"))
					.update("used_mtrl_name"	, row.getParameter("used_mtrl_name"))
					.update("prod_wigt"			, row.getParameter("prod_wigt"))
					.update("used_tons"			, row.getParameter("used_tons"))

					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setOk(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String invc_numb	= arg.getParamText("invc_numb") ;
		String cofm_yorn	= arg.getParamText("cofm_yorn");

			data.param
			.query("call auto_project_ok (					")
			.query("   :pjod_idcd		" , invc_numb	)  // Invoice 번호
			.query(" , :cofm_yorn		" , cofm_yorn	)  // 확정여부
			.query(" ) 									")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}

	public SqlResultMap setCopy(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String deli_date	= arg.getParamText("deli_date") ;
		String dsig_work_1	= arg.getParamText("dsig_work_1") ;
		String dsig_work_2	= arg.getParamText("dsig_work_2") ;
		String work_date_1	= arg.getParamText("work_date_1") ;
		String work_date_2	= arg.getParamText("work_date_2") ;
		String apnd_file	= arg.getParamText("apnd_file") ;
		String cole_date	= arg.getParamText("cole_date") ;
		String bom			= arg.getParamText("bom") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_project_copy (			")
			.query("   :invc_numb "    , invc_numb		)  // 주문번호
			.query(" , :deli_date "    , deli_date		)  // 납기일자
			.query(" , :dsig_work_1 "  , dsig_work_1	)  // 설계 대일정
			.query(" , :dsig_work_2 "  , dsig_work_2	)  // 설계 세부일정
			.query(" , :work_date_1 "  , work_date_1	)  // 작업 대일정
			.query(" , :work_date_2 "  , work_date_2	)  // 작업상세일정
			.query(" , :apnd_file "    , apnd_file		)  // 첨부파일
			.query(" , :cole_date "    , cole_date		)  // 수금일정
			.query(" , :bom "          , bom			)  // BOM
			.query(" ) 									")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setAmend(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String pjod_idcd	= arg.getParamText("pjod_idcd") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (pjod_idcd.length() == 0) {
			pjod_idcd = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_project_amend (			")
			.query(" :pjod_idcd "  , pjod_idcd	)  // 주문번호
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
		.query("select count(*) as line_seqn																")
		;
		data.param
		.where("from		pjod_cnsl a   																	")
		.where("where		1=1																				")
		.where("and			a.pjod_idcd = :pjod_idcd		" , arg.getParameter("pjod_idcd"				))
		.where("and			a.line_stat = 0																	")
		;
		return data.selectForMap();
	}
	public SqlResultMap deleteMaster(HttpRequestArgument arg) throws Exception {
		// TODO
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("pjod_mast						")
			.where("where pjod_idcd  = :pjod_idcd	")

			.unique("pjod_idcd"			, arg.fixParameter("pjod_idcd"		))
			.update("line_stat"			, 2									)
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
		;
		data.attach(Action.update);
		data.execute();
		return null;
	}

	public SqlResultMap setConsulting(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
				data.param
					.table("pjod_cnsl")
					.where("where pjod_idcd = :pjod_idcd" )
					.where("and   line_seqn = :line_seqn" )

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))

					.update("cnsl_dttm"			, row.getParameter("cnsl_dttm"))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
					.update("cstm_dept_name"	, row.getParameter("cstm_dept_name"))
					.update("cstm_drtr_name"	, row.getParameter("cstm_drtr_name"))
					.update("cnsl_cont"			, row.getParameter("cnsl_cont"))
					.update("cost_yorn"			, row.getParameter("cost_yorn"))
					.update("dsig_yorn"			, row.getParameter("dsig_yorn"))
					.update("puch_yorn"			, row.getParameter("puch_yorn"))
					.update("otod_yorn"			, row.getParameter("otod_yorn"))
					.update("prod_yorn"			, row.getParameter("prod_yorn"))
					.update("rply_reqt_yorn"	, row.getParameter("rply_reqt_yorn"))
					.update("rply_mthd_dvcd"	, row.getParameter("rply_mthd_dvcd"))
					.update("rply_drtr_idcd"	, row.getParameter("rply_drtr_idcd"))
					.update("rply_dttm"			, row.getParameter("rply_dttm"))
					.update("rply_cont"			, row.getParameter("rply_cont"))

					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		data.execute();
		return null ;
	}

	public SqlResultMap setResult(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
				data.param
					.table("pjod_cnsl")
					.where("where pjod_idcd = :pjod_idcd" )
					.where("and   line_seqn = :line_seqn" )

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))

					.update("cnsl_dttm"			, row.getParameter("cnsl_dttm"))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
					.update("cstm_dept_name"	, row.getParameter("cstm_dept_name"))
					.update("cstm_drtr_name"	, row.getParameter("cstm_drtr_name"))
					.update("cnsl_cont"			, row.getParameter("cnsl_cont"))
					.update("cost_yorn"			, row.getParameter("cost_yorn"))
					.update("dsig_yorn"			, row.getParameter("dsig_yorn"))
					.update("puch_yorn"			, row.getParameter("puch_yorn"))
					.update("otod_yorn"			, row.getParameter("otod_yorn"))
					.update("prod_yorn"			, row.getParameter("prod_yorn"))
					.update("rply_reqt_yorn"	, row.getParameter("rply_reqt_yorn"))
					.update("rply_mthd_dvcd"	, row.getParameter("rply_mthd_dvcd"))
					.update("rply_drtr_idcd"	, row.getParameter("rply_drtr_idcd"))
					.update("rply_dttm"			, row.getParameter("rply_dttm"))
					.update("rply_cont"			, row.getParameter("rply_cont"))

					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		data.execute();
		return null ;
	}
	public SqlResultMap upload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
		DataMessage data = arg.newStorage("POS");
		String chk1 = (String)arg.getParameter("chk1");
		String chk2 = (String)arg.getParameter("chk2");
		byte[] returnByte =null;
		byte[] returnByte2 =null;
		ByteArrayOutputStream baos =  new ByteArrayOutputStream();
		ByteArrayOutputStream baos2 =  new ByteArrayOutputStream();
		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.


		ByteArrayInputStream thumnailInputStream = null;
		ByteArrayInputStream thumnailInputStream2 = null;
		// 이미지일 경우 섬네일 과정을 거친다.
		if(file[0].getFileItem().getName()==null||file[0].getFileItem().getName()==""){
		}else{
	        Thumbnails.of(file[0].getInputStream()).size(240, 180).toOutputStream(baos);
	        thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
		}
		if(file[1].getFileItem().getName()==null||file[1].getFileItem().getName()==""){
		}else{
	        Thumbnails.of(file[1].getInputStream()).size(240, 180).toOutputStream(baos2);
	        thumnailInputStream2 = new ByteArrayInputStream(baos2.toByteArray());
		}
		int readCount = 0;
		int readCount2 = 0;
		try{
			if(chk1.equals("0")){
				data.param
					.query("update pjod_mast					")
					.query("       set item_imge = ''			")
					.query("       where pjod_idcd = :pjod_idcd", arg.getParameter("pjod_idcd"))
				;data.attach();
				data.execute();
				data.clear();
			}else if(chk1.equals("1")){
				byte[] buf = new byte[1024];
				while ((readCount = thumnailInputStream.read(buf))>0) {
					 baos.write(buf,0,readCount);
				}
				returnByte = baos.toByteArray();

				data.param
					.table("pjod_mast")
					.where("where pjod_idcd	= :pjod_idcd" )

					.unique("pjod_idcd"				, arg.fixParameter("pjod_idcd"))

					.update("item_imge",returnByte)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			if(chk2.equals("0")){
				data.param
					.query("update pjod_mast					")
					.query("       set item_imge2 = ''			")
					.query("       where pjod_idcd = :pjod_idcd", arg.getParameter("pjod_idcd"))
				;data.attach();
				data.execute();
				data.clear();
			}else if(chk2.equals("1")){
				byte[] buf2 = new byte[1024];
				while ((readCount2 = thumnailInputStream2.read(buf2))>0) {
					 baos2.write(buf2,0,readCount2);
				}
				returnByte2 = baos2.toByteArray();

				data.param
					.table("pjod_mast")
					.where("where pjod_idcd	= :pjod_idcd" )

					.unique("pjod_idcd"				, arg.fixParameter("pjod_idcd"))

					.update("item_imge2",returnByte2)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
	   	} catch(Exception ex) {
			throw ex;
		} finally {
			if(baos != null) baos.close();
			if(thumnailInputStream != null) thumnailInputStream.close();
			if(thumnailInputStream2 != null) thumnailInputStream2.close();
		}

		return map;
	}



	/*
	 * 출고
	 */

	public SqlResultMap setRelease(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		data = new DataMessage(hq+".POS");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		System.out.println(arg.getParamText("param"));
		data.param
			.query("call acpt_to_ostt_v1 (				")
			.query("   :param       "  , arg.fixParameter("param")		)
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}


	/**
	 * 신양 엑셀업로드
	 *
	 * @param arg
	 * @throws Exception
	 */

	public void setExcel(HttpRequestArgument arg, SqlResultRow item , String cstm ) throws Exception {
		DataMessage data = arg.newStorage("POS");

			String n = arg.getParamText("numb");

			data.param
				.table ("pjod_mast")
				.where ("where pjod_idcd = :pjod_idcd")
				.where ("and   amnd_degr = :amnd_degr")

				.unique("pjod_idcd"        , arg.fixParameter("numb"))				//프로젝트수주ID
				.unique("amnd_degr"        , 0	)									//AMD차수

				.update("item_name"        , item.getParameter("pjod_code"))		//품명
				.update("cstm_item_code"   , item.getParameter("cstm_item_code"))	//고객품목코드
				.update("cstm_idcd"        , cstm	)								//거래처ID
				.update("cstm_name"        , item.getParameter("cstm_name"))		//거래처명
				.update("item_idcd"        , n	)									//품목ID
				.update("cofm_yorn"        , 1	)									//확정여부
				.update("regi_date"        , item.getParameter("regi_date"))		//수
				.update("deli_date"        , item.getParameter("deli_date"))		//납기일자

				.update("find_name"        , item.getParameter("") +  "")
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

	}

	public void setExcelDetail(HttpRequestArgument arg, SqlResultRow item) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table ("pjod_item")
			.where ("where pjod_idcd = :pjod_idcd")
			.where ("and   line_seqn = :line_seqn")

			.unique("pjod_idcd"        , arg.fixParameter("numb"))
			.unique("line_seqn"        , item.fixParameter("line_seqn"))

			.update("item_idcd"        , item.getParameter("item_idcd"))		//품목ID
			.update("item_name"        , item.getParameter("item_name"))		//품명
			.update("acpt_qntt"        , item.getParameter("acpt_qntt"))		//수주수량
			.update("line_stat"        , 0	)
			.update("line_clos"        , 0	)
			.update("updt_ipad"        , arg.remoteAddress )
			.insert("crte_ipad"        , arg.remoteAddress )
			.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
		;
		data.attach(Action.insert);
		data.execute();
		data.clear();

		data.param
			.table ("item_mast")
			.where ("where item_idcd = :item_idcd")

			.unique("item_idcd"        , item.fixParameter("item_idcd"))

			.update("item_code"        , item.getParameter("item_idcd"))		//품목ID
			.update("item_name"        , item.getParameter("item_name"))		//품명
			.update("line_stat"        , 0	)
			.update("line_clos"        , 0	)
			.update("updt_ipad"        , arg.remoteAddress )
			.insert("crte_ipad"        , arg.remoteAddress )
			.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
		;
		data.attach(Action.modify);
		data.execute();
		data.clear();

	}

	public SqlResultMap getNumb(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call fn_seq_gen_v2 (							")
			.query("     :STOR                " ,  arg.fixParameter("stor_id"))
			.query("   , :table               " ,  arg.fixParameter("table_nm"))
			.query("   , :invc_numb           " ,  "not defind"		)
			.query(" ) 												")
		;
		return data.selectForMap();
	}



	// 납품처 거래처id 엑셀업로드
		public String getCstmIdcd(HttpRequestArgument arg, String dlvy_cstm_idcd) throws Exception {
			DataMessage data	= arg.newStorage("POS");

			data.param
				.query("select  cstm_idcd 									")
			;
			data.param //퀴리문
				.where("from cstm_mast										")
				.where("where     1=1										")
				.where("and     cstm_code	=:cstm_code",		dlvy_cstm_idcd)
			;
			return data.selectForRow().getParamText("cstm_idcd");
		}


}
