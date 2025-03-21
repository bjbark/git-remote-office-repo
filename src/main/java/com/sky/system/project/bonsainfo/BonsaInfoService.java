package com.sky.system.project.bonsainfo;

import java.awt.Image;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.connection.HostProperty;
import net.sky.core.connection.ftp.FTPConnector;
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;

import javax.imageio.ImageIO;

@Service
public class BonsaInfoService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

//	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		String value = arg.getParamText("find_nm").trim();

		String[] hq_sts = arg.getParamCast("hq_sts", String[].class);

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);


		data.param // 집계문 입력
			.total(" select  count(1) as maxsize  ")
			.total("      ,  sum( b.contr_cnts ) as contr_cnts , sum( b.contr_etcs ) as contr_etcs ")
			.total("      ,  sum( b.contr_1000 ) as contr_1000 , sum( b.contr_2000 ) as contr_2000 ")
			.total("      ,  sum( b.contr_2500 ) as contr_2500 , sum( b.contr_3000 ) as contr_3000 ")
		;
		data.param // 쿼리문 입력
			.query(" select a.pjt_id     , a.pos_ddns     , a.web_ddns   , a.img_ddns  , a.logo_url  , h.host_cd  as pos_hostanem   ")
			.query("     ,  a.hq_grp     , a.hq_id        , a.hq_gb      , a.hq_nm      , a.stor_id  , a.hq_reg_dt  ")
			.query("     ,  a.corp_id    , null as corp_nm 									")
			.query("     ,  a.hq_sts     , a.hq_ver       , a.del_yn   						")
			.query("     ,  a.sms_cmpn_id, a.hq_sms_cd  									")
			.query("     ,  a.hq_fax_id  , a.hq_fax_cd  									")
			.query("     ,  a.epo_db_id  , a.hq_nts_id    , a.hq_pos_id  , a.hq_sms_id 		")
			.query("     ,  a.old_inf_yn , a.erp_inf_yn   , a.web_inf_yn , a.itm_rcpt_yn    ")
			.query("     ,  a.own_stor_id, a.row_lvl      , a.usr_memo   , a.row_sts   		")
			.query("     ,  a.last_read_dt , b.last_sale_dt  								")
			.query("     ,  b.contr_cnts  , b.contr_1000  , b.contr_2000  , b.contr_2500  ,  b.contr_3000,  b.contr_etcs ")
		;
		data.param // 조건문 입력
			.where("from   head_office a  													")
			.where("       left outer join ( select x.hq_id  								")
    		.where("                    , count(*) as contr_cnts , max(x.last_sale_dt) as last_sale_dt 			")
    		.where("                    , sum( case when y.ctrl_sts = '1000' then 1 else 0 end ) as contr_1000  ")
    		.where("                    , sum( case when y.ctrl_sts = '2000' then 1 else 0 end ) as contr_2000  ")
    		.where("                    , sum( case when y.ctrl_sts = '2500' then 1 else 0 end ) as contr_2500  ")
   			.where("                    , sum( case when y.ctrl_sts in ('3000' ,'4000' ) then 1 else 0 end ) as contr_3000  ")
    		.where("                    , sum( case when y.ctrl_sts not in ('1000','2000','2500','3000','4000' ) then 1 else 0 end ) as contr_etcs  ")
    		.where("              from   stor x                                  		")
    		.where("                     join control_mst y on y.ctrl_id = x.ctrl_id  	")
    		.where("              group by x.hq_id        								")
   			.where("       )  b on b.hq_id = a.hq_id   									")
   			.where("       left outer join host_mst h on h.host_id = a.pos_host  		")
			.where("where  a.row_sts < 2												")
		    .where("and    a.hq_sts in (:hq_sts )    " , hq_sts ,( hq_sts.length > 0) )
			.where("and    a.hq_grp     =  :hq_grp     " , arg.getParameter("hq_grp"  ))
			.where("and    a.find_nm like  %:find_nm%    " , value )
		;

		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1) , sort );

	}

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);

		String[] hq_sts = arg.getParamCast("hq_sts", String[].class);

		data.param // 집계문 입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문 입력
			.query("select a.pjt_id   , a.pjt_nm  ,  a.pos_ddns   , a.web_ddns			")
			.query("     , a.hq_id    , a.hq_nm   ,  a.hq_gb							")
			.query("     , a.hq_sts   , a.hq_ver										")
		;
		data.param // 조건문 입력
			.where("from (																")
			.where("    select a.pjt_id   , b.pjt_nm  ,  a.pos_ddns   , a.web_ddns		")
			.where("         , a.hq_id    , a.hq_nm   ,  a.hq_gb						")
			.where("         , a.hq_sts   , a.hq_ver									")
			.where("    from   head_office a											")
			.where("    left outer join pjt_mst b on b.pjt_id = a.pjt_id				")
		    .where("    where  1=1														")
		    .where("    and    a.hq_sts in  (:hq_sts )		" , hq_sts ,( hq_sts.length > 0) ) /* 주문 위치 */
			.where("    and    a.hq_ver      = :hq_ver		" , arg.getParameter("hq_ver" ))
			.where("    and    a.hq_id       =  hq_grp		" , "1".equals(arg.getParameter("group_yn"  )))
			.where("    and    a.find_nm like %:find_nm%	" , arg.getParameter("find_nm" ))
			.where("    and    a.pjt_id      = :pjt_id		" , arg.getParameter("pjt_id"   ))
			.where("    and    a.row_sts     = :row_sts		" , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우
			.where("    and    a.row_sts    <= :row_sts		" , "1"  ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우
			.where("    union all														")
			.where("    select 'common' as pjt_id , '공통 환경' as pjt_nm					")
			.where("         , null as pos_ddns   , null      as web_ddns				")
			.where("         , 'common' as hq_id  , '공통 환경' as hq_nm  ,  null as hq_gb	")
			.where("         , '0' as hq_sts      , '14821'   as hq_ver					")
			.where("    from   dual														")
		    .where("    where  1= 1														")
			.where(") a																	")
		;

		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1) , sort );

	}

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

			} else {
				data.param
					.table("head_office")
					.where("where hq_id  = :hq_id  " )
					//
					.unique("own_stor_id"		, row.getParameter("own_stor_id"    ))
					.update("hq_grp"			, row.getParameter("hq_grp"         ))
					.unique("hq_id"				, row.fixParameter("hq_id"          ))
					.update("hq_nm"				, row.getParameter("hq_nm"          ))
					.update("hq_gb"				, row.fixParameter("hq_gb"          ))
					.update("stor_id"           , row.getParameter("stor_id"        ))
					.update("epo_db_id"			, row.getParameter("epo_db_id"    ))
					.update("hq_nts_id"			, row.getParameter("hq_nts_id"   ))
					.update("hq_sms_id"			, row.getParameter("hq_sms_id"    ))
					.update("hq_pos_id"			, row.getParameter("hq_pos_id"    ))
					.update("sms_cmpn_id"       , row.getParameter("sms_cmpn_id"    ))
					.update("hq_sms_cd"       	, row.getParameter("hq_sms_cd"    ))
					.update("hq_fax_id"			, row.getParameter("hq_fax_id"      ))
					.update("hq_fax_cd"			, row.getParameter("hq_fax_cd"      ))

					.update("old_inf_yn"        , row.getParameter("old_inf_yn"     ))
					.update("erp_inf_yn"        , row.getParameter("erp_inf_yn"     ))
					.update("web_inf_yn"        , row.getParameter("web_inf_yn"     ))
					.update("itm_rcpt_yn"       , row.getParameter("itm_rcpt_yn"    ))

					.update("row_lvl"           , row.getParameter("row_lvl"        ))
					.update("usr_memo"          , row.getParameter("usr_memo"       ))
					.update("row_sts"           , row.getParameter("row_sts"        ))
					.update("srvr_inization_yn" , "0" , "1".equals(row.fixParamText("reinitial" )))

					.update("upt_ui" 	 	 	, row.getParameter("upt_ui"		    ))
					.insert("crt_ui" 	 	 	, row.getParameter("crt_ui"	   	    ))
					.update("upt_id" 	 	 	, row.getParameter("upt_id"		    ))
					.insert("crt_id" 	 	 	, row.getParameter("crt_id"		    ))
			        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )


				;data.attach(rowaction);

				if (!"0".equals(row.fixParamText("pjt_id" )) && "0".equals(row.fixParamText("del_yn" )) ){
				} else {
						/* 시스템을 재 초기화 하는 경우 */
						if ("1".equals(row.fixParamText("reinitial" )) || !row.fixParamText("hq_sts").equals(row.fixParamText("_hq_sts")) )  {
					}

				}
			}
		}
		data.execute();
		return null ;
	}


	public SqlResultMap  setUpload(HttpRequestArgument arg, UploadItem image) throws Exception {

		SqlResultMap map = new SqlResultMap();
		CommonsMultipartFile imageFile = image.getFiles()[0];
		//  이미지 파일 사이즈 체크
		if (imageFile.getSize()/1024/1024 > 0) {
			throw new ServiceException("1M 이하 파일만 사용 가능 합니다.");
		}

//        if (width > 200 || height > 200 ) {
//        	throw new ServiceException("직인은 200*200 이하 사이즈만 사용 가능 합니다.");
//        }

		// 이미지 표시 사이즈 체크
		Image imageIo = ImageIO.read(imageFile.getInputStream());
        int width  = imageIo.getWidth(null);
        int height = imageIo.getHeight(null);
        if (width != 190 || height != 45) { // 실제 190*45
        	throw new ServiceException("로고는 190*45 이미지만 사용 가능 합니다.");
        }
		HostProperty host = property.getProperty( arg.fixParamText("img_ddns") );
		// 이미지 경로
		String directory = host.getHostPath() + "/logo/" ;
		// 파일이름은 upload된 파일이름과는 상관없이 강제적으로 stor_id로 지정하지만, 확장자는 유지 하도록 한다.
		String imageName = arg.fixParamText("hq_id") + imageFile.getFileItem().getName().substring(imageFile.getFileItem().getName().lastIndexOf("."));
		String imageUrl  = "http://file.sky.com/" + directory +  imageName ;
		// ftp 생성
		FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue(host.getProvider()));
		// ftp 접속
		if (ftp.connect(host)) {
			try{
				// 업로드
				ftp.upload(directory, imageName, imageFile);
				// 업로드후 업로드된 파일 정보를 DB에 저장한다.
				DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		   		if (!"".equals(arg.getParamText("pos_ddns"))) {
			    	data.param
				        .table("head_office")
				        .where("where hq_id  = :hq_id  " )
				        //
				        .unique("hq_id"          , arg.fixParamText("hq_id") )
				        .update("logo_url"          , imageUrl )
			        ;data.attach(Action.update, arg.fixParamText("pos_ddns"));
		   		}

		    	data.param
			        .table("head_office")
			        .where("where hq_id  = :hq_id  " )
			        //
			        .unique("hq_id"          , arg.fixParamText("hq_id") )
			        .update("logo_url"          , imageUrl )
		   		;data.attach(Action.update).execute();

		   		// 저장 완료후 로컬에 업로드 데이터를
		   		SqlResultRow row = new SqlResultRow();
		   		row.setParameter("url"    , imageUrl);
		   		map.add(row);
			} catch(Exception ex) {
				throw ex;
			} finally {
				ftp.disconnect(); // 마지막에 꼭 커넥션을 종료해 준다.
			}
		}
		return map ;
	}

	public SqlResultMap  delUpload(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
   		if (!"".equals(arg.getParamText("pos_ddns"))) {
	    	data.param
		        .table("head_office")
		        .where("where hq_id  = :hq_id  " )
		        //
		        .unique("hq_id"          , arg.fixParamText("hq_id") )
		        .update("logo_url"          , "" )
	        ;data.attach(Action.update, arg.fixParamText("pos_ddns"));
   		}

    	data.param
	        .table("head_office")
	        .where("where hq_id  = :hq_id  " )
	        //
	        .unique("hq_id"          , arg.fixParamText("hq_id") )
	        .update("logo_url"          , "" )
   		;data.attach(Action.update).execute();
		return null ;
	}


	public SqlResultRow getLastSales(HttpRequestArgument arg ) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);

		DataMessage read = new DataMessage(arg.fixParamText("pos_ddns"));

		if ("A".equals( arg.getParamCopy("pos_ddns" , 1, 1)) || "B".equals( arg.getParamCopy("pos_ddns" , 1, 1)) || "K".equals( arg.getParamCopy("pos_ddns" , 1, 1)) ) {
			read.param // 쿼리문 입력
				.query("select pk_code as stor_id , replace( max( inv_date ) ,'-', '' ) as sales_dt  ")
				.query("from   sale_mst ")
//				.query("where  inv_date <= to_char( sysdate , 'YYYY-MM-DD' ) " )   /* 오라클  */
				.query("where  inv_date <= dbo.to_char( getdate() , 'YYYYMMDD' ) " )   /* MS SQL */
				.query("group by pk_code  " )

			;
		} else
		if ("E".equals( arg.getParamCopy("pos_ddns" , 1, 1))) {
			read.param // 쿼리문 입력
				.query("select stor_id as stor_id ,replace( max( invoice_date ) ,'-', '' ) as sales_dt  ")
				.query("from   sale_slip ")
//				.query("where  invoice_date <= to_char( sysdate , 'YYYY-MM-DD' ) " )  /* 오라클  */
				.query("where  invoice_date <= dbo.to_char( sysdate , 'YYYYMMDD' ) " ) /* MS SQL  */
				.query("group by stor_id  " )
			;
		} else
		if ("N".equals( arg.getParamCopy("pos_ddns" , 1, 1))) {
			read.param // 쿼리문 입력
				.query("select stor_id as stor_id , max( inv_dt ) as sales_dt  ")
				.query("from   sale_mst ")
//				.query("where  inv_dt <= to_char( sysdate , 'YYYYMMDD' ) " )   /* 오라클  */
				.query("where  inv_dt <= dbo.to_char( sysdate , 'YYYYMMDD' ) " )  /* MS SQL  */
				.query("group by stor_id  " )
			;
		}
		for(SqlResultRow row:read.selectForMap()){
			data.param
				.table("stor")
				.where("where stor_id  = :stor_id  " )
				//
				.unique("stor_id"          , row.fixParamText("stor_id") )
				.update("last_sale_dt"      , row.getParamText("sales_dt").replaceAll("-", "" ) )
			;data.attach(Action.update);
		}
		data.param
			.table("head_office")
			.where("where hq_id  = :hq_id  " )
			//
			.unique("hq_id"         , arg.fixParamText("hq_id") )
	        .update("last_read_dt"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);

		data.execute();
		return null;
	}
}
