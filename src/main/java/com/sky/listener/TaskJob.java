package com.sky.listener;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ibm.icu.text.SimpleDateFormat;
import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;

@Component
public class TaskJob {
//	public static void main(String[] arg) throws SchedulerException, InterruptedException{
//		Job
//	}

	private int single = 0;
	/** 스마트공장 API 자동 발송 Scheduler
	 *  spring에 있는 corn을 사용한다.
	 *  cron = 초 분 시 일 월 요일 옵션
	 *
	 *  초분시(0-59) 일(1-31) 월(1-12) 요일(1-7 sun-sat) 옵션(1970~2099)
	 * @throws Exception
	 */

	protected String method = "POST";
	protected String cont_type = "application/json; utf-8";
	protected String user_agnt = "Mozilla/5.0";
	protected String accept = "application/json";
	protected String key_liebe = "$5$API$Uk3V9VOUSW/.UZnZr50hvvqb1z7hhSbndzIStI4BK9D";
	protected String key_hnsun = "$5$API$oWWe0IrCvNtWL6rLqM2Jn9fFq9K8hiZzWrxZgIfaaS.";
	protected String key_inno  = "$5$API$y15ERCapdokb9Ua/c2sfCgsmWlk4ACWTc4IHmBzfFEA";
	protected String key_daea  = "$5$API$TfZIuyWKqy.pvB.fkPChFain0yGCJRbHnuZpPievT.1";
	protected String key_komec = "$5$API$3W83Df2T.z9l17U55FAIjUoanQ.P3OIqlrsn0mj0hC6";
	protected String key_dhtec = "$5$API$lMf./Xok.yCZKI6KjQTeG1BZQ2tfy5XF0kXncmD3kK7";
	protected String key_solbr = "$5$API$dEDoVEpEHzDAR41cD0MRpEg2g4p6SvpZWdROvc3PnUB";

