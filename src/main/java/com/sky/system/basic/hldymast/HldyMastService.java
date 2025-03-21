package com.sky.system.basic.hldymast;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import net.sky.http.dispatch.service.HostPropertiesService;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class HldyMastService {


	@Autowired
	private HostPropertiesService property;

	Logger logger = org.apache.log4j.Logger.getLogger(this.getClass());

	/**
	 * 리스트
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize		 												")
		;
		data.param
			.query("select a.bzpl_idcd      , b.bzpl_name , a.hldy_date       , a.dywk_dvcd			")
			.query("   ,   a.hldy_type_dvcd , a.hldy_name , a.stnd_hldy_yorn  , a.remk_text			")
			.query("   ,   a.user_memo      , a.line_stat											")
		;
		data.param
		    .where("from   hldy_mast a   															")
			.where("       left outer join bzpl_mast  b on a.bzpl_idcd  = b.bzpl_idcd				")
			.where("where  a.line_stat  = 0															")
			.where("and    a.bzpl_idcd  = 	:bzpl_idcd " , arg.getParameter("bzpl_idcd" ))
			.where("and    a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and    a.hldy_date between :fr_dt  " , arg.getParameter("fr_dt"    ))
			.where("                       and :to_dt  " , arg.getParameter("to_dt"    ))
			.where("order by a.hldy_date															")
		;
		if (page == 0 && rows == 0){
		     return data.selectForMap(sort);
		} else {
		     return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("hldy_mast")
					.where("where bzpl_idcd	= :bzpl_idcd					")
					.where("and   hldy_date	= :hldy_date					")

					.unique("bzpl_idcd"			, row.fixParameter("bzpl_idcd"))
					.unique("hldy_date"			, row.fixParameter("hldy_date"))

				;data.attach(Action.delete);

			} else {
				data.param
					.table("hldy_mast")
					.where("where bzpl_idcd	= :bzpl_idcd					")
					.where("and   hldy_date	= :hldy_date					")

					.unique("bzpl_idcd"			, row.fixParameter("bzpl_idcd"))
					.unique("hldy_date"			, row.fixParameter("hldy_date"))

					.update("hldy_name"			, row.getParameter("hldy_name"))
					.update("dywk_dvcd"			, row.getParameter("dywk_dvcd"))
					.update("hldy_type_dvcd"	, row.getParameter("hldy_type_dvcd"))
					.update("stnd_hldy_yorn"	, row.getParameter("stnd_hldy_yorn"))
					.update("remk_text"			, row.getParameter("remk_text"))

					.update("line_stat"			, row.getParameter("line_stat"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("hldy_name")
												+ "	"
												+ row.fixParameter("bzpl_idcd"))
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

	//법정공휴일 등록
	public SqlResultMap setHoliday(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		{ data = arg.newStorage("POS");      }

		ArrayList<String> name = new ArrayList<String>();
		ArrayList<String> fr_date = new ArrayList<String>();
		ArrayList<String> to_date = new ArrayList<String>();

		if(!arg.getParameter("est1_date").equals("")){
			name.add("창립기념일");
			fr_date.add((String) arg.getParameter("est1_date"));
			to_date.add((String) arg.getParameter("est2_date"));
		}if(!arg.getParameter("sum1_date").equals("")){
			name.add("하계휴가");
			fr_date.add((String) arg.getParameter("sum1_date"));
			to_date.add((String) arg.getParameter("sum2_date"));
		}if(!arg.getParameter("new1_date").equals("")){
			name.add("설날휴가");
			fr_date.add((String) arg.getParameter("new1_date"));
			to_date.add((String) arg.getParameter("new2_date"));
		}if(!arg.getParameter("giv1_date").equals("")){
			name.add("추석휴가");
			fr_date.add((String) arg.getParameter("giv1_date"));
			to_date.add((String) arg.getParameter("giv2_date"));
		}if(!arg.getParameter("bud1_date").equals("")){
			name.add("부처님오신날");
			fr_date.add((String) arg.getParameter("bud1_date"));
			to_date.add((String) arg.getParameter("bud2_date"));
		}
		for(int i = 0;i<name.size();i++) {
			data.param
				.query("call holyday_insert (							")
				.query(" :hldy_name	" , name.get(i)						)
				.query(" ,:fr_date	" , fr_date.get(i)					)
				.query(" ,:to_date	" , to_date.get(i)					)
				.query(" ) 												")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}
		return null;
	}

	public SqlResultMap setWeekend(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String year	= arg.getParamText("year") ;
		{ data = arg.newStorage("POS");      }
			data.param
			.query("call auto_holyday (						")
			.query(" :year	" , year						)
			.query(" ) 										")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}
}
