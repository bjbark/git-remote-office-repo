package com.sky.listener;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Set;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

public class ParamToJson {
	private String[] columns;
	private String[] records;

	/**
	 * arg => josn
	 * ex) { x : x , y : y}
	 * @param arg
	 * @param optn_idcd (optn_mast / opnt_idcd)
	 * @throws none
	 */
	public String Translate(HttpRequestArgument arg,String optn_idcd){
		String result="";
		try {
			DataMessage data = arg.newStorage("POS");
			data.param
				.query("select optn_char_valu 											")
			;
			data.param //퀴리문
				.where("from   optn_mast												")
				.where("where  1=1														")
				.where("and    optn_idcd = :optn_idcd", optn_idcd)
			;
			String value= data.selectForMap().get(0).getParamText("optn_char_valu");

			columns = value.split(",");
			result += "{";
			int chk = 0;
			for (int i = 0; i < columns.length; i++) {
				String column = columns[i];
				if(!arg.getParamText(column).equals("")){
					if(chk != 0){
						result += ", ";
					}
					result += "\""+column+"\":";
					if(arg.getParamText(column).indexOf("[")==0){
						result += arg.getParamText(column);
					}else{
						result += "\""+arg.getParamText(column)+"\"";
					}
					chk++;
				}
			}
			result += "}";
		}catch (Exception e) {
			e.printStackTrace();	// TODO: handle exception
		}
		System.out.println(result);
		return result;
	}

	/**
	 * row => josn
	 * ex) { x : x , y : y}
	 * @param arg (datamessage)
	 * @param row
	 * @param optn_idcd (optn_mast / opnt_idcd)
	 * @throws none
	 */
	public String TranslateRow(HttpRequestArgument arg,SqlResultRow row,String optn_idcd){
		String result="";
		try {
			DataMessage data = arg.newStorage("POS");
			data.param
				.query("select optn_char_valu 											")
			;
			data.param //퀴리문
				.where("from   optn_mast												")
				.where("where  1=1														")
				.where("and    optn_idcd = :optn_idcd", optn_idcd)
			;
			String value= data.selectForMap().get(0).getParamText("optn_char_valu");
			data.clear();

			columns = value.split(",");
			result += "{";
			int chk = 0;
			for (int i = 0; i < columns.length; i++) {
				String column = columns[i];
				if(!row.getParamText(column).equals("")){
					if(chk != 0){
						result += ", ";
					}
					result += "\""+column+"\":\""+row.getParamText(column)+"\"";
					chk++;
				}
			}
			result += "}";
		}catch (Exception e) {
			e.printStackTrace();	// TODO: handle exception
		}
		System.out.println(result);
		return result;
	}

	/**
	 * row => josn
	 * ex) { x : x , y : y}
	 * @param arg
	 * @param row
	 * @param optn_idcd (optn_mast / opnt_idcd)
	 * @throws none
	 */
	public String TranslateRowAll(HttpRequestArgument arg,SqlResultRow row,String optn_idcd){
		String result="";
		try {
			DataMessage data = arg.newStorage("POS");
			data.param
				.query("select optn_char_valu 											")
			;
			data.param //퀴리문
				.where("from   optn_mast												")
				.where("where  1=1														")
				.where("and    optn_idcd = :optn_idcd", optn_idcd)
			;
			String value= data.selectForMap().get(0).getParamText("optn_char_valu");

			columns = value.split(",");
			result += "{";
			int chk = 0;
			for (int i = 0; i < columns.length; i++) {
				String column = columns[i];
				if(!row.getParamText(column).equals("") || !arg.getParamText(column).equals("")){
					if(chk != 0){
						result += ", ";
					}
					 if(!arg.getParamText(column).equals("")){
						result += "\""+column+"\":\""+arg.getParamText(column)+"\"";
					}else if(!row.getParamText(column).equals("")){
						result += "\""+column+"\":\""+row.getParamText(column)+"\"";
					}
					chk++;
				}
			}
			result += "}";
		}catch (Exception e) {
			e.printStackTrace();	// TODO: handle exception
		}
		System.out.println(result);
		return result;
	}

	/**
	 * map => josn
	 * ex) { x : x , y : y}
	 * @param map
	 * @param optn_idcd // string ex) "a,b,c"
	 * @throws none
	 */
	public String TranslateRowData(SqlResultMap map , String optn_idcd){
		String result="";
		int chk = 0;
		try {
			columns = optn_idcd.split(",");
			result += "{";
			if(optn_idcd!=""){
				for (int i = 0; i < columns.length; i++) {
					String column = columns[i];
					if(!map.get(0).getParamText(column).equals("")){
						if(chk != 0){
							result += ", ";
						}
						result += "\""+column+"\":\""+map.get(0).getParamText(column)+"\"";
						chk++;
					}
				}
				result += "}";
			}
		}catch (Exception e) {
			e.printStackTrace();	// TODO: handle exception
		}
		System.out.println(result);
		return result;
	}


