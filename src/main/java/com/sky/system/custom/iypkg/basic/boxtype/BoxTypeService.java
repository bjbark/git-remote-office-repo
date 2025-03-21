package com.sky.system.custom.iypkg.basic.boxtype;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.lowagie.text.pdf.AcroFields.Item;
import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;
import com.sky.utils.file.UploadItem;

@Service
public class BoxTypeService  extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																		")
		;
		data.param
			.where("from (																						")
			.where("select   a.bxty_name        , a.scre_dvcd        , a.mxm2_gath        , a.offr_gath			")
			.where("       , a.sgam_relx        , a.tsum_stnd        , a.mxm2_tsum        , a.offr_tsum			")
			.where("       , a.minm_leng        , a.maxm_leng        , a.minm_widh        , a.maxm_widh			")
			.where("       , a.bxty_leng        , a.bxty_widh        , a.bxty_hght        , a.remk_text			")
			.where("       , a.bxty_code        , a.bxty_idcd        , a.user_memo								")
			.where("       , a.bxty_imge_name   , a.fabc_ttln_calc   , a.fabc_ttwd_calc							")
			.where("       , a.scre_calc_1fst   , a.scre_calc_2snd   , a.scre_calc_3trd							")
			.where("       , a.scre_calc_4frt   , a.scre_calc_5fit												")
			.where("       , a.mxm2_fdat_loss   , a.offr_fdat_loss												")
			.where("       , a.tsum_ttln_calc   , a.line_stat													")
			.where("       , concat(ifnull(a.scre_calc_1fst,''),' ', ifnull(a.scre_calc_2snd,''),' '			")
			.where("              , ifnull(a.scre_calc_3trd,''),' ', ifnull(a.scre_calc_4frt,''),' '			")
			.where("              , ifnull(a.scre_calc_5fit,'')) as scre_calc									")
			.where("from   boxtype_mast a																		")
			.where("where  1=1																					")
			.where("and    a.find_name   like %:find_name%			" , arg.getParamText("find_name"))
			.where("and    a.line_stat   = :line_stat				" , arg.getParamText("line_stat"))
			.where("and    a.line_stat   < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.bxty_idcd limit 9999999															")
			.where(") a																							")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select  a.bxty_name        , a.scre_dvcd        , a.mxm2_gath        , a.offr_gath,			")
			.where("        a.sgam_relx        , a.tsum_stnd        , a.mxm2_tsum        , a.offr_tsum,			")
			.where("        a.minm_leng        , a.maxm_leng        , a.minm_widh        , a.maxm_widh,			")
			.where("        a.bxty_leng        , a.bxty_widh        , a.bxty_hght        , a.remk_text,			")
			.where("        a.bxty_code        , a.bxty_idcd        , a.user_memo,								")
			.where("        a.bxty_imge_name   , a.fabc_ttln_calc   , a.fabc_ttwd_calc   ,						")
			.where("        a.mxm2_fdat_loss   , a.offr_fdat_loss   ,											")
			.where("        a.tsum_ttln_calc   , a.line_stat        ,											")
			.where("        a.scre_calc_1fst   , a.scre_calc_2snd   , a.scre_calc_3trd,							")
			.where("        a.scre_calc_4frt   , a.scre_calc_5fit   											")
			.where("       , concat(ifnull(a.scre_calc_1fst,''),' ', ifnull(a.scre_calc_2snd,''),' '			")
			.where("              , ifnull(a.scre_calc_3trd,''),' ', ifnull(a.scre_calc_4frt,''),' '			")
			.where("              , ifnull(a.scre_calc_5fit,'')) as scre_calc									")
			.where("from   boxtype_mast a																		")
			.where("where  1=1																					")
			.where("and    a.find_name	like %:find_name%			" , arg.getParamText("find_name"))
			.where("and    a.scre_dvcd   = :scre_dvcd				" , arg.getParamText("scre_dvcd"))
			.where("and    a.line_stat   = :line_stat				" , arg.getParamText("line_stat"))
			.where("and    a.line_stat   < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.bxty_idcd limit 9999999															")
			.where(") a																							")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 등록/수정/삭제
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		DataMessage temp = arg.newStorage("POS");

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				data.param
					.table("boxtype_mast")
					.where("where bxty_idcd = :bxty_idcd	")

					.unique("bxty_idcd"			, row.fixParameter("bxty_idcd"		))
				;data.attach(Action.delete);
				data.execute();
				data.clear();

			} else {
				// master 등록/수정
				data.param
					.table ("boxtype_mast")
					.where ("where bxty_idcd = :bxty_idcd")

					.unique("bxty_idcd"        , row.fixParameter("bxty_idcd"))			//box id

					.update("bxty_name"        , row.getParameter("bxty_name"))
					.update("bxty_code"        , row.getParameter("bxty_code"))
					.update("scre_dvcd"        , row.getParameter("scre_dvcd"))
					.update("mxm2_gath"        , row.getParameter("mxm2_gath"))
					.update("offr_gath"        , row.getParameter("offr_gath"))
					.update("sgam_relx"        , row.getParameter("sgam_relx"))
					.update("tsum_stnd"        , row.getParameter("tsum_stnd"))
					.update("mxm2_tsum"        , row.getParameter("mxm2_tsum"))
					.update("offr_tsum"        , row.getParameter("offr_tsum"))
					.update("minm_leng"        , row.getParameter("minm_leng"))
					.update("maxm_leng"        , row.getParameter("maxm_leng"))
					.update("minm_widh"        , row.getParameter("minm_widh"))
					.update("maxm_widh"        , row.getParameter("maxm_widh"))
					.update("bxty_leng"        , row.getParameter("bxty_leng"))
					.update("bxty_widh"        , row.getParameter("bxty_widh"))
					.update("bxty_hght"        , row.getParameter("bxty_hght"))
					.update("remk_text"        , row.getParameter("remk_text"))
					.update("fabc_ttln_calc"   , row.getParameter("fabc_ttln_calc"))
					.update("fabc_ttwd_calc"   , row.getParameter("fabc_ttwd_calc"))
					.update("mxm2_fdat_loss"   , row.getParameter("mxm2_fdat_loss"))
					.update("offr_fdat_loss"   , row.getParameter("offr_fdat_loss"))
					.update("scre_calc_1fst"   , row.getParameter("scre_calc_1fst"))
					.update("scre_calc_2snd"   , row.getParameter("scre_calc_2snd"))
					.update("scre_calc_3trd"   , row.getParameter("scre_calc_3trd"))
					.update("scre_calc_4frt"   , row.getParameter("scre_calc_4frt"))
					.update("scre_calc_5fit"   , row.getParameter("scre_calc_5fit"))
					.update("tsum_ttln_calc"   , row.getParameter("tsum_ttln_calc"))
					.update("line_stat"        , 0	)
					.update("find_name"			, row.getParameter("bxty_name")
												+ " "
												+ row.getParameter("bxty_code"))
					.update("user_memo"        , row.getParameter("user_memo"))		/*  담당자  */
					.update("sysm_memo"        , row.getParameter("sysm_memo"))		/*  시스템메모  */
					.update("prnt_idcd"        , row.getParameter("prnt_idcd"))		/*  상위 ID  */
					.update("line_levl"        , row.getParameter("line_levl"))		/*  ROW레벨  */
					.update("line_ordr"        , row.getParameter("line_ordr"))		/*  ROW순서  */
					.update("line_clos"        , row.getParameter("line_clos"))		/*  마감여부  */
					.update("updt_ipad"        , row.getParameter("updt_ipad"))		/*  수정IP  */
					.update("updt_idcd"        , row.getParameter("updt_idcd"))		/*  수정ID  */
					.update("updt_urif"        , row.getParameter("updt_urif"))		/*  수정UI  */
					.insert("crte_user_name"   , row.getParameter("crte_user_name"))	/*  생성사용자명  */
					.insert("crte_ipad"        , row.getParameter("crte_ipad"))		/*  생성IP  */
					.update("updt_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"        , row.getParameter("crte_idcd"))		/*  생성ID  */
					.insert("crte_urif"        , row.getParameter("crte_urif"))		/*  생성UI  */
				;
				data.attach(Action.modify);
				data.execute();
				}
			}
		return null;
		}

	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select bxty_imge, bxty_imge_name	")
			.where("from  boxtype_mast					")
			.where("where 1=1							")
			.where("and   bxty_idcd = :bxty_idcd",arg.getParameter("bxty_idcd"))

		;
		return data.selectForMap();
	}

	public SqlResultMap setFileupload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
		DataMessage data = arg.newStorage("POS");
		String chk1 = (String)arg.getParameter("chk1");
		byte[] returnByte =null;
		ArrayList<String> name = new ArrayList<String>();
		ArrayList<String> file_name = new ArrayList<String>();
		ArrayList<Long> file_size = new ArrayList<Long>();
		ByteArrayOutputStream baos =  new ByteArrayOutputStream();
		String imageName="";
		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.
		ByteArrayInputStream thumnailInputStream = null;

		for (int i = 0; i < file.length; i++) {
			file_name.add(file[i].getFileItem().getName());
			file_size.add(file[i].getFileItem().getSize());
			if(file[i].getFileItem().getName().lastIndexOf(".") == -1){
				name.add(file_name.get(i));
			}else{
				name.add(file_name.get(i).substring(0,file[i].getFileItem().getName().lastIndexOf(".")));
			}
		}

		for (int i = 0; i < file_name.size(); i++) {
			if(file[i].getFileItem().getName().lastIndexOf(".") == -1){
				imageName = name.get(i);
			}else{
				// 파일이름지정 ( 확장자는 유지 )
				imageName = name.get(i) + file_name.get(i).substring(file[i].getFileItem().getName().lastIndexOf("."));
							 // 파일이름, 현재시간, 파일 확장자
			}
		}

		// 이미지일 경우 섬네일 과정을 거친다.
		if(file[0].getFileItem().getName()==null||file[0].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[0].getInputStream()).size(240, 180).toOutputStream(baos);
			thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
		}
		for (int i = 0; i < file.length; i++) {
			file_name.add(file[i].getFileItem().getName());
			file_size.add(file[i].getFileItem().getSize());
			if(file[i].getFileItem().getName().lastIndexOf(".") == -1){
				name.add(file_name.get(i));
			}else{
				name.add(file_name.get(i).substring(0,file[i].getFileItem().getName().lastIndexOf(".")));
			}
		}
		int readCount = 0;
		try{

			if(chk1.equals("1")){
				byte[] buf = new byte[9999999];
//				while ((readCount = thumnailInputStream.read(buf))>0) {
//					 baos.write(buf,0,readCount);
//				}
				returnByte = baos.toByteArray();

				data.param
					.table("boxtype_mast")
					.where("where bxty_idcd	= :bxty_idcd" )

					.unique("bxty_idcd"				, arg.fixParameter("bxty_idcd"))

					.update("bxty_imge",returnByte)
					.update("bxty_imge_name", imageName )

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
		}

		return map;
	}

}
