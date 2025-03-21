package com.sky.system.custom.iypkg.prod.prodordr2;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

@Service("iypkg.ProdOrdr2Service")
public class ProdOrdr2Service extends DefaultServiceHandler{

	public SqlResultMap getMaster1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *, @rownum:=@rownum+1 as rnum																")
		;
			data.param
			.where("from (																								")
			.where("select  a.invc_numb       , a.line_seqn       , b.cstm_idcd       , c.cstm_code						")
			.where("      , c.cstm_name       , b.prod_idcd       , p.prod_code       , p.prod_name						")
			.where("      , p.prod_leng       , p.prod_widh       , p.prod_hght       , b.acpt_qntt						")
			.where("      , b.pcod_numb       , b.invc_date       , pm.invc_date as offr_date							")
			.where("from   boxx_acpt_bop a																				")
			.where("   right outer join boxx_acpt      b  on a.invc_numb = b.invc_numb									")
			.where("   right outer join purc_ordr_item po on a.invc_numb = po.orig_invc_numb and a.line_seqn = po.orig_seqn")
			.where("   left outer join purc_ordr_mast pm on po.invc_numb = pm.invc_numb									")
			.where("   left outer join cstm_mast      c  on b.cstm_idcd = c.cstm_idcd									")
			.where("   left outer join product_mast   p  on b.prod_idcd = p.prod_idcd									")
			.where("where   1=1																							")
			.where("and      pm.offr_dvcd  = '3000'																		")
			.where("and      a.otod_yorn = 1																			")
			.where("and      a.cstm_idcd  = :cstm_idcd       " , arg.getParamText("cstm_idcd" ))
			.where("and      a.prod_idcd  = :prod_idcd       " , arg.getParamText("prod_idcd" ))
			.where("and      a.invc_numb  = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and      pm.invc_date >= :invc1_date		" , arg.getParamText("invc_date1"))
			.where("and      pm.invc_date <= :invc2_date		" , arg.getParamText("invc_date2"))
			.where("and      a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.invc_numb																				")
			.where("order by pm.invc_date desc, a.invc_numb desc														")
			.where(") a, (SELECT @rownum:=0) r																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getMaster2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *, @rownum:=@rownum+1 as rnum																")
		;
			data.param
			.where("from (																								")
			.where("select  a.invc_numb       , a.cstm_idcd       , c.cstm_name       , a.prod_idcd						")
			.where("      , p.prod_name       , p.prod_leng       , p.prod_widh       , p.prod_hght						")
			.where("      , c.cstm_code       , p.prod_code       , a.pcod_numb       , a.acpt_qntt						")
			.where("      , a.invc_date       , cnt1.plan_qntt as cnt1       , ifnull(cnt2.offr_qntt,0) as cnt2			")
			.where("from    boxx_acpt a																					")
			.where("   right outer join boxx_acpt_bop bp on a.invc_numb = bp.invc_numb									")
			.where("   left outer join cstm_mast    c  on a.cstm_idcd = c.cstm_idcd										")
			.where("   left outer join product_mast p  on a.prod_idcd = p.prod_idcd										")
			.where("   left outer join ( select sum(plan_qntt) as plan_qntt, invc_numb, line_seqn						")
			.where("                     from boxx_acpt_bop																")
			.where("                     group by invc_numb																")
			.where("                   ) cnt1 on bp.invc_numb = cnt1.invc_numb and bp.line_seqn = cnt1.line_seqn		")
			.where("   left outer join ( select a.orig_invc_numb, a.orig_seqn, ifnull(sum(a.offr_qntt),0) as offr_qntt	")
			.where("                     from purc_ordr_item a															")
			.where("                     left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb					")
			.where("                     where b.offr_dvcd = '3000'														")
			.where("                     and   b.invc_date >= :invc_date3      " , arg.getParamText("invc_date1" ))
			.where("                     group by a.orig_invc_numb														")
			.where("                   ) cnt2 on bp.invc_numb = cnt2.orig_invc_numb										")
//			.where("   left outer join wkct_mast    w  on w.wkct_idcd = bp.wkct_idcd									")  // 공정에서 거르는것은 아닌것같음 20211105 장우영
			.where("where   1=1																							")
			.where("and     cnt1.plan_qntt > 0																			")
			.where("and     cnt1.plan_qntt <> ifnull(cnt2.offr_qntt,0)													")
//			.where("and     w.otod_yorn = 1																				")
			.where("and     a.line_clos   = 0																			")
			.where("and     a.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     a.invc_date  >= :invc_date1      " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date  <= :invc_date2      " , arg.getParamText("invc_date2" ))
			.where("and     a.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd" ))
			.where("and     a.prod_idcd   = :prod_idcd       " , arg.getParamText("prod_idcd" ))
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.invc_numb																				")
			.where(") a, (SELECT @rownum:=0) r																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
			data.param
			.where("from (																								")
			.where("select  a.invc_numb       , a.line_seqn       , a.orig_invc_numb  , a.orig_seqn						")
			.where("      , a.offr_qntt        , bp.wkun_dvcd     , bp.plan_qntt      , b.invc_date						")
			.where("      , bp.qntt_unit_idcd , u.unit_name       , a.offr_pric       , w.wkct_name						")
			.where("      , c.cstm_name       , a.deli_date																")
			.where("from    purc_ordr_item a 																			")
			.where("   left outer join purc_ordr_mast b  on a.invc_numb = b.invc_numb									")
			.where("   left outer join boxx_acpt_bop  bp on a.orig_invc_numb = bp.invc_numb and a.orig_seqn = bp.line_seqn")
			.where("   left outer join cstm_mast      c  on b.cstm_idcd = c.cstm_idcd									")
			.where("   left outer join wkct_mast      w  on bp.wkct_idcd = w.wkct_idcd									")
			.where("   left outer join unit_mast      u  on bp.qntt_unit_idcd = u.unit_idcd								")
			.where("where   1=1																							")
			.where("and     b.offr_dvcd = '3000'																		")
			.where("and     a.orig_invc_numb  = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     a.line_stat       < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
			data.param
			.where("from (																								")
			.where("select  a.invc_numb as acpt_numb              , a.line_seqn as acpt_seqn							")
			.where("      , a.plan_qntt       , (a.plan_qntt -  ifnull(p.offr_qntt,0)) as unoffr						")
			.where("      , w.wkct_name       , a.stnd_pric       , a.qntt_unit_idcd  , u.unit_name						")
			.where("      , p.invc_numb as offr_numb              , a.wkct_idcd       , a.wkun_dvcd						")
			.where("      , b.prod_idcd       , concat(pm.prod_leng,'*',pm.prod_widh,'*',pm.prod_hght) as item_spec		")
			.where("      , a.user_memo       , a.sysm_memo       , a.line_stat       , a.line_clos						")
			.where("      , a.line_levl       , a.line_ordr       , a.updt_urif       , a.crte_urif						")
			.where("      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd						")
			.where("      , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd						")
			.where("from    boxx_acpt_bop a																				")
			.where("   left outer join boxx_acpt b on a.invc_numb = b.invc_numb											")
			.where("   left outer join product_mast pm on b.prod_idcd = pm.prod_idcd									")
			.where("   left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd											")
			.where("   left outer join unit_mast u on a.qntt_unit_idcd = u.unit_idcd									")
			.where("   left outer join ( select a.invc_numb, sum(a.offr_qntt) as offr_qntt, a.orig_invc_numb, a.orig_seqn")
			.where("                     from purc_ordr_item a															")
			.where("                     left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb					")
			.where("                     where b.offr_dvcd  = '3000'													")
			.where("                     and   b.invc_date >= :invc_date1" , arg.getParamText("invc_date1" ))
			.where("                     group by a.orig_invc_numb, a.orig_seqn											")
			.where("                   ) p on a.invc_numb = p.orig_invc_numb and a.line_seqn = p.orig_seqn				")
			.where("where   1=1																							")
			.where("and     (a.plan_qntt -  ifnull(p.offr_qntt,0)) > 0													")
			.where("and     a.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetailFabc(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
			data.param
			.where("from (																								")
			.where("select  if(ifnull(a.offr_yorn,0) = 1,'발주', '수주') as dvcd											")
			.where("      , if(ifnull(a.offr_yorn,0) = 1, 2, 1) as dvcd_numb											")
			.where("      , a.invc_numb       , a.line_seqn       , a.fabc_idcd       , a.ppln_dvcd						")
			.where("      , a.fabc_name       , a.item_leng       , a.item_widh       , a.item_fxqt						")
			.where("      , a.fdat_spec       , a.cstm_idcd       , c.cstm_name       , a.need_qntt						")
			.where("      , if(ifnull(a.offr_yorn,0) = 1,if(length(ifnull(a.cstm_idcd,''))>0, a.istt_date, a.offr_date), b.invc_date) as invc_date")
			.where("from    boxx_acpt_bom a																				")
			.where("   left outer join boxx_acpt      b on a.invc_numb = b.invc_numb									")
			.where("   left outer join fabc_mast      f on a.fabc_idcd = f.fabc_idcd									")
			.where("   left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd									")
			.where("where   1=1																							")
			.where("and     a.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat")))
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("call prod_ordr_insert (			")
			.query("   :param "       , arg.getParameter("records"))
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");

		data.param
			.table("purc_ordr_item")
			.where("where invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		//item에 없으면 mast에서도 삭제되게끔
		temp.param
			.query("select if((b.line_seqn),'1','0') as yorn						")
			.query("from  purc_ordr_mast a											")
			.query("left outer join purc_ordr_item b on a.invc_numb = b.invc_numb	")
			.query("where a.invc_numb = :invc_numb		", arg.fixParameter("invc_numb"))
		;
		SqlResultRow yorn = temp.selectForRow();

		if(yorn.getParamText("yorn").equals("0")){
			data.param
				.table("purc_ordr_mast")
				.where("where invc_numb = :invc_numb ")

				.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();

			data.param
				.table("boxx_acpt_bop")
				.where("where invc_numb = :invc_numb ")
				.where("and   line_seqn = :line_seqn ")

				.unique("invc_numb"		, arg.fixParameter("orig_invc_numb"))
				.unique("line_seqn"		, arg.fixParameter("orig_seqn"))

				.update("otod_yorn"		, 0	)
				.update("otod_cstm_idcd", "")
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}

		return null;
	}

}
