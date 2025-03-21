package com.sky.system.basic.refnmast;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

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

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.connection.HostProperty;
import net.sky.core.connection.ftp.FTPConnector;
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;


@Service
public class RefnMastService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																	")
		;
		data.param
			.query("select    a.refn_dvcd      , a.refn_code													")
			.query("        , a.refn_cont_1fst , a.refn_cont_2snd 	, a.refn_cont_3trd  , a.refn_cont_4frt		")
			.query("        , a.refn_cont_5fit 																	")
			.query("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl			")
			.query("        , a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name			")
			.query("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd			")
			.query("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm			")
			.query("        , a.crte_idcd       , a.crte_urif   												")
			.query("        , a.refn_code as orig_refn_code														")
		;
		data.param //퀴리문
			.where("from   item_refn a																			")
			.where("where  1 = 1																				")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.refn_dvcd  = :refn_dvcd       	" , arg.getParamText("refn_dvcd"))
			.where("and    a.refn_code  = :refn_code       	" , arg.getParamText("refn_code"))
			.where("and    a.line_stat  = :line_stat 		" , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )

			.where("order by a.refn_code													")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * 상품기초정보 조회
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문
			.total("select count(1) as maxsize																	")
		;
		data.param
			.query("select    a.refn_dvcd      , a.refn_code													")
			.query("        , a.refn_cont_1fst , a.refn_cont_2snd , a.refn_cont_3trd  , a.refn_cont_4frt		")
			.query("        , a.refn_cont_5fit 																	")
			.query("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl			")
			.query("        , a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name			")
			.query("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd			")
			.query("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm			")
			.query("        , a.crte_idcd       , a.crte_urif   												")

		;
		data.param //퀴리문
			.where("from   item_refn a														")
			.where("where  1=1																")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.refn_dvcd  = :refn_dvcd       "  , arg.getParamText("refn_dvcd"))
			.where("and    a.line_stat = :line_stat " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )

			.where("order by a.refn_code													")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	/**
	 *
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("item_refn")
					.where("where   refn_dvcd  = :refn_dvcd  " )
					.where("and     refn_code  = :refn_code  " )
					//
					.unique("refn_dvcd"			, row.fixParameter("refn_dvcd"         ))
					.unique("refn_code"			, row.fixParameter("refn_code"         ))
					.update("line_stat"			, 2  )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.update);
			} else {
				// 23.08.17 - 코드  중복 검증을 한다.
				boolean isDupCheck = true;
				if (rowaction == Action.update) {
					if (row.getParameter("refn_code" ).equals(row.getParameter("orig_refn_code"))) {
						isDupCheck = false;
					}
				}

				if (isDupCheck) {
					data.param
						.where("select count(*) as count ")
						.where("  from item_refn a ")
						.where("where   refn_dvcd  = :refn_dvcd  " , row.getParameter("refn_dvcd" ))
						.where("and     refn_code  = :refn_code  " , row.getParameter("refn_code" ))
					;
					if (Integer.parseInt(data.selectForRow().getParamText("count")) > 0) {
						throw new ServiceException("등록되어 있는 코드 입니다. 확인 후 진행 하세요.");
					}
				}

				data.clear();
				if (rowaction == Action.update && isDupCheck) {
					data.param
						.query("update item_refn				")
						.query("   set refn_code = :refn_code " 			, row.getParameter("refn_code"))
						.query("     , line_stat = :line_stat "				, row.getParameter("line_stat"))
						.query("     , refn_cont_1fst = :refn_cont_1fst "	, row.getParameter("refn_cont_1fst"))
						.query("     , refn_cont_2snd = :refn_cont_2snd "	, row.getParameter("refn_cont_2snd"))
						.query("     , refn_cont_3trd = :refn_cont_3trd "	, row.getParameter("refn_cont_3trd"))
						.query("     , refn_cont_4frt = :refn_cont_4frt "	, row.getParameter("refn_cont_4frt"))
						.query("     , refn_cont_5fit = :refn_cont_5fit "	, row.getParameter("refn_cont_5fit"))
						.query("     , find_name = :find_name "				, row.getParameter("base_code") + " " + row.getParameter("base_name"))
						.query("     , user_memo = :user_memo "				, row.getParameter("user_memo"))
						.query("     , updt_dttm = DATE_FORMAT(now(),'%Y%m%d%H%i%S')")
						.query("     , updt_idcd = :updt_idcd "				, arg.login)
						.query(" where refn_dvcd = :refn_dvcd "				, row.getParameter("refn_dvcd"))
						.query("   and refn_code = :orig_refn_code "		, row.getParameter("orig_refn_code"))
					;
					data.attach(Action.direct);
				} else {
					data.param
						.table("item_refn")
						.where("where   refn_dvcd  = :refn_dvcd  " )
						.where("and     refn_code  = :refn_code  " )
						//
						.unique("refn_dvcd"			, row.fixParameter("refn_dvcd"         ))
						.unique("refn_code"			, row.fixParameter("refn_code"         ))

						.update("refn_cont_1fst"	, row.getParameter("refn_cont_1fst"))
						.update("refn_cont_2snd"	, row.getParameter("refn_cont_2snd"))
						.update("refn_cont_3trd"	, row.getParameter("refn_cont_3trd"))
						.update("refn_cont_4frt"	, row.getParameter("refn_cont_4frt"))
						.update("refn_cont_5fit"	, row.getParameter("refn_cont_5fit"))

						.insert("line_levl"			, row.getParameter("line_levl"))
						.update("line_stat"			, row.getParameter("line_stat"))
						.update("user_memo"			, row.getParameter("user_memo"))
						.update("find_name"			, row.getParamText("base_code")
													+ " "
													+ row.getParamText("base_name"))
						.update("updt_idcd"			, row.getParameter("updt_idcd"))
						.insert("crte_idcd"			, row.getParameter("crte_idcd"))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;
					data.attach(rowaction);
				}
			}
		}
		data.execute();
		return null ;
	}
}



