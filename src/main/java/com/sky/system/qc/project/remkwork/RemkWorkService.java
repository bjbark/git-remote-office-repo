package com.sky.system.qc.project.remkwork;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;
import com.sky.utils.file.UploadItem;


@Service
public class RemkWorkService  extends DefaultServiceHandler {
	@Autowired
	private SeqListenerService sequance;

	public SqlResultMap getMaster1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select     a.pjod_idcd       , a.amnd_degr         , a.pjod_code       , a.pjod_dvcd		")
			.where("         , a.expt_dvcd       , a.cstm_idcd         , a.prjt_idcd       , a.regi_date		")
			.where("         , a.item_idcd       , a.esti_amnt         , a.cofm_yorn       , a.cofm_date		")
			.where("         , a.cofm_amnt       , a.crny_dvcd         , a.frst_exam_date  , a.send_exam_date	")
			.where("         , a.deli_date       , a.ppsl_deli_date    , a.strt_date       , a.endd_date		")
			.where("         , a.drtr_idcd       , a.dlvy_date         , a.last_yorn       , a.apvl_date		")
			.where("         , a.apvl_drtr_idcd  , a.cstm_item_code    , a.mold_size       , a.cavity			")
			.where("         , a.mold_wigt       , a.used_mtrl_name    , a.prod_wigt       , a.used_tons		")
			.where("         , a.pjod_name       , a.item_imge         , a.item_imge2							")
			.where("         , a.shkg_text       , a.mold_mtrl         , a.work_rsps_idcd						")
			.where("         , a.dsig_rsps_idcd  , a.modl_rsps_idcd												")
			.where("         , a.user_memo       , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.where("         , a.line_ordr       , a.line_stat         , a.line_clos       , a.find_name		")
			.where("         , a.updt_user_name  , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.where("         , a.updt_urif       , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.where("         , a.crte_idcd       , a.crte_urif													")
			.where("         , c.cstm_code       , c.cstm_name         , u1.user_name as drtr_name				")
			.where("         , u2.user_name as work_rsps_name          , u3.user_name as dsig_rsps_name			")
			.where("         , u4.user_name as modl_rsps_name													")
			.where("         , i.item_code       , i.item_spec         , a.item_name       , a.modl_name		")
			.where("         , c.buss_name       , c.buss_numb         , c.buss_kind       , c.buss_type		")
			.where("         , c.corp_dvcd       , c.boss_name         , c.tele_numb       , c.faxi_numb		")
			.where("         , c.mail_addr       , c.hdph_numb													")
			.where("from pjod_mast a																			")
			.where("left outer join cstm_mast c  on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join user_mast u1 on a.drtr_idcd = u1.user_idcd									")
			.where("left outer join user_mast u2 on a.work_rsps_idcd = u2.user_idcd								")
			.where("left outer join user_mast u3 on a.dsig_rsps_idcd = u3.user_idcd								")
			.where("left outer join user_mast u4 on a.modl_rsps_idcd = u4.user_idcd								")
			.where("left outer join item_mast i  on a.item_idcd = i.item_idcd									")
			.where("left outer join pjod_test_prod p  on a.pjod_idcd = p.pjod_idcd								")
			.where("right outer join pjod_test_prod p1  on a.pjod_idcd = p1.pjod_idcd							")
			.where("where 1=1																					")
			.where("and a.cofm_yorn != '0'													")
			.where("and   p.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and   a.regi_date >= :regi_date1     " , arg.getParamText("regi_date1" ))
			.where("and   a.regi_date <= :regi_date2     " , arg.getParamText("regi_date2" ))
			.where("and   p.wkct_idcd  = :wkct_idcd      " , arg.getParamText("wkct_idcd"  ))
			.where("and   p.cvic_idcd  = :cvic_idcd      " , arg.getParamText("cvic_idcd"  ))
			.where("and   a.line_clos   = :line_clos     " , "0" , "".equals(arg.getParamText("line_clos" )))
			.where("and   a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.pjod_idcd																	")
			.where("order by a.pjod_idcd																	")
			.where(")a																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getMaster2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.pjod_idcd        , a.line_seqn         , a.regi_date       , a.wkct_idcd		")
			.query("        , a.cvic_idcd        , a.prod_qntt         , a.poor_qntt       , a.pass_qntt		")
			.query("        , a.loss_rate        , a.drtr_idcd         , a.sttm            , a.edtm				")
			.query("        , a.user_memo        , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat         , a.line_clos       , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , c.cvic_name        , w.wkct_name         , u.user_name as drtr_name				")
			.query("        , substring(a.sttm,1,8) as sttm1           , substring(a.sttm, 9,4) as sttm2		")
			.query("        , substring(a.edtm,1,8) as edtm1           , substring(a.edtm, 9,4) as edtm2		")
		;
		data.param
			.where("from pjod_test_prod a																		")
			.where("left outer join pjod_mast p on a.pjod_idcd = p.pjod_idcd									")
			.where("left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd									")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd									")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("where 1=1																					")
			.where("and   a.pjod_idcd	=:pjod_idcd  " , arg.getParamText("pjod_idcd"))
			.where("and   a.line_stat   <:line_stat  " , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.pjod_idcd																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.pjod_idcd        , a.line_seqn       , a.poor_seqn       , a.prod_qntt		")
			.query("        , a.poor_bacd        , a.poor_cont       , a.trtm_date       , a.trtm_cont		")
			.query("        , a.poor_qntt        , a.drtr_idcd 												")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd       , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos       , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm       , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad       , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif												")
			.query("        , u.user_name as drtr_name														")
			.query("        , a.imge_1fst        , a.imge_2snd												")
			.query("      , (select base_name from base_mast r where a.poor_bacd  = r.base_code				")
			.query("                                          and   r.prnt_idcd = '6000')   as poor_name	")
		;
		data.param
			.where("from pjod_test_insp a																	")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd								")
			.where("where 1=1																				")
			.where("and   a.pjod_idcd	=:pjod_idcd		" , arg.getParamText("pjod_idcd"))
			.where("and   a.line_seqn	=:line_seqn		" , arg.getParamText("line_seqn"))
			.where("and   a.line_stat   <:line_stat	" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.pjod_idcd																	")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select count(*) as poor_seqn																")
		;
		data.param
			.where("from		pjod_test_insp a   																")
			.where("where		1=1																				")
			.where("and			a.pjod_idcd = :pjod_idcd		" , arg.getParameter("pjod_idcd"				))
			.where("and			a.line_seqn = :line_seqn		" , arg.getParameter("line_seqn"				))
			.where("and			a.line_stat = 0																	")
		;
		return data.selectForMap();
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				data.param
					.table("pjod_test_insp")
					.where("where pjod_idcd  = :pjod_idcd	")
					.where("and   line_seqn  = :line_seqn	")
					.where("and   poor_seqn  = :poor_seqn	")

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"	))
					.unique("line_seqn"			, row.fixParameter("line_seqn"	))
					.unique("poor_seqn"			, row.fixParameter("poor_seqn"	))
				;data.attach(Action.delete);
			} else {
				data.param
					.table("pjod_test_insp")
					.where("where pjod_idcd = :pjod_idcd"	)
					.where("and   line_seqn = :line_seqn"	)
					.where("and   poor_seqn = :poor_seqn"	)

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"	))
					.unique("line_seqn"			, row.fixParameter("line_seqn"	))
					.unique("poor_seqn"			, row.fixParameter("poor_seqn"	))

					.update("prod_qntt"			, row.getParameter("prod_qntt"	))
					.update("poor_qntt"			, row.getParameter("poor_qntt"	))
					.update("poor_bacd"			, row.getParameter("poor_bacd"	))
					.update("poor_cont"			, row.getParameter("poor_cont"	))
					.update("trtm_date"			, row.getParameter("trtm_date"	))
					.update("trtm_cont"			, row.getParameter("trtm_cont"	))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"	))
					.update("user_memo"			, row.getParameter("user_memo"	))

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
					.query("update pjod_test_insp					")
					.query("       set imge_1fst = ''			")
					.query("       where pjod_idcd = :pjod_idcd", arg.getParameter("pjod_idcd"))
					.query("       and   line_seqn = :line_seqn", arg.getParameter("line_seqn"))
					.query("       and   poor_seqn = :poor_seqn", arg.getParameter("poor_seqn"))
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
					.table("pjod_test_insp")
					.where("where pjod_idcd	= :pjod_idcd" )
					.where("and   line_seqn	= :line_seqn" )
					.where("and   poor_seqn	= :poor_seqn" )

					.unique("pjod_idcd"				, arg.fixParameter("pjod_idcd"))
					.unique("line_seqn"				, arg.fixParameter("line_seqn"))
					.unique("poor_seqn"				, arg.fixParameter("poor_seqn"))

					.update("imge_1fst",returnByte)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			if(chk2.equals("0")){
				data.param
					.query("update pjod_test_insp					")
					.query("       set imge_2snd = ''				")
					.query("       where pjod_idcd = :pjod_idcd", arg.getParameter("pjod_idcd"))
					.query("       and   line_seqn = :line_seqn", arg.getParameter("line_seqn"))
					.query("       and   poor_seqn = :poor_seqn", arg.getParameter("poor_seqn"))
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
					.table("pjod_test_insp")
					.where("where pjod_idcd = :pjod_idcd" )
					.where("and   line_seqn = :line_seqn" )
					.where("and   poor_seqn = :poor_seqn" )

					.unique("pjod_idcd"				, arg.fixParameter("pjod_idcd"))
					.unique("line_seqn"				, arg.fixParameter("line_seqn"))
					.unique("poor_seqn"				, arg.fixParameter("poor_seqn"))

					.update("imge_2snd",returnByte2)
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