	/**
	 * one row => josn
	 * ex) { x : x , y : y}
	 * @param row
	 * @param optn_idcd // string ex) "a,b,c"
	 * @throws none
	 */
	public String TranslateRowSelect(SqlResultRow row,String optn_idcd){
		String result="";
		try {
			columns = optn_idcd.split(",");
			result += "{";
			int chk = 0;
			for (int i = 0; i < columns.length; i++) {
				String column = columns[i];
				if(!row.getParamText(column).equals("")){
					if(chk != 0){
						result += ", ";
					}
					result += "\""+column+"\":\""+row.getParamText(column)+"\"";
					chk++;
				}
			}
			result += "}";
		}catch (Exception e) {
			e.printStackTrace();	// TODO: handle exception
		}
		System.out.println(result);
		return result;
	}

	/**
	 * arg => josn
	 * ex) { x : x , y : y}
	 * @param row
	 * @param optn_idcd // string ex) "a,b,c"
	 * @throws none
	 */
	public String TranslateProcedure(HttpRequestArgument arg,String optn_idcd){
		String result="";
		Set set = arg.keySet();
		Iterator itr = set.iterator();
		ArrayList<String> key = new ArrayList<String>();
		while (itr.hasNext()) {
			key.add((String)itr.next());
		}
		try {
			String value= optn_idcd;
			columns = value.split(",");
			result += "{";
			int chk = 0;
			for (int i = 0; i < columns.length; i++) {
				String column = columns[i];
				if(!arg.getParamText(column).equals("")){
					if(chk != 0){
						result += ", ";
					}
					result += "\""+column+"\":";
					if(arg.getParamText(column).indexOf("[")==0){
						result += arg.getParamText(column);
					}else{
						result += "\""+arg.getParamText(column)+"\"";
					}
					chk++;
				}
			}
			result += "}";
		}catch (Exception e) {
			e.printStackTrace();	// TODO: handle exception
		}
		System.out.println(result);
		return result;
	}

	/**
	 * arg,map => josn
	 * ex) { arg : arg , records:[{x : x , y : y}]}
	 * @param arg
	 * @param map
	 * @param optn_idcd // string ex) "a,b,c"
	 * @param recd_idcd // string ex) "a,b,c"
	 * @throws none
	 */
	public String TranslateGantt(HttpRequestArgument arg,SqlResultMap map,String optn_idcd,String recd_idcd){
		String result="";
		int chk = 0;
		int chk2 = 0;
		try {
			columns = optn_idcd.split(",");
			records = recd_idcd.split(",");
			result += "{";
			if(optn_idcd!=""){
				for (int i = 0; i < columns.length; i++) {
					String column = columns[i];
					if(!arg.getParamText(column).equals("")){
						if(chk != 0){
							result += ", ";
						}
						result += "\""+column+"\":\""+arg.getParamText(column)+"\"";
						chk++;
					}
				}
				result += ", ";
			}
			result +="\"records\":[";
			for (int i = 0; i < map.size(); i++) {
				for (int j = 0; j < records.length; j++) {
					String column = records[j];
					if(!map.get(i).getParamText(column).equals("")){
						if(chk2 != 0){
							result += ", ";
						}else{
							result += "{";
						}
						result += "\""+column+"\":\""+map.get(i).getParamText(column)+"\"";
						chk2++;
					}
					if(j==records.length-1){
						result += "}";
					}
				}
				if(i<map.size()-1){
					result += ",";
				}
				chk2 = 0;
			}
			result += "]}";
		}catch (Exception e) {
			e.printStackTrace();	// TODO: handle exception
		}
		System.out.println(result);
		return result;
	}
	public String TranslateInvoice(SqlResultMap arg,SqlResultMap map,String optn_idcd,String recd_idcd){
		String result="";
		int chk = 0;
		int chk2 = 0;
		try {
			columns = optn_idcd.split(",");
			records = recd_idcd.split(",");
			result += "{";
			if(optn_idcd!=""){
				for (int j = 0; j < arg.size(); j++) {
					for (int i = 0; i < columns.length; i++) {
						String column = columns[i];
						if(!arg.get(j).getParamText(column).equals("")){
							if(chk != 0){
								result += ", ";
							}
							result += "\""+column+"\":\""+arg.get(j).getParamText(column)+"\"";
							chk++;
						}
					}
				}
				result += ", ";
			}
			result +="\"records\":[";
			for (int i = 0; i < map.size(); i++) {
				for (int j = 0; j < records.length; j++) {
					String column = records[j];
					if(!map.get(i).getParamText(column).equals("")){
						if(chk2 != 0){
							result += ", ";
						}else{
							result += "{";
						}
						result += "\""+column+"\":\""+map.get(i).getParamText(column)+"\"";
						chk2++;
					}
					if(j==records.length-1){
						result += "}";
					}
				}
				if(i<map.size()-1){
					result += ",";
				}
				chk2 = 0;
			}
			result += "]}";
		}catch (Exception e) {
			e.printStackTrace();	// TODO: handle exception
		}
		System.out.println(result);
		return result;
	}

