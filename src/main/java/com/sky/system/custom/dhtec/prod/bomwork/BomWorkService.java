package com.sky.system.custom.dhtec.prod.bomwork;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.utils.file.UploadItem;


@Service("dhtec.BomWorkService")
public class BomWorkService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("call project_bom_tree (				")
			.query("   :pjod_idcd "   ,  arg.getParamText("pjod_idcd")		)
			.query(" ) 									")
		;
		return data.selectForMap();
	}
	public SqlResultMap getSearch2(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
		.query("call project_bom_tree2(				")
		.query("   :pjod_idcd "   ,  arg.getParamText("pjod_idcd")		)
		.query(" ) 									")
		;
		return data.selectForMap();
	}

	public SqlResultMap setBom(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String pjod_idcd = "";
		String standard = "";

		pjod_idcd = arg.getParamText("pjod_idcd");
		standard = arg.getParamText("standard");

		data.param
			.query("call project_bom_create (				")
			.query("   :pjod_idcd, "   ,  pjod_idcd			)
			.query("   :standard "   ,  standard			)
			.query(" ) 										")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
	public SqlResultMap setdelete(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.table("pjod_bom")
		.where("where item_idcd = :item_idcd")
		.where("and   supl_dvcd = :supl_dvcd")

		.unique("item_idcd"					, arg.fixParameter("item_idcd"))
		.unique("supl_dvcd"					, "1000")
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();
		data.param
		.table("item_mast")
		.where("where item_idcd = :item_idcd")

		.unique("item_idcd"					, arg.fixParameter("item_idcd"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();
		return null;
	}

	public SqlResultMap uploadExcel(HttpRequestArgument arg, SqlResultRow temp ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		int roop = Integer.parseInt(temp.getParamText("size"))+1;
		String seqn = "01";

		for(int i = 1 ; i < roop; i++){
			seqn = temp.getParamText("line_seqn"+i);
			if(Integer.parseInt(seqn) < 10){
				seqn = "0"+seqn;
				System.out.println(seqn);
			}
			data.param
				.table("pjod_bom")
				.unique("pjod_idcd"					, arg.fixParameter("pjod_idcd"	))
				.unique("line_seqn"					, temp.fixParameter("line_seqn"+i))

				.insert("work_item_idcd", arg.getParamText("pjod_idcd")+"-"+temp.getParamText("pn"+i)+"-"+temp.getParamText("seqn"+i) )
				.insert("prnt_idcd", temp.getParameter("pn"+i) )
				.insert("item_idcd", arg.getParamText("pjod_idcd")+"-"+temp.getParamText("pn"+i)+"-"+temp.getParamText("seqn"+i))
				.insert("ndqt_nmrt", temp.getParameter("qty"+i))
				.insert("need_qntt", temp.getParameter("qty"+i))
				.insert("item_name", temp.getParameter("name"+i		))
				.insert("ndqt_dnmn", "1")
				.insert("imge_1fst", temp.getParameter("blob"+i	))
				.insert("item_spec", temp.getParameter("size"+i		))
				.insert("item_mtrl", temp.getParameter("mat"+i		))
				.insert("user_memo", temp.getParameter("remark"+i		))
				.insert("find_name", arg.getParamText("pjod_idcd")+"-"+temp.getParamText("pn"+i)+"-"+temp.getParamText("seqn"+i)+temp.getParamText("name"+i).trim())
				.insert("supl_dvcd","1000")
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
			data.param
				.table("item_mast")
				.unique("item_idcd", arg.fixParameter("pjod_idcd")+"-"+temp.getParamText("pn"+i)+"-"+temp.getParamText("seqn"+i))

				.insert("item_code", arg.getParamText("pjod_idcd")+"-"+temp.getParamText("pn"+i)+"-"+temp.getParamText("seqn"+i))
				.insert("item_name", temp.getParameter("name"+i		))
				.insert("item_spec", temp.getParameter("size"+i		))
				.insert("item_imge", temp.getParameter("blob"+i	))
				.insert("prnt_idcd", temp.getParameter("pn"+i))
				.insert("find_name", arg.getParamText("pjod_idcd")+"-"+temp.getParamText("pn"+i)+"-"+temp.getParamText("seqn"+i)+temp.getParamText("item_name").trim())
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
		}
		data.param
			.query("update item_mast set find_name = concat(item_code,item_name) where find_name is null")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select ifnull(max(line_seqn),0) as seq, ifnull(max(line_ordr),0) as ordr_seq	")
			.query("     , ifnull(max(line_levl),0) as levl											")
		;
		data.param //퀴리문
			.where("from pjod_bom												")
			.where("where     1=1												")
			.where("and pjod_idcd = :pjod_idcd	" , arg.getParameter("pjod_idcd"))
			.where("and prnt_idcd = :prnt_idcd	" , arg.getParameter("prnt_idcd"))
		;
		return data.selectForMap();
	}
	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select imge_1fst,imge_2snd			 						")
		;
		data.param //퀴리문
		.where("from pjod_bom												")
		.where("where     1=1												")
		.where("and pjod_idcd = :pjod_idcd	" , arg.getParameter("pjod_idcd"))
		.where("and line_seqn = :line_seqn	" , arg.getParameter("line_seqn"))
		;
		return data.selectForMap();
	}
	public String getItemSeqn(HttpRequestArgument arg, String pjod_idcd) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select ifnull(max(SUBSTRING(item_code,(length(item_code)-LENGTH(SUBSTRING_INDEX(item_code,'-',-1)))+1)),0)+1  as seq 	")
		;
		data.param //퀴리문
		.where("from item_mast												")
		.where("where     1=1												")
		.where("and SUBSTRING_INDEX(item_code,'-',3) = :pjod_idcd	" , pjod_idcd)
		;
		String a= data.selectForMap().get(0).getParamText("seq");

		int idx = a.indexOf(".");
		if(a == null||a==""){
			a = "1";
		}else{
			a = a.substring(0,idx);
		}
		return a;
	}
	public SqlResultMap getCstm(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select    a.cstm_idcd          ,a.cstm_code          ,a.cstm_dvcd          ,a.rtil_stru_dvcd	")
			.query("         ,a.cstm_name          ,a.cstm_stnm_1fst     ,a.cstm_stnm_2snd     ,a.engl_name			")
			.query("         ,a.engl_stnm          ,a.engl_stnm_1fst     ,a.engl_stnm_2snd     ,a.mngt_bzpl_idcd	")
			.query("         ,a.home_page_addr     ,a.cstm_dsgn_trnt     ,a.corp_dvcd          ,a.buss_name			")
			.query("         ,a.buss_numb          ,a.buss_type          ,a.buss_kind          ,a.corp_numb			")
			.query("         ,a.boss_name          ,a.tele_numb          ,a.tele_numb_2snd     ,a.faxi_numb			")
			.query("         ,a.hdph_numb          ,a.spec_buss_numb     ,a.mail_addr								")
			.query("         ,a.ccrd_puch_yorn     ,a.etbl_rpub_yorn     ,a.sale_cstm_yorn     ,a.expt_cstm_yorn	")
			.query("         ,a.incm_cstm_yorn     ,a.otod_cstm_yorn     ,a.etcc_cstm_yorn     ,a.rpst_cstm_idcd	")
			.query("         ,a.blto_idcd_1fst     ,a.blto_idcd_2snd     ,a.scrt_sett_dvcd     ,a.scrt_sett_amnt	")
			.query("         ,a.scrt_offr_aman     ,a.scrt_mltl          ,a.crdt_bacd          ,a.crdt_lmit_amnt	")
			.query("         ,a.cnio_dvcd          ,a.sale_drtr_idcd     ,a.sale_dept_idcd     ,a.insp_kind_dvcd	")
			.query("         ,a.user_memo          ,a.sysm_memo          ,a.prnt_idcd          ,a.line_levl			")
			.query("         ,a.line_ordr          ,a.line_stat          ,a.line_clos          ,a.find_name			")
			.query("         ,a.updt_user_name     ,a.updt_ipad          ,a.updt_dttm          ,a.updt_idcd			")
			.query("         ,a.updt_urif          ,a.crte_user_name     ,a.crte_ipad          ,a.crte_dttm			")
			.query("         ,a.crte_idcd          ,a.crte_urif          ,a.puch_cstm_yorn     ,b.post_code			")
			.query("         ,b.addr_1fst          ,b.addr_2snd														")
		;
		data.param //퀴리문
			.where("from        cstm_mast  a													")
			.where("            left outer join cstm_addr b on a.cstm_idcd = b.cstm_idcd		")
			.where("where       1=1																")
			.where("and         a.cstm_idcd = :cstm_idcd        " , arg.getParameter("cstm_idcd"))
		;
		return data.selectForMap();
	}
	public SqlResultMap setApprove(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		// master 등록/수정
		data.param
		.table("pjod_bom"													 )
		.where("where pjod_idcd = :pjod_idcd								")
		//
		.unique("pjod_idcd"			, arg.fixParameter("pjod_idcd"			))
		//

		.update("line_clos"			, arg.getParameter("line_clos"			))  /*  마감여부  */

		.update("updt_idcd"			, arg.getParameter("updt_idcd"			))  /*  수정ID  */
		.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
		;
		data.attach(Action.update);
		data.execute();
		return null;
	}
	public SqlResultMap setQntt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			// master 등록/수정
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		for (SqlResultRow row:map){
			data.param
				.table("pjod_bom"													 )
				.where("where pjod_idcd = :pjod_idcd								")
				.where("and   line_seqn = :line_seqn								")
				//
				.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"			))
				.unique("line_seqn"			, row.fixParameter("line_seqn"			))
				//

				.update("need_qntt"			, row.getParameter("need_qntt"			))  /*  마감여부  */

				.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
			;
			data.attach(Action.update);
			data.execute();
		}
		return null;
	}
	public SqlResultMap setRecords(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
		System.out.println("***************"+rowaction);
		if(rowaction == Action.delete){
//			data.param
//				.table("pjod_bom"													 )
//				.where("where pjod_idcd = :pjod_idcd								")
//				.where("and   line_seqn = :line_seqn								")
//				//
//				.unique("pjod_idcd"			, arg.fixParameter("pjod_idcd"			))
//				.unique("line_seqn"			, arg.fixParameter("line_seqn"			))
//			;
//			data.attach(rowaction);
		}else{
			data.param
				.table("pjod_bom"													 )
				.where("where pjod_idcd = :pjod_idcd								")
				.where("and   line_seqn = :line_seqn								")
				//
				.unique("pjod_idcd"			, arg.fixParameter("pjod_idcd"			))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"			))
				//

				.insert("line_levl"			, arg.getParameter("line_levl"	))  /*    */
				.insert("line_ordr"			, arg.getParameter("line_ordr"	))  /*    */
				.update("item_idcd"			, arg.getParameter("item_idcd"	))  /*    */
				.update("work_item_idcd"	, arg.getParameter("item_idcd"	))  /*    */
				.update("item_name"			, arg.getParameter("item_name"	))  /*    */
				.update("ivst_wkct_idcd"	, arg.getParameter("ivst_wkct_idcd"	))  /*    */
				.update("need_qntt"			, arg.getParameter("need_qntt"	))  /*    */
				.update("item_spec"			, arg.getParameter("item_spec"	))  /*    */
				.update("item_mtrl"			, arg.getParameter("item_mtrl"	))  /*    */
				.insert("prnt_idcd"			, arg.getParameter("prnt_idcd"	))  /*    */
				.update("supl_dvcd"			, arg.getParameter("supl_dvcd"	))  /*    */

				.update("updt_idcd"			, arg.getParameter("updt_idcd"			))  /*  수정ID  */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
			;
			data.attach(rowaction);
		}
		data.execute();
		return null;
	}
	public SqlResultMap setImage(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
		DataMessage data = arg.newStorage("POS");
		String chk1 = arg.getParamText("chk1");
		String chk2 = arg.getParamText("chk2");
		String tapidx = arg.getParamText("tapidx");
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
					.query("update pjod_bom						")
					.query("       set imge_1fst = ''			")
					.query("       where pjod_idcd = :pjod_idcd", arg.getParameter("pjod_idcd"))
					.query("       and   item_idcd = :item_idcd", arg.getParameter("item_idcd"))
					.query("       and   line_seqn = :line_seqn", arg.getParameter("line_seqn"))
				;data.attach(Action.direct);
				data.execute();
				data.clear();
				if(tapidx.equals("1")){
					data.param
						.query("update item_mast						")
						.query("       set item_imge = ''				")
						.query("       where item_idcd = :item_idcd", arg.getParameter("item_idcd"))
					;data.attach(Action.direct);
					data.execute();
					data.clear();
				}
			}else if(chk1.equals("1")){
				byte[] buf = new byte[1024];
				while ((readCount = thumnailInputStream.read(buf))>0) {
					 baos.write(buf,0,readCount);
				}
				returnByte = baos.toByteArray();

				data.param
					.table("pjod_bom")
					.where("where pjod_idcd	= :pjod_idcd" )
					.where("and   item_idcd	= :item_idcd" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("pjod_idcd"				, arg.fixParameter("pjod_idcd"))
					.unique("item_idcd"				, arg.fixParameter("item_idcd"))
					.unique("line_seqn"				, arg.fixParameter("line_seqn"))

					.update("imge_1fst",returnByte)
				;data.attach(Action.update);
				data.execute();
				data.clear();
				if(tapidx.equals("1")){
					data.param
						.table("item_mast")
						.where("where item_idcd	= :item_idcd" )

						.unique("item_idcd"				, arg.fixParameter("item_idcd"))

						.update("item_imge",returnByte)
					;data.attach(Action.update);
					data.execute();
					data.clear();
				}
			// logic 처리 ( DB등 )
			}
			if(chk2.equals("0")){
				data.param
					.query("update pjod_bom					")
					.query("       set imge_2snd = ''			")
					.query("       where pjod_idcd = :pjod_idcd", arg.getParameter("pjod_idcd"))
					.query("       and   item_idcd = :item_idcd", arg.getParameter("item_idcd"))
					.query("       and   line_seqn = :line_seqn", arg.getParameter("line_seqn"))
				;data.attach(Action.direct);
				data.execute();
				data.clear();
				if(tapidx.equals("1")){
					data.param
						.query("update item_mast						")
						.query("       set item_imge2 = ''				")
						.query("       where item_idcd = :item_idcd", arg.getParameter("item_idcd"))
					;data.attach(Action.direct);
					data.execute();
					data.clear();
				}
			}else if(chk2.equals("1")){
				byte[] buf2 = new byte[1024];
				while ((readCount2 = thumnailInputStream2.read(buf2))>0) {
					 baos2.write(buf2,0,readCount2);
				}
				returnByte2 = baos2.toByteArray();

				data.param
					.table("pjod_bom")
					.where("where pjod_idcd	= :pjod_idcd" )
					.where("and   item_idcd	= :item_idcd" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("pjod_idcd"				, arg.fixParameter("pjod_idcd"))
					.unique("item_idcd"				, arg.fixParameter("item_idcd"))
					.unique("line_seqn"				, arg.fixParameter("line_seqn"))

					.update("imge_2snd",returnByte2)
				;data.attach(Action.update);
				data.execute();
				data.clear();
				if(tapidx.equals("1")){
					data.param
						.table("item_mast")
						.where("where item_idcd	= :item_idcd" )

						.unique("item_idcd"				, arg.fixParameter("item_idcd"))

						.update("item_imge2",returnByte2)
					;data.attach(Action.update);
					data.execute();
					data.clear();
				}
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

	public SqlResultMap setBomDelete(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String pjod_idcd = "";
		String item_idcd = "";
		int line_ordr;

		pjod_idcd = arg.getParamText("pjod_idcd");
		item_idcd = arg.getParamText("item_idcd");
		line_ordr = Integer.parseInt(arg.getParamText("line_ordr"));

		System.out.println(pjod_idcd);
		System.out.println(item_idcd);
		System.out.println(line_ordr);

		data.param
			.query("call project_bom_delete2 (				")
			.query("   :pjod_idcd, "   ,  pjod_idcd			)
			.query("   :item_idcd, "   ,  item_idcd			)
			.query("   :line_ordr  "   ,  line_ordr			)
			.query(" ) 										")
		;
		data.attach(Action.direct);
		data.execute();

		return null;
	}

	public SqlResultMap setWorkBook(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String pjod_idcd = "";

		pjod_idcd = arg.getParamText("pjod_idcd");

		data.param
			.query("call work_order_book (					")
			.query("   :pjod_idcd "   ,  pjod_idcd			)
			.query(" ) 										")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
	
	public SqlResultMap getProduct(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("SELECT  count(1) as maxsize ")
		;
		data.param
			.query("SELECT im.item_idcd    , im.item_code    , im.item_name    , im.acct_bacd	")
			.query("     , IFNULL(im.item_spec, '')          ,bm.base_name AS acct_name			")
		;
		data.param //퀴리문
			.where("  FROM item_mast im													")
			.where("  LEFT OUTER JOIN base_mast bm  ON im.acct_bacd = bm.base_code		")
			.where("                               AND bm.prnt_idcd = '1102'			")
			.where(" WHERE 1=1															")
			.where("   AND im.acct_bacd = '3000'										")
			.where("   AND im.line_stat = '0'											")
			.where(" ORDER BY im.item_code												")
		;
		
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	
	public SqlResultMap getBomMast(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		
		data.param
			.query("SELECT bm.line_ordr       , bm.line_seqn       , bm.need_qntt    , bm.ivst_item_idcd					")
			.query("     , im.item_code       , im.item_name       , im.acct_bacd    , bm2.base_name AS acct_name			")
			.query("     , im.item_spec       , wm.wkct_name       , json_value(bm.json_data, '$.wkct_idcd') AS wkct_idcd	")
			.query("     , bm.prnt_item_idcd																				")
			.where("  FROM bom_mast bm																				")
			.where("  LEFT OUTER JOIN item_mast im   ON bm.ivst_item_idcd = im.item_idcd							")
			.where("  LEFT OUTER JOIN base_mast bm2  ON im.acct_bacd = bm2.base_code								")
			.where("                                AND bm2.prnt_idcd = '1102'										")
			.where("  LEFT OUTER JOIN wkct_mast wm   ON json_value(bm.json_data, '$.wkct_idcd') = wm.wkct_idcd		")
			.where(" WHERE 1=1																						")
			.where("   AND bm.prnt_item_idcd = :prnt_item_idcd	", arg.getParameter("prnt_item_idcd"				))
			.where("   AND bm.revs_numb = :revs_numb			", arg.getParameter("revs_numb"						))
			.where("   AND bm.revs_dvcd = :revs_dvcd			", arg.getParameter("revs_dvcd"						))
			.where(" ORDER BY bm.line_ordr ASC																		")
		;
		return data.selectForMap();
	}
	
	public SqlResultMap getMaxSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		
		data.param
			.query("SELECT MAX(line_seqn) AS max_seqn												")
		;
		data.param //퀴리문
			.where("  FROM bom_mast bm																")
			.where(" WHERE 1=1																		")
			.where("   AND bm.prnt_item_idcd = :prnt_item_idcd	", arg.getParameter("prnt_item_idcd"))
			.where("   AND bm.revs_numb = :revs_numb			", arg.getParameter("revs_numb"		))
			.where("   AND bm.revs_dvcd = :revs_dvcd			", arg.getParameter("revs_dvcd"		))
			.where(" GROUP BY bm.prnt_item_idcd , bm.revs_numb , bm.revs_dvcd						")
		;
		
		return data.selectForMap();
	}
	
	public SqlResultMap setBomMast(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ParamToJson trans = new ParamToJson();
		
		for (SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			String json_data = trans.TranslateRow(arg, row, "bom_mast_json_fields");
			if (rowaction == Action.delete) {
				data.param
					.table("bom_mast								")
					.where("WHERE prnt_item_idcd = :prnt_item_idcd	")
					.where("  AND revs_numb      = :revs_numb		")
					.where("  AND line_seqn      = :line_seqn		")
					.where("  AND revs_dvcd      = :revs_dvcd		")
					
					.unique("prnt_item_idcd"	, row.fixParameter("prnt_item_idcd"	))
					.unique("revs_numb"			, row.fixParameter("revs_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
					.unique("revs_dvcd"			, row.fixParameter("revs_dvcd"		))
	
					.update("line_stat"			, '2'								)
	
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				;
				data.attach(rowaction);
			} else {
				data.param
					.table("bom_mast								")
					.where("WHERE prnt_item_idcd = :prnt_item_idcd	")
					.where("  AND revs_numb      = :revs_numb		")
					.where("  AND line_seqn      = :line_seqn		")
					.where("  AND revs_dvcd      = :revs_dvcd		")
					
					.unique("prnt_item_idcd"	, row.fixParameter("prnt_item_idcd"	))
					.unique("revs_numb"			, row.fixParameter("revs_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
					.unique("revs_dvcd"			, row.fixParameter("revs_dvcd"		))
	
					.update("ivst_item_idcd"	, row.getParameter("ivst_item_idcd"	))
					.update("item_name"			, row.getParameter("item_name"		))
					.update("item_spec"			, row.getParameter("item_spec"		))
					.update("need_qntt"			, row.getParameter("need_qntt"		))
					.update("line_ordr"			, row.getParameter("line_ordr"		))
					.update("json_data"			, json_data							)
	
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				;
				data.attach(rowaction);
			}
		}
		data.execute();
		
		return null;
	}
}
