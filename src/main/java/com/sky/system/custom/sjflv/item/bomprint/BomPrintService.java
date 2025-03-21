package com.sky.system.custom.sjflv.item.bomprint;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.utils.file.UploadItem;

@Service("sjflv.BomPrintService")
public class BomPrintService extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select    a.item_idcd       , a.item_code      , a.item_name      , a.line_stat	")
			.query("        , c.cstm_name       , b.cstm_idcd 										")
		;
		data.param
			.where("from item_mast a 															")
			.where("left outer join item_base_spec b on a.item_idcd = b.item_idcd				")
			.where("left outer join cstm_mast      c on c.cstm_idcd = b.cstm_idcd				")

			.where("where 1 = 1																	")
			.where("and    a.item_code >= :item_code	" , arg.getParameter("item_code") )
			.where("and    a.item_code <= :item_code2	" , arg.getParameter("item_code2") )
			.where("and    date_format(a.crte_dttm,'%Y%m%d') >= :invc_date1	" , arg.getParameter("invc1_date") )
			.where("and    date_format(a.crte_dttm,'%Y%m%d') <= :invc_date2	" , arg.getParameter("invc2_date") )
			.where("and    a.find_name like %:find_name%	"	, arg.getParameter("find_name"))
			.where("and    substr(a.acct_bacd,1,1) in ('3','2')									")
			.where("and    a.lcls_idcd   = :lcls_idcd		"	, arg.getParamText("lcls_idcd" ) , !"".equals(arg.getParamText("lcls_idcd" )))
			.where("and    a.mcls_idcd   = :mcls_idcd		"	, arg.getParamText("mcls_idcd" ) , !"".equals(arg.getParamText("mcls_idcd" )))
			.where("and    a.scls_idcd   = :scls_idcd		"	, arg.getParamText("scls_idcd" ) , !"".equals(arg.getParamText("scls_idcd" )))
			.where("and    b.cstm_idcd = :cstm_idcd        " , arg.getParameter("cstm_idcd") )
			.where("and    a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" ))		)
			.where("order by item_code															")
		;
		return data.selectForMap();
	}
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		String add = "off";
		if(arg.getParamText("add").equals("on")){
			add = arg.getParamText("add");
		}


		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select   a.prnt_item_idcd       , max(a.revs_numb) as revs_numb								")
			.query("       , a.befr_splr_name       , a.splr_name												")
			.query("       , a.usag_qntt_memo       , a.ecod_purp       , a.drtr_idcd           , a.test_date	")
			.query("       , a.adpt_date            , a.remk_text       , u.user_name as drtr_name				")
			.query("       , a.revs_dvcd            , i.item_code       , i.item_name							")


			.query("       , a.user_memo            , a.sysm_memo       , a.prnt_idcd           , a.line_levl	")
			.query("       , a.line_ordr            , a.line_stat       , a.line_clos           , a.find_name	")
			.query("       , a.updt_user_name       , a.updt_ipad       , a.updt_dttm           , a.updt_idcd	")
			.query("       , a.updt_urif            , a.crte_user_name  , a.crte_ipad           , a.crte_dttm	")
			.query("       , a.crte_idcd            , a.crte_urif												")
		;
		data.param
			.where("from  bom_revs a 															")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd					")
			.where("left outer join item_mast i on a.prnt_idcd = i.item_idcd					")
			.where("where 1 = 1																	")
			.where("and   a.prnt_item_idcd = :prnt_item_idcd	", arg.fixParameter("prnt_item_idcd"))
			.where("and   a.revs_dvcd = if(:revs_dvcd='on',2,1)	", add)
		;
		if(add.equals("off")){
			data.param
				.where("group by remk_text")
			;
		}else{
			data.param
				.where("group by prnt_idcd")
			;
		}
		data.param
			.where("order by a.revs_numb														")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select   a.prnt_item_idcd  , a.revs_numb      , a.line_seqn      , a.ivst_item_idcd	")
			.query("       , a.item_name       , a.item_spec											")
			.query("       , cast(a.mixx_rate as char) as mixx_rate										")
			.query("       , cast(a.ofap_mixx_rate as char) as ofap_mixx_rate							")
			.query("       , a.adpt_date       , i.item_code      , a.revs_dvcd							")
			.query("       , b.kfda            , b.fema           , b.seqc           , b.wdgb			")
			.query("       , b.caca            , b.algy_yorn      , a.ivst_item_idcd as item_idcd		")

			.query("       , a.user_memo       , a.sysm_memo      , a.prnt_idcd							")
			.query("       , a.line_levl       , a.line_ordr      , a.line_stat      , a.line_clos		")
			.query("       , a.find_name       , a.updt_user_name , a.updt_ipad      , a.updt_dttm		")
			.query("       , a.updt_idcd       , a.updt_urif      , a.crte_user_name , a.crte_ipad		")
			.query("       , a.crte_dttm       , a.crte_idcd      , a.crte_urif							")
		;
		data.param
			.where("from  bom_mast a 															")
			.where("left outer join item_mast i on a.ivst_item_idcd = i.item_idcd				")
			.where("left outer join item_mtrl_spec b on i.item_idcd = b.item_idcd				")
			.where("where 1 = 1																	")
			.where("and   a.prnt_item_idcd = :prnt_item_idcd	", arg.getParameter("prnt_item_idcd"))
			.where("and   a.revs_numb      = :revs_numb			", arg.getParameter("revs_numb"))
			.where("and   a.revs_dvcd      = :revs_dvcd			", arg.getParameter("revs_dvcd"))
			.where("and   a.prnt_idcd      = :prnt_idcd			", arg.getParameter("prnt_idcd"))
			.where("order by a.line_seqn														")
		;
		return data.selectForMap();
	}
}