	/**
	 * map => josn
	 * ex) {records:[{x : x , y : y}]}
	 * @param map
	 * @param optn_idcd // string ex) "a,b,c"
	 * @throws none
	 */
	public String TranslateRecords(HttpRequestArgument map,String optn_idcd){
		String result="";
		int chk2 = 0;
		try {
			columns = optn_idcd.split(",");
			result += "{";
			result +="\"records\":[";

			for (int j = 0; j < columns.length; j++) {
				String column = columns[j];
				if(!map.getParamText(column).equals("")){
					if(chk2 != 0){
						result += ", ";
					}else{
						result += "{";
					}
					result += "\""+column+"\":\""+map.getParamText(column)+"\"";
					chk2++;
				}
				if(j==columns.length-1){
					result += "}";
				}
			}
			chk2 = 0;
			result += "]}";
		}catch (Exception e) {
			e.printStackTrace();	// TODO: handle exception
		}
		System.out.println(result);
		return result;
	}

	/**
	 * map => josn
	 * ex) { z : z , records:[{x : x , y : y}]}  / all map data
	 * @param map
	 * @param optn_idcd // string ex) "a,b,c"
	 * @param recd_idcd // string ex) "a,b,c"
	 * @throws none
	 */
	public String TranslateRowRec(SqlResultMap map,String optn_idcd,String recd_idcd){
		String result="";
		int chk = 0;
		int chk2 = 0;
		try {
			columns = optn_idcd.split(",");
			records = recd_idcd.split(",");
			result += "{";
			if(optn_idcd!=""){
				for (int i = 0; i < columns.length; i++) {
					String column = columns[i];
					if(!map.get(0).getParamText(column).equals("")){
						if(chk != 0){
							result += ", ";
						}
						result += "\""+column+"\":\""+map.get(0).getParamText(column)+"\"";
						chk++;
					}
				}
				result += ", ";
			}
			result +="\"records\":[";
			for (int i = 0; i < map.size(); i++) {
				for (int j = 0; j < records.length; j++) {
					String column = records[j];
					if(!map.get(i).getParamText(column).equals("")){
						if(chk2 != 0){
							result += ", ";
						}else{
							result += "{";
						}
						result += "\""+column+"\":\""+map.get(i).getParamText(column)+"\"";
						chk2++;
					}
					if(j==records.length-1){
						result += "}";
					}
				}
				if(i<map.size()-1){
					result += ",";
				}
				chk2 = 0;
			}
			result += "]}";
		}catch (Exception e) {
			e.printStackTrace();	// TODO: handle exception
		}
		System.out.println(result);
		return result;
	}

	/**
	 * arg => josn
	 * ex) { x : x , y : y } / arg allParameter
	 * @param arg
	 * @throws none
	 */
	public String TranslateAll(HttpRequestArgument arg){
		String result="";
		Set set = arg.keySet();
		Iterator itr = set.iterator();
		ArrayList<String> key = new ArrayList<String>();
		while (itr.hasNext()) {
			key.add((String)itr.next());
		}
		try {
			result += "{";
			int chk = 0;
			for (int i = 0; i < key.size(); i++) {
				String column = key.get(i);
				if(!arg.getParamText(column).equals("")){
					if(chk != 0){
						result += ", ";
					}
					result += "\""+column+"\":";
					if(arg.getParamText(column).indexOf("[")==0){
						result += arg.getParamText(column);
					}else{
						result += "\""+arg.getParamText(column)+"\"";
					}
					chk++;
				}
			}
			result += "}";
		}catch (Exception e) {
			e.printStackTrace();	// TODO: handle exception
		}
		System.out.println(result);
		return result;
	}
	/**
	 * arg => josn
	 * ex) { x : x , y : y } / arg allParameter
	 * @param arg
	 * @throws none
	 */
	public String TranslateRowAll(SqlResultRow arg){
		String result="";
		Set set = arg.keySet();
		Iterator itr = set.iterator();
		ArrayList<String> key = new ArrayList<String>();
		while (itr.hasNext()) {
			key.add((String)itr.next());
		}
		try {
			result += "{";
			int chk = 0;
			for (int i = 0; i < key.size(); i++) {
				String column = key.get(i);
				if(!arg.getParamText(column).equals("")){
					if(chk != 0){
						result += ", ";
					}
					result += "\""+column+"\":";
					if(arg.getParamText(column).indexOf("[")==0){
						result += arg.getParamText(column);
					}else{
						result += "\""+arg.getParamText(column)+"\"";
					}
					chk++;
				}
			}
			result += "}";
		}catch (Exception e) {
			e.printStackTrace();	// TODO: handle exception
		}
		System.out.println(result);
		return result;
	}
}
