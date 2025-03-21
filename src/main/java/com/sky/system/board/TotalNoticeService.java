package com.sky.system.board;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.core.common.configuration.Configure;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.utils.file.UploadItem;

//import net.sky.utils.ftp.FTPUtil;


@Service
public class TotalNoticeService extends DefaultServiceHandler{

	Logger logger = org.apache.log4j.Logger.getLogger(this.getClass());

	/**
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

//		DataMessage data = arg.newStorage("POS");
		DataMessage data = new DataMessage(arg.fixParamText("hq_id") + ".POS");

		data.param // 집계문
		    .total("select count(1) as maxsize  " )
		;

		data.param
			.query("select a.board_id, a.board_no, a.board_seq, a.board_dt, a.subject, a.content            ")
			.query("     , a.dept_id , (select dept_nm from dept_info where dept_id = a.dept_id) as dept_nm ")
			.query("     , a.user_id , (select user_nm from user_info where user_id = a.user_id) as user_nm ")
			.query("     , a.file_nm1, a.file_url1 , a.file_nm2, a.file_url2 , a.file_nm3, a.file_url3 , a.row_state  ")
            .query("     , a.update_nm , a.create_nm                                               ")
		;

		data.param
			.where("  from board_info a                                                 ")
			.where(" where a.bonsa_id = :coltd_id   "  , arg.fixParameter("coltd_id"  ))
			.where("   and a.board_gb = '0'                                             ")
			.where("   and a.board_type = '0100'                                        ")
			.where("   and a.row_state = 0                                              ")
			.where(" order by a.board_no desc                                           ")
		;

		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	public SqlResultMap getBoardNo(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param  /* board_id 체계,  본사코드(4자리) + board_gb (1자리) + board_type (2자리) + 일련번호 (6자리)  */
//			.query("select (max(a.board_id)+1) as board_id, ( max(a.board_no)+1) as board_no ")
			.query("select nvl((max(board_id)+1), '2310001000001') as board_id, nvl(( max(board_no)+1), '1') as board_no ")
			.query("  from board_info a                                                 ")
			.query(" where a.bonsa_id   = :bonsa_id     "  , arg.fixParameter("bonsa_id"  ))
			.query("   and a.board_gb   = :board_gb     "  , arg.fixParameter("board_gb"  ))
			.query("   and a.board_type = :board_type   "  , arg.fixParameter("board_type"  ))
			.query("   and a.row_state = 0                                              ")
		;

