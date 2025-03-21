package com.sky.system.stock.isos.mtrlmonthlist;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class MtrlIsttWorkService  extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	/**
	 * 입고대기
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		int chk = arg.getParamText("stor_grp").indexOf("DOWON");
		String qry = arg.getParamText("query"); /* entry(검사성적을 입력하기 위해 조회)  or query(등록된 검사성적 조회)  */
		if (qry.length() == 0 ) {
			qry	= "entry";
		}

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select																								")
			.where("        a.invc_numb      , a.invc_date      , a.bzpl_idcd     , a.istt_wrhs_idcd , a.coun_iout_dvcd	")
			.where("      , a.cstm_idcd      , a.drtr_idcd      , u.dept_idcd     , a.remk_text      , a.krwn_vatx		")
			.where("      , bz.bzpl_name     , a.istt_dvcd      , a.krwn_pric     , a.krwn_amnt      , a.krwn_amnt_totl	")
			.where("      , w.wrhs_name     as istt_wrhs_name															")
			.where("      , c.cstm_name																					")
			.where("      , u.user_name     as drtr_name																")
			.where("      , d.dept_name      , (ifnull(a.istt_amnt,0))+(ifnull(a.istt_amnt,0)*0.1) as ttsm_amnt			")
			.where("      , a.stot_date      , a.stot_dvcd      , a.stot_bass     , a.paym_bank_name					")
			.where("      , a.publ_date      , a.expr_date      , a.istt_insp_yorn										")
			.where("      , a.istt_qntt      , (ifnull(a.istt_amnt,0)*0.1) as istt_vatx              , a.istt_amnt		")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd     , a.line_levl      , a.line_ordr		")
			.where("      , a.line_stat      , a.line_clos      , a.find_name											")
			.where("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm     , a.updt_idcd      , a.updt_urif		")
			.where("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm     , a.crte_idcd      , a.crte_urif		")
			.where("from    purc_istt_mast a																			")
			.where("       left outer join purc_istt_item b on a.invc_numb  = b.invc_numb								")
			.where("       left outer join purc_insp b2 on a.invc_numb      = b2.invc_numb								")
			.where("       left outer join bzpl_mast bz on a.bzpl_idcd      = bz.bzpl_idcd								")
			.where("       left outer join wrhs_mast w  on a.istt_wrhs_idcd = w.wrhs_idcd								")
			.where("       left outer join user_mast u  on a.drtr_idcd      = u.user_idcd								")
			.where("       left outer join cstm_mast c  on a.cstm_idcd      = c.cstm_idcd								")
			.where("       left outer join dept_mast d  on u.dept_idcd      = d.dept_idcd								")
			.where("where  1=1																							")
			.where("and    b.istt_yorn <> '1'												")
			.where("and    a.istt_insp_yorn  = '0'																		")
			.where("and    a.istt_wrhs_idcd  = :istt_wrhs_idcd	" , arg.getParamText("wrhs_idcd" ))
			.where("and    a.invc_date between :fr_dt			" , arg.getParamText("fr_dt" ))
			.where("                   and     :to_dt			" , arg.getParamText("to_dt" ))
			.where("and    a.drtr_idcd       = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and    a.find_name   like %:find_name%		" , arg.getParamText("find_name") )
			.where("and    a.line_stat       = :line_stat1		" , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and    a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.invc_numb																				")
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * 입고현황
	 */
	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*")
		;
		data.param
			.where("from (																					")
			.where("select    a.invc_numb      , a.invc_date       , a.bzpl_idcd    , i.istt_wrhs_idcd		")
			.where("        , a.coun_iout_dvcd , a.cstm_idcd       , a.drtr_idcd    , a.dept_idcd			")
			.where("        , b.istt_qntt      , a.vatx_incl_yorn  , a.vatx_rate							")
			.where("        , a.krwn_pric      , a.krwn_amnt												")
			.where("        , a.krwn_vatx      , a.krwn_amnt_totl  , a.remk_text 							")
			.where("        , b.make_cmpy_name , b.make_date       , b.rtil_ddln 							")
			.where("        , c.cstm_code      , c.cstm_name       , w.wrhs_name    as istt_wrhs_name		")
			.where("        , u.user_name as drtr_name             , (ifnull(b.istt_amnt,0) *0.1) as istt_vatx")
			.where("        , (ifnull(b.istt_qntt,0)*ifnull(b.istt_pric,0)) as istt_amnt					") // 금액
			.where("        , (ifnull(b.istt_qntt,0)*ifnull(b.istt_pric,0))+((ifnull(b.istt_qntt,0)*ifnull(b.istt_pric,0)) *0.1) as ttsm_amnt") // 합계
			.where("        , b.line_seqn      , b.item_idcd       , b.istt_pric    , b.orig_invc_numb		")
			.where("        , b.user_memo      , b.sysm_memo       , b.prnt_idcd    , b.line_levl			")
			.where("        , b.line_ordr      , b.line_stat       , b.line_clos    , b.find_name			")
			.where("        , i.item_code      , i.item_name       , i.item_spec    , un.unit_name			")
			.where("from purc_istt_mast a																	")
			.where("left outer join purc_istt_item b on a.invc_numb      = b.invc_numb						")
			.where("left outer join purc_insp b2 on b.invc_numb = b2.invc_numb and b.line_seqn = b2.line_seqn")
			.where("left outer join cstm_mast c      on a.cstm_idcd      = c.cstm_idcd						")
			.where("left outer join user_mast u      on a.drtr_idcd      = u.user_idcd						")
			.where("left outer join item_mast i      on b.item_idcd      = i.item_idcd						")
			.where("left outer join wrhs_mast w      on i.istt_wrhs_idcd = w.wrhs_idcd						")
			.where("left outer join unit_mast un     on i.unit_idcd      = un.unit_idcd						")

			.where("where   1=1																				")
			.where("and     i.find_name like %:find_name%		" , arg.getParamText("find_name"  ))
			.where("and     i.istt_wrhs_idcd  = :istt_wrhs_idcd	" , arg.getParamText("wrhs_idcd" ))
			.where("and     a.invc_date between :fr_dt			" , arg.getParamText("fr_dt" ))
			.where("                    and     :to_dt			" , arg.getParamText("to_dt" ))
			.where("and     a.drtr_idcd    = :drtr_idcd			" , arg.getParamText("drtr_idcd" ))
			.where("and     b.istt_yorn    = '1'															")
			.where("and     a.invc_numb    = :invc_numb1		" , arg.getParamText("invc_numb1" ))
			.where("and     a.line_stat    = :line_stat			" , arg.getParamText("line_stat"  ))
			.where("and     b.item_idcd    = :item_idcd			" , arg.getParamText("item_idcd"  ))
			.where("and     a.line_stat    < :line_stat			" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb																	")
			.where(") a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

	/**
	 * detail 조회
	 *
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("select  a.invc_numb      , a.line_seqn      , a.istt_wrhs_idcd , a.item_idcd      , a.istt_pric			")
			.where("      , a.istt_qntt      , a.vatx_incl_yorn , a.vatx_rate      , a.istt_amnt      , a.istt_vatx			")
			.where("      , a.ttsm_amnt      , a.krwn_pric      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_amnt_totl	")
			.where("      , a.pric_dvcd      , a.cstm_idcd      , a.stnd_unit      , a.stnd_unit_qntt , a.paym_dvcd			")
			.where("      , a.lott_numb      , a.sral_strt_numb , a.sral_endd_numb , a.remk_text      , a.prof_data			")
			.where("      , a.istt_insp_yorn , a.insp_date      , a.insp_drtr_idcd , a.insp_mthd_dvcd , a.insp_qntt			")
			.where("      , a.pass_qntt      , a.poor_qntt      , a.judt_dvcd      , a.poor_caus_bacd						")
			.where("      , (select base_name from base_mast r where a.poor_caus_bacd = r.base_code							")
			.where("                                           and   r.prnt_idcd = '6001') as poor_caus_name				")
			.where("      , a.uper_seqn      , a.disp_seqn																	")
			.where("      , i.item_code      , i.item_name      , i.item_spec												")
			.where("      , a.orig_invc_numb , a.orig_amnd_degr , a.orig_seqn												")
			.where("      , u.user_name as   insp_drtr_name																	")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl      , a.line_ordr			")
			.where("      , a.line_stat      , a.line_clos      , a.find_name												")
			.where("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
			.where("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif			")
			.where("from    purc_istt_item a																				")
			.where("        left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("        left outer join user_mast u on a.insp_drtr_idcd = u.user_idcd									")
			.where("where   1=1																								")
			.where("and     a.invc_numb   = :invc_numb		" , arg.getParamText("invc_numb" ))
			.where("and     a.find_name   like %:find_name%	" , arg.getParamText("find_name" ))
			.where("and     a.line_stat   = :line_stat1		" , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																										")
		;
		return data.selectForMap();
	}

	public SqlResultMap setPass(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		data = new DataMessage(hq+".POS");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		data.param
			.query("call insp_to_istt(")
			.query("	  :param"		,arg.getParameter("param"))
			.query(")")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setCancel(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		data = new DataMessage(hq+".POS");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		data.param
			.query("call insp_to_istt_cancel(")
			.query("	  :param"		,arg.getParameter("param"))
			.query(")")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		temp.param
			.query("select line_stat, line_clos				")
			.query("from   purc_istt_mast					")
		 	.query("where  invc_numb = :invc_numb", arg.fixParameter("invc_numb"))
		;
		SqlResultRow del = temp.selectForRow();

		if ( Double.parseDouble( del.getParamText( "line_clos" )) == 1) {
			throw new ServiceException("재고 입고가 마감되어 삭제할 수 없습니다.");
		}

		data.param
			.table("purc_istt_mast")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))

			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
	}

	/**
	 * 상품검색
	 */
	public SqlResultMap getProduct(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}

		data.param
			.query("select a.*																								")
			.query("     , concat(ifnull(a.lcls_name,''),ifnull(a.mcls_name,''),ifnull(a.scls_name)) as clss_name			")
			.query("from (																									")
			.query("select																									")
			.query("        a.unit_idcd    , (select unit_name from unit_mast where unit_idcd = a.unit_idcd) as unit_name	")
			.query("     ,  a.item_idcd    , a.item_code  , a.item_name  , a.item_spec   , 1 as piece_qty					")
			.query("     ,  0  as cst_pri																					")
			.query("     ,  ( select sum(stok_qntt) from stok_mast s where a.item_idcd = s.item_idcd ) as stok_qntt			")
			.query("     ,  0  as sale_pri																					")
			.query("     ,  ( select wrhs_name from wrhs_mast r where a.istt_wrhs_idcd = r.wrhs_idcd) as istt_wrhs_name		")
			.query("     ,  ( select wrhs_name from wrhs_mast r where a.ostt_wrhs_idcd = r.wrhs_idcd) as ostt_wrhs_name		")
			.query("     ,  ( select clss_name from item_class  where clss_idcd = a.lcls_idcd ) as  lcls_name				")
			.query("     ,  ( select clss_name from item_class  where clss_idcd = a.mcls_idcd ) as  mcls_name				")
			.query("     ,  ( select clss_name from item_class  where clss_idcd = a.scls_idcd ) as  scls_name				")
			.query("     ,  a.modl_name																						")
			.query("from    item_mast a																						")
			.query("where   1=1																								")
			.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
			.query("and     a.line_stat = 0																					")
			.query("and    a.acct_bacd in ('3000')                       " , "제품".equals(arg.getParameter("acct_bacd")) )
			.query("and    a.acct_bacd in ('1001', '1002','1003','1004') " , "자재".equals(arg.getParameter("acct_bacd")) )
			.query("and    a.acct_bacd in ('2001', '2002')               " , "재공품".equals(arg.getParameter("acct_bacd")) )
			.query("and    a.acct_bacd in ('5000', '6000')               " , "기타".equals(arg.getParameter("acct_bacd")) )
			.query(") a																										")
		;
		return data.selectForMap();
	}
}
