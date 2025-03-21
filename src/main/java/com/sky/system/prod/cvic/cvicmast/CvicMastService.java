package com.sky.system.prod.cvic.cvicmast;

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


@Service
public class CvicMastService extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select    a.cvic_idcd         , a.cvic_code        , a.cvic_name         , a.cvic_spec		")
			.query("        , a.modl_name         , a.cvic_stat_dvcd   , a.cvic_kind_dvcd    , a.wkct_idcd		")
			.query("        , a.istl_loct         , a.move_drtr_name   , a.mngt_drtr_idcd    , a.mngt_dept_idcd	")
			.query("        , a.aset_idcd         , a.aset_name        , a.puch_cstm_idcd    , a.puch_cstm_name	")
			.query("        , a.vend_tele_numb    , a.afsv_tele_numb   , a.mchn_numb         , a.puch_date		")
			.query("        , a.cvic_usge         , a.puch_amnt        , a.make_natn_bacd    , f.chek_type_name	")
			.query("        , a.cvic_type         , a.make_cmpy_name   , a.prod_abty         , a.chek_type_idcd	")
			.query("        , a.cvic_imge_1fst    , a.cvic_imge_2snd   , a.cstm_idcd         , a.cstm_burd_rate	")
			.query("        , a.norm_ivst_date    , a.succ_date        , a.succ_cstm_idcd    , a.chek_ccle_dvcd	")
			.query("        , a.rnmt_dvcd         , a.sral_numb        , a.labo_rate_idcd    , e.labo_rate_name	")
			.query("        , b.dept_name         , c.wkct_name        , d.cstm_name         , a.cvic_stnm		")
			.query("        , a.user_memo         , a.sysm_memo        , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr         , a.line_stat        , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name    , a.updt_ipad        , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.used_year         , u.user_name as mngt_drtr_name								")
			.query("        , (select m.clss_desc from clss_mast m where m.clss_idcd							")
			.query("			= ifnull(a.scls_idcd, ifnull(a.mcls_idcd, a.lcls_idcd))) as clss_desc			")
		;
		data.param
			.query("from    cvic_mast a																			")
			.query("left outer join dept_mast b on a.mngt_dept_idcd = b.dept_idcd								")
			.query("left outer join wkct_mast c on a.wkct_idcd = c.wkct_idcd									")
			.query("left outer join cstm_mast d on a.puch_cstm_idcd = d. cstm_idcd								")
			.query("left outer join labo_rate e on a.labo_rate_idcd = e. labo_rate_idcd							")
			.query("left outer join cvic_chck_type f on f.chek_type_idcd = a.chek_type_idcd						")
			.query("left outer join clss_mast m on a.lcls_idcd = m.clss_idcd									")
			.query("left outer join clss_mast n on a.mcls_idcd = n.clss_idcd									")
			.query("left outer join clss_mast l on a.scls_idcd = l.clss_idcd									")
			.query("left outer join user_mast u on a.mngt_drtr_idcd = u.user_idcd								")
			.query("where	1=1																					")
			.query("and		a.find_name	like %:find_name%  "	, arg.getParamText("find_name"))
			.query("and     a.cvic_kind_dvcd =:cvic_kind_dvcd"  , arg.getParamText("cvic_kind_dvcd"))
			.query("and     a.cvic_stat_dvcd =:cvic_stat_dvcd"  , arg.getParamText("cvic_stat_dvcd"))
			.query("and     a.mngt_dept_idcd =:mngt_dept_idcd"  , arg.getParamText("mngt_dept_idcd"))
			.query("and     a.puch_cstm_idcd =:puch_cstm_idcd"  , arg.getParamText("puch_cstm_idcd"))
			.query("and     m.clss_idcd =:lcls_idcd"            , arg.getParamText("lcls_idcd"))
			.query("and     n.clss_idcd =:mcls_idcd"            , arg.getParamText("mcls_idcd"))
			.query("and     l.clss_idcd =:scls_idcd"            , arg.getParamText("scls_idcd"))
			.query("and     a.wkct_idcd =:wkct_idcd"            , arg.getParamText("wkct_idcd"))
			.query("and		a.line_stat   < :line_stat     "    , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("order by a.cvic_code ) a																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.cvic_idcd         , a.cvic_code        , a.cvic_name         , a.cvic_spec		")
			.query("        , a.modl_name         , a.cvic_stat_dvcd   , a.cvic_kind_dvcd    , a.wkct_idcd		")
			.query("        , a.istl_loct         , a.move_drtr_name   , a.mngt_drtr_idcd    , a.mngt_dept_idcd	")
			.query("        , a.aset_idcd         , a.aset_name        , a.puch_cstm_idcd    , a.puch_cstm_name	")
			.query("        , a.vend_tele_numb    , a.afsv_tele_numb   , a.mchn_numb         , a.puch_date		")
			.query("        , a.cvic_usge         , a.puch_amnt        , a.cvic_type         , a.make_natn_bacd	")
			.query("        , a.cvic_type         , a.make_cmpy_name   , a.prod_abty         , a.chek_type_idcd	")
			.query("        , a.cvic_imge_1fst    , a.cvic_imge_2snd   , a.cstm_idcd         , a.cstm_burd_rate	")
			.query("        , a.norm_ivst_date    , a.succ_date        , a.succ_cstm_idcd    , a.chek_ccle_dvcd	")
			.query("        , a.rnmt_dvcd         , a.sral_numb        , a.labo_rate_idcd    , e.labo_rate_name	")
			.query("        , b.dept_name         , c.wkct_name        , d.cstm_name         , f.chek_type_name	")
			.query("        , a.user_memo         , a.sysm_memo        , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr         , a.line_stat        , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name    , a.updt_ipad        , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif         , a.crte_user_name   , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.cvic_stnm         , a.crte_idcd													")
		;
		data.param
			.where("from    cvic_mast a																			")
			.where("left outer join dept_mast b on a.mngt_dept_idcd = b.dept_idcd								")
			.where("left outer join wkct_mast c on a.wkct_idcd = c.wkct_idcd									")
			.where("left outer join cstm_mast d on a.puch_cstm_idcd = d. cstm_idcd								")
			.where("left outer join labo_rate e on a.labo_rate_idcd = e. labo_rate_idcd							")
			.where("left outer join cvic_chck_type f on f.chek_type_idcd = a.chek_type_idcd						")
			.where("where	1=1																					")
			.where("and		a.find_name	like %:find_name%  "	, arg.getParamText("find_name"))
			.where("and     a.cvic_kind_dvcd =:cvic_kind_dvcd"  , arg.getParamText("cvic_kind_dvcd"))
			.where("and     a.cvic_stat_dvcd =:cvic_stat_dvcd"  , arg.getParamText("cvic_stat_dvcd"))
			.where("and     a.mngt_dept_idcd =:mngt_dept_idcd"  , arg.getParamText("mngt_dept_idcd"))
			.where("and     a.puch_cstm_idcd =:puch_cstm_idcd"  , arg.getParamText("puch_cstm_idcd"))
			.where("and     a.cvic_idcd =:cvic_idcd"            , arg.getParamText("cvic_idcd"))
			.where("and     a.wkct_idcd =:wkct_idcd"            , arg.getParamText("wkct_idcd"))
			.where("and     a.line_stat   < :line_stat"         , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.cvic_code																		")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}

	public SqlResultMap getLookup2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call work_cvic_list(")
			.query(" :params ",arg.getParameter("params"))
			.query(" )")
		;
		return data.selectForMap(); //
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			String l = row.getParamText("lcls_idcd");
			String m = row.getParamText("mcls_idcd");
			String s = row.getParamText("scls_idcd");
			String idcd = row.getParamText("cvic_idcd");

			if (rowaction == Action.delete) {
				data.param
					.table("cvic_mast												")
					.where("where cvic_idcd  = :cvic_idcd							")

					.unique("cvic_idcd"			, row.fixParameter("cvic_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;data.attach(Action.update);
			} else {
				data.param
					.table("cvic_mast												")
					.where("where cvic_idcd  = :cvic_idcd							")

					.unique("cvic_idcd"			, row.fixParameter("cvic_idcd"		))

					.update("cvic_code"			, row.fixParameter("cvic_code"		))		//설비코드
					.update("cvic_name"			, row.getParameter("cvic_name"		))		//설비명
					.update("cvic_spec"			, row.getParameter("cvic_spec"		))		//설비규격
					.update("modl_name"			, row.getParameter("modl_name"		))		//모델명
					.update("cvic_stnm"			, row.getParameter("cvic_stnm"		))		//설비약칭
					.update("cvic_kind_dvcd"	, row.getParameter("cvic_kind_dvcd"	))		//설비종류
					.update("cvic_stat_dvcd"	, row.getParameter("cvic_stat_dvcd"	))		//설비상태
					.update("wkct_idcd"			, row.getParameter("wkct_idcd"		))		//설치공정
					.update("istl_loct"			, row.getParameter("istl_loct"		))		//설치장소
					.update("mngt_dept_idcd"	, row.getParameter("mngt_dept_idcd"	))		//관리부서
					.update("mchn_numb"			, row.getParameter("mchn_numb"		))		//관리번호
					.update("chek_ccle_dvcd"	, row.getParameter("chek_ccle_dvcd"	))		//점검주기
					.update("chek_type_idcd"	, row.getParameter("chek_type_idcd"	))		//점검유형
					.update("sral_numb"			, row.getParameter("sral_numb"		))		//시리얼번호
					.update("puch_cstm_idcd"	, row.getParameter("puch_cstm_idcd"	))		//구매거래처ID
					.update("puch_cstm_name"	, row.getParameter("puch_cstm_name"	))		//구매거래처명
					.update("used_year"			, row.getParameter("used_year"		))		//사용년한
					.update("vend_tele_numb"	, row.getParameter("vend_tele_numb"	))		//거래처전화번호
					.update("afsv_tele_numb"	, row.getParameter("afsv_tele_numb"	))		//AS전화번호
					.update("make_natn_bacd"	, row.getParameter("make_natn_name"	))		//제조국가
					.update("make_cmpy_name"	, row.getParameter("make_cmpy_name"	))		//제조회사명
					.update("puch_amnt"			, row.getParameter("puch_amnt"		))		//구매금액
					.update("puch_date"			, row.getParameter("puch_date"		))		//구매일자
					.update("cvic_usge"			, row.getParameter("cvic_usge"		))		//용도
					.update("labo_rate_idcd"	, row.getParameter("labo_rate_idcd"	))		//임율ID
					.update("mngt_drtr_idcd"	, row.getParameter("mngt_drtr_idcd"	))		//관리담당자ID
					.update("line_stat"			, row.getParameter("line_stat"		))

					.update("lcls_idcd"			, row.getParameter("lcls_idcd"		))		//대분류ID
					.update("mcls_idcd"			, row.getParameter("mcls_idcd"		))		//중분류ID
					.update("scls_idcd"			, row.getParameter("scls_idcd"		))		//소분류ID

					.update("norm_ivst_date"	, row.getParameter("norm_ivst_date"	))		//양산투입일자
					.update("aset_idcd"			, row.getParameter("aset_idcd"		))		//자산번호
					.update("cvic_type"			, row.getParameter("cvic_type"		))		//설비형식
					.update("prod_abty"			, row.getParameter("prod_abty"		))		//설비능력

					.update("find_name"			, row.getParameter("cvic_name"		)
												+ "	"
												+ row.fixParameter("cvic_code"		))
					.insert("line_levl"			, row.getParameter("line_levl"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(rowaction);

				data.execute();
				data.clear();

				if(s.equals("")){
					data.param
					.query("update cvic_mast set scls_idcd = NULL where scls_idcd = ''")
					.query("and cvic_idcd =:cvic_idcd", idcd)
					;
					data.attach(Action.direct);
					data.execute();
					data.clear();
				}
				if(m.equals("")){
					data.param
					.query("update cvic_mast set mcls_idcd = NULL where mcls_idcd = ''")
					.query("and cvic_idcd =:cvic_idcd", idcd)
					;
					data.attach(Action.direct);
					data.execute();
					data.clear();
				}
				if(l.equals("")){
					data.param
					.query("update cvic_mast set lcls_idcd = NULL where lcls_idcd = ''")
					.query("and cvic_idcd =:cvic_idcd", idcd)
					;
					data.attach(Action.direct);
					data.execute();
					data.clear();
				}
			}
		}
		data.execute();
		return null ;
	}
	public SqlResultMap setFileupload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
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
					.query("update cvic_mast					")
					.query("       set cvic_imge_1fst = ''			")
					.query("       where cvic_idcd = :cvic_idcd", arg.getParameter("cvic_idcd"))
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
					.table("cvic_mast")
					.where("where cvic_idcd	= :cvic_idcd" )

					.unique("cvic_idcd"				, arg.fixParameter("cvic_idcd"))

					.update("cvic_imge_1fst",returnByte)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			if(chk2.equals("0")){
				data.param
					.query("update cvic_mast					")
					.query("       set cvic_imge_2snd = ''			")
					.query("       where cvic_idcd = :cvic_idcd", arg.getParameter("cvic_idcd"))
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
					.table("cvic_mast")
					.where("where cvic_idcd	= :cvic_idcd" )

					.unique("cvic_idcd"				, arg.fixParameter("cvic_idcd"))

					.update("cvic_imge_2snd",returnByte2)
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
}