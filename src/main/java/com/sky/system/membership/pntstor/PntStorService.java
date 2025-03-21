package com.sky.system.membership.pntstor;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.connection.HostProperty;
import net.sky.core.connection.ftp.FTPConnector;
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.utils.file.UploadItem;

import net.sky.http.dispatch.service.HostPropertiesService;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;




@Service
public class PntStorService extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;

	Logger logger = org.apache.log4j.Logger.getLogger(this.getClass());
	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

//		DataMessage data = new DataMessage("N1000FNGCH"+".POS");
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
            .query("select  *										                                                         ")
        ;
		data.param
	        .where("from (												                                                     ")
			.where("select                                                                                                   ")
			.where("          a.stor_id         , a.ctrl_id         , a.hq_id           , a.stor_grp        , a.stor_nm      ")
			.where("        , a.stor_gb         , a.rnd_gb          , a.stor_sts        , a.stor_st_tm      , a.stor_end_tm  ")
			.where("        , a.stor_st_tm_sat  , a.stor_end_tm_sat , a.stor_st_tm_sun  , a.stor_end_tm_sun , a.biz_gb       ")
			.where("        , a.biz_no          , a.biz_nm          , a.biz_type        , a.biz_kind        , a.biz_owner    ")
			.where("        , a.biz_email       , a.biz_tel_no      , a.biz_hp_no       , a.biz_fax_no      , a.biz_zip_cd   ")
			.where("        , a.biz_addr_1      , a.biz_addr_2      , a.biz_state       , a.biz_city        , a.biz_dong     ")
			.where("        , a.zip_cd          , a.state           , a.city            , a.dong            , a.addr_1       ")
			.where("        , a.addr_2          , a.map_img         , a.map_url         , a.map_vw          , a.map_zone     ")
			.where("        , a.map_area        , a.bnkbk_id        , a.pnt_type        , a.pnt_rt          , a.min_use_pnt  ")
			.where("        , a.cash_pnt_rt     , a.card_pnt_rt     , a.stamp_url       , a.bizarea_pht     , a.mst_img      ")
			.where("        , a.user_memo        , a.sys_memo        , a.prnt_id                                              ")
			.where("        , a.row_lvl         , a.row_ord         , a.row_sts         , a.row_clos        , a.find_name      ")
			.where("        , a.upt_usr_nm      , a.upt_ip          , a.upt_dttm        , a.upt_id          , a.upt_ui       ")
			.where("        , a.crt_usr_nm      , a.crt_ip          , a.crt_dttm        , a.crt_id          , a.crt_ui       ")
			.where("from    pnt_stor a                                                                                       ")
			.where("where   1=1                                                                                              ")
			.where("and     a.hq_id   = :hq_id         " , arg.fixParamText  ("hq_id") )
			.where("and     a.find_name like %:find_name%  " , arg.getParamText  ("find_name") )
			.where("and     a.stor_id = :stor_id       " , arg.getParamText  ("stor_id") )
			.where("and     a.row_sts < :row_sts       " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and     a.row_sts < :row_sts       " , "2" , "".equals(arg.getParamText("row_sts" )) )
			.where(") a  " )
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows) throws Exception {
//		DataMessage data = new DataMessage("N1000FNGCH"+".POS");
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
			.total("select count(1) as maxsize ")
		;
		data.param // 쿼리문  입력
			.query("select *																	                             ")
		;
		data.param
			.where("from (												                                                     ")
			.where("select                                                                                                   ")
			.where("          a.stor_id         , a.ctrl_id         , a.hq_id           , a.stor_grp        , a.stor_nm      ")
			.where("        , a.stor_gb         , a.stor_sts        , a.stor_st_tm      , a.stor_end_tm                      ")
			.where("        , a.stor_st_tm_sat  , a.stor_end_tm_sat , a.stor_st_tm_sun  , a.stor_end_tm_sun , a.biz_gb       ")
			.where("        , a.biz_no          , a.biz_nm          , a.biz_type        , a.biz_kind        , a.biz_owner    ")
			.where("        , a.biz_email       , a.biz_tel_no      , a.biz_hp_no       , a.biz_fax_no      , a.biz_zip_cd   ")
			.where("        , a.biz_addr_1      , a.biz_addr_2      , a.biz_state       , a.biz_city        , a.biz_dong     ")
			.where("        , a.zip_cd          , a.state           , a.city            , a.dong            , a.addr_1       ")
			.where("        , a.addr_2          , a.map_img         , a.map_url         , a.map_vw          , a.map_zone     ")
			.where("        , a.map_area        , a.bnkbk_id        , a.pnt_type        , a.pnt_rt          , a.min_use_pnt  ")
			.where("        , a.cash_pnt_rt     , a.card_pnt_rt     , a.stamp_url       , a.bizarea_pht     , a.mst_img      ")
			.where("from    pnt_stor a                                                                                       ")
			.where("where   1=1                                                                                              ")
			.where("and     a.hq_id   = :hq_id         " , arg.fixParamText  ("hq_id") )
			.where("and     a.find_name like %:find_name%  " , arg.getParamText  ("find_name") )
			.where("and     a.stor_id = :stor_id       " , arg.getParamText  ("stor_id") )
			.where("and     a.row_sts < :row_sts       " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and     a.row_sts < :row_sts       " , "2" , "".equals(arg.getParamText("row_sts" )) )
			.where(") a  " )
		;
		return data.selectForMap(page, rows, (page == 1) );
	}

	/**
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
//		DataMessage data = new DataMessage("N1000FNGCH"+".POS");
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
	        	data.param
        			.table("pnt_stor")
        			.where("where hq_id    = :hq_id     " )
        			.where("and   stor_id  = :stor_id   " )
        			//
        			.unique("hq_id"             , row.fixParameter("hq_id"           ))
        			.unique("stor_id"           , row.fixParameter("stor_id"         ))
        			.update("row_sts"           , 2                                   )
        			.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	        	;data.attach(Action.update);
			}else{
			data.param
				.table("pnt_stor"                                                       )
				.where("where hq_id           = :hq_id                                 ")  /*  매장ID  */
				.where("and   stor_id         = :stor_id                               ")  /*  매장ID  */
			    //
				.unique("hq_id"               , row.fixParameter("hq_id"               ))
				.unique("stor_id"             , row.fixParameter("stor_id"             ))
			    //
				.update("ctrl_id"             , row.getParameter("ctrl_id"             ))  /*  관제ID  */
				.update("stor_grp"            , row.getParameter("stor_grp"            ))  /*  매장그룹  */
				.update("stor_nm"             , row.getParameter("stor_nm"             ))  /*  매장명  */
				.update("stor_gb"             , row.getParameter("stor_gb"             ))  /*  매장구분  */
				.update("rnd_gb"              , row.getParameter("rnd_gb"              ))  /*  반올림구분  */
				.update("stor_sts"            , row.getParameter("stor_sts"            ))  /*  매장상태  */
				.update("stor_st_tm"          , row.getParameter("stor_st_tm"          ))  /*  매장시작시간  */
				.update("stor_end_tm"         , row.getParameter("stor_end_tm"         ))  /*  매장종료시간  */
				.update("stor_st_tm_sat"      , row.getParameter("stor_st_tm_sat"      ))  /*  매장시작시간토요일  */
				.update("stor_end_tm_sat"     , row.getParameter("stor_end_tm_sat"     ))  /*  매장종료시간토요일  */
				.update("stor_st_tm_sun"      , row.getParameter("stor_st_tm_sun"      ))  /*  매장시작시간일요일  */
				.update("stor_end_tm_sun"     , row.getParameter("stor_end_tm_sun"     ))  /*  매장종료시간일요일  */
				.update("biz_gb"              , row.getParameter("biz_gb"              ))  /*  사업구분  */
				.update("biz_no"              , row.getParameter("biz_no"              ))  /*  사업번호  */
				.update("biz_nm"              , row.getParameter("biz_nm"              ))  /*  사업명  */
				.update("biz_type"            , row.getParameter("biz_type"            ))  /*  업태  */
				.update("biz_kind"            , row.getParameter("biz_kind"            ))  /*  업종  */
				.update("biz_owner"           , row.getParameter("biz_owner"           ))  /*  사업장 대표자  */
				.update("biz_email"           , row.getParameter("biz_email"           ))  /*  사업이메일  */
				.update("biz_tel_no"          , row.getParameter("biz_tel_no"          ))  /*  사업전화번호  */
				.update("biz_hp_no"           , row.getParameter("biz_hp_no"           ))  /*  사업휴대폰  */
				.update("biz_fax_no"          , row.getParameter("biz_fax_no"          ))  /*  사업팩스번호  */
				.update("biz_zip_cd"          , row.getParameter("biz_zip_cd"          ))  /*  사업장우편번호  */
				.update("biz_addr_1"          , row.getParameter("biz_addr_1"          ))  /*  사업주소1  */
				.update("biz_addr_2"          , row.getParameter("biz_addr_2"          ))  /*  사업주소2  */
				.update("biz_state"           , row.getParameter("biz_state"           ))  /*  사업주소_시도  */
				.update("biz_city"            , row.getParameter("biz_city"            ))  /*  사업주소_군구  */
				.update("biz_dong"            , row.getParameter("biz_dong"            ))  /*  사업주소_읍면동  */
				.update("zip_cd"              , row.getParameter("zip_cd"              ))  /*  우편번호  */
				.update("state"               , row.getParameter("state"               ))  /*  주소_시도  */
				.update("city"                , row.getParameter("city"                ))  /*  주소_군구  */
				.update("dong"                , row.getParameter("dong"                ))  /*  주소_읍면동  */
				.update("addr_1"              , row.getParameter("addr_1"              ))  /*  주소1  */
				.update("addr_2"              , row.getParameter("addr_2"              ))  /*  주소2  */
				.update("map_img"             , row.getParameter("map_img"             ))  /*  지도이미지  */
				.update("map_url"             , row.getParameter("map_url"             ))  /*  지도URL  */
				.update("map_vw"              , row.getParameter("map_vw"              ))  /*  지도뷰  */
				.update("map_zone"            , row.getParameter("map_zone"            ))  /*  지도구역  */
				.update("map_area"            , row.getParameter("map_area"            ))  /*  지도면적  */
				.update("bnkbk_id"            , row.getParameter("bnkbk_id"            ))  /*  계좌ID  */
				.update("pnt_type"            , row.getParameter("pnt_type"            ))  /*  포인트타입  */
				.update("pnt_rt"              , row.getParameter("pnt_rt"              ))  /*  포인트율  */
				.update("min_use_pnt"         , row.getParameter("min_use_pnt"         ))  /*  최소사용포인트  */
				.update("cash_pnt_rt"         , row.getParameter("cash_pnt_rt"         ))  /*  현금포인트율  */
				.update("card_pnt_rt"         , row.getParameter("card_pnt_rt"         ))  /*  카드포인트율  */
				.update("stamp_url"           , row.getParameter("stamp_url"           ))  /*  인감URL  */
				.update("bizarea_pht"         , row.getParameter("bizarea_pht"         ))  /*  사업장사진  */
				.update("mst_img"             , row.getParameter("mst_img"             ))  /*  대표이미지  */
				.update("user_memo"            , row.getParameter("user_memo"            ))  /*  사용자메모  */
				.update("sys_memo"            , row.getParameter("sys_memo"            ))  /*  시스템메모  */
				.update("prnt_id"             , row.getParameter("prnt_id"             ))  /*  상위 ID  */
				.update("row_lvl"             , row.getParameter("row_lvl"             ))  /*  ROW레벨  */
				.update("row_ord"             , row.getParameter("row_ord"             ))  /*  ROW순서  */
				.update("row_sts"             , row.getParameter("row_sts"             ))  /*  ROW상태  */
				.update("row_clos"            , row.getParameter("row_clos"            ))  /*  마감여부  */
	        	.update("find_name"      	      , row.getParamText("stor_id"       	   ).trim()
					                          + row.getParamText("stor_nm"             ).trim()
					                          + row.getParamText("biz_owner"           ).trim() )
				.update("upt_usr_nm"          , row.getParameter("upt_usr_nm"          ))  /*  수정사용자명  */
				.update("upt_ip"              , row.getParameter("upt_ip"              ))  /*  수정IP  */
				.update("upt_dttm"            , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				.update("upt_id"              , row.getParameter("upt_id"              ))  /*  수정ID  */
				.update("upt_ui"              , row.getParameter("upt_ui"              ))  /*  수정UI  */
				.insert("crt_usr_nm"          , row.getParameter("crt_usr_nm"          ))  /*  생성사용자명  */
				.insert("crt_ip"              , row.getParameter("crt_ip"              ))  /*  생성IP  */
				.insert("crt_dttm"            , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
				.insert("crt_id"              , row.getParameter("crt_id"              ))  /*  생성ID  */
				.insert("crt_ui"              , row.getParameter("crt_ui"              ))  /*  생성UI  */
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	/**
	 * 직인이미지 ftp에 업로드된 파일명을 저장
	 * @param arg
	 * @param storeId
	 * @param stampFileName
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setStampImage(HttpRequestArgument arg, String storeId, String stampFileName) throws Exception {
//		DataMessage data = arg.newStorage("POS");
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
    	data.param
	        .table("pnt_stor")
	        .where("where stor_id  = :stor_id  " )
	        //
	        .unique("stor_id"          , storeId)
	        .update("stamp_url"         , stampFileName)
	        .action = Action.update ;
    	;data.attach();
		data.execute();
		return null ;
	}



	public SqlResultMap setUploadStamp(HttpRequestArgument arg, UploadItem image) throws Exception {
		SqlResultMap map = new SqlResultMap();
		CommonsMultipartFile imageFile = image.getFiles()[0]; // 이미지 파일을 가져온다.
		//  이미지 파일 사이즈 체크
		if (imageFile.getSize()/1024/1024 > 0) {
			throw new ServiceException("1M 이하 파일만 사용 가능 합니다.");
		}

        // 자바 썸네일 라이브러리 (https://code.google.com/p/thumbnailator/)
        // sky.net.framework.xpress 프레임웍의 pom.xml에 dependency 추가
        // 썸테일 step1-1. ByteArrayInputStream에 썸네일 data를 생성
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Thumbnails.of(imageFile.getInputStream()).size(200, 200).toOutputStream(baos);
        ByteArrayInputStream thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());



		HostProperty host = property.getProperty( arg.fixParamText("img_ddns") ); // 업로드 서버 정보 가져오기
		String directory = host.getHostPath() + "/stamp/"; // 업로드 경로를 지정한다.
		// 파일이름은 upload된 파일이름과는 상관없이 강제적으로 stor_id로 지정하지만, 확장자는 유지 하도록 한다.
		String imageName = arg.fixParamText("stor_id") + imageFile.getFileItem().getName().substring(imageFile.getFileItem().getName().lastIndexOf("."));

		String imageHttp = "http://" + arg.fixParamText("img_http") + "/stamp/" +  imageName ;

		// ftp 생성
		FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue(host.getProvider()));
		// ftp 접속
		if (ftp.connect(host)) {

			try{
				// 업로드
				//ftp.upload(directory, imageName, imageFile);

				// 썸네일 step2. ftp 업로드
				logger.debug("directory =="+ directory );
				logger.debug("imageName =="+ imageName );
//				logger.debug("thumnailInputStream =="+ thumnailInputStream );
				ftp.upload(directory, imageName, thumnailInputStream);

		   		SqlResultRow row = new SqlResultRow();
		   		row.setParameter("url"    , imageHttp);
		   		map.add(row);

		   	} catch(Exception ex) {
				throw ex;
			} finally {
				ftp.disconnect(); // 마지막에 꼭 커넥션을 종료해 준다.
			}
		}


		// 업로드후 업로드된 파일 정보를 DB에 저장한다.
//		DataMessage data = arg.newStorage("POS");
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

    	data.param
		    .table("stor")
		    .where("where stor_id  = :stor_id  ")
		        //
		    .unique("stor_id"          , arg.fixParamText("stor_id"))
		    .update("stamp_url"         , imageHttp )
		 ;
    	data.attach(Action.update).execute();


		return map;
	}


	public SqlResultMap  delUploadStamp(HttpRequestArgument arg) throws Exception {
//		DataMessage data = arg.newStorage("POS");
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
			.table("stor")
			.where("where stor_id  = :stor_id  " )
			//
			.unique("stor_id"          , arg.fixParamText("stor_id") )
			.update("stamp_url"         , "" )
		;data.attach(Action.update).execute();
		return null ;
	}




	/**
	 * 사업장 이미지 업로드
	 * @param argument HttpRequestArgument
	 * @param uploadItem UploadItem
	 */
	public void setUploadImage(HttpRequestArgument arg, UploadItem image) throws Exception {

		String[] FileName = new String[3];


		for(int i=0; i < 3; i++) {
			FileName[i] = "";
		}

		// 업로드 서버 정보 가져오기
		HostProperty host = property.getProperty( arg.fixParamText("img_ddns") );


	    int imageCount = image.getFiles().length;

	    //System.out.println( imageCount );
		for(int i=0; i < imageCount; i++) {

			//System.out.println( i );
			//System.out.println( image.getFiles()[i] );
			// 이미지 파일을 가져온다.
			CommonsMultipartFile imageFile = image.getFiles()[i];
			//System.out.println(imageFile.getSize());
			if(imageFile.getSize() == 0 ) {
				continue;
			}


			// 업로드 경로를 지정한다.
			String directory = host.getHostPath() + "/stor/";

			// 파일이름은 upload된 파일이름과는 상관없이 강제적으로 stor_id로 지정하지만, 확장자는 유지 하도록 한다.
			//String imageName = arg.fixParamText("item_idcd")+ imageFile.getFileItem().getName().substring(imageFile.getFileItem().getName().lastIndexOf("."));
			String imageName = arg.fixParamText("stor_id") +  "_" + (i+1)  +imageFile.getFileItem().getName().substring(imageFile.getFileItem().getName().lastIndexOf("."));

			FileName[i] =  "http://file.sky.com/" + directory +  imageName ;


			// ftp 생성
			FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue(host.getProvider()));
			// ftp 접속
			if (ftp.connect(host)) {
				try{
					// 업로드
					ftp.upload(directory, imageName, imageFile);

				} catch(Exception ex) {
					throw ex;
				} finally {
					ftp.disconnect(); // 마지막에 꼭 커넥션을 종료해 준다.
				}
			}

		}

		// 업로드후 업로드된 파일 정보를 DB에 저장한다. (Oracle)
//		DataMessage data = arg.newStorage("POS");
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
	        .table("pnt_stor")
	        .where("where stor_id  = :stor_id  " )
	        //
	        .unique("stor_id"          , arg.fixParamText("stor_id") )
	        .update("bizarea_pht"      , FileName[0] )
//	        .update("rougn_map"         , FileName[1] )

			;data.attach(Action.update).execute();


		// 업로드후 업로드된 파일 정보를 DB에 저장한다.  (MySQL)
		data = arg.newStorage("WEB");
		data.param
	        .table("pnt_stor")
	        .where("where stor_id  = :stor_id  " )
	        //
	        .unique("stor_id"          , arg.fixParamText("stor_id") )
	        .update("photo_url"         , FileName[0] )
//	        .update("rougn_map"         , FileName[1] )

			;data.attach(Action.update).execute();
	     //     System.out.println(ftpFile);



	}

}
