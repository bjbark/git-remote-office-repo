package com.sky.system.basic.basemast;

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
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;


@Service
public class BaseMastService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize												")
		;
		data.param
			.query("select a.hqof_idcd , a.refn_valu_1fst									")
			.query("     , a.base_idcd , a.base_code , a.base_name  , a.base_engl_name		")
			.query("     , a.prnt_idcd , a.line_levl , a.line_stat  , a.user_memo			")
		;
		data.param //퀴리문
			.where("from   base_mast a														")
			.where("where  1=1																")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_nm"))
			.where("and    a.hqof_idcd  = :hqof_idcd       "  , arg.fixParameter("hqof_idcd"))
			.where("and    a.prnt_idcd  = :prnt_idcd       "  , arg.fixParameter("prnt_idcd"))
			.where("and    a.find_name  like %:find_name%  "  , arg.getParameter("find_name"))
			.where("and    a.base_name  like %:base_name%  "  , arg.getParameter("base_name"))
//
			.where("and    a.line_stat = :line_stat1 " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )

			.where("order by a.base_code													")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getSearch2(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select a.hqof_idcd														")
			.query("     , a.base_idcd , a.base_code , a.base_name  , a.base_engl_name		")
			.query("     , a.prnt_idcd , a.line_levl , a.line_stat  , a.user_memo			")
		;
		data.param //퀴리문
			.where("from   base_mast a														")
			.where("where  1=1																")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_nm"))
			.where("and    a.hqof_idcd  = :hqof_idcd       "  , arg.fixParameter("hqof_idcd"))
			.where("and    a.prnt_idcd  = :prnt_idcd       "  , arg.fixParameter("prnt_idcd"))
			.where("and    a.find_name  like %:find_name%  "  , arg.getParameter("find_name"))
			.where("and    a.base_name  like %:base_name%  "  , arg.getParameter("base_name"))
//
			.where("and    a.line_stat = :line_stat1 " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )

			.where("order by a.base_code													")
		;
		return data.selectForMap();
	}
	/**
	 * 상품기초정보 조회
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select a.hqof_idcd  , a.refn_valu_1fst									")
			.query("     , a.base_idcd  , a.base_code , a.base_name   , a.base_engl_name	")
			.query("     , a.prnt_idcd  , a.line_levl , a.line_stat   , a.user_memo			")
			.query("     , a.code_leng  , a.sysm_memo										")
		;
		data.param
			.where("from   base_mast a														")
			.where("where  1=1																")
			.where("and    a.hqof_idcd   =  :hqof_idcd    " , arg.fixParameter("hqof_idcd" ))
			.where("and    a.prnt_idcd   =  :prnt_idcd    " , arg.fixParameter("prnt_idcd" ))
			.where("and    a.base_code   =  :base_code    " , arg.getParameter("base_code" ))
			.where("and    a.base_code   like '2%'        " , "반제품".equals(arg.getParamText("base_like" )))
		;
		// 23.02.03 - 배합비관리 > 삼정향료인 경우 원재료 추가
		if("BOM".equals(arg.getParamText("base_like" ))){
			if(!arg.getParamText("hqof_idcd").toUpperCase().equals("N1000SJFLV")) {
				data.param
					.where("and    a.base_code   between 2000 and 3999 ");
			}else{
				data.param
					.where("and    (a.base_code   between 2000 and 3999 or a.base_code = '1001') ");
			}
		}

		if(arg.getParamText("hqof_idcd").toUpperCase().equals("N1000A-ONE")){
			data.param
				.where("and    a.base_code   in ('102')  " , "발주".equals(arg.getParamText("base_code2" )))
			;
		}

		if(arg.getParamText("hqof_idcd").toUpperCase().equals("N1000SJFLV") || arg.getParamText("hqof_idcd").toUpperCase().equals("N1000SJUNG")){
			data.param
				.where("and    a.base_code   in ('1001', '4000')  " , "발주".equals(arg.getParamText("base_code2" )))
			;
		}

		data.param
			.where("and    a.find_name   like %:find_name%" , arg.getParameter("find_name"   ))
			.where("and    a.base_name   like %:base_name%" , arg.getParameter("base_name"   ))
			.where("and    a.line_stat   =  :line_stat    " , "0"  ,( "0".equals(arg.getParamText("line_stat")) )) // 정상 거래처만 조회 요청한 경우
			.where("and    a.line_stat   <= :line_stat    " , "1"  ,(!"0".equals(arg.getParamText("line_stat")) )) // 정상 거래처가 없거나.. 다른 값인 경우
			.where("order by a.base_code													")
		;
	    return data.selectForMap(page, rows, (page == 1)); //
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
					.table("base_mast")
					.where("where   base_idcd  = :base_idcd  " )
					//
					.unique("base_idcd"			, row.fixParameter("base_idcd"         ))
					.update("line_stat"			, 2  )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.update);
			} else {
				data.param
					.table("base_mast")
					.where("where base_idcd  = :base_idcd  " )
					//
					.unique("hqof_idcd"			, row.fixParameter("hqof_idcd"))
					.unique("base_idcd"			, row.fixParameter("base_idcd"))
					.update("base_code"			, row.getParameter("base_code"))
					.update("base_name"			, row.getParameter("base_name"))
					.update("base_engl_name"	, row.getParameter("base_engl_name"))
					.update("refn_valu_1fst"	, row.getParameter("refn_valu_1fst"))
					.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParamText("base_code"         ).trim()
												+ row.getParamText("base_name"         ).trim())
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

	/**
	 * 출고처 구분에 따른 각종 코드 명칭
	 */
	public SqlResultMap getOffeLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																			")
		;
		data.param
			.where("from (																				")
			.where("select wkct_idcd   as offe_idcd														")
			.where("     , wkct_code   as offe_code														")
			.where("     , wkct_name   as offe_name														")
			.where("     , find_name																	")
			.where("     , '1'         as offe_dvcd														")
			.where("from   wkct_mast																	")
			.where("where  line_stat < '2'																")
			.where("union  all																			")
			.where("select dept_idcd   as offe_idcd														")
			.where("     , dept_code   as offe_code														")
			.where("     , dept_name   as offe_name														")
			.where("     , find_name																	")
			.where("     , '2'         as offe_dvcd														")
			.where("from   dept_mast																	")
			.where("where  line_stat < '2'																")
			.where("union all																			")
			.where("select cstm_idcd   as offe_idcd														")
			.where("     , cstm_code   as offe_code														")
			.where("     , cstm_name   as offe_name														")
			.where("     , find_name																	")
			.where("     , '3'         as offe_dvcd														")
			.where("from   cstm_mast																	")
			.where("where  line_stat < '2'																")
			.where("and    ifnull(otod_cstm_yorn,'0') <> '0'											")
			.where("union all																			")
			.where("select cstm_idcd   as offe_idcd														")
			.where("     , cstm_code   as offe_code														")
			.where("     , cstm_name   as offe_name														")
			.where("     , find_name																	")
			.where("     , '4'         as offe_dvcd														")
			.where("from   cstm_mast																	")
			.where("where  line_stat < '2'																")
			.where("and    (ifnull(puch_cstm_yorn,'0') <> '0' or ifnull(incm_cstm_yorn,'0') <> '0' )	")
			.where("union all																			")
			.where("select cstm_idcd   as offe_idcd														")
			.where("     , cstm_code   as offe_code														")
			.where("     , cstm_name   as offe_name														")
			.where("     , find_name																	")
			.where("     , '5'         as offe_dvcd														")
			.where("from   cstm_mast																	")
			.where("where  line_stat < '2'																")
			.where("and    (ifnull(sale_cstm_yorn,'0') <> '0' or ifnull(expt_cstm_yorn,'0') <> '0' )	")
			.where("union all																			")
			.where("select cvic_idcd   as offe_idcd														")
			.where("     , cvic_code   as offe_code														")
			.where("     , cvic_name   as offe_name														")
			.where("     , find_name																	")
			.where("     , '6'         as offe_dvcd														")
			.where("from   cvic_mast																	")
			.where("where  line_stat < '2'																")
			.where("and    wkct_idcd = :wkct_idcd " , arg.getParameter("wkct_idcd"))
			.where(") a																					")
			.where("where a.offe_dvcd = :offe_dvcd "		, arg.getParameter("cstm_dvcd"))
			.where("and   a.find_name like  %:find_name% "  , arg.getParameter("find_name"))
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}



	public SqlResultMap upload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
		CommonsMultipartFile file = uploadItem.getFiles()[0]; // 이미지 파일을 가져온다.

		// 파일이 이미지일 경우
		String imageYn = "Y";
		ByteArrayInputStream thumnailInputStream = null;
		// 이미지일 경우 섬네일 과정을 거친다.
		if("Y".equals(imageYn)) {
		//  이미지 파일 사이즈 체크
//			if (file.getSize()/1024/1024 > 0) {
//				throw new ServiceException("1M 이하 파일만 사용 가능 합니다.");
//			}

			// 섬네일에 강제 사이즈 지정 후 스트림 과정
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
	        Thumbnails.of(file.getInputStream()).size(200, 200).toOutputStream(baos);
	        thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
		}


        // FTPTEST 일 경우 ( 해당 DB의 ddns를 보내주면 된다. ) -> 특정 서버 정보를 가져오고자 할떄 HostProperty를 사용
		HostProperty host = property.getProperty( "FTPTEST" ); // 업로드 서버 정보 가져오기

		// 서버에서 기존 path를 불러온다.
		String directory = host.getHostPath(); // 업로드 경로를 지정한다.

		// 파일이름지정 ( 확장자는 유지 )
		String imageName = "TestFile" + file.getFileItem().getName().substring(file.getFileItem().getName().lastIndexOf("."));

		// ftp 생성
		FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue(host.getProvider()));

		// ftp 접속
		if (ftp.connect(host)) {
			try{
				// 업로드 진행
				// 이미지일 경우
				if("Y".equals(imageYn)){
					ftp.upload(directory, imageName, thumnailInputStream);
				} else {
					ftp.upload(directory, imageName, file);
				}

				// logic 처리 ( DB등 )

		   	} catch(Exception ex) {
				throw ex;
			} finally {
				ftp.disconnect();
			}
		}
		return map;
	}
}



