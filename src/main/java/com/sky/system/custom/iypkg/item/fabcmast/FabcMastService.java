package com.sky.system.custom.iypkg.item.fabcmast;

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
public class FabcMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("select    a.fabc_idcd       , a.fabc_code       , a.fabc_name       , a.ppln_dvcd						")
			.where("		, a.ppkd_dvcd       , a.ppsg_dvcd       , a.mixx_name       , a.imge_1fst						")
			.where("		, a.imge_2snd       , a.imge_3trd       , a.uper_seqn       , a.disp_seqn						")
			.where("		, a.user_memo       , a.sysm_memo       , a.stnd_pric											")
			.where("		, a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name						")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd						")
			.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm						")
			.where("from   fabc_mast a																						")
			.where("where  1=1																								")
			.where("and    a.find_name   like %:find_name%			" , arg.getParamText("find_name"))
			.where("and    a.ppln_dvcd   = :ppln_dvcd				" , arg.getParamText("ppln_dvcd"))
			.where("and    a.ppkd_dvcd   = :ppkd_dvcd				" , arg.getParamText("ppkd_dvcd"))
			.where("and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos"))
			.where("and    a.line_stat   = :line_stat1				" , arg.getParamText("line_stat"))
			.where("and    a.line_stat   < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat")))
			.where(") a																										")
			.where("order by a.fabc_code asc																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//룩업
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																			")
		;
		data.param
			.where("from (																									")
			.where("select    a.fabc_idcd       , a.fabc_code       , a.fabc_name       , a.ppln_dvcd						")
			.where("		, a.ppkd_dvcd       , a.ppsg_dvcd       , a.mixx_name       , a.imge_1fst						")
			.where("		, a.imge_2snd       , a.imge_3trd       , a.uper_seqn       , a.disp_seqn						")
			.where("		, a.user_memo       , a.sysm_memo       , a.stnd_pric											")
			.where("		, a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name						")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd						")
			.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm						")
			.where("from   fabc_mast a																						")
			.where("where  1=1																								")
			.where("and    a.find_name   like %:find_name%			" , arg.getParamText("find_name"))
			.where("and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by fabc_code																						")
			.where(") a																										")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("fabc_mast"												)
					.where("where fabc_idcd		= :fabc_idcd						")	//원단ID
					//
					.unique("fabc_idcd"			, row.fixParameter("fabc_idcd"		))
					//
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			} else {
				data.param
				.table("fabc_mast"													)
				.where("where fabc_idcd		= :fabc_idcd							")	//원단ID
				//
				.unique("fabc_idcd"			, row.fixParameter("fabc_idcd"			))
				//
				.update("fabc_code"			, row.getParameter("fabc_code"			))	//원단코드
				.update("fabc_name"			, row.getParameter("fabc_name"			))	//원단명
				.update("ppln_dvcd"			, row.getParameter("ppln_dvcd"			))	//지골구분코드
				.update("ppkd_dvcd"			, row.getParameter("ppkd_dvcd"			))	//지종구분코드
				.update("ppsg_dvcd"			, row.getParameter("ppsg_dvcd"			))	//단종구분코드
				.update("mixx_name"			, row.getParameter("mixx_name"			))	//배합명
				.update("stnd_pric"			, row.getParameter("stnd_pric"			))	//표준단가
			;

			data.param
				.update("uper_seqn"			, row.getParameter("uper_seqn"			))	//상위순번
				.update("disp_seqn"			, row.getParameter("disp_seqn"			))	//표시순번
				.update("user_memo"			, row.getParameter("user_memo"			))	//사용자메모
				.update("sysm_memo"			, row.getParameter("sysm_memo"			))	//시스템메모
				.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))	//부모ID
				.update("line_levl"			, row.getParameter("line_levl"			))	//ROW레벨
				.update("line_ordr"			, row.getParameter("line_ordr"			))	//ROW순서
				.update("line_stat"			, row.getParameter("line_stat"			))	//ROW상태
				.update("line_clos"			, row.getParameter("line_clos"			))	//ROW마감
				.update("find_name"			, row.getParamText("fabc_code"			).trim()
											+ " "
											+ row.getParamText("fabc_name"			).trim() )	//찾기명

				.update("updt_user_name"	, row.getParameter("updt_user_name"		))	//수정사용자명
				.update("updt_ipad"			, row.getParameter("updt_ipad"			))	//수정IP
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))	//수정ID
				.update("updt_urif"			, row.getParameter("updt_urif"			))	//수정UI
				.insert("crte_user_name"	, row.getParameter("crte_user_name"		))	//생성사용자명
				.insert("crte_ipad"			, row.getParameter("crte_ipad"			))	//생성IP
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))	//생성ID
				.insert("crte_urif"			, row.getParameter("crte_urif"			))	//생성UI
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();
			}
		}
		return null ;
	}

	public SqlResultMap getFabcbom(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.fabc_idcd       , a.line_seqn       , a.mixx_dvcd       , a.pper_idcd						")
			.query("      , a.pnyg_volm       , a.stnd_pric       , a.prnt_idcd       , a.find_name						")
			.query("      , a.user_memo       , a.sysm_memo       , a.line_stat       , a.line_clos						")
			.query("      , a.line_levl       , a.line_ordr       , a.updt_urif       , a.crte_urif						")
			.query("      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd						")
			.query("      , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd						")
			.query("      , p.pper_name																					")
		;
		data.param
			.where("from    fabc_bom a																					")
			.where("   left outer join pper_mast p on a.pper_idcd = p.pper_idcd											")
			.where("where   1=1																							")
			.where("and     a.fabc_idcd   = :fabc_idcd       " , arg.getParamText("fabc_idcd" ))
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.fabc_idcd, a.line_seqn																	")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap setFabcbom(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("fabc_bom"													)
					.where("where fabc_idcd		= :fabc_idcd							")	//원단ID
					.where("and   line_seqn		= :line_seqn							")	//순번
					//
					.unique("fabc_idcd"			, row.fixParameter("fabc_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
			}else{
				data.param
					.table("fabc_bom"													)
					.where("where fabc_idcd		= :fabc_idcd							")	//원단ID
					.where("and   line_seqn		= :line_seqn							")	//순번
					//
					.unique("fabc_idcd"			, row.fixParameter("fabc_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					.update("mixx_dvcd"			, row.getParameter("mixx_dvcd"			))	//배합구분코드
					.update("pper_idcd"			, row.getParameter("pper_idcd"			))	//원지Id
					.update("pnyg_volm"			, row.getParameter("pnyg_volm"			))	//평량
					.update("stnd_pric"			, row.getParameter("stnd_pric"			))	//표준단가
				;
				data.param
					.update("uper_seqn"			, row.getParameter("uper_seqn"			))	//상위순번
					.update("disp_seqn"			, row.getParameter("disp_seqn"			))	//표시순번
					.update("user_memo"			, row.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))	//부모ID
					.update("line_levl"			, row.getParameter("line_levl"			))	//ROW레벨
					.update("line_ordr"			, row.getParameter("line_ordr"			))	//ROW순서
					.update("line_stat"			, row.getParameter("line_stat"			))	//ROW상태
					.update("line_clos"			, row.getParameter("line_clos"			))	//ROW마감
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))	//수정사용자명
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))	//수정IP
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))	//수정ID
					.update("updt_urif"			, row.getParameter("updt_urif"			))	//수정UI
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))	//생성사용자명
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))	//생성IP
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))	//생성ID
					.insert("crte_urif"			, row.getParameter("crte_urif"			))	//생성UI
				;
				data.attach(rowaction);
				data.execute();
				data.clear();
			}
		}
		return null ;
	}

	public SqlResultMap getFabcpric(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.fabc_idcd       , a.line_seqn       , a.cstm_idcd       , a.adpt_date						")
			.query("      , a.puch_pric       , a.befr_pric       , a.last_yorn       , a.uper_seqn						")
			.query("      , a.user_memo       , a.sysm_memo       , a.line_stat       , a.line_clos						")
			.query("      , a.line_levl       , a.line_ordr       , a.updt_urif       , a.crte_urif						")
			.query("      , a.updt_user_name  , a.updt_ipad       , a.updt_idcd											")
			.query("      , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd						")
			.query("      , a.disp_seqn       , c.cstm_name       , c.cstm_code       , f.fabc_name						")
			.query("      , f.ppln_dvcd       , ifnull(a.updt_dttm, a.adpt_date) as updt_dttm							")
		;
		data.param
			.where("from    fabc_pric a																					")
			.where("   left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd											")
			.where("   left outer join fabc_mast f on a.fabc_idcd = f.fabc_idcd											")
			.where("where   1=1																							")
			.where("and     c.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd" ))
			.where("and     a.fabc_idcd   = :fabc_idcd       " , arg.getParamText("fabc_idcd" ))
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.fabc_idcd, a.line_seqn asc																")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap setFabcpric(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		DataMessage temp2 = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			System.out.println(row.getParameter("_set"));

			temp.param
				.query("select ifnull(max(a.line_seqn),0) as max			")
				.query("from fabc_pric a									")
				.query("where 1=1											")
				.query("and a.fabc_idcd = :fabc_idcd		", row.getParameter("fabc_idcd"))
				.query("and a.cstm_idcd = :cstm_idcd		", row.getParameter("cstm_idcd"))
			;
			SqlResultRow max = temp.selectForRow();
			temp.clear();

			int seq = Integer.parseInt((String) row.getParameter("line_seqn"));
			int maxseq = (int) max.getParameter("max");
			int yorn;
			System.out.println(seq+"**************************");
			System.out.println(maxseq+"**************************");
			if(seq >= maxseq){
				yorn = 1;
			}else{
				yorn = 0;
			}

			if (rowaction == Action.delete) {
				data.param
					.table("fabc_pric"													)
					.where("where fabc_idcd		= :fabc_idcd							")	//원단ID
					.where("and   line_seqn		= :line_seqn							")	//순번
					//
					.unique("fabc_idcd"			, row.fixParameter("fabc_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
			}else{
				data.param
					.table("fabc_pric"													)
					.where("where fabc_idcd		= :fabc_idcd							")	//원단ID
					.where("and   line_seqn		= :line_seqn							")	//순번
					//
					.unique("fabc_idcd"			, row.fixParameter("fabc_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))	//거래처ID
					.update("adpt_date"			, row.getParameter("adpt_date"			))	//적용일자
					.update("puch_pric"			, row.getParameter("puch_pric"			))	//구매단가
					.update("befr_pric"			, row.getParameter("befr_pric"			))	//전단가
					.update("last_yorn"			, yorn									)	//최종여부
				;
				data.param
					.update("uper_seqn"			, row.getParameter("uper_seqn"			))	//상위순번
					.update("disp_seqn"			, row.getParameter("disp_seqn"			))	//표시순번
					.update("user_memo"			, row.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))	//부모ID
					.update("line_levl"			, row.getParameter("line_levl"			))	//ROW레벨
					.update("line_ordr"			, row.getParameter("line_ordr"			))	//ROW순서
					.update("line_stat"			, row.getParameter("line_stat"			))	//ROW상태
					.update("line_clos"			, row.getParameter("line_clos"			))	//ROW마감
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))	//수정사용자명
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))	//수정IP
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))	//수정ID
					.update("updt_urif"			, row.getParameter("updt_urif"			))	//수정UI
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))	//생성사용자명
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))	//생성IP
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))	//생성ID
					.insert("crte_urif"			, row.getParameter("crte_urif"			))	//생성UI
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();

				temp2.param
					.query("update fabc_pric a 										")
					.query("set a.last_yorn = 0										")
					.query("where 1=1												")
					.query("and a.fabc_idcd = :fabc_idcd		", row.getParameter("fabc_idcd"))
					.query("and a.cstm_idcd = :cstm_idcd		", row.getParameter("cstm_idcd"))
					.query("and a.line_seqn < (										")
					.query("		select max(line_seqn) as max from fabc_pric		")
					.query("		where 1=1										")
					.query("		and fabc_idcd = :fabc_idcd2		", row.getParameter("fabc_idcd"))
					.query("		and cstm_idcd = :cstm_idcd2		", row.getParameter("cstm_idcd"))
					.query("		and last_yorn = 1								")
					.query("					)									")
				;
				temp2.attach(Action.direct);
				temp2.execute();
				temp2.clear();


			}
		}
		return null ;
	}

	public SqlResultMap setFileupload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
		DataMessage data = arg.newStorage("POS");
		String chk1 = (String)arg.getParameter("chk1");
		byte[] returnByte =null;
		ByteArrayOutputStream baos =  new ByteArrayOutputStream();
		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.

		ByteArrayInputStream thumnailInputStream = null;
		ByteArrayInputStream thumnailInputStream2 = null;
		// 이미지일 경우 섬네일 과정을 거친다.
		if(file[0].getFileItem().getName()==null||file[0].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[0].getInputStream()).size(240, 180).toOutputStream(baos);
			thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
		}

		int readCount = 0;
		try{
			if(chk1.equals("0")){
				data.param
					.query("update fabc_mast					")
					.query("       set imge_1fst = ''			")
					.query("       where fabc_idcd = :fabc_idcd", arg.getParameter("fabc_idcd"))
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
					.table("fabc_mast")
					.where("where fabc_idcd	= :fabc_idcd" )

					.unique("fabc_idcd"				, arg.fixParameter("fabc_idcd"))

					.update("imge_1fst",returnByte)
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


	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select imge_1fst					")
			.where("from  fabc_mast						")
			.where("where 1=1							")
			.where("and   fabc_idcd = :fabc_idcd",arg.getParameter("fabc_idcd"))
		;
		return data.selectForMap();
	}


	public SqlResultMap getFabcCodeCheck(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select count(*) as chk													")
			.where("from  fabc_mast															")
			.where("where fabc_code = :fabc_code", arg.fixParameter("fabc_code"))
		;
		return data.selectForMap();
	}


	public SqlResultMap getCstm(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select distinct a.cstm_idcd, c.cstm_code, c.cstm_name		")
			.where("from  fabc_pric a											")
			.where("inner join cstm_mast c on a.cstm_idcd = c.cstm_idcd			")
		;
		return data.selectForMap();
	}


	public SqlResultMap getCstmPric(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select ifnull(max(puch_pric), 0) as puch_pric	")
		;
		data.param
			.where("from  fabc_pric									")
			.where("where 1=1										")
			.where("and   last_yorn = 1								")
			.where("and   fabc_idcd = :fabc_idcd", arg.fixParameter("fabc_idcd"))
			.where("and   cstm_idcd = :cstm_idcd", arg.fixParameter("cstm_idcd"))
		;
		return data.selectForMap();
	}


	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("fabc_mast")
			.where("where fabc_idcd = :fabc_idcd ")

			.unique("fabc_idcd"		, arg.fixParameter("fabc_idcd"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("fabc_pric")
			.where("where fabc_idcd = :fabc_idcd ")

			.unique("fabc_idcd"		, arg.fixParameter("fabc_idcd"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("fabc_bom")
			.where("where fabc_idcd = :fabc_idcd ")

			.unique("fabc_idcd"		, arg.fixParameter("fabc_idcd"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();


		return null;

	}


}
