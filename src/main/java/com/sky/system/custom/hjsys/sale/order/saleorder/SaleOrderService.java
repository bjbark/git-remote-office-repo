package com.sky.system.custom.hjsys.sale.order.saleorder;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.Iterator;
import java.util.Set;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;

import net.sky.core.connection.HostProperty;
import net.sky.core.connection.ftp.FTPConnector;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.mysql.jdbc.Blob;
import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.utils.file.UploadItem;


@Service("hjsys.SaleOrderService")
public class SaleOrderService extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;
	@Autowired
	ServletContext c;
	public SqlResultMap getMaster(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																						")
		;
		data.param
			.where("from (																							")
			.where("select   a.invc_numb       , a.amnd_degr         , a.bzpl_idcd       , a.invc_date				")
			.where("       , a.ordr_dvcd       , a.orig_invc_numb    , a.expt_dvcd       , a.acpt_stat_dvcd			")
			.where("       , a.pcod_numb       , a.deli_date         , a.cstm_idcd       , a.dlvy_cstm_idcd			")
			.where("       , a.dlvy_cstm_name  , a.acpt_dvcd         , a.mdtn_prsn       , a.cont_date				")
			.where("       , a.drtr_idcd       , a.dept_idcd         , a.crny_dvcd       , a.excg_rate				")
			.where("       , a.ostt_wrhs_idcd  , a.acpt_qntt         , a.unit_idcd       , a.trut_dvcd				")
			.where("       , a.dlvy_cond_dvcd  , a.crdt_exce_yorn    , a.amnt_lack_yorn  , a.sale_stor_yorn			")
			.where("       , a.remk_text       , a.memo              , a.cofm_yorn       , a.cofm_dttm				")
			.where("       , a.cstm_drtr_name  , a.cofm_drtr_idcd    , c.cstm_code									")
			.where("       , REPLACE(json_extract(a.json_data, '$.pror_chk'),'\"','') as pror_chk					")
			.where("       , REPLACE(json_extract(a.json_data, '$.main_chk'),'\"','') as main_chk					")
			.where("       , REPLACE(json_extract(a.json_data, '$.sub_chk'),'\"','') as sub_chk						")
			.where("       , json_value( a.json_data , '$**.esti_cnfm_yorn') as esti_cnfm_yorn						")
			.where("       , i.invc_qntt as qntt_totl                , a.acpt_case_name as modl_name				")
			.where("       , m.item_leng       , m.item_widh         , m.item_idcd									")
			.where("       , a.user_memo       , a.sysm_memo         , a.prnt_idcd       , a.line_levl				")
			.where("       , a.line_ordr       , a.line_stat         , a.line_clos       , a.find_name				")
			.where("       , a.updt_user_name  , a.updt_ipad         , a.updt_dttm       , a.updt_idcd				")
			.where("       , a.updt_urif       , a.crte_user_name    , a.crte_ipad       , a.crte_dttm				")
			.where("       , a.crte_idcd       , a.crte_urif         , u.unit_name       , c.cstm_name				")
			.where("       , c2.cstm_name as dlvy_cstm																")
			.where("from acpt_mast a																				")
			.where("left outer join ( select count(*) as invc_qntt, invc_numb										")
			.where("                  from mtrl_need																")
			.where("                  where substr(acct_bacd,1,1) = '2'												")
			.where("                  group by invc_numb															")
			.where(") i on a.invc_numb = i.invc_numb																")
			.where("left outer join unit_mast u on a.unit_idcd = u.unit_idcd										")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
			.where("left outer join cstm_mast c2 on a.dlvy_cstm_idcd = c2.cstm_idcd									")
			.where("left outer join mtrl_need m on a.invc_numb = m.invc_numb and m.acct_bacd = '3000'				")
			.where("where   1=1																						")
			.where("and     a.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     a.invc_numb  = :invc_numb      " , arg.getParamText("invc_numb"  ))
			.where("and     m.item_idcd  = :item_idcd      " , arg.getParamText("item_idcd"  ))
			.where("and     a.cstm_idcd  = :cstm_idcd      " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_clos  = :line_clos      " , arg.getParamText("line_clos" ) , !"3".equals(arg.getParamText("line_clos" )))
			.where("and     a.invc_date >= :invc_date1     " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2     " , arg.getParamText("invc_date2" ))
			.where("and     a.deli_date >= :deli_date1     " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2     " , arg.getParamText("deli_date2" ))
			.where("and     a.line_stat  < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by  a.invc_date desc, a.invc_numb desc limit 999999) a 									")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getdrwg(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");
			data.param
				.query("select count(*) as count		")
				.query("from acpt_item 					")
			;
			data.param
				.where("where 1=1						")
				.where("and   json_value(json_data , '$**.drwg_numb') = :drwg_numb	", arg.getParameter("drwg_numb"))
				.where("and   json_value(json_data , '$**.revs_numb') = :revs_numb	", arg.getParameter("revs_numb"))
		;
		return data.selectForMap(sort);
	}

	public SqlResultMap getWork(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		data.param
			.query("select count(*) as count		")
			.query("from work_book 					")
		;
		data.param
			.where("where 1=1						")
			.where("and   wkod_numb = :invc_numb	", arg.getParameter("invc_numb"))
		;
		return data.selectForMap(sort);
	}
	public SqlResultMap getPror(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		data.param
			.query("select count(*) as count		")
			.query("from pror_mast 					")
		;
		data.param
			.where("where 1=1						")
			.where("and   acpt_numb = :invc_numb	", arg.fixParameter("invc_numb"))
		;
		return data.selectForMap(sort);
	}

	public SqlResultMap getInvc(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String STOR			= arg.getParamText("stor_id") ;
		String table		= arg.getParamText("table_nm") ;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String invc_date	= arg.getParamText("invc_date") ;
		String cstm_idcd	= arg.getParamText("cstm_idcd") ;
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}
		data.param
		.query("call fn_seq_gen_hjsys (			")
		.query("   :STOR      "  , STOR			)  // 본사코드
		.query(" , :table     "  , table		)  // 테이블명
		.query(" , :cstm_idcd "  , cstm_idcd	)  // 거래처ID
		.query(" , :invc_date "  , invc_date	)  // Invoice 날짜
		.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
		.query(" , :new_invc_numb "  , ""		)  // Invoice 번호
		.query(" ) 								")
		;
		return data.selectForMap(sort);
	}

	public SqlResultMap getItem1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																						")
		;
		data.param
			.where("from (select  a.wkct_idcd            , a.wkct_code              , a.wkct_name					")
			.where("            , a.line_ordr            , a.line_ordr as line_seqn , b.otod_yorn					")
			.where("            , b.otod_cstm_idcd       , ifnull( b.wkfw_seqn, 0 ) as wkfw_seqn					")
			.where("            , ifnull(b.indn_qntt,0) as indn_qntt, ifnull(b.wkfw_idcd, a.wkct_idcd ) as wkfw_idcd")
			.where("            , c.cstm_name as otod_cstm_name														")
			.where("from wkct_mast a																				")
			.where("left outer join ( select a.indn_qntt   , a.wkct_idcd   , a.otod_yorn   , a.otod_cstm_idcd		")
			.where("                       , a.wkfw_seqn   , a.wkfw_idcd   , b.acpt_numb   , b.acpt_seqn			")
			.where("                  from pror_item a																")
			.where("                  left outer join pror_mast b on a.invc_numb = b.invc_numb						")
			.where("                  where b.acpt_numb    = :acpt_numb	", arg.getParamText("acpt_numb"))
			.where("                  and b.acpt_seqn      = :acpt_seqn	", arg.getParamText("acpt_seqn"))
			.where("                  and b.acpt_amnd_degr = :acpt_amnd_degr	", arg.getParamText("acpt_amnd_degr"))
			.where("                ) b on a.wkct_idcd = b.wkct_idcd												")
			.where("left outer join cstm_mast c on b.otod_cstm_idcd = c.cstm_idcd									")
			.where("where		1=1																					")
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.wkct_idcd	) a																		")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getSearch(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("call project_bom_tree(				")
			.query("   :invc_numb "   ,  arg.getParamText("invc_numb"))
			.query(" ) 									")
		;
		return data.selectForMap();
	}
	public SqlResultMap getMtrl_Bom_List_Master(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		ParamToJson trans = new ParamToJson();
		String result = trans.TranslateAll(arg);
		data.param
			.query("call mtrl_bom_list_master(				")
			.query("        :param				",result)
			.query(" ) 									")
		;
		return data.selectForMap();
	}
	public SqlResultMap getMtrl_Bom_List_Detail(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("call mtrl_bom_list_detail(				")
			.query("    :invc_numb "   ,  arg.getParamText("invc_numb"))
			.query("  , :item_idcd "   ,  arg.getParamText("item_idcd"))
			.query(" ) 									")
		;
		return data.selectForMap();
	}
	public SqlResultMap getMainItem(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																						")
		;
		data.param
			.where("from (select  a.invc_numb       , a.amnd_degr       , a.acpt_seqn       , a.line_seqn			")
			.where("            , a.acct_bacd       , a.item_idcd       , a.item_widh       , a.item_leng			")
			.where("            , a.exng_qntt       , a.stok_qntt       , a.puch_qntt       , a.pqty_ndqt as set_qntt	")
			.where("            , a.ostt_yorn       , a.ostt_date       , a.need_qntt								")
			.where("            , a.ostt_numb       , a.uper_seqn       , a.disp_seqn       , a.user_memo			")
			.where("            , a.stok_used_qntt  , i.item_name       , i.item_code       , i.item_spec			")
			.where("            , (select base_name  from base_mast r where i.mtrl_bacd  = r.base_code				")
			.where("                                                  and   r.prnt_idcd = '3101' and r.line_stat < 2 limit 1) as mtrl_bacd_name	")
			.where("            , m.orig_invc_numb																	")
			.where("from mtrl_need a																				")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("left outer join acpt_item b on a.invc_numb = b.invc_numb and a.acpt_seqn = b.line_seqn			")
			.where("left outer join acpt_mast c on a.invc_numb = c.invc_numb										")
			.where("left outer join (select  orig_invc_numb, item_idcd, invc_numb									")
			.where("                 from purc_ordr_item															")
			.where("                 where line_stat < 2															")
			.where("                 group by item_idcd, invc_numb													")
			.where("                 ) m on a.invc_numb = m.orig_invc_numb and a.item_idcd = m.item_idcd			")
			.where("where		1=1																					")
			.where("and			a.acct_bacd = '1001'																")
			.where("and			a.invc_numb	= :invc_numb		" ,arg.getParamText("invc_numb"))
			.where("and			a.item_idcd	= :item_idcd		" ,arg.getParamText("item_idcd"))
			.where("and			a.prnt_idcd	= :prnt_idcd		" ,arg.getParamText("prnt_idcd"))
			.where("and			a.amnd_degr	= :amnd_degr		" ,arg.getParamText("amnd_degr"))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.line_seqn	limit 99999999) a														")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getSubItem(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																						")
		;
		data.param
			.where("from (select  a.invc_numb       , a.amnd_degr       , a.acpt_seqn       , a.line_seqn			")
			.where("            , a.acct_bacd       , a.item_idcd       , a.item_widh       , a.item_leng			")
			.where("            , a.exng_qntt       , a.stok_qntt       , a.puch_qntt								")
			.where("            , a.ostt_yorn       , a.ostt_date       , a.need_qntt       , a.pqty_ndqt as set_qntt	")
			.where("            , a.ostt_numb       , a.uper_seqn       , a.disp_seqn       , a.user_memo			")
			.where("            , a.stok_used_qntt  , i.item_name       , i.item_code       , i.item_spec			")
			.where("            , (select base_name  from base_mast r where i.mtrl_bacd  = r.base_code				")
			.where("                                                  and   r.prnt_idcd = '3101') as mtrl_bacd_name	")
			.where("            , m.orig_invc_numb																	")
			.where("from mtrl_need a																				")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("left outer join acpt_item b on a.invc_numb = b.invc_numb and a.acpt_seqn = b.line_seqn			")
			.where("left outer join acpt_mast c on a.invc_numb = c.invc_numb										")
			.where("left outer join (select  orig_invc_numb, item_idcd, invc_numb									")
			.where("                 from purc_ordr_item															")
			.where("                 where line_stat < 2															")
			.where("                 group by item_idcd, orig_invc_numb												")
			.where("                 ) m on a.invc_numb = m.orig_invc_numb and a.item_idcd = m.item_idcd			")
			.where("where		1=1																					")
			.where("and			a.acct_bacd in ('1002','1003')														")
			.where("and			a.invc_numb	= :invc_numb		" ,arg.getParamText("invc_numb"))
			.where("and			a.item_idcd	= :item_idcd		" ,arg.getParamText("item_idcd"))
			.where("and			a.prnt_idcd	= :prnt_idcd		" ,arg.getParamText("prnt_idcd"))
			.where("and			a.amnd_degr	= :amnd_degr		" ,arg.getParamText("amnd_degr"))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.line_seqn	limit 99999999) a														")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getCal(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		ParamToJson parse = new ParamToJson();
		String param = parse.TranslateRecords(arg,"item_leng,item_widh,mtrl_spec");

		data.param
			.query("call calc_item_mtrl (")
			.query("   :param       "  , param)
			.query(" )					")
		;
		return data.selectForMap(sort);
	}
	public SqlResultMap getMtrl_Seqn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select max(line_seqn) as count								")
		;
		data.param
			.where("from mtrl_need												")
			.where("where invc_numb = :invc_numb",arg.fixParameter("invc_numb"))
		;
		return data.selectForMap();
	}

	public SqlResultMap getItem2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
		.query("select a.*																						")
		;
		data.param
		.where("from (select a.indn_qntt    , a.wkct_idcd   , a.otod_yorn   , a.otod_cstm_idcd					")
		.where("           , a.wkfw_seqn   , a.wkfw_idcd   , c.cstm_name										")
		.where("from pror_item a																				")
		.where("left outer join pror_mast m on a.invc_numb = m.invc_numb										")
		.where("left outer join wkct_mast b on a.wkct_idcd = b.wkct_idcd										")
		.where("left outer join cstm_mast c on b.otod_cstm_idcd = c.cstm_idcd									")
		.where("where		1=1																					")
		.where("and			m.acpt_numb      =  :acpt_numb		" , arg.getParamText("acpt_numb"))
		.where("and			m.acpt_seqn      =  :acpt_seqn		" , arg.getParamText("acpt_seqn"))
		.where("and			m.acpt_amnd_degr =  :acpt_amnd_degr	" , arg.getParamText("acpt_amnd_degr"))
		.where("and			b.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
		.where("and			and a.wkfw_seqn <> 0																")
		.where("order by	a.wkfw_seqn	) a																		")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getChkOrdr(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.where("select count(*) as maxsize																	")
			.where("from   purc_ordr_mast a																		")
			.where("where 1=1																					")
			.where("and   a.offr_dvcd = 1100																	")
			.where("and   a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("and   a.invc_numb  in (select r.invc_numb from purc_ordr_item r where r.item_idcd = :item_idcd)", arg.getParamText("item_idcd"))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																					")
		;
		data.param
			.where("from ( select a.invc_numb       , a.amnd_degr         , a.bzpl_idcd       , a.invc_date		")
			.where("           , a.ordr_dvcd       , a.orig_invc_numb    , a.acpt_case_name  , a.expt_dvcd		")
			.where("           , a.pcod_numb       , a.deli_date         , a.cstm_idcd       , a.dlvy_cstm_idcd	")
			.where("           , a.dlvy_cstm_name  , a.acpt_dvcd         , a.mdtn_prsn       , a.cont_date		")
			.where("           , a.drtr_idcd       , a.dept_idcd         , a.crny_dvcd       , a.excg_rate		")
			.where("           , a.ostt_wrhs_idcd  , a.acpt_qntt         , a.unit_idcd       , a.trut_dvcd		")
			.where("           , a.dlvy_cond_dvcd  , a.crdt_exce_yorn    , a.amnt_lack_yorn  , a.sale_stor_yorn	")
			.where("           , a.remk_text       , a.memo              , a.cofm_yorn       , a.cofm_dttm		")
			.where("           , a.cstm_drtr_name  , a.cofm_drtr_idcd    , a.acpt_stat_dvcd  , c.cstm_code		")
			.where("           , a.acpt_case_name as modl_name													")
			.where("           , REPLACE(json_extract(a.json_data, '$.drwg_cnfm_yorn_1fst'),'\"','') as drwg_cnfm_yorn_1fst	")
			.where("           , REPLACE(json_extract(a.json_data, '$.drwg_cnfm_yorn_2snd'),'\"','') as drwg_cnfm_yorn_2snd	")
			.where("           , (json_value( a.json_data , '$**.esti_cnfm_yorn')) as esti_cnfm_yorn				")
			.where("           , a.user_memo       , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.where("           , a.line_ordr       , a.line_stat         , a.line_clos       , a.find_name		")
			.where("           , a.updt_user_name  , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.where("           , a.updt_urif       , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.where("           , a.crte_idcd       , a.crte_urif         , u.unit_name       , c.cstm_name		")
			.where("           , b.item_idcd       , i.item_name												")
			.where("from acpt_mast a																			")
			.where("left outer join acpt_item b on a.invc_numb = b.invc_numb									")
			.where("left outer join unit_mast u on a.unit_idcd = u.unit_idcd									")
			.where("left outer join item_mast i on b.item_idcd = i.item_idcd									")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     b.item_idcd  = :item_idcd      " , arg.getParamText("item_idcd"  ))
			.where("and     a.cstm_idcd  = :cstm_idcd      " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_clos  = :line_clos      " , arg.getParamText("line_clos"  ))
			.where("and     a.invc_date >= :invc_date1     " , arg.getParamText("invc1_date" ))
			.where("and     a.invc_date <= :invc_date2     " , arg.getParamText("invc2_date" ))
			.where("and     a.deli_date >= :deli_date1     " , arg.getParamText("deli1_date" ))
			.where("and     a.deli_date <= :deli_date2     " , arg.getParamText("deli2_date" ))
			.where("and     (0<=(select count(r.invc_numb) from purc_ordr_item r where r.orig_invc_numb = a.invc_numb) and 0<(select count(r.invc_numb) from mtrl_need r where r.invc_numb = a.invc_numb and r.acct_bacd like :ordr%))    " , arg.getParamText("ordr" ))
			.where("and     a.line_stat  < 2               ")
			.where("order by a.invc_date desc, a.deli_date desc limit 99999) a ")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}

	public SqlResultMap getLookup2(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																					")
		;
		data.param
			.where("from ( select a.invc_numb       , a.amnd_degr         , a.line_seqn       , b.invc_date		")
			.where("           , a.item_idcd       , a.unit_idcd         , b.cstm_idcd       , a.make_cmpy_name	")
			.where("           , a.offr_qntt       , a.offr_pric         , a.vatx_incl_yorn  , a.vatx_rate		")
			.where("           , a.offr_amnt       , a.offr_vatx         , a.ttsm_amnt       , a.deli_reqt_date	")
			.where("           , b.deli_date       , a.pric_dvcd         , a.fund_dvcd       , a.orig_invc_numb as acpt_numb	")
			.where("           , a.orig_amnd_degr  , a.orig_seqn         , i.item_name       , c.cstm_name		")
			.where("           , u.unit_name       , c.cstm_code         , m.acpt_case_name						")
			.where("from purc_ordr_item a																		")
			.where("left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb								")
			.where("left outer join acpt_mast m on a.orig_invc_numb = m.invc_numb								")
			.where("left outer join unit_mast u on a.unit_idcd = u.unit_idcd									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd									")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     a.item_idcd  = :item_idcd      " , arg.getParamText("item_idcd"  ))
			.where("and     b.cstm_idcd  = :cstm_idcd      " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_clos  = :line_clos      " , arg.getParamText("line_clos"  ))
			.where("and     b.invc_date >= :invc_date1     " , arg.getParamText("invc_date1" ))
			.where("and     b.invc_date <= :invc_date2     " , arg.getParamText("invc_date2" ))
			.where("and     b.deli_date >= :deli_date1     " , arg.getParamText("deli_date1" ))
			.where("and     b.deli_date <= :deli_date2     " , arg.getParamText("deli_date2" ))
			.where("and     a.line_stat  < 2																	")
			.where(") a																							")
			.where("order by a.invc_date desc																	")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}

	public SqlResultMap setDelete(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		// check == "" master 삭제
		// check == worker worker 취소

		data.param
			.table("acpt_mast						")
			.where("where invc_numb  = :invc_numb	")
			.where("and   amnd_degr  = :amnd_degr	")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"		))
			.unique("amnd_degr"			, arg.fixParameter("amnd_degr"		))

			.update("line_stat"			, 2									)
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.table("acpt_item					")
			.where("where invc_numb = :invc_numb")
			.where("and   line_seqn = :line_seqn")
			.where("and   amnd_degr = :amnd_degr")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"))
			.unique("line_seqn"			, arg.fixParameter("line_seqn"))
			.unique("amnd_degr"			, arg.fixParameter("amnd_degr"))

		;
		data.attach(Action.delete);
		data.execute();
		data.clear();
		data.param
			.table("mtrl_need					")
			.where("where invc_numb = :invc_numb")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"))

		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		// 품목삭제
		if(!arg.getParamText("item_idcd").equals("")){
			data.param
				.table("item_mast					")
				.where("where item_idcd = :item_idcd")

				.unique("item_idcd"			, arg.fixParameter("item_idcd"))
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();
		}
//		deleteFile(arg);
		//도면 삭제
		data.param
			.table("apnd_file								")
			.where("where invc_numb = :invc_numb			")

			.unique("invc_numb", arg.fixParameter("invc_numb"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();
		System.out.println("도면삭제");

		//acpt_imeg 삭제
		data.param
			.table("acpt_imeg								")
			.where("where invc_numb = :invc_numb			")

			.unique("invc_numb", arg.getParameter("invc_numb"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();
		System.out.println("이미지삭제");

		// 지시삭제
		data.param // 집계문  입력
			.query("delete a,b from pror_mast a left outer join pror_item b		")
			.where("on a.invc_numb = b.invc_numb								")
			.where("where a.acpt_numb = :acpt_numb	", arg.getParameter("invc_numb"))
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		return null;
	}

	public SqlResultMap deleteFile(HttpRequestArgument arg) throws Exception {
		String hq = arg.getParamText("hqof_idcd");
		HostProperty host = property.getProperty( hq+".IMG" );
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = new SqlResultMap();
		data.param
			.query("select *													")
			.where("from apnd_file												")
			.where("where invc_numb = :invc_numb",arg.fixParameter("invc_numb"))
			.where("and   line_seqn = :line_seqn",arg.getParameter("line_seqn"))
			.where("and   file_name is not null									")
		;
		map = data.selectForMap();
		data.clear();
		for (SqlResultRow row:map) {
			Session session = null;
			Channel channel = null;
			ChannelSftp sftp = null;
			JSch jsch = new JSch();
			try {
				session = jsch.getSession(host.getUserName(),host.getHostName(),host.getHostPort());	// 연결정보
				session.setPassword(host.getPassword());

				java.util.Properties config = new java.util.Properties();
				config.put("StrictHostKeyChecking", "no");												// 접속정보확인 거절
				session.setConfig(config);
				session.connect();																		// 연결
				channel = session.openChannel("sftp");

				channel.connect();																		// 접속
				sftp = (ChannelSftp) channel;															// 실사용
				sftp.rm(host.getHostPath()+"//"+row.fixParamText("file_name"));												// 삭제실행 (rm = remove)
			} catch (Exception e) {
				// TODO: handle exception
				System.out.println(e.getMessage());
			}finally{
				sftp.quit();
				session.disconnect();
			}
		}

		return null;
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
		.query(" , :invc_numb  "  , invc_numb	 )  // Invoice 번호
		.query(" , :line_close "  , line_clos 	)  //
		.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setCal(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
		.query("call calc_item_mtrl (			")
		.query("   :item_leng       "  , arg.getParameter("item_leng"))
		.query("  ,:item_widh       "  , arg.getParameter("item_widh"))
		.query("  ,:mtrl_spec       "  , arg.getParameter("mtrl_spec"))
		.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setEstiClose(HttpRequestArgument arg) throws Exception {

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
			.query(" , :invc_numb  "  , invc_numb	 )  // Invoice 번호
			.query(" , :line_close "  , line_clos 	)  //
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																						")
		;
		data.param
			.where("from ( 	")
			.where("    select    p.invc_numb as bcod_numb    , a.item_idcd    , a.drwg_numb   , a.revs_numb		")
			.where("            , i.item_name                 , i.item_widh    , i.item_leng 						")
			.where("            , ifnull(c.pror_cnt,0) as pror_cnt             , ifnull(d.mtrl_cnt1,0) as mtrl_cnt1	")
			.where("            , ifnull(e.mtrl_cnt2,0) as mtrl_cnt2           , a.invc_numb						")
			.where("    from mtrl_need a																			")
			.where("    left outer join pror_mast p on a.invc_numb = p.acpt_numb and a.item_idcd = p.item_idcd		")
			.where("    left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("    left outer join ( select   count(invc_numb) as pror_cnt  , acpt_numb						")
			.where("                             , acpt_seqn                     , item_idcd 						")
			.where("                      from pror_mast 															")
			.where("                      where item_idcd is not null												")
			.where("                      group by acpt_numb,acpt_seqn,item_idcd									")
			.where("                    ) c on a.invc_numb = c.acpt_numb and a.line_seqn = c.acpt_seqn and a.item_idcd = c.item_idcd")
			.where("    left outer join ( select   count(prnt_idcd) as mtrl_cnt1,invc_numb,prnt_idcd				")
			.where("                      from mtrl_need 															")
			.where("                      where acct_bacd ='1001'													")
			.where("                      group by invc_numb,prnt_idcd												")
			.where("                    ) d on a.invc_numb = d.invc_numb and a.item_idcd = d.prnt_idcd				")
			.where("    left outer join ( select   count(prnt_idcd) as mtrl_cnt2,invc_numb,prnt_idcd				")
			.where("                      from mtrl_need 															")
			.where("                      where acct_bacd ='1002'													")
			.where("                      group by invc_numb,prnt_idcd												")
			.where("                    ) e on a.invc_numb = e.invc_numb and a.item_idcd = e.prnt_idcd				")
			.where("    where  a.acct_bacd in ('2001','2002','2003','2004')											")
			.where("    and    p.invc_numb is not null																")
			.where("    and    a.invc_numb  = :invc_numb      " , arg.fixParamText("invc_numb"  ))
			.where("    order by  a.drwg_numb,a.revs_numb limit 99999999 											")
			.where(") a 																							")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getInvoice(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																					")
		;
		data.param
			.where("from ( select a.invc_numb       , a.amnd_degr         , a.bzpl_idcd       , a.invc_date		")
			.where("           , a.ordr_dvcd       , a.orig_invc_numb    , a.acpt_case_name  , a.expt_dvcd		")
			.where("           , a.pcod_numb       , a.deli_date         , a.cstm_idcd       , a.dlvy_cstm_idcd	")
			.where("           , a.dlvy_cstm_name  , a.acpt_dvcd         , a.mdtn_prsn       , a.cont_date		")
			.where("           , a.drtr_idcd       , a.dept_idcd         , a.crny_dvcd       , a.excg_rate		")
			.where("           , a.ostt_wrhs_idcd  , a.acpt_qntt         , a.unit_idcd       , a.trut_dvcd		")
			.where("           , a.dlvy_cond_dvcd  , a.crdt_exce_yorn    , a.amnt_lack_yorn  , a.sale_stor_yorn	")
			.where("           , a.remk_text       , a.memo              , a.cofm_yorn       , a.cofm_dttm		")
			.where("           , a.cstm_drtr_name  , a.cofm_drtr_idcd    , a.acpt_stat_dvcd  , c.cstm_code		")
			.where("           , a.acpt_case_name as modl_name													")
			.where("           , REPLACE(json_extract(a.json_data, '$.drwg_cnfm_yorn_1fst'),'\"','') as drwg_cnfm_yorn_1fst	")
			.where("           , REPLACE(json_extract(a.json_data, '$.drwg_cnfm_yorn_2snd'),'\"','') as drwg_cnfm_yorn_2snd	")
			.where("           , (json_value( a.json_data , '$**.esti_cnfm_yorn')) as esti_cnfm_yorn				")
			.where("           , a.user_memo       , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.where("           , a.line_ordr       , a.line_stat         , a.line_clos       , a.find_name		")
			.where("           , a.updt_user_name  , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.where("           , a.updt_urif       , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.where("           , a.crte_idcd       , a.crte_urif         , u.unit_name       , c.cstm_name		")
			.where("           , c2.cstm_name as dlvy_cstm														")
			.where("from acpt_mast a																			")
			.where("left outer join ( select count(ifnull(invc_qntt,0)) as invc_qntt, invc_numb					")
			.where("                  from acpt_item															")
			.where("                  where line_stat = 0														")
			.where("                  and   line_clos = 0														")
			.where("                  group by invc_numb														")
			.where(") i on a.invc_numb = i.invc_numb															")
			.where("left outer join unit_mast u on a.unit_idcd = u.unit_idcd									")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join cstm_mast c2 on a.dlvy_cstm_idcd = c2.cstm_idcd								")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     a.invc_numb  = :invc_numb      " , arg.getParamText("invc_numb"  ))
			.where("and     a.cstm_idcd  = :cstm_idcd      " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_clos  = :line_clos      " , arg.getParamText("line_clos"  ))
			.where("and     a.invc_date >= :invc_date1     " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2     " , arg.getParamText("invc_date2" ))
			.where("and     a.deli_date >= :deli_date1     " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2     " , arg.getParamText("deli_date2" ))
			.where("and     a.line_stat  < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where(") a																							")
		;

		SqlResultMap info = data.selectForMap();
		data.clear();
		if (info.size() >=1) {
			data.param
				.query("select *																									")
			;
			data.param
				.where("from ( select a.invc_numb         , a.amnd_degr         , a.line_seqn         , a.item_idcd					")
				.where("          , a.unit_idcd           , a.orig_invc_numb    , a.orig_seqn         , a.orig_invc_qntt			")
				.where("          , a.optn_dvcd           , a.optn_psbl_yorn    , a.optn_adtn         , a.pric_adpt					")
				.where("          , a.norm_sale_pric      , a.sale_stnd_pric    , a.invc_qntt         , a.invc_pric					")
				.where("          , a.vatx_incl_yorn      , a.vatx_rate         , a.sply_amnt         , a.vatx_amnt					")
				.where("          , a.invc_amnt           , a.krwn_amnt         , a.krwn_vatx         , a.krwn_ttsm_amnt			")
				.where("          , a.stnd_unit           , a.stnd_unit_qntt    , a.wrhs_idcd         , a.dlvy_cstm_idcd			")
				.where("          , a.deli_date           , a.deli_chge_dvcd    , a.deli_chge_resn    , a.pcod_numb					")
				.where("          , a.cstm_offr_date      , a.cstm_deli_date    , a.cstm_lott_numb    , a.pdsd_yorn					")
				.where("          , a.dlvy_date           , a.dlvy_hhmm         , a.remk_text         , a.stok_asgn_qntt			")
				.where("          , a.offr_asgn_qntt      , a.ostt_dvcd         , a.acpt_stat_dvcd    , a.ostt_qntt					")
				.where("          , a.sale_qntt           , a.dsct_qntt         , a.dlvy_memo         , u.unit_name					")
				.where("          , c.cstm_name as dlvy_cstm_name               , i.item_name         , i.item_code					")
				.where("          , REPLACE(json_extract(a.json_data, '$.drwg_numb'),'\"','') as drwg_numb							")
				.where("          , REPLACE(json_extract(a.json_data, '$.drwg_cnfm_yorn_1fst'),'\"','') as drwg_cnfm_yorn_1fst		")
				.where("          , REPLACE(json_extract(a.json_data, '$.drwg_cnfm_yorn_2snd'),'\"','') as drwg_cnfm_yorn_2snd		")
				.where("          , REPLACE(json_extract(a.json_data, '$.revs_numb'),'\"','') as revs_numb							")
				.where("          , REPLACE(json_extract(a.json_data, '$.mtrl_tick'),'\"','') as mtrl_tick							")
				.where("          , REPLACE(json_extract(a.json_data, '$.mtrl_ndqt'),'\"','') as mtrl_ndqt							")
	//			.where("          , REPLACE(json_extract(a.json_data, '$.mprq_qntt'),'\"','') as mprq_qntt							")
				.where("          , REPLACE(json_extract(a.json_data, '$.dlvy_atcl'),'\"','') as dlvy_atcl							")
				.where("          , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl					")
				.where("          , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name					")
				.where("          , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd					")
				.where("          , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm					")
				.where("          , a.crte_idcd           , a.crte_urif         , 'Y' as ch											")
				.where("          , if(f.invc_numb is null, null , 'Y' ) as drwg_chk												")
				.where("          , if(a.pdsd_yorn > 0,p.invc_numb,null ) as bcod_numb												")
				.where("          , if(n.count > 0, 'Y',null ) as suIt_chk															")
				.where("          , json_value( a.json_data , '$**.item_leng') as  item_leng										")
				.where("          , json_value( a.json_data , '$**.item_widh') as  item_widh										")
				.where("          , json_value( a.json_data , '$**.mtrl_idcd') as  mtrl_idcd										")
				.where("          , json_value( a.json_data , '$**.mtrl_name') as  mtrl_name										")
				.where("          , json_value( a.json_data , '$**.mprq_qntt') as  mprq_qntt										")
				.where("          , i2.item_spec as mtrl_spec, i2.unit_wigt															")
				.where("from acpt_item a																							")
				.where("left outer join item_mast i  on a.item_idcd = i.item_idcd													")
				.where("left outer join item_mast i2 on json_value( a.json_data , '$**.mtrl_idcd') = i2.item_idcd					")
				.where("left outer join mtrl_need i3 on a.invc_numb   = i3.invc_numb and a.line_seqn = i3.acpt_seqn					")
				.where("                             and i3.acct_bacd = '1001'														")
				.where("left outer join (select invc_numb, acpt_seqn, count(invc_numb) as count										")
				.where("                 from mtrl_need																				")
				.where("                 where acct_bacd in ('1002','1003')															")
				.where("                 group by invc_numb, acpt_seqn																")
				.where("                ) n  on a.invc_numb = n.invc_numb and a.line_seqn = n.acpt_seqn								")
				.where("left outer join unit_mast u  on a.unit_idcd      = u.unit_idcd												")
				.where("left outer join cstm_mast c  on a.dlvy_cstm_idcd = c.cstm_idcd												")
				.where("left outer join apnd_file f  on a.invc_numb = f.invc_numb and a.line_seqn = f.line_seqn						")
				.where("                             and a.amnd_degr = f.assi_seqn													")
				.where("left outer join pror_mast p on a.invc_numb = p.acpt_numb and a.line_seqn = p.acpt_seqn						")
				.where("                             and a.amnd_degr = p.acpt_amnd_degr												")
				.where("where   1=1																									")
				.where("and     a.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
				.where("and     a.invc_numb  = :invc_numb      " , arg.getParamText("invc_numb"  ))
				.where("and     a.cstm_idcd  = :cstm_idcd      " , arg.getParamText("cstm_idcd"  ))
				.where("and     a.line_clos  = :line_clos      " , arg.getParamText("line_clos" ) , !"3".equals(arg.getParamText("line_clos" )))
				.where("and     a.invc_date >= :invc_date1     " , arg.getParamText("invc_date1" ))
				.where("and     a.invc_date <= :invc_date2     " , arg.getParamText("invc_date2" ))
				.where("and     a.deli_date >= :deli_date1     " , arg.getParamText("deli_date1" ))
				.where("and     a.deli_date <= :deli_date2     " , arg.getParamText("deli_date2" ))
				.where("and     a.line_stat  < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by  a.line_seqn limit 999999) a 									")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String cstm_name = "";
		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				data.param
					.table("acpt_mast						")
					.where("where invc_numb  = :invc_numb	")
					.where("and   amnd_degr  = :amnd_degr	")

					.unique("invc_numb"			, arg.fixParameter("invc_numb"		))
					.unique("amnd_degr"			, arg.fixParameter("amnd_degr"		))

					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("acpt_item					")
					.where("where invc_numb = :invc_numb")
					.where("and   line_seqn = :line_seqn")
					.where("and   amnd_degr = :amnd_degr")

					.unique("invc_numb"			, arg.fixParameter("invc_numb"))
					.unique("line_seqn"			, arg.fixParameter("line_seqn"))
					.unique("amnd_degr"			, arg.fixParameter("amnd_degr"))

				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

				//도면 삭제
				if(	!arg.getParamText("invc_numb").equals("") &&
					!arg.getParamText("line_seqn").equals("") &&
					!arg.getParamText("amnd_degr").equals("")){
					data.param
						.table("apnd_file					")
						.where("where invc_numb = :invc_numb", arg.getParameter("invc_numb"))
						.where("and   line_seqn = :line_seqn", arg.getParameter("line_seqn"))
						.where("and   assi_seqn = :amnd_degr", arg.getParameter("amnd_degr"))
					;
					data.attach(Action.delete);
					data.execute();
					data.clear();
				}

				// 지시삭제
				data.param // 집계문  입력
					.query("select a.invc_numb, a.line_seqn									")
					.query("from pror_item a												")
					.query("left outer join pror_mast b on a.invc_numb = b.invc_numb		")
					.query("where b.acpt_numb      = :acpt_numb			", arg.getParameter("invc_numb"))
					.query("and   b.acpt_seqn      = :acpt_seqn			", arg.getParameter("line_seqn"))
					.query("and   b.acpt_amnd_degr = :acpt_amnd_degr	", arg.getParameter("amnd_degr"))
				;
				SqlResultMap info3 = data.selectForMap();
				data.clear();
				// 1 : 20
				String invc_numb = "";
				for (SqlResultRow row2:info3) {
					if(!row2.getParamText("invc_numb").equals("") && !row2.getParamText("line_seqn").equals("")){
						invc_numb = row2.getParamText("invc_numb");
						data.param
							.table("pror_item					")
							.where("where invc_numb = :invc_numb", row2.getParameter("invc_numb"))
							.where("and   line_seqn = :line_seqn", row2.getParameter("line_seqn"))
						;
						data.attach(Action.delete);
						data.execute();
						data.clear();
					}
				}
				if(!invc_numb.equals("")){
					data.param
						.table("pror_mast					")
						.where("where invc_numb = :invc_numb", invc_numb)
					;
					data.attach(Action.delete);
					data.execute();
					data.clear();
				}
			} else {
				ParamToJson trans = new ParamToJson();
				String json_data = trans.TranslateRow(arg, row, "acpt_mast_json_fields");
				cstm_name = row.getParamText("cstm_name");
				data.param
					.table("acpt_mast						")
					.where("where invc_numb	= :invc_numb	")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))

					.update("amnd_degr"			, row.getParameter("amnd_degr"))
					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"))
					.update("invc_date"			, row.getParameter("invc_date"))
					.update("ordr_dvcd"			, row.getParameter("ordr_dvcd"))
					.update("acpt_case_name"	, row.getParameter("modl_name"))
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"))
					.update("expt_dvcd"			, row.getParameter("expt_dvcd"))
					.update("pcod_numb"			, row.getParameter("pcod_numb"))
					.update("deli_date"			, row.getParameter("deli_date"))
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"))
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"))
					.update("dlvy_cstm_name"	, row.getParameter("dlvy_cstm_name"))
					.update("acpt_dvcd"			, row.getParameter("acpt_dvcd"))
					.update("mdtn_prsn"			, row.getParameter("mdtn_prsn"))
					.update("cont_date"			, row.getParameter("cont_date"))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
					.update("dept_idcd"			, row.getParameter("dept_idcd"))
					.update("crny_dvcd"			, row.getParameter("crny_dvcd"))
					.update("excg_rate"			, row.getParameter("excg_rate"))
					.update("ostt_wrhs_idcd"	, row.getParameter("ostt_wrhs_idcd"))
					.update("acpt_qntt"			, row.getParameter("acpt_qntt"))
					.update("unit_idcd"			, row.getParameter("unit_idcd"))
					.update("trut_dvcd"			, row.getParameter("trut_dvcd"))
					.update("dlvy_cond_dvcd"	, row.getParameter("dlvy_cond_dvcd"))
					.update("crdt_exce_yorn"	, row.getParameter("crdt_exce_yorn"))
					.update("amnt_lack_yorn"	, row.getParameter("amnt_lack_yorn"))
					.update("sale_stor_yorn"	, row.getParameter("sale_stor_yorn"))
					.update("remk_text"			, row.getParameter("remk_text"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("cofm_yorn"			, row.getParameter("cofm_yorn"))
					.update("cofm_dttm"			, row.getParameter("cofm_dttm"))
					.update("cstm_drtr_name"	, row.getParameter("cstm_drtr_name"))
					.update("cofm_drtr_idcd"	, row.getParameter("cofm_drtr_idcd"))
					.update("acpt_stat_dvcd"	, row.getParameter("acpt_stat_dvcd"))
					.update("json_data"			, json_data)

					.update("find_name"			, row.getParamText("invc_date").trim()
												+ " "
												+ row.getParamText("cstm_code").trim())
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(rowaction);
				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class),cstm_name);
				}
				data.execute();
			}
		}
	return null;
	}

	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map, String cstm_name) throws Exception {
		String item_idcd = "";
		String item_code = "";
		String drwg_numb = "";
		String revs_numb = "";

//		for(SqlResultRow row:map) {
//			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
//			if(rowaction == Action.delete){
//				data.param
//					.table("acpt_item					")
//					.where("where invc_numb = :invc_numb")
//					.where("and   line_seqn = :line_seqn")
//
//					.unique("invc_numb"			, row.fixParameter("invc_numb"))
//					.unique("line_seqn"			, row.fixParameter("line_seqn"))
//				;
//				data.attach(Action.delete);
//				data.execute();
//				data.clear();
//
//				// 품목삭제
//				if(!arg.getParamText("item_idcd").equals("")){
//					data.param
//						.table("item_mast					")
//						.where("where item_idcd = :item_idcd")
//						.unique("item_idcd"			, arg.fixParameter("item_idcd"))
//					;
//					data.attach(Action.delete);
//					data.execute();
//					data.clear();
//				}
//
//				// 원자재, 부자재삭제
//				data.param
//					.table("mtrl_need					")
//					.where("where invc_numb = :invc_numb")
//					.where("and   acpt_seqn = :acpt_seqn")
//
//					.unique("invc_numb"			, row.fixParameter("invc_numb"))
//					.unique("acpt_seqn"			, row.fixParameter("line_seqn"))
//				;
//				data.attach(Action.delete);
//				data.execute();
//				data.clear();
//			}else{
//				String acpt_numb = "";
//				String line_seqn = "";
//				String updt_idcd = "";
//				drwg_numb = row.getParamText("drwg_numb");
//				revs_numb = row.getParamText("revs_numb");
//				//품목update
//				item_idcd = row.getParamText("item_idcd");
//				item_code = row.getParamText("item_code");
//				updt_idcd = row.getParamText("updt_idcd");
//				if(item_idcd.equals("")){
//					data.param // 집계문  입력
//						.query("call fn_seq_gen_v2 (						")
//						.query("   :STOR "       , row.getParameter("stor_id"))  // 본사코드
//						.query(" , :table "      , "item_mast"				)  // 테이블명
//						.query(" , :invc_numb "  , "not defined"			)  // Invoice 번호
//						.query(" ) 											")
//					;
//					SqlResultMap info = data.selectForMap();
//					data.clear();
//					for (SqlResultRow row2:info) {
//						item_idcd = row2.getParamText("seq"		);
//						item_code = row2.getParamText("code"	);
//					}
//				}
//				String item_leng = "";
//				String item_widh = "";
//				System.out.println(row.getParamText("item_leng"		)+"<<<<<<<<<<<<<<<<<<<<");
//				data.param
//					.table("item_mast												")
//					.where("where item_idcd  = :item_idcd							")
//
//					.unique("item_idcd"			, item_idcd)
//
//					.insert("item_code"			, item_code)
//					.update("item_name"			, row.getParameter("item_name"		))
//					.update("item_widh"			, row.getParameter("item_widh"		))
//					.update("item_leng"			, row.getParameter("item_leng"		))
//					.update("item_spec"			, row.getParameter("item_leng"		))
//					.insert("item_path_dvcd"	, "2"	)
//					.insert("acct_bacd"			, "3000")
//
//					.update("find_name"			, item_code.trim()
//												+ " "
//												+ row.getParamText("item_name").trim())
//					.update("sysm_memo"			, row.getParameter("invc_numb"		))
//					.update("line_stat"			, row.getParameter("line_stat"		))
//					.insert("line_levl"			, row.getParameter("line_levl"		))
//					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
//					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
//					.update("updt_ipad"			, arg.remoteAddress )
//					.insert("crte_ipad"			, arg.remoteAddress )
//					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
//				data.attach(rowaction);
//				data.execute();
//				data.clear();
//
//				ParamToJson trans = new ParamToJson();
//				String json_data = trans.TranslateRow(arg, row, "acpt_item_json_fields");
//				acpt_numb = row.getParamText("invc_numb");
//				line_seqn = row.getParamText("line_seqn");
//
//				data.param
//					.table("acpt_item					")
//					.where("where invc_numb = :invc_numb")
//					.where("and   line_seqn = :line_seqn")
//					.where("and   amnd_degr = :amnd_degr")
//
//					.unique("invc_numb"				, row.fixParameter("invc_numb"))
//					.unique("line_seqn"				, row.fixParameter("line_seqn"))
//					.update("amnd_degr"				, row.fixParameter("amnd_degr"))
//
//					.update("item_idcd"				, item_idcd)
//					.update("unit_idcd"				, row.getParameter("unit_idcd"))
//					.update("orig_invc_numb"		, row.getParameter("orig_invc_numb"))
//					.update("orig_seqn"				, row.getParameter("orig_seqn"))
//					.update("orig_invc_qntt"		, row.getParameter("orig_invc_qntt"))
//					.update("optn_dvcd"				, row.getParameter("optn_dvcd"))
//					.update("optn_psbl_yorn"		, row.getParameter("optn_psbl_yorn"))
//					.update("optn_adtn"				, row.getParameter("optn_adtn"))
//					.update("pric_adpt"				, row.getParameter("pric_adpt"))
//					.update("norm_sale_pric"		, row.getParameter("norm_sale_pric"))
//					.update("sale_stnd_pric"		, row.getParameter("sale_stnd_pric"))
//					.update("invc_qntt"				, row.getParameter("invc_qntt"))
//					.update("invc_pric"				, row.getParameter("invc_pric"))
//					.update("vatx_incl_yorn"		, row.getParameter("vatx_incl_yorn"))
//					.update("vatx_rate"				, row.getParameter("vatx_rate"))
//					.update("sply_amnt"				, row.getParameter("sply_amnt"))
//					.update("vatx_amnt"				, row.getParameter("vatx_amnt"))
//					.update("invc_amnt"				, row.getParameter("invc_amnt"))
//					.update("krwn_amnt"				, row.getParameter("krwn_amnt"))
//					.update("krwn_vatx"				, row.getParameter("krwn_vatx"))
//					.update("krwn_ttsm_amnt"		, row.getParameter("krwn_ttsm_amnt"))
//					.update("stnd_unit"				, row.getParameter("stnd_unit"))
//					.update("stnd_unit_qntt"		, row.getParameter("stnd_unit_qntt"))
//					.update("wrhs_idcd"				, row.getParameter("wrhs_idcd"))
//					.update("dlvy_cstm_idcd"		, row.getParameter("dlvy_cstm_idcd"))
//					.update("deli_date"				, row.getParameter("deli_date"))
//					.update("deli_chge_dvcd"		, row.getParameter("deli_chge_dvcd"))
//					.update("deli_chge_resn"		, row.getParameter("deli_chge_resn"))
//					.update("pcod_numb"				, row.getParameter("pcod_numb"))
//					.update("cstm_offr_date"		, row.getParameter("cstm_offr_date"))
//					.update("cstm_deli_date"		, row.getParameter("cstm_deli_date"))
//					.update("cstm_lott_numb"		, row.getParameter("cstm_lott_numb"))
//					.update("pdsd_yorn"				, row.getParameter("pdsd_yorn"))
//					.update("dlvy_date"				, row.getParameter("dlvy_date"))
//					.update("dlvy_hhmm"				, row.getParameter("dlvy_hhmm"))
//					.update("remk_text"				, row.getParameter("remk_text"))
//					.update("stok_asgn_qntt"		, row.getParameter("stok_asgn_qntt"))
//					.update("offr_asgn_qntt"		, row.getParameter("offr_asgn_qntt"))
//					.update("ostt_dvcd"				, row.getParameter("ostt_dvcd"))
//					.update("acpt_stat_dvcd"		, row.getParameter("acpt_stat_dvcd"))
//					.update("ostt_qntt"				, row.getParameter("ostt_qntt"))
//					.update("sale_qntt"				, row.getParameter("sale_qntt"))
//					.update("dsct_qntt"				, row.getParameter("dsct_qntt"))
//					.update("dlvy_memo"				, row.getParameter("dlvy_memo"))
//					.update("json_data"				, json_data)
//
//					.update("line_stat"				, row.getParameter("line_stat"))
//					.insert("line_levl"				, row.getParameter("line_levl"))
//					.update("updt_idcd"				, row.getParameter("updt_idcd"))
//					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
//					.update("updt_ipad"				, arg.remoteAddress )
//					.insert("crte_ipad"				, arg.remoteAddress )
//					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//				;
//				data.attach(rowaction);
//				data.execute();
//				data.clear();
//
//				if(!row.getParamText("mtrl_idcd").equals("")){
//					data.param
//						.table("mtrl_need					")
//						.where("where invc_numb = :invc_numb")
//						.where("and   acpt_seqn = :acpt_seqn")
//						.where("and   acct_bacd = :acct_bacd")
//
//						.unique("invc_numb"				, row.fixParameter("invc_numb"))
//						.unique("acpt_seqn"				, row.fixParameter("line_seqn"))
//						.unique("acct_bacd"				, "1001")
//
//						.update("item_idcd"				, row.getParameter("mtrl_idcd"))
//						.update("need_qntt"				, row.getParameter("mtrl_ndqt")) // 소요수량
//
//						.update("line_stat"				, row.getParameter("line_stat"))
//						.insert("line_levl"				, row.getParameter("line_levl"))
//						.update("updt_idcd"				, row.getParameter("updt_idcd"))
//						.insert("crte_idcd"				, row.getParameter("crte_idcd"))
//						.update("updt_ipad"				, arg.remoteAddress )
//						.insert("crte_ipad"				, arg.remoteAddress )
//						.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//						.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					;
//					data.attach(Action.modify);
//					data.execute();
//					data.clear();
//				}
//
//				if(!item_idcd.equals("")&& !acpt_numb.equals("")&& !line_seqn.equals("")){
//					data.param
//						.query("update pror_item a										")
//						.query("left outer join pror_mast b on a.invc_numb = b.invc_numb")
//						.query("set a.item_idcd = :pror_item_idcd", item_idcd)
//						.query("  , a.updt_idcd = :updt_idcd", updt_idcd)
//						.query("  , a.updt_ipad = :updt_ipad", arg.remoteAddress)
//						.query("  , a.updt_dttm = :updt_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
//						.query("where acpt_numb = :invc_numb", acpt_numb)
//						.query("and   acpt_seqn = :line_seqn", line_seqn)
//						.query("and   wkfw_seqn > 0			")
//					;
//					data.attach(Action.direct);
//					data.execute();
//					data.clear();
//				}
//
//				// 수주내역 계획여부
//				data.param // 집계문  입력
//					.query("select acpt_numb, acpt_seqn, acpt_amnd_degr	")
//					.query("from pror_mast								")
//					.query("where acpt_numb is not null					")
//
//				;
//				SqlResultMap info = data.selectForMap();
//				data.clear();
//
//				String invc_numb = "";
//				for (SqlResultRow row2:info) {
//					if(	!row2.getParamText("acpt_numb").equals("") &&
//						!row2.getParamText("acpt_seqn").equals("") &&
//						!row2.getParamText("acpt_amnd_degr").equals("")){
//						data.param
//							.table("acpt_item					")
//							.where("where invc_numb = :invc_numb", row2.getParameter("acpt_numb"))
//							.where("and   line_seqn = :line_seqn", row2.getParameter("acpt_seqn"))
//							.where("and   amnd_degr = :amnd_degr", row2.getParameter("acpt_amnd_degr"))
//
//							.update("pdsd_yorn"			, "1")		//계획여부
//
//							.update("updt_idcd"			, row2.getParameter("updt_idcd"))
//							.update("updt_ipad"			, arg.remoteAddress )
//							.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
//						;
//						data.attach(Action.update);
//						data.execute();
//						data.clear();
//					}
//				}
//				if(!item_idcd.equals("")){
//					data.param
//						.table("pror_mast					")
//						.where("where acpt_numb = :invc_numb", acpt_numb)
//						.where("and   acpt_seqn = :line_seqn", line_seqn)
//
//						.update("item_idcd"			, item_idcd)		//품목 ID
//						.update("find_name"			, item_code
//													+ " "
//													+ drwg_numb
//													+ revs_numb
//													+ " "
//													+ cstm_name
//								)
//
//
//
//						.update("updt_idcd"			, updt_idcd)
//						.update("updt_ipad"			, arg.remoteAddress )
//						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
//					;
//					data.attach(Action.update);
//					data.execute();
//					data.clear();
//				}
//
//
//				// 수주내역 도면삭제
////				data.param // 집계문  입력
////					.query("select a.invc_numb, a.line_seqn, a.amnd_degr,if(f.invc_numb is null, null , 'Y' ) as drwg_chk	")
////					.query("from acpt_item a								")
////					.where("left outer join apnd_file f on a.invc_numb = f.invc_numb and a.line_seqn = f.line_seqn			")
////					.where("                           and a.amnd_degr = f.assi_seqn										")
////					.where("where f.invc_numb is null																		")
////
////				;
////				SqlResultMap info2 = data.selectForMap();
////				data.clear();
////				for (SqlResultRow row2:info2) {
////					if(	!row2.getParamText("invc_numb").equals("") &&
////						!row2.getParamText("line_seqn").equals("") &&
////						!row2.getParamText("amnd_degr").equals("")){
////						data.param
////							.table("apnd_file					")
////							.where("where invc_numb = :invc_numb", row2.getParameter("acpt_numb"))
////							.where("and   line_seqn = :line_seqn", row2.getParameter("acpt_seqn"))
////							.where("and   amnd_degr = :amnd_degr", row2.getParameter("acpt_amnd_degr"))
////						;
////						data.attach(Action.delete);
////						data.execute();
////						data.clear();
////
////					}
////				}
//			}
//		}
	}


	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("acpt_mast						")
					.where("where invc_numb  = :invc_numb	")
					.where("and   amnd_degr  = :amnd_degr	")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"		))

					.update("line_stat"			, 2									)
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;
				data.attach(Action.update);
				data.clear();

				data.param
					.table("acpt_item					")
					.where("where invc_numb = :invc_numb")
					.where("and   line_seqn = :line_seqn")
					.where("and   amnd_degr = :amnd_degr")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"))

				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

				// 품목삭제
				if(!arg.getParamText("item_idcd").equals("")){
					data.param
						.table("item_mast					")
						.where("where item_idcd = :item_idcd")
						.unique("item_idcd"			, arg.fixParameter("item_idcd"))
					;
					data.attach(Action.delete);
					data.execute();
					data.clear();
				}

				// 자재내역 삭제
				if(	!arg.getParamText("invc_numb").equals("") &&
						!arg.getParamText("line_seqn").equals("")){
					data.param
						.table("mtrl_need						")
						.where("where invc_numb  = :invc_numb	")

						.unique("invc_numb"			, arg.fixParameter("invc_numb"		))
					;
					data.attach(Action.delete);
					data.execute();
					data.clear();
				}

				//도면 삭제 1
				if(	!arg.getParamText("invc_numb").equals("") &&
					!arg.getParamText("line_seqn").equals("") &&
					!arg.getParamText("amnd_degr").equals("")){
					data.param
						.table("apnd_file					")
						.where("where invc_numb = :invc_numb", arg.getParameter("invc_numb"))
						.where("and   line_seqn = :line_seqn", arg.getParameter("line_seqn"))
						.where("and   assi_seqn = :amnd_degr", arg.getParameter("amnd_degr"))
					;
					data.attach(Action.delete);
					data.execute();
					data.clear();
				}
				//도면 삭제 2
				if(	!arg.getParamText("invc_numb").equals("") &&
						!arg.getParamText("line_seqn").equals("") &&
						!arg.getParamText("amnd_degr").equals("")){
					data.param
					.table("acpt_imeg						")
					.where("where invc_numb = :invc_numb", arg.getParameter("invc_numb"))
					.where("and   line_seqn = :line_seqn", arg.getParameter("line_seqn"))
					;
					data.attach(Action.delete);
					data.execute();
					data.clear();
				}

				// 지시삭제
//				data.param // 집계문  입력
//					.query("select a.invc_numb, a.line_seqn									")
//					.query("from pror_item a												")
//					.query("left outer join pror_mast b on a.invc_numb = b.invc_numb		")
//					.query("where b.acpt_numb      = :acpt_numb			", row.getParameter("invc_numb"))
//					.query("and   b.acpt_seqn      = :acpt_seqn			", row.getParameter("line_seqn"))
//					.query("and   b.acpt_amnd_degr = :acpt_amnd_degr	", row.getParameter("amnd_degr"))
//				;
//				SqlResultMap info3 = data.selectForMap();
//				data.clear();
//				String invc_numb = "";
//				String line_seqn = "";
//				// 1 : 20
//				for (SqlResultRow row2:info3) {
//					invc_numb = row2.getParamText("invc_numb");
//					line_seqn = row2.getParamText("line_seqn");
//					data.param
//						.table("pror_item					")
//						.where("where invc_numb = :invc_numb2")
//						.where("and   line_seqn = :line_seqn2")
//
//						.unique("invc_numb2"			, invc_numb)
//						.unique("line_seqn2"			, line_seqn)
//
//					;
//					data.attach(Action.delete);
//					data.execute();
//					data.clear();
//				}
//				data.param
//					.table("pror_mast					")
//					.where("where invc_numb = :invc_numb2")
//
//					.unique("invc_numb2"			, invc_numb)
//
//				;
//				data.attach(Action.delete);
//				data.execute();
//				data.clear();

			} else {
				String item_idcd = "";
				String item_code = "";
				String item_leng = "";
				String item_widh = "";
				String updt_idcd = "";
				ParamToJson trans = new ParamToJson();
				String json_data = trans.TranslateRow(arg, row, "acpt_mast_json_fields");
				data.param
					.table("acpt_mast						")
					.where("where invc_numb	= :invc_numb	")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))

					.update("amnd_degr"			, row.getParameter("amnd_degr"))
					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"))
					.update("invc_date"			, row.getParameter("invc_date"))
					.update("acpt_case_name"	, row.getParameter("modl_name"))
					.update("ordr_dvcd"			, row.getParameter("ordr_dvcd"))
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"))
					.update("expt_dvcd"			, row.getParameter("expt_dvcd"))
					.update("pcod_numb"			, row.getParameter("pcod_numb"))
					.update("deli_date"			, row.getParameter("deli_date"))
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"))
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"))
					.update("dlvy_cstm_name"	, row.getParameter("dlvy_cstm_name"))
					.update("acpt_dvcd"			, row.getParameter("acpt_dvcd"))
					.update("mdtn_prsn"			, row.getParameter("mdtn_prsn"))
					.update("cont_date"			, row.getParameter("cont_date"))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
					.update("dept_idcd"			, row.getParameter("dept_idcd"))
					.update("crny_dvcd"			, row.getParameter("crny_dvcd"))
					.update("excg_rate"			, row.getParameter("excg_rate"))
					.update("ostt_wrhs_idcd"	, row.getParameter("ostt_wrhs_idcd"))
					.update("acpt_qntt"			, row.getParameter("acpt_qntt"))
					.update("unit_idcd"			, row.getParameter("unit_idcd"))
					.update("trut_dvcd"			, row.getParameter("trut_dvcd"))
					.update("dlvy_cond_dvcd"	, row.getParameter("dlvy_cond_dvcd"))
					.update("crdt_exce_yorn"	, row.getParameter("crdt_exce_yorn"))
					.update("amnt_lack_yorn"	, row.getParameter("amnt_lack_yorn"))
					.update("sale_stor_yorn"	, row.getParameter("sale_stor_yorn"))
					.update("remk_text"			, row.getParameter("remk_text"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("cofm_yorn"			, row.getParameter("cofm_yorn"))
					.update("cofm_dttm"			, row.getParameter("cofm_dttm"))
					.update("cstm_drtr_name"	, row.getParameter("cstm_drtr_name"))
					.update("cofm_drtr_idcd"	, row.getParameter("cofm_drtr_idcd"))
					.update("acpt_stat_dvcd"	, row.getParameter("acpt_stat_dvcd"))
					.update("json_data"			, json_data)

					.update("find_name"			, row.getParamText("invc_numb").trim()
												+ " "
												+ row.getParamText("invc_date").trim()
												+ " "
												+ row.getParamText("cstm_name").trim()
												+ " "
												+ row.getParamText("cstm_code").trim())
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(rowaction);
				data.execute();
				data.clear();

				//품목update
				item_idcd = row.getParamText("item_idcd");
				item_code = row.getParamText("item_code");
				updt_idcd = row.getParamText("updt_idcd");
				if(item_idcd.equals("")){
					data.param // 집계문  입력
						.query("call fn_seq_gen_v2 (						")
						.query("   :STOR "       , row.getParameter("stor_id"))  // 본사코드
						.query(" , :table "      , "item_mast"				)  // 테이블명
						.query(" , :invc_numb "  , "not defined"			)  // Invoice 번호
						.query(" ) 											")
					;
					SqlResultMap info = data.selectForMap();
					data.clear();
					for (SqlResultRow row2:info) {
						item_idcd = row2.getParamText("seq"		);
						item_code = row2.getParamText("code"	);
					}
				}
				if(Integer.parseInt(row.getParamText("item_leng")) > 0){
					item_leng = row.getParamText("item_leng");
				}
				if(Integer.parseInt(row.getParamText("item_widh")) > 0){
					item_widh = "*"+row.getParamText("item_widh");
				}
				data.param
					.table("item_mast												")
					.where("where item_idcd  = :item_idcd							")

					.unique("item_idcd"			, item_idcd)

					.insert("item_code"			, item_code)
					.update("item_name"			, row.getParameter("modl_name"		))
					.update("item_leng"			, row.getParameter("item_leng"		))
					.update("item_widh"			, row.getParameter("item_widh"		))
					.update("item_spec"			, item_leng+item_widh)

					.insert("item_path_dvcd"	, "2"	)
					.insert("acct_bacd"			, "3000")

					.update("find_name"			, item_code.trim()
												+ " "
												+ row.getParamText("modl_name").trim())
					.update("sysm_memo"			, row.getParameter("invc_numb"		))
					.update("line_stat"			, row.getParameter("line_stat"		))
					.insert("line_levl"			, row.getParameter("line_levl"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(Action.modify);
				data.execute();
				data.clear();

				json_data = trans.TranslateRow(arg, row, "acpt_item_json_fields");

				data.param
					.table("acpt_item					")
					.where("where invc_numb	= :invc_numb")
					.where("and   line_seqn = :line_seqn")
					.where("and   amnd_degr = :amnd_degr")


					.unique("invc_numb"				, row.fixParameter("invc_numb"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))
					.update("amnd_degr"				, row.fixParameter("amnd_degr"))

					.update("item_idcd"				, item_idcd)
					.update("unit_idcd"				, row.getParameter("unit_idcd"))
					.update("orig_invc_numb"		, row.getParameter("orig_invc_numb"))
					.update("orig_seqn"				, row.getParameter("orig_seqn"))
					.update("orig_invc_qntt"		, row.getParameter("orig_invc_qntt"))
					.update("optn_dvcd"				, row.getParameter("optn_dvcd"))
					.update("optn_psbl_yorn"		, row.getParameter("optn_psbl_yorn"))
					.update("optn_adtn"				, row.getParameter("optn_adtn"))
					.update("pric_adpt"				, row.getParameter("pric_adpt"))
					.update("norm_sale_pric"		, row.getParameter("norm_sale_pric"))
					.update("sale_stnd_pric"		, row.getParameter("sale_stnd_pric"))
					.update("invc_qntt"				, row.getParameter("acpt_qntt"))
					.update("invc_pric"				, row.getParameter("invc_pric"))
					.update("vatx_incl_yorn"		, row.getParameter("vatx_incl_yorn"))
					.update("vatx_rate"				, row.getParameter("vatx_rate"))
					.update("sply_amnt"				, row.getParameter("sply_amnt"))
					.update("vatx_amnt"				, row.getParameter("vatx_amnt"))
					.update("invc_amnt"				, row.getParameter("invc_amnt"))
					.update("krwn_amnt"				, row.getParameter("krwn_amnt"))
					.update("krwn_vatx"				, row.getParameter("krwn_vatx"))
					.update("krwn_ttsm_amnt"		, row.getParameter("krwn_ttsm_amnt"))
					.update("stnd_unit"				, row.getParameter("stnd_unit"))
					.update("stnd_unit_qntt"		, row.getParameter("stnd_unit_qntt"))
					.update("wrhs_idcd"				, row.getParameter("wrhs_idcd"))
					.update("dlvy_cstm_idcd"		, row.getParameter("dlvy_cstm_idcd"))
					.update("deli_date"				, row.getParameter("deli_date"))
					.update("deli_chge_dvcd"		, row.getParameter("deli_chge_dvcd"))
					.update("deli_chge_resn"		, row.getParameter("deli_chge_resn"))
					.update("pcod_numb"				, row.getParameter("pcod_numb"))
					.update("cstm_offr_date"		, row.getParameter("cstm_offr_date"))
					.update("cstm_deli_date"		, row.getParameter("cstm_deli_date"))
					.update("cstm_lott_numb"		, row.getParameter("cstm_lott_numb"))
					.update("pdsd_yorn"				, row.getParameter("pdsd_yorn"))
					.update("dlvy_date"				, row.getParameter("dlvy_date"))
					.update("dlvy_hhmm"				, row.getParameter("dlvy_hhmm"))
					.update("remk_text"				, row.getParameter("remk_text"))
					.update("stok_asgn_qntt"		, row.getParameter("stok_asgn_qntt"))
					.update("offr_asgn_qntt"		, row.getParameter("offr_asgn_qntt"))
					.update("ostt_dvcd"				, row.getParameter("ostt_dvcd"))
					.update("acpt_stat_dvcd"		, row.getParameter("acpt_stat_dvcd"))
					.update("ostt_qntt"				, row.getParameter("ostt_qntt"))
					.update("sale_qntt"				, row.getParameter("sale_qntt"))
					.update("dsct_qntt"				, row.getParameter("dsct_qntt"))
					.update("dlvy_memo"				, row.getParameter("dlvy_memo"))
					.update("json_data"				, json_data)

					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(rowaction);
				data.execute();
				data.clear();

				// mtrl_need 에 제품 넣기
				data.param
					.table("mtrl_need						")
					.where("where invc_numb  = :invc_numb	")
					.where("and   acpt_seqn  = :acpt_seqn	")
					.where("and   line_seqn  = :line_seqn	")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("acpt_seqn"			, row.fixParameter("line_seqn"		))
					.unique("line_seqn"			, "1")

					.insert("acct_bacd"			, "3000"   )		//계정구분
					.insert("item_idcd"			, item_idcd)		//품목ID
					.update("need_qntt"			, row.getParameter("acpt_qntt"		))		//소요수량
					.insert("prnt_idcd"			, row.getParameter("invc_numb"		))		// invc_numb
					.update("item_leng"			, row.getParameter("item_leng"		))
					.update("item_widh"			, row.getParameter("item_widh"		))
					.insert("line_levl"			, "1" ) // 1
					.insert("line_ordr"			, "10") // 10 20 30

					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(rowaction);
				data.execute();
				data.clear();

				//mtrl_need 소요량 update
				data.param
					.query("call mtrl_update (									")
					.query("   :invc_numb		" , row.fixParameter("invc_numb"))
					.query(" ) 													")
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
			}
		}
		return null ;
	}

	public SqlResultMap setItem1(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		int i = 0;
		String invc_numb = "";

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.query("select  count(*) as cnt ")
					.where("from    pror_item")
					.where("where   invc_numb = :invc_numb",row.fixParameter("invc_numb"))
					.where("and     item_idcd = :item_idcd",row.fixParameter("item_idcd"))
				;
				float chkPror = Float.parseFloat(data.selectForMap().get(0).getParamText("cnt"));
				data.clear();

				if(chkPror > 0 ){
					data.param
						.table("pror_mast						")
						.where("where invc_numb  = :invc_numb	")

						.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					;
					data.attach(Action.delete);
					data.execute();
					data.clear();
				}
				data.param
					.table("pror_item					")
					.where("where invc_numb = :invc_numb")
					.where("and   wkct_idcd = :wkct_idcd")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("wkct_idcd"			, row.fixParameter("wkct_idcd"		))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
			} else {
				if(i == 0){
					invc_numb = row.fixParamText("acpt_numb");
					data.param
						.table("pror_mast													")
						.where("where invc_numb = :invc_numb								")		//invoice번호
//						.where("and   item_idcd = :item_idcd								")		//invoice번호

						.unique("invc_numb"			, row.fixParameter("new_invc_numb"			))

						.update("item_idcd"			, row.fixParameter("item_idcd"			))		//품목ID
						.update("acpt_amnd_degr"	, row.getParameter("acpt_amnd_degr"		))		//수주차수
						.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"			))		//사업장ID
						.update("pdod_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))		//생산지시일자
						.update("acpt_numb"			, row.getParameter("acpt_numb"			))		//수주번호
						.update("acpt_seqn"			, row.getParameter("acpt_seqn"			))		//수주순번
						.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))		//거래처ID
						.update("unit_idcd"			, row.getParameter("unit_idcd"			))		//단위ID
						.update("indn_qntt"			, row.getParameter("indn_qntt"			))		//지시수량
						.update("prog_stat_dvcd"	, "0"									)		//진행구분코드
						.update("user_memo"			, row.getParameter("user_memo"			))		//비고

						.update("updt_idcd"			, row.getParameter("updt_idcd"			))
						.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
					;data.attach(Action.modify);
					data.execute();
					data.clear();

					data.param
						.table("pror_item						")
						.where("where invc_numb		= :invc_numb")		//invoice번호
						.where("and   line_seqn		= :line_seqn")		//순번

						.unique("invc_numb"			, row.fixParameter("new_invc_numb"			))		//invoice번호
						.unique("line_seqn"			, row.fixParameter("line_seqn"			))		//순번

						.update("item_idcd"			, row.fixParameter("item_idcd"			))		//품목ID
						.update("wkct_idcd"			, row.getParameter("wkct_idcd"			))		//공정ID
						.update("wkfw_seqn"			, row.getParameter("wkfw_seqn"			))		//공정흐름순서
						.update("wkfw_idcd"			, row.getParameter("wkfw_idcd"			))		//공정흐름순서
						.update("otod_yorn"			, row.getParameter("otod_yorn"			))		//외주여부
						.update("otod_cstm_idcd"	, row.getParameter("otod_cstm_idcd"		))		//외주거래처ID
						.update("indn_qntt"			, row.getParameter("indn_qntt"			))		//지시수량
						.update("plan_strt_dttm"	, row.getParameter("plan_strt_dttm"		))		//계획시작일시
						.update("plan_endd_dttm"	, row.getParameter("plan_endd_dttm"		))		//계획종료일시
						.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"			))		//사업장ID
						.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))		//거래처ID
						.update("unit_idcd"			, row.getParameter("unit_idcd"			))		//단위ID
						.update("user_memo"			, row.getParameter("user_memo"			))		//비고
						.update("prog_stat_dvcd"	, "0"									)		//진행구분코드
						.update("orig_invc_numb"	, row.getParameter("acpt_numb"			))		//비고

						.update("updt_idcd"			, row.getParameter("updt_idcd"			))
						.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();

					i++;

				}else{
					data.param
						.table("pror_item						")
						.where("where invc_numb		= :invc_numb")		//invoice번호
						.where("and   line_seqn		= :line_seqn")		//순번

						.unique("invc_numb"			, row.fixParameter("new_invc_numb"		))		//invoice번호
						.unique("line_seqn"			, row.fixParameter("line_seqn"			))		//순번

						.update("wkct_idcd"			, row.getParameter("wkct_idcd"			))		//공정ID
						.update("wkfw_seqn"			, row.getParameter("wkfw_seqn"			))		//공정흐름순서
						.update("wkfw_idcd"			, row.getParameter("wkfw_idcd"			))		//공정흐름순서
						.update("otod_yorn"			, row.getParameter("otod_yorn"			))		//외주여부
						.update("otod_cstm_idcd"	, row.getParameter("otod_cstm_idcd"		))		//외주거래처ID
						.update("indn_qntt"			, row.getParameter("indn_qntt"			))		//지시수량
						.update("plan_strt_dttm"	, row.getParameter("plan_strt_dttm"		))		//계획시작일시
						.update("plan_endd_dttm"	, row.getParameter("plan_endd_dttm"		))		//계획종료일시
						.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"			))		//사업장ID
						.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))		//거래처ID
						.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
						.update("unit_idcd"			, row.getParameter("unit_idcd"			))		//단위ID
						.update("user_memo"			, row.getParameter("user_memo"			))		//비고
						.update("prog_stat_dvcd"	, "0"									)		//진행구분코드
						.update("orig_invc_numb"	, row.getParameter("acpt_numb"			))		//비고

						.update("updt_idcd"			, row.getParameter("updt_idcd"			))
						.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();
				}
				data.param
					.query("call auto_pror_dttm_update(")
					.query("         :invc_numb",row.fixParameter("new_invc_numb"))
					.query("       , :line_seqn",row.fixParameter("line_seqn"))
					.query(")")
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
			}
			data.param
				.table("acpt_item						")
				.where("where invc_numb		= :invc_numb")		//invoice번호
				.where("and   line_seqn		= :line_seqn")		//순번

				.unique("invc_numb"			, row.fixParameter("acpt_numb"			))		//invoice번호
				.unique("line_seqn"			, row.fixParameter("acpt_seqn"			))		//순번

				.update("pdsd_yorn"			, "1"									)		//공정ID
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}
		setHjOk(arg, data, invc_numb);
		return null ;
	}

	public SqlResultMap setSubItem(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String check = arg.getParamText("check");


		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
		if (rowaction == Action.delete) {

			SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
			ParamToJson trans = new ParamToJson();
			String param = trans.TranslateRowRec(map,"", "invc_numb,line_seqn,item_idcd");

			data.param
				.query("call bom_delete_copy1 (					")
				.query("   :param		" , param)
				.query(" ) 									")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		} else {
			data.param
				.table("mtrl_need						")
				.where("where invc_numb  = :invc_numb	")
				.where("and   acpt_seqn  = :acpt_seqn	")
				.where("and   line_seqn  = :line_seqn	")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"		))
				.unique("acpt_seqn"			, arg.fixParameter("acpt_seqn"		))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"		))

				.update("acct_bacd"			, arg.getParameter("acct_bacd"			))		//계정구분
				.update("item_idcd"			, arg.getParameter("item_idcd"			))		//품목ID
				.update("drwg_numb"			, arg.getParameter("drwg_numb"			))		//도면번호
				.update("revs_numb"			, arg.getParameter("revs_numb"			))		//rev번호
				.update("item_widh"			, arg.getParameter("item_widh"			))		//품목넓이
				.update("item_leng"			, arg.getParameter("item_leng"			))		//품목길이
				.update("need_qntt"			, arg.getParameter("need_qntt"			))		//소요수량
				.update("pqty_ndqt"			, arg.getParameter("pqty_ndqt"			))		//개당소요량
				.update("loss_rate"			, arg.getParameter("loss_rate"			))		//로스율
				.update("user_memo"			, arg.getParameter("user_memo"			))		//사용자메모
				.insert("prnt_idcd"			, arg.getParameter("prnt_idcd"			))
				.insert("line_levl"			, arg.getParameter("line_levl"			))
				.insert("line_ordr"			, arg.getParameter("line_ordr"			))
				.insert("uper_seqn"			, arg.getParameter("uper_seqn"			))

				.update("updt_idcd"			, arg.getParameter("updt_idcd"			))
				.insert("crte_idcd"			, arg.getParameter("crte_idcd"			))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
			data.attach(rowaction);
			data.execute();
			data.clear();
			if(arg.getParamText("hqof_idcd").toUpperCase().equals("N1000HJSYS")){
				data.param
					.table("apnd_file						")
					.where("where orgn_dvcd  = :orgn_dvcd	")
					.where("and   invc_numb  = :invc_numb	")
					.where("and   line_seqn  = :line_seqn	")
					.where("and   assi_seqn  = :assi_seqn	")

					.unique("orgn_dvcd"			, arg.fixParameter("orgn_dvcd"		))
					.unique("invc_numb"			, arg.fixParameter("invc_numb"		))
					.unique("line_seqn"			, arg.fixParameter("line_seqn"		))
					.unique("assi_seqn"			, arg.fixParameter("assi_seqn"		))

					.update("file_name"			, arg.getParameter("drwg_numb")+"-"+arg.getParameter("revs_numb")+".png")
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();
			}
			if(check.equals('Y')){
				data.param
				.table("mtrl_need						")
				.where("where invc_numb  = :invc_numb	")
				.where("and   prnt_idcd  = :prnt_idcd")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"		))
				.unique("prnt_idcd"			, arg.fixParameter("prev_item"		))

				.update("prnt_idcd"			, arg.getParameter("item_idcd"		))
				;
				data.attach(rowaction);
				data.execute();
				data.clear();
			}
			data.param
				.query("update mtrl_need set need_qntt = (:qntt * pqty_ndqt)",arg.getParameter("need_qntt"))
				.query("where  invc_numb = :invc_numb",arg.fixParameter("invc_numb"))
				.query("and    prnt_idcd = :prnt_idcd",arg.fixParameter("item_idcd"))
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
			if(arg.getParamText("hqof_idcd").toUpperCase().equals("N1000")){ //혁진에서 요청했으나 다시 원복요청하여 equals변경, 차후 생성시 자동 바코드 생성 요청할 경우 equals복구 혹은 옵션처리.
				if(rowaction.equals(Action.insert)){
					data.param
						.table("pror_mast													")
						.where("where invc_numb = :invc_numb								")		//invoice번호
						.where("and   item_idcd = :item_idcd								")		//invoice번호

						.unique("invc_numb"			, arg.fixParameter("invc_numb")+"-"+arg.fixParamText("line_seqn"))
						.unique("item_idcd"			, arg.fixParameter("item_idcd"			))		//품목ID

						.update("acpt_amnd_degr"	, 1)		//수주차수
						.update("bzpl_idcd"			, arg.getParameter("bzpl_idcd"			))		//사업장ID
						.update("pdod_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))		//생산지시일자
						.update("acpt_numb"			, arg.getParameter("invc_numb"			))		//수주번호
						.update("acpt_seqn"			, 1)		//수주순번
						.update("cstm_idcd"			, arg.getParameter("cstm_idcd"			))		//거래처ID
						.update("indn_qntt"			, arg.getParameter("need_qntt"			))		//지시수량
						.update("prog_stat_dvcd"	, "0"									)		//진행구분코드
						.update("user_memo"			, arg.getParameter("user_memo"			))		//비고

						.update("updt_idcd"			, arg.getParameter("updt_idcd"			))
						.insert("crte_idcd"			, arg.getParameter("crte_idcd"			))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
					;data.attach(Action.modify);
					data.execute();
					data.clear();

					data.param
						.table("pror_item						")
						.where("where invc_numb		= :invc_numb")		//invoice번호
						.where("and   line_seqn		= :line_seqn")		//순번
						.where("and   item_idcd		= :item_idcd")		//품목ID

						.unique("invc_numb"			, arg.fixParameter("invc_numb")+"-"+arg.fixParamText("line_seqn"))		//invoice번호
						.unique("line_seqn"			, 1)		//순번
						.unique("item_idcd"			, arg.fixParameter("item_idcd"			))		//품목ID

						.update("wkct_idcd"			, "001")		//공정ID
						.update("wkfw_seqn"			, 1)		//공정흐름순서
						.update("indn_qntt"			, arg.getParameter("need_qntt"			))		//지시수량
						.update("cstm_idcd"			, arg.getParameter("cstm_idcd"			))		//거래처ID
						.update("unit_idcd"			, arg.getParameter("unit_idcd"			))		//단위ID
						.update("prog_stat_dvcd"	, "0"									)		//진행구분코드

						.update("updt_idcd"			, arg.getParameter("updt_idcd"			))
						.insert("crte_idcd"			, arg.getParameter("crte_idcd"			))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();

					data.param
						.table("acpt_item						")
						.where("where invc_numb		= :invc_numb")		//invoice번호
						.where("and   line_seqn		= :line_seqn")		//순번

						.unique("invc_numb"			, arg.fixParameter("invc_numb"			))		//invoice번호
						.unique("line_seqn"			, 1)		//순번

						.update("pdsd_yorn"			, "1"									)		//공정ID
					;
					data.attach(Action.update);
					data.execute();
					data.clear();
				}
				setHjOk(arg, data, arg.fixParameter("invc_numb")+"-"+arg.fixParamText("line_seqn"));
			}
		}
		return null ;
	}
	public SqlResultMap setSubItems(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			int  pqty_ndqt = 0;
			if(arg.getParamText("pqty_ndqt").equals("")){
				pqty_ndqt = Integer.parseInt(row.getParamText("set_qntt"));
			}else{
				pqty_ndqt = Integer.parseInt(row.getParamText("pqty_ndqt"));
			}
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.query("call bom_delete (					")
					.query("   :invc_numb		" , row.fixParameter("invc_numb"))
					.query(" , :item_idcd		" , row.fixParameter("item_idcd"))
					.query(" , :line_seqn		" , row.fixParameter("line_seqn"))
					.query(" ) 									")
				;
				data.attach(Action.direct);
				data.execute();

			} else {
				data.param
					.table("mtrl_need						")
					.where("where invc_numb  = :invc_numb	")
					.where("and   acpt_seqn  = :acpt_seqn	")
					.where("and   line_seqn  = :line_seqn	")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("acpt_seqn"			, row.fixParameter("acpt_seqn"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))

					.update("acct_bacd"			, row.getParameter("acct_bacd"			))		//계정구분
					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("item_widh"			, row.getParameter("item_widh"			))		//품목넓이
					.update("item_leng"			, row.getParameter("item_leng"			))		//품목길이
					.update("need_qntt"			, row.getParameter("need_qntt"			))		//소요수량
					.update("pqty_ndqt"			, pqty_ndqt								)		//개당소요량
					.insert("prnt_idcd"			, row.getParameter("prnt_idcd"			))
					.insert("line_levl"			, row.getParameter("line_levl"			))
					.insert("uper_seqn"			, row.getParameter("uper_seqn"			))

					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(rowaction);
				data.execute();
				data.clear();
				setHjOk(arg, data, row.fixParamText("invc_numb"));
			}
		}
		return null ;
	}
	public SqlResultMap setFileName(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("apnd_file")
			.where("where orgn_dvcd	= :orgn_dvcd" )
			.where("and invc_numb	= :invc_numb" )
			.where("and line_seqn	= :line_seqn" )
			.where("and assi_seqn	= :assi_seqn" )

			.unique("orgn_dvcd"				, arg.fixParameter("orgn_dvcd"))
			.unique("invc_numb"				, arg.fixParameter("invc_numb"))
			.unique("line_seqn"				, arg.fixParameter("line_seqn"))
			.unique("assi_seqn"				, arg.fixParameter("assi_seqn"))

			.update("file_name"				, arg.fixParameter("file_name"))
		;data.attach(Action.update);
		data.execute();
		return null;
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

	public SqlResultMap setEstiOk(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String invc_numb	= arg.getParamText("invc_numb") ;
		String cofm_yorn	= arg.getParamText("cofm_yorn");

		data.param
			.table("pjod_mast")
			.where("where pjod_idcd	= :pjod_idcd" )

			.unique("pjod_idcd"			, arg.fixParameter("pjod_idcd"))
			.update("amnd_degr"			, arg.getParameter("amnd_degr"))

		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}

	public SqlResultMap setAcpt_Copy(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		data = arg.newStorage("POS");
		data.param
		.query("call auto_acpt_copy_hjsys (			")
		.query("   :invc_numb     "  , arg.fixParameter("invc_numb")		)  // invc 번호
		.query(" , :deli_date     "  , arg.fixParameter("deli_date")		)  // 납기일자
		.query(" , :new_invc_numb "  , arg.fixParameter("new_invc_numb")	)  // new invc 번호
		.query(" , :crte_idcd     "  , arg.fixParameter("crte_idcd")		)  // 생성자
		.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}
	public SqlResultMap setWkfw(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		data = arg.newStorage("POS");
		data.param
			.table("pror_mast													")
			.where("where invc_numb = :invc_numb								")		//invoice번호
			.where("and   item_idcd = :item_idcd								")		//invoice번호

			.unique("invc_numb"			, arg.fixParameter("invc_numb")+"-"+arg.fixParameter("line_seqn"))		//invoice번호
			.unique("item_idcd"			, arg.fixParameter("item_idcd"))		//품목ID

			.update("acpt_amnd_degr"	, 1)		//수주차수
			.update("pdod_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))		//생산지시일자
			.update("acpt_numb"			, arg.getParameter("invc_numb"			))		//수주번호
			.update("acpt_seqn"			, arg.getParameter("line_seqn"))		//수주순번
			.update("cstm_idcd"			, arg.getParameter("cstm_idcd")								)		//거래처ID
			.update("indn_qntt"			, arg.getParameter("need_qntt"			))		//지시수량
			.update("prog_stat_dvcd"	, "0"									)		//진행구분코드

			.update("updt_idcd"			, arg.getParameter("updt_idcd"			))
			.insert("crte_idcd"			, arg.getParameter("crte_idcd"			))
			.update("updt_ipad"			, arg.remoteAddress )
			.insert("crte_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
		;data.attach(Action.modify);
		data.execute();
		data.clear();
		data.param
			.table("pror_item")
			.where("where invc_numb = :invc_numb")
			.where("and   line_seqn = :line_seqn")

			.unique("invc_numb", arg.fixParameter("invc_numb")+"-"+arg.fixParameter("line_seqn"))
			.unique("line_seqn", arg.fixParameter("line_seqn"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();
		data.param
			.query("insert into pror_item(				")
			.query(" invc_numb,							")
			.query(" line_seqn,							")
			.query(" wkct_idcd,							")
			.query(" orig_invc_numb,					")
			.query(" cstm_idcd,							")
			.query(" item_idcd,							")
			.query(" wkfw_idcd,							")
			.query(" wkfw_seqn,							")
			.query(" indn_qntt,							")
			.query(" prog_stat_dvcd,					")
			.query(" sysm_memo							")
			.query(")									")
			.query("select								")
			.query(" :invc_numb,			", arg.fixParameter("invc_numb")+"-"+arg.fixParameter("line_seqn"))
			.query(" b.line_seqn,						")
			.query(" b.wkct_idcd,						")
			.query(" :orig_invc_numb,		", arg.fixParameter("invc_numb"))
			.query(" :cstm_idcd,			", arg.fixParameter("cstm_idcd"))
			.query(" :item_idcd,			", arg.fixParameter("item_idcd"))
			.query(" a.wkfw_idcd,							")
			.query(" b.line_seqn,						")
			.query(" :indn_qntt,			",arg.fixParameter("need_qntt"))
			.query(" 0 as prog_stat_dvcd,				")
			.query(" 'excel upload'						")
			.query("from wkfw_clss a					")
			.query("left outer join wkfw_rout b on a.wkfw_idcd = b.wkfw_idcd	")
			.query("where a.wkfw_idcd = :wkfw_idcd",arg.fixParameter("wkfw_idcd"))
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
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

	// 조회 Lister3
	public SqlResultMap getSearchLister3(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.indn_qntt   , a.wkct_idcd   , a.otod_yorn   , a.otod_cstm_idcd				")
			.query("       , a.wkfw_seqn   , a.wkfw_idcd   , b.acpt_numb   , b.acpt_seqn					")
			.query("       , w.wkct_name   , w.wkct_code   , a.invc_numb   , a.line_seqn					")
			.query("       , c.cstm_name as otod_cstm_name , a.item_idcd   , a.user_memo					")
		;
	data.param //퀴리문
			.where("from pror_item a																		")
			.where("left outer join pror_mast b on a.invc_numb = b.invc_numb								")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd								")
			.where("left outer join cstm_mast c on a.otod_cstm_idcd = c.cstm_idcd							")
			.where("where 1=1																				")
			.where("and   a.wkfw_seqn > 0																	")
			.where("and   b.acpt_numb = :acpt_numb		" , arg.getParameter("acpt_numb"					))
			.where("and   b.acpt_seqn = :line_seqn		" , arg.getParameter("acpt_seqn"					))
			.where("and   b.item_idcd = :item_idcd		" , arg.getParameter("item_idcd"					))
			.where("and   b.acpt_amnd_degr = :acpt_amnd_degr		" , arg.getParameter("acpt_amnd_degr"	))
			.where("order by a.wkfw_seqn																	")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	// 조회 Lister4
	public SqlResultMap getSearchLister4(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.wkct_idcd         , a.wkct_code           , a.wkct_name					")
			.query("       , a.wkct_stnm         , a.bzpl_idcd           , a.dept_idcd					")
			.query("       , a.user_memo         , a.sysm_memo           , a.prnt_idcd					")
			.query("       , a.line_levl         , a.line_ordr           , a.line_stat					")
			.query("       , a.find_name         , a.updt_user_name      , a.updt_ipad					")
			.query("       , a.updt_dttm         , a.updt_idcd           , a.updt_urif					")
			.query("       , a.crte_ipad         , a.crte_dttm           , a.crte_idcd					")
			.query("       , a.crte_user_name    , a.line_clos           , a.crte_urif					")
		;
	data.param //퀴리문
			.where("from		wkct_mast a																		")
			.where("where		1=1																				")
			.where("and			a.wkct_idcd not in ( select   a.wkct_idcd from pror_item a						")
			.where("                                 left outer join pror_mast b on a.invc_numb = b.invc_numb	")
			.where("                                 where a.wkfw_seqn > 0										")
			.where("                                 and   b.acpt_numb = :acpt_numb	" , arg.getParamText("acpt_numb"))
			.where("                                 and   b.acpt_seqn = :acpt_seqn	" , arg.getParamText("acpt_seqn"))
			.where("                                 and   b.item_idcd = :item_idcd	" , arg.getParamText("item_idcd"))
			.where("                                 and   b.acpt_amnd_degr = :acpt_amnd_degr )	" , arg.getParamText("acpt_amnd_degr"))
			.where("and			line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.wkct_code"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap setHjOk(HttpRequestArgument arg, DataMessage data,String invc_numb) throws Exception {
		data.clear();
		data.param
			.query("call auto_acpt_json(")
			.query(" :invc_numb", invc_numb)
			.query(")")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		return null;
	}
	public SqlResultMap test(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.invc_numb , a.line_seqn,b.drwg_numb,b.revs_numb,a.imge_1fst					")

			.query("from acpt_imeg a																		")
			.query(" right outer join (select * from mtrl_need group by drwg_numb,revs_numb) b				")
			.query(" on a.invc_numb = b.invc_numb and a.line_seqn = b.line_seqn 							")
			.query("where a.invc_numb is not null 															")
			.query("limit :start ,100															",Integer.parseInt(arg.getParamText("start")))
		;

		return  data.selectForMap();
	}
	//TODO 도면 업로드
	public SqlResultMap upload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
//		DataMessage data = new DataMessage("NETHOSTING");  //ctrl DB접속할때 쓰임
		DataMessage data = arg.newStorage("POS");
		ArrayList<String> file_name = new ArrayList<String>();
		ArrayList<String> name = new ArrayList<String>();
		ArrayList<Long> file_size = new ArrayList<Long>();
		int assi_seqn = Integer.parseInt((String)arg.getParameter("assi_seqn"));
		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.
		for (int i = 0; i < file.length; i++) {
			file_name.add(file[i].getFileItem().getName());
			file_size.add(file[i].getFileItem().getSize());
			if(file[i].getFileItem().getName().lastIndexOf(".") == -1){
				name.add(file_name.get(i));
			}else{
				name.add(file_name.get(i).substring(0,file[i].getFileItem().getName().lastIndexOf(".")));
			}
		}

		Date date = new Date();
		DateFormat dtfmt = new SimpleDateFormat("yyyyMMddhhmmss");
		String now = dtfmt.format(date);						// 이름 겹치지않게 하기 위한 날짜 fmt
		String regExp = "^([\\S]+(\\.(?i)(jpg||png||gif||bmp))$)";

		// 파일이 이미지일 경우
		for (int i = 0; i < file_name.size(); i++) {

			// FTPTEST 일 경우 ( 해당 DB의 ddns를 보내주면 된다. ) -> 특정 서버 정보를 가져오고자 할떄 HostProperty를 사용
			String hq = arg.getParamText("hqof_idcd");
			HostProperty host = property.getProperty( hq+".IMG" ); // 업로드 서버 정보 가져오기
			// 서버에서 기존 path를 불러온다.
			String directory = host.getHostPath(); // 업로드 경로를 지정한다.
			String imageName="";

//			imageName = arg.getParamText("drwg_numb")+"-"+arg.getParamText("revs_numb")+".png";
			imageName = arg.getParamText("file_name");

			System.out.println("************************");
			System.out.println(imageName);


			// ftp 생성
			FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue("sftp"));
			// ftp 접속
			if (ftp.connect(host)) {
				try{
					// logic 처리 ( DB등 )
					if(file_name.get(i).matches(regExp)){
						ftp.upload(directory, imageName, file[i]);
					}else{
						PDDocument doc = PDDocument.load(file[0].getInputStream());
						PDFRenderer renderer = new PDFRenderer(doc);
						ByteArrayInputStream inputStream = null;
						BufferedImage image = renderer.renderImageWithDPI(i, 300);  // 해상도 조절 300이 좋음
						ByteArrayOutputStream baos = new ByteArrayOutputStream();
						ImageIO.write(image, "png", baos);
						inputStream = new ByteArrayInputStream(baos.toByteArray());

						ftp.upload(directory, imageName, inputStream);		// inputstream로 저장한다 	- 이미지 그대로 저장
						inputStream.close();
						baos.close();
						doc.close();
					}

					System.out.println(arg.fixParameter("orgn_dvcd"));
					System.out.println(arg.fixParameter("invc_numb"));
					System.out.println(arg.fixParameter("line_seqn"));
					System.out.println(arg.fixParameter("line_seqn"));
					System.out.println(directory);
					data.param
						.table("apnd_file")
						.where("where orgn_dvcd	= :orgn_dvcd" )
						.where("and invc_numb	= :invc_numb" )
						.where("and line_seqn	= :line_seqn" )
						.where("and assi_seqn	= :assi_seqn" )

						.unique("orgn_dvcd"				, arg.fixParameter("orgn_dvcd"))
						.unique("invc_numb"				, arg.fixParameter("invc_numb"))
						.unique("line_seqn"				, arg.fixParameter("line_seqn")	)
						.unique("assi_seqn"				, assi_seqn						)

						.update("file_name"				, imageName						)
						.update("file_size"				, file_size.get(i)				)
						.update("path_name"				, directory						)
						.update("file_ttle"				, arg.getParameter("file_ttle" ))
						.update("file_dvcd_1fst"		, arg.getParameter("file_dvcd_1fst" ))
						.update("file_dvcd_2snd"		, arg.getParameter("file_dvcd_2snd" ))
						.update("file_dvcd_3trd"		, arg.getParameter("file_dvcd_3trd" ))
						.update("upld_dttm"				, new SimpleDateFormat("yyyyMMdd").format(new Date()) )
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();

					data.param
						.table("acpt_imeg")
						.where("where invc_numb = :invc_numb" )
						.where("and   line_seqn = :line_seqn" )
						.unique("invc_numb"            , arg.fixParameter("invc_numb"))
						.unique("line_seqn"            , arg.fixParameter("line_seqn"))
						.update("remk_text", imageName)
					;
					data.attach(Action.modify);
					data.execute();

				} catch(Exception ex) {
					throw ex;
				} finally {
					ftp.disconnect();
				}
			}
		}
		data.execute();
		return map;
	}
	//TODO 도면 업로드
	public SqlResultMap upload2(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
//			DataMessage data = new DataMessage("NETHOSTING");  //ctrl DB접속할때 쓰임
		DataMessage data = arg.newStorage("POS");
		ArrayList<String> file_name = new ArrayList<String>();
		ArrayList<String> name = new ArrayList<String>();
		ArrayList<Long> file_size = new ArrayList<Long>();
		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.
		for (int i = 0; i < file.length; i++) {
			file_name.add(file[i].getFileItem().getName());
			file_size.add(file[i].getFileItem().getSize());
			if(file[i].getFileItem().getName().lastIndexOf(".") == -1){
				name.add(file_name.get(i));
			}else{
				name.add(file_name.get(i).substring(0,file[i].getFileItem().getName().lastIndexOf(".")));
			}
		}

//		Date date = new Date();
//		DateFormat dtfmt = new SimpleDateFormat("yyyyMMddhhmmss");
//		String now = dtfmt.format(date);						// 이름 겹치지않게 하기 위한 날짜 fmt
		String regExp = "^([\\S]+(\\.(?i)(jpeg||jpg||png||gif||bmp))$)";
		int assi_seqn = Integer.parseInt(arg.fixParamText("assi_seqn"));

		for (int i = 0; i < file_name.size(); i++) {

			// FTPTEST 일 경우 ( 해당 DB의 ddns를 보내주면 된다. ) -> 특정 서버 정보를 가져오고자 할떄 HostProperty를 사용
			String hq = arg.getParamText("hqof_idcd");
			HostProperty host = property.getProperty( hq+".IMG" ); // 업로드 서버 정보 가져오기
			// 서버에서 기존 path를 불러온다.
			String directory = host.getHostPath(); // 업로드 경로를 지정한다.
			String imageName="";

//				imageName = arg.getParamText("drwg_numb")+"-"+arg.getParamText("revs_numb")+".png";
			imageName = arg.fixParamText("invc_numb")+'-'+arg.fixParamText("line_seqn")+"_"+(assi_seqn)+".png";
			System.out.println("************************");
			System.out.println(imageName);


			// ftp 생성
			FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue("sftp"));
			// ftp 접속
			if (ftp.connect(host)) {
				try{
					// logic 처리 ( DB등 )
					System.out.println(file_name.get(i));
					System.out.println(file_name.get(i).matches(regExp));
					if(file_name.get(i).matches(regExp)){
						ftp.upload(directory, imageName, file[i]);
					}else{
						PDDocument doc = PDDocument.load(file[i].getInputStream());
						PDFRenderer renderer = new PDFRenderer(doc);
						ByteArrayInputStream inputStream = null;
						BufferedImage image = renderer.renderImageWithDPI(0, 300);  // 해상도 조절 300이 좋음
						ByteArrayOutputStream baos = new ByteArrayOutputStream();
						ImageIO.write(image, "png", baos);
						inputStream = new ByteArrayInputStream(baos.toByteArray());

						ftp.upload(directory, imageName, inputStream);		// inputstream로 저장한다 	- 이미지 그대로 저장
						inputStream.close();
						baos.close();
						doc.close();
					}

					data.param
						.table("apnd_file")
						.where("where orgn_dvcd	= :orgn_dvcd" )
						.where("and invc_numb	= :invc_numb" )
						.where("and line_seqn	= :line_seqn" )
						.where("and assi_seqn	= :assi_seqn" )

						.unique("orgn_dvcd"				, arg.fixParameter("orgn_dvcd"))
						.unique("invc_numb"				, arg.fixParameter("invc_numb"))
						.unique("line_seqn"				, arg.fixParameter("line_seqn")	)
						.unique("assi_seqn"				, assi_seqn++					)

						.update("file_name"				, imageName						)
						.update("file_size"				, file_size.get(i)				)
						.update("path_name"				, directory						)
						.update("file_ttle"				, arg.getParameter("file_ttle" ))
						.update("file_dvcd_1fst"		, arg.getParameter("file_dvcd_1fst" ))
						.update("file_dvcd_2snd"		, arg.getParameter("file_dvcd_2snd" ))
						.update("file_dvcd_3trd"		, arg.getParameter("file_dvcd_3trd" ))
						.update("upld_dttm"				, new SimpleDateFormat("yyyyMMdd").format(new Date()) )
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();

					data.param
						.table("acpt_imeg")
						.where("where invc_numb = :invc_numb" )
						.where("and   line_seqn = :line_seqn" )
						.unique("invc_numb"            , arg.fixParameter("invc_numb"))
						.unique("line_seqn"            , arg.fixParameter("line_seqn"))
						.update("remk_text", imageName)
					;
					data.attach(Action.modify);
					data.execute();
				} catch(Exception ex) {
					throw ex;
				} finally {
					ftp.disconnect();
				}
			}
		}
		data.execute();
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
		data.param
			.query("call acpt_to_ostt(				")
			.query("   :param       "  , arg.fixParameter("param")		)
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap getTreeSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select ifnull(max(line_seqn),0) as seq,ifnull(max(line_ordr),0) as ordr_seq	")
		;
		data.param //퀴리문
		.where("from mtrl_need												")
		.where("where 1=1													")
		.where("and   invc_numb = :invc_numb" , arg.getParameter("invc_numb"))
		;
		return data.selectForMap();
	}

	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select file_name					")
			.where("from  apnd_file						")
			.where("where invc_numb = :invc_numb", arg.getParameter("invc_numb"))
			.where("and   line_seqn = :line_seqn", arg.getParameter("line_seqn"))
		;
		return data.selectForMap();
	}
	public SqlResultMap getExcel(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("with recursive cte as (																								")
			.query("select    a.invc_numb   , a.item_idcd   , a.acct_bacd																")
			.query("        , a.prnt_idcd   , a.line_seqn   , a.uper_seqn																")
			.query("				, a.line_levl   , a.drwg_numb   , a.revs_numb														")
			.query("				, a.pqty_ndqt   , a.user_memo   , a.need_qntt 														")
			.query("from mtrl_need a																									")
			.query("where a.invc_numb = :invc_numb1		", arg.fixParameter("invc_numb"))
			.query("and   a.line_levl <= 2																								")
			.query("union all																											")
			.query("select    a.invc_numb   , a.item_idcd    , a.acct_bacd																")
			.query("        , a.prnt_idcd   , a.uper_seqn as line_seqn ,a.line_seqn as uper_seqn										")
			.query("				, a.line_levl   , a.drwg_numb    , a.revs_numb														")
			.query("				, a.pqty_ndqt   , a.user_memo    , a.need_qntt														")
			.query("from mtrl_need a																									")
			.query("inner join cte b on b.item_idcd = a.prnt_idcd and a.invc_numb = b.invc_numb and a.uper_seqn = b.line_seqn			")
			.query("where a.invc_numb = :invc_numb2		", arg.fixParameter("invc_numb"))
			.query("and   a.line_levl > 2																								")
			.query(")select  a.*																										")
			.query("        , i.item_name, i.item_tick , i.item_widh, i.item_leng														")
			.query("			  , (select base_name  from base_mast r where a.acct_bacd  = r.base_code								")
			.query("                                            and   r.line_stat = 0													")
			.query("                                            and   r.prnt_idcd   = '1102' LIMIT 1) as acct_bacd_name					")
			.query("			  , (select base_name  from base_mast r where i.mtrl_bacd  = r.base_code								")
			.query("			                                     and   r.line_stat = 0												")
			.query("                                           and   r.prnt_idcd = '3101' limit 1) as mtrl_bacd_name					")
			.query("from cte a																											")
			.query("left outer join item_mast i on a.item_idcd = i.item_idcd															")
			.query("order by a.line_seqn,a.uper_seqn 																					")

		;
		return data.selectForMap();
	}
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
//		temp.param
//			.query("select line_stat, line_clos				")
//			.query("from  mtrl_need							")
//		 	.query("where invc_numb = :invc_numb", arg.fixParameter("invc_numb"))
//		;
//		SqlResultRow del = temp.selectForRow();


		data.param
			.query("call bom_delete_0827 (					")
			.query("   :invc_numb		" , arg.fixParameter("invc_numb"))
			.query(" , :item_idcd		" , arg.fixParameter("item_idcd"))
			.query(" , :line_seqn		" , arg.fixParameter("line_seqn"))
			.query(" ) 									")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
//		deleteFile(arg);

		data.param
			.table("apnd_file								")
			.where("where invc_numb							")
			.where("and   line_seqn							")

			.unique("invc_numb", arg.getParameter("invc_numb"))
			.unique("line_seqn", arg.getParameter("line_seqn"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("mtrl_need")
			.where("where invc_numb = :invc_numb ")
			.where("and   amnd_degr = :amnd_degr ")
			.where("and   acpt_seqn = :acpt_seqn ")
			.where("and   line_seqn = :line_seqn ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))
			.unique("acpt_seqn"		, arg.fixParameter("acpt_seqn"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.delete);
		data.execute();

//		data.param
//			.table("pror_mast")
//			.where("where invc_numb = :invc_numb ")
//			//
//			.unique("invc_numb"		, arg.fixParameter("invc_numb")+"-"+arg.fixParamText("line_seqn"))
//			.update("updt_ipad"		, arg.remoteAddress)
//			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//		;data.attach(Action.delete);
//		data.execute();

//		data.param
//			.table("pror_item")
//			.where("where invc_numb = :invc_numb ")
//			.where("and   line_seqn = :line_seqn ")
//			//
//			.unique("invc_numb"		, arg.fixParameter("invc_numb")+"-"+arg.fixParamText("line_seqn"))
//			.unique("line_seqn"		, 1)
//			.update("updt_ipad"		, arg.remoteAddress)
//			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//		;data.attach(Action.delete);
//		data.execute();
		return null;
	}
	public SqlResultMap setOstt(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			data.param
				.query("call acpt_to_ostt_hnsun(						")
				.query("     :invc_numb", row.fixParameter("invc_numb"))
				.query(")												")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}

		return null;
	}
	/**
	 * 엑셀등록
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */

	public void setExcel(HttpRequestArgument arg, SqlResultRow item , String bacd,  String idcd ,  String prnt_idcd,  int line_seqn , int line_ordr ) throws Exception {
		DataMessage data = arg.newStorage("POS");

			Set set = item.keySet();
			Iterator itr = set.iterator();
			ArrayList<String> key = new ArrayList<String>();

			while (itr.hasNext()) {
				key.add((String)itr.next());
			}
			data.param
				.query("select  base_code  								")
			;
			data.param //퀴리문
				.where("from base_mast									")
				.where("where     1=1									")
				.where("and     prnt_idcd =3101							")
				.where("and     base_name	=:base_code",		item.getParamText("mtrl_bacd"))
			;
			String mtrl_bacd = "";
			double refn_valu_1fst = 1;
			if(data.selectForMap().size()!=0)
			{
				mtrl_bacd = data.selectForMap().get(0).getParamText("base_code");
			}
			data.clear();

			data.param
				.query("select  line_seqn , line_levl+1 as line_levl		")
			;
			data.param //퀴리문
				.where("from mtrl_need									")
				.where("where     1=1									")
				.where("and     invc_numb = :invc_numb",item.getParamText("invc_numb"))
				.where("and     item_idcd	=:item_idcd",		prnt_idcd)
			;
			double uper_seqn = 0;
			double line_levl = 0;
			if(data.selectForMap().size()>0)
			{
				uper_seqn =Double.parseDouble((data.selectForMap().get(0).getParamText("line_seqn")));
				line_levl = Double.parseDouble((data.selectForMap().get(0).getParamText("line_levl")));
			}
			data.clear();
		if(idcd == null  || idcd.equals("")){
				data.param
					.query("call fn_seq_gen_v2 (							")
					.query("     :STOR                " ,  arg.fixParameter("stor_id"))
					.query("   , :table               " ,  "item_mast")
					.query("   , :item_idcd           " , "not defind"		)
					.query(" ) 												")
				;
				idcd = data.selectForRow().getParamText("seq");
				data.clear();
				double unit_wigt = 0 ;  //무게
				double item_widh = 0;
				double item_leng = 0;
				double item_tick = 0;

				if(item.getParamText("item_leng").equals("")){
					item_leng = Double.parseDouble(item.getParamText("item_leng")) ;  //길이
				}

				if(item.getParamText("item_leng").equals("")){
					item_widh = Double.parseDouble(item.getParamText("item_widh")) ;  //넓이
				}
				if(item.getParamText("item_leng").equals("")){
					item_tick = Double.parseDouble(item.getParamText("item_tick")) ;  //두께
				}



				unit_wigt  = item_leng * item_widh * item_tick *  refn_valu_1fst /1000000 ;

				data.param
					.table ("item_mast")
					.where ("where item_idcd = :item_idcd")

					.unique("item_idcd"        , idcd)

					.update("item_code"        , idcd)		//품목명
					.update("acct_bacd"        , bacd)		//품목명
					.update("item_name"        , item.getParameter("item_name"))		//품목명
					.update("item_leng"        , item.getParameter("item_leng"))		//품목길이
					.update("item_widh"        , item.getParameter("item_widh"))		//품목폭
					.update("item_tick"        , item.getParameter("item_tick"))		//품목두께
					.update("unit_wigt"        , item.getParameter("unit_wigt"))		//무게
					.update("user_memo"        , item.getParameter("user_memo"))
					.update("remk_text"        , item.getParameter("remk_text"))
					.update("mtrl_bacd"        , mtrl_bacd)
					.update("unit_wigt"        , unit_wigt)
//					.update("uper_seqn"        , uper_seqn)
					.update("line_levl"        , line_levl	)								//ROW 레벨
					.update("line_stat"        , 0	)
					.update("line_clos"        , item.getParameter("line_clos"))
					.update("find_name"        , item.getParameter("item_name")
												+ " "
												+ item.getParameter("item_name")
												+ "	"
												)
					.update("sysm_memo"        , "Excel Upload"    )
					.update("updt_ipad"        , arg.remoteAddress )
					.insert("crte_ipad"        , arg.remoteAddress )
					.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();

				data.param
					.table ("mtrl_need")

					.where ("where invc_numb = :invc_numb")
					.where ("and amnd_degr = :amnd_degr")
					.where ("and acpt_seqn = :acpt_seqn")
					.where ("and line_seqn = :line_seqn")

					.unique("invc_numb"        , item.getParameter("invc_numb"))	//INVOICE 번호
					.unique("amnd_degr"        , 1	)								//AMD차수
					.unique("acpt_seqn"        , 1	)								//수주순번
					.unique("line_seqn"        , line_seqn	)						//순번

					.update("item_idcd"        , idcd)								//품목ID
					.update("acct_bacd"        , bacd)								//계정구분
					.update("drwg_numb"        , item.getParameter("drwg_numb"))	//도면번호
					.update("revs_numb"        , item.getParameter("revs_numb"))	//REV번호
					.update("item_widh"        , item.getParameter("item_widh"))	//품목폭
					.update("item_leng"        , item.getParameter("item_leng"))	//품목길이
					.update("pqty_ndqt"        , item.getParameter("pqty_ndqt"))	//개당소요량
					.update("need_qntt"        , item.getParameter("need_qntt"))	//소요량
					.update("prnt_idcd"        , prnt_idcd	)						//부모 ID
					.update("uper_seqn"        , uper_seqn	)								//상위순번
					.update("line_levl"        , line_levl	)								//ROW 레벨
					.update("line_ordr"        , line_ordr	)						//ROW 순번
					.update("user_memo"        , item.getParameter("user_memo"))
					.update("line_stat"        , 0	)
					.update("find_name"        , item.getParameter("item_name")
												+ " "
												+ item.getParameter("drwg_numb")
												+ "	"
												)
					.update("sysm_memo"        , "Excel Upload"    )
					.update("updt_ipad"        , arg.remoteAddress )
					.insert("crte_ipad"        , arg.remoteAddress )
					.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();
		}else{
			data.param
				.table ("mtrl_need")
				.where ("where invc_numb = :invc_numb")
				.where ("and amnd_degr = :amnd_degr")
				.where ("and acpt_seqn = :acpt_seqn")
				.where ("and line_seqn = :line_seqn")



				.unique("invc_numb"        , item.getParameter("invc_numb"))	//INVOICE 번호
				.unique("amnd_degr"        , 1	)								//AMD차수
				.unique("acpt_seqn"        , 1	)								//수주순번
				.unique("line_seqn"        , line_seqn	)						//순번

				.update("item_idcd"        , idcd)								//품목ID
				.update("acct_bacd"        , bacd)								//계정구분
				.update("drwg_numb"        , item.getParameter("drwg_numb"))	//도면번호
				.update("revs_numb"        , item.getParameter("revs_numb"))	//REV번호
				.update("item_widh"        , item.getParameter("item_widh"))	//품목폭
				.update("item_leng"        , item.getParameter("item_leng"))	//품목길이
				.update("pqty_ndqt"        , item.getParameter("pqty_ndqt"))	//개당소요량
				.update("need_qntt"        , item.getParameter("need_qntt"))	//소요량
				.update("prnt_idcd"        , prnt_idcd	)						//부모 ID
				.update("uper_seqn"        , uper_seqn	)						//상위순번
				.update("line_levl"        , line_levl	)								//ROW 레벨
				.update("line_ordr"        , line_ordr	)						//ROW 순번
				.update("user_memo"        , item.getParameter("user_memo"))
				.update("line_stat"        , 0	)
				.update("find_name"        , item.getParameter("item_name")
											+ " "
											+ item.getParameter("drwg_numb")
											+ "	"
											)
				.update("sysm_memo"        , "Excel Upload"    )
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();
		}
		data.param
			.table("pror_item						")
			.where("where invc_numb		= :invc_numb")		//invoice번호
			.where("and   item_idcd		= :item_idcd")		//품목ID

			.unique("invc_numb"        , item.fixParameter("invc_numb")+"-"+line_seqn)
			.unique("item_idcd"        , idcd)
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();
		data.param
			.query("select  cstm_idcd  								")
		;
		data.param //퀴리문
			.where("from acpt_mast									")
			.where("where  invc_numb = :invc_numb",item.fixParameter("invc_numb"))
		;
		String cstm_idcd = "";
		if(data.selectForMap().size()!=0)
		{
			cstm_idcd = data.selectForMap().get(0).getParamText("cstm_idcd");
		}
		data.clear();

		if(!item.getParamText("wkfw_idcd").equals("")){
			data.param
				.table("pror_mast													")
				.where("where invc_numb = :invc_numb								")		//invoice번호
				.where("and   item_idcd = :item_idcd								")		//invoice번호

				.unique("invc_numb"			, item.fixParameter("invc_numb")+"-"+line_seqn)		//invoice번호
				.unique("item_idcd"			, idcd)		//품목ID

				.update("acpt_amnd_degr"	, 1)		//수주차수
				.update("pdod_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))		//생산지시일자
				.update("acpt_numb"			, item.getParameter("invc_numb"			))		//수주번호
				.update("acpt_seqn"			, line_seqn)		//수주순번
				.update("cstm_idcd"			, cstm_idcd								)		//거래처ID
				.update("indn_qntt"			, item.getParameter("need_qntt"			))		//지시수량
				.update("prog_stat_dvcd"	, "0"									)		//진행구분코드

				.update("updt_idcd"			, arg.getParameter("updt_idcd"			))
				.insert("crte_idcd"			, arg.getParameter("crte_idcd"			))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
			;data.attach(Action.modify);
			data.execute();
			data.clear();
			data.param
				.query("insert into pror_item(				")
				.query(" invc_numb,							")
				.query(" line_seqn,							")
				.query(" wkct_idcd,							")
				.query(" orig_invc_numb,					")
				.query(" cstm_idcd,							")
				.query(" item_idcd,							")
				.query(" wkfw_idcd,							")
				.query(" wkfw_seqn,							")
				.query(" indn_qntt,							")
				.query(" prog_stat_dvcd,					")
				.query(" sysm_memo							")
				.query(")									")
				.query("select								")
				.query(" :invc_numb,			", item.fixParameter("invc_numb")+"-"+line_seqn)
				.query(" b.line_seqn,						")
				.query(" b.wkct_idcd,						")
				.query(" :orig_invc_numb,	",item.getParameter("invc_numb"))
				.query(" :cstm_idcd,			",cstm_idcd)
				.query(" :item_idcd,			",idcd)
				.query(" a.wkfw_idcd,							")
				.query(" b.line_seqn,						")
				.query(" :indn_qntt,		",item.getParameter("need_qntt"			))
				.query(" 0 as prog_stat_dvcd,				")
				.query(" 'excel upload'						")
				.query("from wkfw_clss a					")
				.query("left outer join wkfw_rout b on a.wkfw_idcd = b.wkfw_idcd	")
				.query("where a.wkfw_code = :wkfw_code",item.fixParameter("wkfw_idcd"))
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}
			if(arg.getParamText("stor_id").toUpperCase().equals("N1000HJSYS1000")){
				data.param
					.table("pror_mast													")
					.where("where invc_numb = :invc_numb								")		//invoice번호
					.where("and   item_idcd = :item_idcd								")		//invoice번호

					.unique("invc_numb"			, item.fixParameter("invc_numb")+"-"+line_seqn)		//invoice번호
					.unique("item_idcd"			, idcd)		//품목ID

					.update("acpt_amnd_degr"	, 1)		//수주차수
					.update("pdod_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))		//생산지시일자
					.update("acpt_numb"			, item.getParameter("invc_numb"			))		//수주번호
					.update("acpt_seqn"			, line_seqn)		//수주순번
					.update("cstm_idcd"			, cstm_idcd								)		//거래처ID
					.update("indn_qntt"			, item.getParameter("need_qntt"			))		//지시수량
					.update("prog_stat_dvcd"	, "0"									)		//진행구분코드

					.update("updt_idcd"			, arg.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, arg.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;data.attach(Action.modify);
				data.execute();
				data.clear();

				data.param
					.table("pror_item						")
					.where("where invc_numb		= :invc_numb")		//invoice번호
					.where("and   line_seqn		= :line_seqn")		//순번
					.where("and   item_idcd		= :item_idcd")		//품목ID

					.unique("invc_numb"			, item.fixParameter("invc_numb")+"-"+line_seqn)		//invoice번호
					.unique("line_seqn"			, 1)		//순번
					.unique("item_idcd"			, idcd)		//품목ID

					.update("wkct_idcd"			, "001")		//공정ID
					.update("wkfw_seqn"			, 1)		//공정흐름순서
					.update("indn_qntt"			, item.getParameter("need_qntt"			))		//지시수량
					.update("cstm_idcd"			, cstm_idcd)		//거래처ID
					.update("prog_stat_dvcd"	, "0"									)		//진행구분코드

					.update("updt_idcd"			, arg.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, arg.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();

				data.param
					.table("acpt_item						")
					.where("where invc_numb		= :invc_numb")		//invoice번호
					.where("and   line_seqn		= :line_seqn")		//순번

					.unique("invc_numb"			, item.fixParameter("invc_numb"			))		//invoice번호
					.unique("line_seqn"			, 1)		//순번

					.update("pdsd_yorn"			, "1"									)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
				setHjOk(arg, data, item.fixParameter("invc_numb")+"-"+line_seqn);
			}
			if(!item.getParamText("file_name").equals("")){
				data.param
					.table("apnd_file						")
					.where("where invc_numb		= :invc_numb")		//invoice번호
					.where("and   line_seqn		= :line_seqn")		//순번
					.where("and   assi_seqn		= :assi_seqn")		//보조순번
					.where("and   orgn_dvcd		= :orgn_dvcd")		//구분

					.unique("invc_numb"			, item.fixParameter("invc_numb"))		//invoice번호
					.unique("line_seqn"			, line_seqn	)		//순번
					.unique("assi_seqn"			, 1			)		//보조순번
					.unique("orgn_dvcd"			, "acpt_item")		//품목ID

					.update("path_name"			, "/fileUpload")		//주소
					.update("file_dvcd_1fst"	, "3100"	)		//공정흐름순서
					.update("file_name"			, item.fixParameter("file_name"			))		//지시수량

					.update("updt_idcd"			, arg.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, arg.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();
			}
		}


		public String getAcctBacd(HttpRequestArgument arg, String acct_bacd) throws Exception {
			DataMessage data	= arg.newStorage("POS");

			data.param
				.query("select  base_code  								")
			;
			data.param //퀴리문
				.where("from base_mast									")
				.where("where   1=1										")
				.where("and     prnt_idcd =1102							")
				.where("and     base_name	=:base_code",		acct_bacd)
			;
			String bacd = "";
			if(data.selectForMap().size()!=0)
			{
				bacd = data.selectForMap().get(0).getParamText("base_code");
			}
			data.clear();
			return bacd;
		}

		public String getItemIdcd(HttpRequestArgument arg, SqlResultRow item  ) throws Exception {
			DataMessage data	= arg.newStorage("POS");

			data.param
				.query("select  item_idcd 								")
			;
			data.param //퀴리문
				.where("from item_mast									")
				.where("where   1=1										")
				.where(" and     item_widh	=:item_widh",		item.getParamText("item_widh"))
				.where(" and     item_leng	=:item_leng",		item.getParamText("item_leng"))
				.where(" and     item_name	=:item_name",		item.getParamText("item_name"))
			;
			if(item.getParamText("acct_bacd").equals("원자재")){
				data.param //퀴리문
					.where(" and     item_tick	=:item_tick",		item.getParamText("item_tick"))
				;
			}
			String idcd = "";
			if(data.selectForMap().size()!=0)
			{
				idcd = data.selectForMap().get(0).getParamText("item_idcd");
			}
			data.clear();
			return idcd;
		}

		public String getFindIdcd(HttpRequestArgument arg, SqlResultRow item ) throws Exception {
			DataMessage data	= arg.newStorage("POS");

			data.param
				.query("select  item_idcd  								")
			;
			data.param //퀴리문
				.where("from item_mast									")
				.where("where   1=1										")
				.where(" and     item_widh	=:item_widh",		item.getParamText("prnt_widh"))
				.where(" and     item_leng	=:item_leng",		item.getParamText("prnt_leng"))
				.where(" and     item_name	=:item_name",		item.getParamText("prnt_idcd"))
			;
			String idcd = "";
			if(data.selectForMap().size()!=0)
			{
				idcd = data.selectForMap().get(0).getParamText("item_idcd");
			}
			data.clear();
			return idcd;
	}

}
