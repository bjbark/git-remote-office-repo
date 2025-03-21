package com.sky.test;

import java.net.UnknownHostException;
import java.nio.charset.Charset;
import java.util.regex.Pattern;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import com.sky.http.HttpMessage;

public class TestMongo1 {
	
	 MongoClient mongoClient = null;
     DB db=null;
    
     public void mongoTest(String ip,int port,String dbname) throws Exception{
    	 
    	 
//    	 Charset.
    	 
    	 HttpMessage http = new HttpMessage();
    	 String xxx = http.urlRequester("address" , "" , Charset.forName("utf-8" ));
    	 
           
    	 	
//       test1(ip, port, dbname);
         //testId(ip, port, dbname); 
//       testDelete(ip, port, dbname);
//       testSelect(ip, port, dbname);
    	 testPageing(ip, port, dbname);
    	 
     }

	
	private void testDelete(String ip, int port, String dbname) throws UnknownHostException {
		mongoClient = new MongoClient(new ServerAddress(ip,port));
		db = mongoClient.getDB(dbname);
        
		try{
			DBCollection userTable = db.getCollection("userTable");
			
			DBObject o= new BasicDBObject("_id", "1234");
			userTable.remove(o);
			
		}catch(Exception ex){
			ex.printStackTrace();
		}finally{
			
			mongoClient.close();
		}
	}

	private void testSelect(String ip, int port, String dbname) throws UnknownHostException {
		mongoClient = new MongoClient(new ServerAddress(ip,port));
		db = mongoClient.getDB(dbname);
        
		try{
			DBCollection userTable = db.getCollection("userTable");
			DBObject ref = new BasicDBObject("name", Pattern.compile("^Mongo"));
			DBCursor find = userTable.find(ref);
			
			while(find.hasNext()){
				DBObject obj = find.next();
				System.out.println(obj);
			}
		
		}catch(Exception ex){
			ex.printStackTrace();
		}finally{
			
			mongoClient.close();
		}
	}
	
	private void testPageing(String ip, int port, String dbname) throws UnknownHostException {
		mongoClient = new MongoClient(new ServerAddress(ip,port));
		db = mongoClient.getDB(dbname);
        
		try{
			 // http://docs.mongodb.org/manual/reference/operator/meta/orderby/ 
//			$orderby
//			The $orderby operator sorts the results of a query in ascending or descending order.
//
//			The mongo shell provides the cursor.sort() method:
//
//			db.collection.find().sort( { age: -1 } )
//			You can also specify the option in either of the following forms:
//
//			db.collection.find()._addSpecial( "$orderby", { age : -1 } )
//			db.collection.find( { $query: {}, $orderby: { age : -1 } } )
			
			DBCollection userTable = db.getCollection("userTable");
			DBObject ref = new BasicDBObject("name", Pattern.compile("^Mongo"));
			DBCursor find = userTable.find(ref).sort(new BasicDBObject("name", -1)).skip(0).limit(10);
			
			while(find.hasNext()){
				DBObject obj = find.next();
				System.out.println(obj);
			}
		
		}catch(Exception ex){
			ex.printStackTrace();
		}finally{
			
			mongoClient.close();
		}
	}

	

	private void testId(String ip, int port, String dbname)
			throws UnknownHostException {
		mongoClient = new MongoClient(new ServerAddress(ip,port));
		db = mongoClient.getDB(dbname);
         
		DBCollection userTable = db.getCollection("userTable");
		BasicDBObject doc = new BasicDBObject("name", "MongoDB").
		 append("type", "database").
		 append("count", 1).
		 append("info", new BasicDBObject("x", 203).append("y", 102));
		
		/**
		 * {
		 * 	_id:'asdfasdfasdfasdfasdf12314792',
		 * 	name:'MongoDB',
		 * 	type:'database',
		 * 	count:1,
		 * 	info :{
		 * 		x:203,
		 * 		y:102
		 * 	}
		 * }
		 * 
		 * 
		 */
		userTable.insert(doc);
	}
	
	private String digit3(int i){
		return i>99 ? ""+i :i>9 ? "0"+i : "00"+i;
	}
	
	private void test1(String ip, int port, String dbname)
			throws UnknownHostException {
		mongoClient = new MongoClient(new ServerAddress(ip,port));
		db = mongoClient.getDB(dbname);
         
		DBCollection userTable = db.getCollection("userTable");
		
		String index = null;
		for(int i=1;i<=1000;i++){
			index = digit3(i);
			BasicDBObject where = new BasicDBObject("_id", "gen-"+index);
			BasicDBObject doc = new BasicDBObject("_id", "gen-"+index).
					append("name", "Mongo "+index).
			 append("type", "database").
			 append("count", 1).
			 append("info", new BasicDBObject("x", 203).append("y", 102));
			
			userTable.update(where, doc, true, false);
		}
	}
    
	
	private void auto(String name ) throws ClassNotFoundException {
		System.out.println(name );
		
//		ItemUnitThread xxx = new ItemUnitThread("ss" , "sss");
//		Class kiass = Class.forName(name);
//		try {
//			Object obj = kiass.newInstance();
//		} catch (InstantiationException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (IllegalAccessException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} 
	}
	
     public static void main(String args[]) throws Exception{
    	 TestMongo1 testRunner = new TestMongo1();
    	 testRunner.auto("com.sky.tasker.ItemUnitThread" );
        //    testRunner.mongoTest("117.52.91.58", 27017, "testdb");
     }//ssh://117.52.91.58:8422

}