	@Scheduled(cron="00 45 23 * * ?")
	public void run() throws Exception{
		if(this.single==0){
			DataMessage data = new DataMessage("N1000HNSUN.POS");

			data.param
				.query("select    user_idcd as sysUser													")
				.query("        , used_dttm as logDt													")
				.query("        , crud_dvcd as useSe													")
				.query("        , '211.34.220.78' as conectIp											")
				.query("        , :key as crtfcKey		",key_hnsun)
				.query("        , '1' as dataUsgqty														")

				.where("from mes_log																	")
				.where("where date_format(used_dttm,'%Y%m%d') = :date",new SimpleDateFormat("yyyyMMdd").format(new Date()))
//				.where("where date_format(used_dttm,'%Y%m%d') = '20221201'								")
			;
			SqlResultMap hnsun = data.selectForMap();
			for(SqlResultRow row : hnsun){

				String json = "{\"crtfcKey\":\""+row.fixParamText("crtfckey").replaceAll(" ","%20")+"\""
								+",\"logDt\":\""+row.fixParamText("logdt").replaceAll(" ","%20")+"\""
								+",\"useSe\":\""+row.fixParamText("usese").replaceAll(" ","%20")+"\""
								+",\"sysUser\":\""+row.fixParamText("sysuser").replaceAll(" ","%20")+"\""
								+",\"conectIp\":\""+row.fixParamText("conectip").replaceAll(" ","%20")+"\""
								+",\"dataUsgqty\":\""+row.fixParamText("datausgqty").replaceAll(" ","%20")+"\""
								+"}"
				;
				URL url = new URL("https://log.smart-factory.kr/apisvc/sendLogDataJSON.do?logData="+json);
				HttpURLConnection connect = (HttpURLConnection)url.openConnection();
				BufferedReader br =null;
				try {
					connect.setRequestMethod(method);
					connect.setRequestProperty("User-Agent", user_agnt);
					connect.setRequestProperty("Accept", accept);
					connect.setDoOutput(true);

					br = new BufferedReader(new InputStreamReader(connect.getInputStream()));
					String line = null;
					while((line=br.readLine())!=null){
						System.out.println(line+"\n");
					}
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}finally{
					br.close();
					connect.disconnect();
				}
			}

			DataMessage data2 = new DataMessage("N1000LIEBE.POS");

			data2.param
				.query("select    user_idcd as sysUser													")
				.query("        , used_dttm as logDt													")
				.query("        , crud_dvcd as useSe													")
				.query("        , '182.213.209.224' as conectIp											")
				.query("        , :key as crtfcKey		",key_liebe)
				.query("        , '1' as dataUsgqty														")

				.where("from mes_log																	")
				.where("where date_format(used_dttm,'%Y%m%d') = :date",new SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			SqlResultMap liebe = data2.selectForMap();
			for(SqlResultRow row : liebe){

				String json = "{\"crtfcKey\":\""+row.fixParamText("crtfckey").replaceAll(" ","%20")+"\""
								+",\"logDt\":\""+row.fixParamText("logdt").replaceAll(" ","%20")+"\""
								+",\"useSe\":\""+row.fixParamText("usese").replaceAll(" ","%20")+"\""
								+",\"sysUser\":\""+row.fixParamText("sysuser").replaceAll(" ","%20")+"\""
								+",\"conectIp\":\""+row.fixParamText("conectip").replaceAll(" ","%20")+"\""
								+",\"dataUsgqty\":\""+row.fixParamText("datausgqty").replaceAll(" ","%20")+"\""
								+"}"
				;
				URL url = new URL("https://log.smart-factory.kr/apisvc/sendLogDataJSON.do?logData="+json);
				HttpURLConnection connect = (HttpURLConnection)url.openConnection();
				BufferedReader br =null;
				try {
					connect.setRequestMethod(method);
					connect.setRequestProperty("User-Agent", user_agnt);
					connect.setRequestProperty("Accept", accept);
					connect.setDoOutput(true);

					br = new BufferedReader(new InputStreamReader(connect.getInputStream()));
					String line = null;
					while((line=br.readLine())!=null){
						System.out.println(line+"\n");
					}
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}finally{
					br.close();
					connect.disconnect();
				}
			}
			DataMessage data3 = new DataMessage("N1000HNSUN.POS");

			data3.param
				.query("select    user_idcd as sysUser													")
				.query("        , used_dttm as logDt													")
				.query("        , crud_dvcd as useSe													")
				.query("        , '211.34.220.78' as conectIp											")
				.query("        , :key as crtfcKey		",key_inno)
				.query("        , '1' as dataUsgqty														")

				.where("from mes_log																	")
				.where("where date_format(used_dttm,'%Y%m%d') = :date",new SimpleDateFormat("yyyyMMdd").format(new Date()))
//				.where("where date_format(used_dttm,'%Y%m%d') = '20221201'								")
			;

			SqlResultMap inno = data3.selectForMap();
			for(SqlResultRow row : inno){

				String json = "{\"crtfcKey\":\""+row.fixParamText("crtfckey").replaceAll(" ","%20")+"\""
								+",\"logDt\":\""+row.fixParamText("logdt").replaceAll(" ","%20")+"\""
								+",\"useSe\":\""+row.fixParamText("usese").replaceAll(" ","%20")+"\""
								+",\"sysUser\":\""+row.fixParamText("sysuser").replaceAll(" ","%20")+"\""
								+",\"conectIp\":\""+row.fixParamText("conectip").replaceAll(" ","%20")+"\""
								+",\"dataUsgqty\":\""+row.fixParamText("datausgqty").replaceAll(" ","%20")+"\""
								+"}"
				;
				URL url = new URL("https://log.smart-factory.kr/apisvc/sendLogDataJSON.do?logData="+json);
				HttpURLConnection connect = (HttpURLConnection)url.openConnection();
				BufferedReader br =null;
				try {
					connect.setRequestMethod(method);
					connect.setRequestProperty("User-Agent", user_agnt);
					connect.setRequestProperty("Accept", accept);
					connect.setDoOutput(true);

					br = new BufferedReader(new InputStreamReader(connect.getInputStream()));
					String line = null;
					while((line=br.readLine())!=null){
						System.out.println(line+"\n");
					}
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}finally{
					br.close();
					connect.disconnect();
				}
			}

			DataMessage data4 = new DataMessage("N1000DAE-A.POS");

			data4.param
				.query("select    user_idcd as sysUser													")
				.query("        , used_dttm as logDt													")
				.query("        , crud_dvcd as useSe													")
				.query("        , '14.47.24.207' as conectIp											")
				.query("        , :key as crtfcKey		",key_daea)
				.query("        , '1' as dataUsgqty														")

				.where("from mes_log																	")
				.where("where date_format(used_dttm,'%Y%m%d') = :date",new SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			SqlResultMap daea = data4.selectForMap();
			for(SqlResultRow row : daea){
				String json = "{\"crtfcKey\":\""+row.fixParamText("crtfckey").replaceAll(" ","%20")+"\""
								+",\"logDt\":\""+row.fixParamText("logdt").replaceAll(" ","%20")+"\""
								+",\"useSe\":\""+row.fixParamText("usese").replaceAll(" ","%20")+"\""
								+",\"sysUser\":\""+row.fixParamText("sysuser").replaceAll(" ","%20")+"\""
								+",\"conectIp\":\""+row.fixParamText("conectip").replaceAll(" ","%20")+"\""
								+",\"dataUsgqty\":\""+row.fixParamText("datausgqty").replaceAll(" ","%20")+"\""
								+"}"
				;
				URL url = new URL("https://log.smart-factory.kr/apisvc/sendLogDataJSON.do?logData="+json);
				HttpURLConnection connect = (HttpURLConnection)url.openConnection();
				BufferedReader br =null;
				try {
					connect.setRequestMethod(method);
					connect.setRequestProperty("User-Agent", user_agnt);
					connect.setRequestProperty("Accept", accept);
					connect.setDoOutput(true);

					br = new BufferedReader(new InputStreamReader(connect.getInputStream()));
					String line = null;
					while((line=br.readLine())!=null){
						System.out.println(line+"\n");
					}
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}finally{
					br.close();
					connect.disconnect();
				}
			}

			DataMessage data5 = new DataMessage("N1000KOMEC.POS");

			data5.param
				.query("select    user_idcd as sysUser													")
				.query("        , used_dttm as logDt													")
				.query("        , crud_dvcd as useSe													")
				.query("        , '14.47.24.207' as conectIp											")
				.query("        , :key as crtfcKey		",key_komec)
				.query("        , '1' as dataUsgqty														")

				.where("from mes_log																	")
				.where("where date_format(used_dttm,'%Y%m%d') = :date",new SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			SqlResultMap komec = data5.selectForMap();
			for(SqlResultRow row : komec){
				String json = "{\"crtfcKey\":\""+row.fixParamText("crtfckey").replaceAll(" ","%20")+"\""
								+",\"logDt\":\""+row.fixParamText("logdt").replaceAll(" ","%20")+"\""
								+",\"useSe\":\""+row.fixParamText("usese").replaceAll(" ","%20")+"\""
								+",\"sysUser\":\""+row.fixParamText("sysuser").replaceAll(" ","%20")+"\""
								+",\"conectIp\":\""+row.fixParamText("conectip").replaceAll(" ","%20")+"\""
								+",\"dataUsgqty\":\""+row.fixParamText("datausgqty").replaceAll(" ","%20")+"\""
								+"}"
				;
				URL url = new URL("https://log.smart-factory.kr/apisvc/sendLogDataJSON.do?logData="+json);
				HttpURLConnection connect = (HttpURLConnection)url.openConnection();
				BufferedReader br =null;
				try {
					connect.setRequestMethod(method);
					connect.setRequestProperty("User-Agent", user_agnt);
					connect.setRequestProperty("Accept", accept);
					connect.setDoOutput(true);

					br = new BufferedReader(new InputStreamReader(connect.getInputStream()));
					String line = null;
					while((line=br.readLine())!=null){
						System.out.println(line+"\n");
					}
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}finally{
					br.close();
					connect.disconnect();
				}
			}

			DataMessage data6 = new DataMessage("N1000DHTEC.POS");

			data6.param
				.query("select    user_idcd as sysUser													")
				.query("        , used_dttm as logDt													")
				.query("        , crud_dvcd as useSe													")
				.query("        , '14.47.24.207' as conectIp											")
				.query("        , :key as crtfcKey		",key_dhtec)
				.query("        , '1' as dataUsgqty														")

				.where("from mes_log																	")
				.where("where date_format(used_dttm,'%Y%m%d') = :date",new SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			SqlResultMap dhtec = data6.selectForMap();
			for(SqlResultRow row : dhtec){
				String json = "{\"crtfcKey\":\""+row.fixParamText("crtfckey").replaceAll(" ","%20")+"\""
								+",\"logDt\":\""+row.fixParamText("logdt").replaceAll(" ","%20")+"\""
								+",\"useSe\":\""+row.fixParamText("usese").replaceAll(" ","%20")+"\""
								+",\"sysUser\":\""+row.fixParamText("sysuser").replaceAll(" ","%20")+"\""
								+",\"conectIp\":\""+row.fixParamText("conectip").replaceAll(" ","%20")+"\""
								+",\"dataUsgqty\":\""+row.fixParamText("datausgqty").replaceAll(" ","%20")+"\""
								+"}"
				;
				URL url = new URL("https://log.smart-factory.kr/apisvc/sendLogDataJSON.do?logData="+json);
				HttpURLConnection connect = (HttpURLConnection)url.openConnection();
				BufferedReader br =null;
				try {
					connect.setRequestMethod(method);
					connect.setRequestProperty("User-Agent", user_agnt);
					connect.setRequestProperty("Accept", accept);
					connect.setDoOutput(true);

					br = new BufferedReader(new InputStreamReader(connect.getInputStream()));
					String line = null;
					while((line=br.readLine())!=null){
						System.out.println(line+"\n");
					}
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}finally{
					br.close();
					connect.disconnect();
				}
			}

			DataMessage data7 = new DataMessage("N1000KORTC.POS");

			data7.param
				.query("select    user_idcd as sysUser													")
				.query("        , used_dttm as logDt													")
				.query("        , crud_dvcd as useSe													")
				.query("        , '14.47.24.207' as conectIp											")
				.query("        , :key as crtfcKey		",key_solbr)
				.query("        , '1' as dataUsgqty														")

				.where("from mes_log																	")
				.where("where date_format(used_dttm,'%Y%m%d') = :date",new SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			SqlResultMap solbr = data7.selectForMap();
			for(SqlResultRow row : solbr){
				String json = "{\"crtfcKey\":\""+row.fixParamText("crtfckey").replaceAll(" ","%20")+"\""
								+",\"logDt\":\""+row.fixParamText("logdt").replaceAll(" ","%20")+"\""
								+",\"useSe\":\""+row.fixParamText("usese").replaceAll(" ","%20")+"\""
								+",\"sysUser\":\""+row.fixParamText("sysuser").replaceAll(" ","%20")+"\""
								+",\"conectIp\":\""+row.fixParamText("conectip").replaceAll(" ","%20")+"\""
								+",\"dataUsgqty\":\""+row.fixParamText("datausgqty").replaceAll(" ","%20")+"\""
								+"}"
				;
				URL url = new URL("https://log.smart-factory.kr/apisvc/sendLogDataJSON.do?logData="+json);
				HttpURLConnection connect = (HttpURLConnection)url.openConnection();
				BufferedReader br =null;
				try {
					connect.setRequestMethod(method);
					connect.setRequestProperty("User-Agent", user_agnt);
					connect.setRequestProperty("Accept", accept);
					connect.setDoOutput(true);

					br = new BufferedReader(new InputStreamReader(connect.getInputStream()));
					String line = null;
					while((line=br.readLine())!=null){
						System.out.println(line+"\n");
					}
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}finally{
					br.close();
					connect.disconnect();
				}
			}
		}
	}
}