		return data.selectForMap();
	}


	/**
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("board_info")
					.where("where board_id  = :board_id  " )
					//
					.unique("board_id"           , row.fixParameter("board_id"         ))
					.update("row_state"          , 2  )
					.update("update_dt"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
					.update("update_nm"          , row.fixParameter("update_nm"         ))
				;data.attach(Action.update);
			} else {
				data.param
					.table("board_info")
					.where("where board_id  = :board_id  " )
					//
		            .unique("bonsa_id"           , row.fixParameter("bonsa_id"        ))
		            .unique("store_gp"           , row.fixParameter("store_gp"        ))
		            .unique("store_id"           , row.fixParameter("store_id"        ))
					.unique("board_id"           , row.fixParameter("board_id"        ))
					.unique("board_no"           , row.fixParameter("board_no"        ))
					.unique("board_seq"          , row.fixParameter("board_seq"        ))
					.unique("board_dt"           , row.fixParameter("board_dt"        ))

					.insert("board_gb"           , row.fixParameter("board_gb"        ))
					.insert("board_type"         , row.fixParameter("board_type"        ))
					.update("subject"            , row.fixParameter("subject"        ))
					.update("content"            , row.getParameter("content"        ))

					.insert("dept_id"            , row.getParameter("dept_id"        ))
					.insert("user_id"            , row.getParameter("user_id"        ))

					.update("file_nm1"           , row.getParameter("file_nm1"        ))
					.update("file_url1"          , row.getParameter("file_url1"        ))
					.update("file_nm2"           , row.getParameter("file_nm2"        ))
					.update("file_url2"          , row.getParameter("file_url2"        ))
					.update("file_nm3"           , row.getParameter("file_nm3"        ))
					.update("file_url3"          , row.getParameter("file_url3"        ))

					.insert("parent_id"          , row.getParameter("parent_id"       ))
					.insert("row_level"          , row.getParameter("row_level"       ))
					.update("row_state"          , row.getParameter("row_state"       ))
					.update("user_memo"          , row.getParameter("user_memo"       ))

					.update("update_ip"  		 , arg.remoteAddress )
					.update("update_dt"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
					.update("update_nm"          , row.fixParameter("update_nm"         ))
					.insert("create_ip"   		 , arg.remoteAddress )
					.insert("create_dt"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") )
					.insert("create_nm"          , row.fixParameter("update_nm"         ))
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

//
//
//	/**
//	 * 상품기초정보 조회
//	 * @param arg
//	 * @param page
//	 * @param rows
//	 * @return
//	 * @throws Exception
//	 */
//	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
//
//		DataMessage data = arg.newStorage("POS");
//
//		data.param //집계문 입력
//			.total("select count(1) as maxsize  " )
//			;
//
//		data.param // 쿼리문  입력
//			.query("select a.bonsa_id     , a.store_gp                                   ")
//			.query("     , a.base_id      , a.base_cd     , a.base_nm ,a.base_en         ")
//			.query("     , a.parent_id    , a.row_level   , a.row_state  , a.user_memo   ")
//			.query("     , a.prdt_key     , a.code_len							         ")
//		;
//
//		data.param
//			.where("from   base_info a                                                   ")
//			.where("where  a.parent_id   = :parent_id  "  , arg.fixParameter("parent_id" ))
//			.where("and    a.store_gp    = :store_gp   "  , arg.getParameter("store_gp"  ))
//			.where("and    a.base_nm  like %:base_nm%  "  , arg.getParameter("base_nm"   ))
//			.where("and    a.row_state  = :row_state " , "0"  ,( "0".equals(arg.getParamText("row_state")) )) // 정상 거래처만 조회 요청한 경우
//			.where("and    a.row_state <= :row_state " , "1"  ,(!"0".equals(arg.getParamText("row_state")) )) // 정상 거래처가 없거나.. 다른 값인 경우
//			.where("order by a.base_cd                                                   ")
//		;
//	    return data.selectForMap(page, rows, (page == 1)); //
//	}

	@Autowired
	Configure configure ;
	/**
	 * 첨부파일 업로드
	 * @param argument HttpRequestArgument
	 * @param uploadItem UploadItem
	 */
	public void uploadBoard(HttpRequestArgument arg, UploadItem image) throws Exception {

		logger.debug("================= 업로드 시작 ======================");
		String storeId = arg.getParamText("store_id");
		String boardId = arg.getParamText("board_id");

		String ftpUploadDir = configure.FTP_IMAGE_ROOTDIR + "/" + storeId.substring(0, 10) + "/notice/";

		// 파일 확장자만 가져오기 (.jpg, .png)
		String fileExtension = image.getFiles()[0].getFileItem().getName().substring(image.getFiles()[0].getFileItem().getName().lastIndexOf("."));

		String file = image.getFiles()[0].getFileItem().getName().substring(0, image.getFiles()[0].getFileItem().getName().indexOf(".")) ;

//		DataMessage data = arg.newStorage("POS");
//
//		data.param // 쿼리문  입력
//		.query(" select to_char(sysdate, 'yyyymmddhh24miss') as file_dt from dual ") /* 시스템시간 YYYYMMDDHHMMSS */
//		;
//		SqlResultRow row1 = data.selectForRow();
//		logger.debug("row1:"  + row1);
//		String date = row1.getParameter("file_dt").toString();
//
//		logger.debug(" date ==="  + date );

		// 파일이름은 upload된 파일이름과는 상관없이 강제적으로 store_id로 지정
		// 파일이름은 store_id로 하지만 확장자는 upload된 실제파일의 확장자여야 한다.
//		String fileFull = file + '_' + date + fileExtension ;
		String fileName = file + fileExtension;
//		String fileName = arg.getParamText("store_id") + fileExtension;


		logger.debug(" file name ==="  + fileName );

		// 서버로부터 전달된 file객체
		// file을 was에 임시 저장하지 않고 inputStream을 얻어내서 바로 전송
//		CommonsMultipartFile multipartFile = image.getFiles()[0];

    	ftpUploadDir = ftpUploadDir + boardId ;
/*
		// ftp 생성
		FTPConnector ftpConnector = FTPUtil.getInstance(configure.FTP_IMAGE_SERVER_TYPE); //FTPConnector.getInstance(FTPConnector.Provider.getValue(host.getProvider()));
		// ftp 접속
		if (ftpConnector.connect(configure.FTP_IMAGE_HOST, configure.FTP_IMAGE_PORT, configure.FTP_IMAGE_USER, configure.FTP_IMAGE_PASSWORD)) {
			try{
				// 업로드
				ftpConnector.upload(ftpUploadDir, fileName, multipartFile);

			} catch(Exception ex) {
				throw ex;
			} finally {
				ftpConnector.disconnect(); // 마지막에 꼭 커넥션을 종료해 준다.
			}
		}
*/
//		ftpConnector.disconnect();

		// ftp에 업로드된 파일이름을 db에 저장
		String fileUrl = configure.FTP_IMAGE_URL + "/" + ftpUploadDir + "/" + fileName;
		this.setBoardFile(arg,  fileName, fileUrl);

		logger.debug("upload된 파일을 읽을 url => " + fileUrl);
		logger.debug("================= 업로드 종료 ======================");
	}


	/**
	 * 첨부파일 ftp에 업로드된 파일명을 저장
	 * @param arg
	 * @param storeId
	 * @param FileName
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setBoardFile(HttpRequestArgument arg, String FileName, String FileUrl ) throws Exception {
		DataMessage data = arg.newStorage("POS");
        	data.param
		        .table("board_info")
		        .where("where board_id  = :board_id  " )
		        //
  		        .unique("board_id"          , arg.fixParamText("board_id"))
  		        ;
        	if ( "1".equals(arg.getParamText("file_gb")) ){
            	data.param
  		        .update("file_nm1"         , FileName)
  		        .update("file_url1"         , FileUrl)
		        .action = Action.update ;
        	;data.attach();
        	} else
        	if ( "2".equals(arg.getParamText("file_gb")) ){
            	data.param
  		        .update("file_nm2"         , FileName)
  		        .update("file_url2"         , FileUrl)
		        .action = Action.update ;
        	;data.attach();

        	} else
        	if ( "3".equals(arg.getParamText("file_gb")) ){
            	data.param
  		        .update("file_nm3"         , FileName)
  		        .update("file_url3"         , FileUrl)
		        .action = Action.update ;
        	;data.attach();

        	}

		data.execute();
		return null ;
	}

}



